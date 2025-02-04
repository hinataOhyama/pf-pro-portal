"use client";

import { signInSchema, SignInSchema } from "@/features/auth/schema/sign-in";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SignInBtns } from "./sign-in-btns";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/shadcn-ui/form";
import { CardContent } from "@/components/shadcn-ui/card";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { Input } from "@/components/shadcn-ui/input";
import { Button } from "@/components/shadcn-ui/button";
import { Loading } from "@/components/ui/loading";

export const SignInCardContent = () => {
  const t = useTranslations("AUTH");
  const s = useTranslations("MESSAGES");

  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [loading, setLoading] = useState(false);

  return (
    <CardContent>
      <Form {...form}>
        <form action="" className="space-y-7">
          <SignInBtns disabled={loading} onLoading={setLoading} />
          <div className="space-y-1.5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder={t("EMAIL")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder={t("PASSWORD")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-2">
            <Button
              disabled={loading}
              className="w-full font-bold text-white"
              type="submit"
            >
              {loading ? (
                <Loading text={s("PENDING.LOADING")} />
              ) : (
                t("SIGN_IN.SUBMIT_BTN")
              )}
            </Button>
          </div>
        </form>
      </Form>
    </CardContent>
  );
};

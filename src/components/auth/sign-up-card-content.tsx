"use client";

import { SignUpSchema, signUpSchema } from "@/schema/sign-up";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CardContent } from "@/components/shadcn-ui/card";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/shadcn-ui/form";
import { SignInBtns } from "./sign-in-btns";
import { useState } from "react";
import { Input } from "@/components/shadcn-ui/input";
import { Button } from "@/components/shadcn-ui/button";
import { useTranslations } from "next-intl";
import { Loading } from "@/components/shadcn-ui/loading";

export const SignUpCardContent = () => {
  const t = useTranslations("AUTH");
  const s = useTranslations("MESSAGES");

  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
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
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder={t("USERNAME")} {...field} />
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
                t("SIGN_UP.SUBMIT_BTN")
              )}
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              {t("SIGN_UP.TERMS.FIRST")}{" "}
              <span className="font-bold">{t("SIGN_UP.TERMS.SECOND")}</span>
            </p>
          </div>
        </form>
      </Form>
    </CardContent>
  );
}
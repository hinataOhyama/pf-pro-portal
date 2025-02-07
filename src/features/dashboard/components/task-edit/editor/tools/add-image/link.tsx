"use client";

import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormMessage,
} from "@/components/shadcn-ui/form";
import { linkSchema, LinkSchema } from "@/features/dashboard/schema/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/shadcn-ui/input";
import { Button } from "@/components/shadcn-ui/button";
import { Loading } from "@/components/ui/loading";

interface Props {
  onAddImage: (link: string) => void;
}

export const AddImageByLink = ({ onAddImage }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const t = useTranslations("TASK.EDITOR.IMAGE.LINK_TAB");

  const form = useForm<LinkSchema>({
    resolver: zodResolver(linkSchema),
    defaultValues: {
      link: "",
    },
  });

  const isImage = async (url: string) => {
    try {
      const data = await fetch(url, { method: "HEAD" });
      if (!data.ok) return false;
      console.log(data);
      const res = data.headers.get("Content-Type")?.startsWith("image");
      if (res) return true;
      return false;
    } catch {
      return false;
    }
  };

  const addImageByLinkHandler = async (data: LinkSchema) => {
    setIsLoading(true);
    try {
      const { link } = data;
      const isValidLink = await isImage(link);
      if (!isValidLink) {
        form.setError("link", {
          message: "ERRORS.WRONG_IMAGE_LINK",
        });
        setIsLoading(false);
        return;
      }
      onAddImage(link);
    } catch {}
  };

  return (
    <Form {...form}>
      <form className="space-y-6 my-6">
        <div className="space-y-1.5">
          <FormField
            control={form.control}
            name="link"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="bg-muted h-7 py-1.5 text-sm"
                    placeholder={t("PLACEHOLDER")}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-end w-full items-center gap-2">
          <Button
            disabled={isLoading}
            className="text-white"
            onClick={() => {
              form.handleSubmit(addImageByLinkHandler)();
            }}
          >
            {isLoading ? (
              <Loading text={t("BTN_PENDING")} />
            ) : (
              t("BTN_ADD")
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

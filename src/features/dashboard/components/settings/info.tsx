"use client";

import { Card, CardContent } from "@/components/shadcn-ui/card";
import { useLocale, useTranslations } from "next-intl";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn-ui/form";
import { useForm } from "react-hook-form";
import {
  accountInfoSchema,
  AccountInfoSchema,
} from "@/features/dashboard/schema/account-info";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/shadcn-ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shadcn-ui/popover";
import { Button } from "@/components/shadcn-ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/shadcn-ui/command";
import { cn } from "@/lib/shadcn-utils";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "@/lib/i18n";
import { useChangeLocale } from "@/hooks/use-change-locale";
import { Loading } from "@/components/ui/loading";
import { AddUserImage } from "@/features/onboarding/components/common/add-user-image";
import { Session } from "@/features/onboarding/lib/check-completed";

type AccountInfoProps = {
  session: Session;
};

const languages = [
  {
    label: "English",
    value: "en",
  },
  {
    label: "Telugu",
    value: "ja",
  },
] as const;

export const AccountInfo = ({ session }: AccountInfoProps) => {
  const t = useTranslations("SETTINGS");
  const m = useTranslations("MESSAGES");
  const lang = useLocale();
  const { toast } = useToast();
  const { update } = useSession();
  const router = useRouter();
  const form = useForm<AccountInfoSchema>({
    resolver: zodResolver(accountInfoSchema),
    defaultValues: {
      username: session?.user.username ?? undefined,
      language: lang,
      name: session?.user.name ?? "",
      surname: session?.user.surname ?? "",
    },
  });

  const { onSelectChange } = useChangeLocale();

  const { mutate: editProfile, isPending } = useMutation({
    mutationFn: async (updatedData: AccountInfoSchema) => {
      const { data } = (await axios.post(
        "/api/profile/edit",
        updatedData
      )) as AxiosResponse<AccountInfoSchema>;

      return data;
    },
    onError: (err: AxiosError) => {
      const error = err?.response?.data ? err.response.data : "ERRORS.DEFAULT";

      toast({
        title: m(error),
        variant: "destructive",
      });
    },
    onSuccess: async (res: AccountInfoSchema) => {
      if (res.language !== lang) onSelectChange(res.language as "ja" | "en");
      await update();
      router.refresh();
    },
    mutationKey: ["profileEdit"],
  });

  const onSubmit = (data: AccountInfoSchema) => {
    editProfile(data);
  };

  return (
    <Card className="bg-background border-none shadow-none">
      <CardContent>
        <div className="space-y-2">
          <p className="uppercase text-xs text-muted-foreground">
            {t("ACCOUNT.IMAGE")}
          </p>
          <AddUserImage
            className="w-20 h-20 md:w-24 md:h-24"
            profileImage={session?.user.image}
          />
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 mt-6 w-full max-w-4xl"
          >
            <div className="space-y-2 sm:space-y-4 w-full">
              <div className="flex flex-col sm:flex-row items-center w-full gap-2 sm:gap-10">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem className="w-full sm:w-1/2">
                      <FormLabel className="text-muted-foreground uppercase text-xs">
                        {t("ACCOUNT.USERNAME")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="bg-muted"
                          placeholder={t("ACCOUNT.USERNAME_PLACEHOLDER")}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="w-full sm:w-1/2">
                      <FormLabel className="text-muted-foreground text-xs uppercase">
                        {t("ACCOUNT.FIRST_NAME")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="bg-muted"
                          placeholder={t("ACCOUNT.FIRST_NAME_PLACEHOLDER")}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col sm:flex-row items-center w-full gap-2 sm:gap-10">
                <FormField
                  control={form.control}
                  name="surname"
                  render={({ field }) => (
                    <FormItem className="w-full sm:w-1/2">
                      <FormLabel className="text-muted-foreground uppercase text-xs">
                        {t("ACCOUNT.SURNAME")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="bg-muted"
                          placeholder={t("ACCOUNT.SURNAME_PLACEHOLDER")}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="language"
                  render={({ field }) => (
                    <FormItem className="flex flex-col mt-2 w-full sm:w-1/2">
                      <FormLabel className="text-muted-foreground uppercase text-xs">
                        {t("ACCOUNT.LANG")}
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              role="combobox"
                              className={cn(
                                "justify-between",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? languages.find(
                                    (language) => language.value === field.value
                                  )?.label
                                : t("ACCOUNT.SELECT_LANGUAGE")}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent align="start" className="w-full p-0">
                          <Command>
                            <CommandInput
                              placeholder={t("ACCOUNT.SEARCH_LANGUAGE")}
                            />
                            <CommandEmpty>
                              {t("ACCOUNT.NO_LANGUAGE")}
                            </CommandEmpty>
                            <CommandGroup>
                              <CommandList>
                                {languages.map((language) => (
                                  <CommandItem
                                    value={language.label}
                                    key={language.value}
                                    onSelect={() => {
                                      form.setValue("language", language.value);
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        language.value === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {language.label}
                                  </CommandItem>
                                ))}
                              </CommandList>
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <Button disabled={isPending} className="text-white" type="submit">
              {isPending ? (
                <Loading text={t("ACCOUNT.PENDING_BTN")} />
              ) : (
                t("ACCOUNT.UPDATE_BTN")
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

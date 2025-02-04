"use client";

import { Button } from "@/components/shadcn-ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn-ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn-ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn-ui/form";
import { Input } from "@/components/shadcn-ui/input";
import { Loading } from "@/components/ui/loading";
import {Warning} from "@/components/ui/warning";
import { useToast } from "@/hooks/use-toast";
import { SettingsWorkspace } from "@/features/dashboard/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useTranslations } from "next-intl";
import { useRouter } from "@/lib/i18n";
import { useForm } from "react-hook-form";
import { z } from "zod";

type OverviewDeleteProps = {
  workspace: SettingsWorkspace;
}

export const OverviewDelete = ({ workspace: { id, name } }: OverviewDeleteProps) => {
  const t = useTranslations("EDIT_WORKSPACE.DELETE");
  const { toast } = useToast();
  const m = useTranslations("MESSAGES");
  const router = useRouter();

  const deleteWorkspaceSchema = z.object({
    workspaceName: z
      .string()
      .refine(
        (workspaceName) => workspaceName === name,
        "SCHEMA.WORKSPACE.WRONG_NAME"
      ),
  });

  type DeleteWorkspaceSchema = z.infer<typeof deleteWorkspaceSchema>;

  const form = useForm<DeleteWorkspaceSchema>({
    resolver: zodResolver(deleteWorkspaceSchema),
    defaultValues: {
      workspaceName: "",
    },
  });

  const { mutate: deleteWorkspace, isPending } = useMutation({
    mutationFn: async (formData: DeleteWorkspaceSchema) => {
      const { data } = (await axios.post("/api/workspace/delete/workspace", {
        id,
        workspaceName: formData.workspaceName,
      })) as AxiosResponse<DeleteWorkspaceSchema>;

      return data;
    },
    onError: (err: AxiosError) => {
      const error = err?.response?.data ? err.response.data : "ERRORS.DEFAULT";

      toast({
        title: m(error),
        variant: "destructive",
      });
    },
    onSuccess: async () => {
      toast({
        title: m("SUCCESS.DELETED_WORKSPACE_INFO"),
      });

      router.push("/dashboard/settings");
      router.refresh();
    },
    mutationKey: ["deleteWorkspace"],
  });

  const onSubmit = (data: DeleteWorkspaceSchema) => {
    deleteWorkspace(data);
  };

  return (
    <Card className="bg-background border-none shadow-none max-w-3xl">
      <CardHeader>
        <CardTitle>{t("TITLE")}</CardTitle>
        <CardDescription>{t("DESC")}</CardDescription>
      </CardHeader>
      <CardContent className="pt-0 sm:pt-0">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 w-full max-w-sm"
          >
            <div className="space-y-2 sm:space-y-4 w-full">
              <FormField
                control={form.control}
                name="workspaceName"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-muted-foreground uppercase text-xs">
                      {t("LABEL")}
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  type="button"
                  variant={"destructive"}
                  className=""
                >
                  {t("BTN")}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="text-destructive">
                    {t("DIALOG.TITLE")}
                  </DialogTitle>
                  <DialogDescription>{t("DIALOG.DESC")}</DialogDescription>
                </DialogHeader>
                <Warning>
                  <p>{t("DIALOG.WARNING")}</p>
                </Warning>
                <Button
                  disabled={isPending}
                  onClick={form.handleSubmit(onSubmit)}
                  size={"lg"}
                  variant={"destructive"}
                >
                  {isPending ? (
                    <Loading text={t("DIALOG.PENDING_BTN")} />
                  ) : (
                    t("DIALOG.BUTTON")
                  )}
                </Button>
              </DialogContent>
            </Dialog>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

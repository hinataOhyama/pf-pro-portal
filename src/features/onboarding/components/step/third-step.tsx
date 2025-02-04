import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/shadcn-ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { UploadFile } from "../common/upload-file";
import { workspaceSchema, WorkspaceSchema } from "@/schema/workspace";
import { useOnboardingForm } from "../../context/form";
import { useUploadThing } from "@/lib/uploadthing";
import { useToast } from "@/hooks/use-toast";
import { useTranslations } from "next-intl";
import { ActionType } from "../../types/context";
import { Input } from "@/components/shadcn-ui/input";
import { Button } from "@/components/shadcn-ui/button";
import { Loading } from "@/components/ui/loading";
import { ArrowRight } from "lucide-react";

export const ThirdStep = () => {
  const [uploadError, setUploadError] = useState(false);
  const form = useForm<WorkspaceSchema>({
    resolver: zodResolver(workspaceSchema),
    defaultValues: {
      workspaceName: "",
    },
  });
  const m = useTranslations("MESSAGES");

  const { currentStep, dispatch } = useOnboardingForm();
  const { toast } = useToast();
  const t = useTranslations("ONBOARDING_FORM");

  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onUploadError: () => {
      setUploadError(true);
      toast({
        title: m("ERRORS.WORKSPACE_ICON_ADDED"),
        variant: "destructive",
      });
    },
    onClientUploadComplete: (data) => {
      if (data) {
        dispatch({ type: ActionType.WORKSPACE_IMAGE, payload: data[0].url });
      } else {
        setUploadError(true);
        toast({
          title: m("ERRORS.WORKSPACE_ICON_ADDED"),
          variant: "destructive",
        });
      }
    },
  });

  const onSubmit = async (data: WorkspaceSchema) => {
    setUploadError(false);
    const image: File | undefined | null = data.file;
    if (image) await startUpload([image]);

    if (uploadError) return;

    dispatch({ type: ActionType.WORKSPACE_NAME, payload: data.workspaceName });
    dispatch({ type: ActionType.CHANGE_SITE, payload: currentStep + 1 });
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-4 w-full my-10 text-center">
        <h2 className="font-bold text-4xl md:text-5xl max-w-md">
          {t("THIRD_STEP.TITLE")}
        </h2>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-md space-y-8 mt-12"
        >
          <div className="space-y-1.5">
            <FormField
              name="workspaceName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-muted-foreground">
                    {t("THIRD_STEP.INPUTS.NAME")}
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-muted"
                      placeholder={t("THIRD_STEP.PLACEHOLDERS.NAME")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <UploadFile
            form={form}
            schema={workspaceSchema}
            inputAccept="image/*"
            typesDescription={t("THIRD_STEP.IMAGE")}
            ContainerClassName="w-full"
            LabelClassName="text-muted-foreground mb-1.5 self-start"
            LabelText={t("THIRD_STEP.INPUTS.FILE")}
          />
          <Button
            disabled={isUploading}
            type="submit"
            className="w-full mt-10 max-w-md dark:text-white font-semibold"
          >
            {isUploading ? (
              <Loading />
            ) : (
              <>
                {t("NEXT_BTN")}
                <ArrowRight className="ml-2" width={18} height={18} />
              </>
            )}
          </Button>
        </form>
      </Form>
    </>
  );
};

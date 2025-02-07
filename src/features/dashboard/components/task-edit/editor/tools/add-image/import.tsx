"use client";

import { UploadFile } from "@/features/onboarding/components/common/upload-file";
import { Form } from "@/components/shadcn-ui/form";
import { useToast } from "@/hooks/use-toast";
import { useUploadThing } from "@/lib/uploadthing";
import { imageLinkSchema, ImageLinkSchema } from "@/features/dashboard/schema/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { Button } from "@/components/shadcn-ui/button";
import { Loading } from "@/components/ui/loading";
import { useState } from "react";

interface Props {
  onAddImageAction: (link: string) => void;
}

export const AddImageByImport = ({ onAddImageAction }: Props) => {
  const t = useTranslations("TASK.EDITOR.IMAGE.UPLOAD_TAB");
  const m = useTranslations("MESSAGES");
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();

  const { startUpload } = useUploadThing("imageUploader", {
    onUploadError: () => {
      toast({
        title: m("ERRORS.IMAGE_TO_EDITOR"),
        variant: "destructive",
      });
    },
    onClientUploadComplete: (data) => {
      if (!data)
        toast({
          title: m("ERRORS.IMAGE_PROFILE_UPDATE"),
          variant: "destructive",
        });
      else {
        onAddImageAction(data[0].url);
      }
    },
  });

  const form = useForm<ImageLinkSchema>({
    resolver: zodResolver(imageLinkSchema),
  });

  const addImageByImportHandler = async (data: ImageLinkSchema) => {
    const image: File = data.file;
    await startUpload([image]);
  };

  return (
    <Form {...form}>
      <form>
        <UploadFile
          ContainerClassName="w-full"
          LabelClassName="text-muted-foreground mb-1.5 self-start"
          typesDescription={t("TYPES")}
          form={form}
          schema={imageLinkSchema}
          inputAccept="image/*"
        />
        <div className="flex justify-end w-full items-center gap-2">
          <Button
            disabled={isLoading}
            className="text-white"
            onClick={() => {
              form.handleSubmit(addImageByImportHandler)();
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

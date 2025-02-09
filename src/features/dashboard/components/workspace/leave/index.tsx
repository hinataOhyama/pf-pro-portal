"use client";

import { useToast } from "@/hooks/use-toast";
import { Workspace } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useTranslations } from "next-intl";
import { useRouter } from "@/lib/i18n";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn-ui/dialog";
import { Button } from "@/components/shadcn-ui/button";
import { DoorOpen } from "lucide-react";
import { Warning } from "@/components/ui/warning";
import { Loading } from "@/components/ui/loading";

interface Props {
  workspace: Workspace;
}

export const LeaveWorkspace = ({ workspace: { id, name } }: Props) => {
  const [open, setOpen] = useState(false);

  const t = useTranslations("LEAVE_FROM_WORKSPACE");
  const m = useTranslations("MESSAGES");

  const { toast } = useToast();

  const router = useRouter();

  const { mutate: leaveFromWorkspace, isPending } = useMutation({
    mutationFn: async () => {
      await axios.post(`/api/workspace/leave`, { id });
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
        title: m("SUCCESS.LEAVE_FROM_WORKSPACE"),
      });

      router.push("/dashboard");
      router.refresh();
    },
    mutationKey: ["leaveFromWorkspace", id],
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => setOpen(true)}
          variant={"ghost"}
          size={"icon"}
          className="text-sm md:text-base min-w-[10rem] sm:min-w-[13rem] w-1/5 h-14 p-2 rounded-lg shadow-sm flex justify-center items-center gap-1 md:gap-2"
        >
          <span className="hidden sm:inline">{t("LEAVE")}</span>
          <DoorOpen size={18} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <span>{t("TITLE")}</span> <span>{name}</span>
          </DialogTitle>
          <DialogDescription>{t("DESC")}</DialogDescription>
        </DialogHeader>
        <Warning>
          <p>{t("WARNING")}</p>
        </Warning>

        <Button
          disabled={isPending}
          onClick={() => {
            leaveFromWorkspace();
          }}
          className="flex gap-1 items-center"
        >
          {isPending ? (
            <Loading text={t("LOADING_BTN")} />
          ) : (
            <>
              <DoorOpen size={18} />
              {t("LEAVE")}
            </>
          )}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

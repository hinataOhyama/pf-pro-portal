"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn-ui/dialog";
import { HoverCard, HoverCardContent } from "@/components/shadcn-ui/hover-card";
import { Button } from "@/components/shadcn-ui/button";
import { Trash } from "lucide-react";
import {Warning} from "@/components/ui/warning";
import { useTranslations } from "next-intl";
import { useReactFlow } from "reactflow";
import { useAutosaveIndicator } from "@/features/dashboard/context/auto-save-indicator";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Loading } from "@/components/ui/loading";

type DeleteAllNodesProps = {
  mindMapId: string;
  workspaceId: string;
}

export const DeleteAllNodes = ({ workspaceId, mindMapId }: DeleteAllNodesProps) => {
  const [open, setOpen] = useState(false);
  const t = useTranslations("MIND_MAP.DELETE");
  const { setNodes, getNodes } = useReactFlow();

  const { onSetStatus, status } = useAutosaveIndicator();
  const { toast } = useToast();

  const { mutate: updateMindMap, isPending } = useMutation({
    mutationFn: async () => {
      onSetStatus("pending");
      await axios.post(`/api/mind_maps/update`, {
        content: null,
        mindMapId,
        workspaceId,
      });
    },
    onSuccess: () => {
      onSetStatus("saved");
      setNodes([]);
      toast({
        title: t("MESSAGE.SUCCESS"),
      });
      setOpen(false);
    },
    onError: () => {
      onSetStatus("unsaved");
      toast({
        title: t("MESSAGE.ERROR"),
        variant: "destructive",
      });
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <HoverCard openDelay={250} closeDelay={250}>
        <DialogTrigger asChild>
          <Button
            disabled={!getNodes().length || status !== "saved"}
            onClick={() => setOpen(true)}
            variant={"ghost"}
            size={"icon"}
          >
            <Trash size={22} />
          </Button>
        </DialogTrigger>
        <HoverCardContent align="start">{t("HOVER")}</HoverCardContent>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("DIALOG.TITLE")}</DialogTitle>
            <DialogDescription>{t("DIALOG.DESC")}</DialogDescription>
            <Warning>
              <p>{t("DIALOG.WARNING")}</p>
            </Warning>
            <Button
              disabled={isPending}
              onClick={() => updateMindMap()}
              size={"lg"}
              variant={"destructive"}
            >
              {isPending ? (
                <Loading text={t("DIALOG.BTN_PENDING")} />
              ) : (
                t("DIALOG.BTN_RESET")
              )}
            </Button>
          </DialogHeader>
        </DialogContent>
      </HoverCard>
    </Dialog>
  );
};

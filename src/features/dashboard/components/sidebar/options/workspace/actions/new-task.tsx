"use client";

import { Button } from "@/components/shadcn-ui/button";
import { Loading } from "@/components/ui/loading";

import { useNewTask } from "@/features/dashboard/hooks/use-new-task";

import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";

interface Props {
  workspaceId: string;
}

export const NewTask = ({ workspaceId }: Props) => {
  const t = useTranslations("SIDEBAR.WORKSPACE_OPTIONS");

  const { newTask, isPending } = useNewTask(workspaceId);
  return (
    <Button
      disabled={isPending}
      onClick={() => {
        newTask();
      }}
      className="justify-start items-center gap-2"
      variant="ghost"
      size="sm"
    >
      <Plus size={16} />
      {isPending ? <Loading /> : t("ADD_TASK")}
    </Button>
  );
};

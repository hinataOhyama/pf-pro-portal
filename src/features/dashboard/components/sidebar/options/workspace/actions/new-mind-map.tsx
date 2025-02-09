"use client";

import { Button } from "@/components/shadcn-ui/button";
import { Loading } from "@/components/ui/loading";

import { useNewMindMap } from "@/features/dashboard/hooks/use-new-mind-map";

import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";

interface Props {
  workspaceId: string;
}

export const NewMindMap = ({ workspaceId }: Props) => {
  const t = useTranslations("SIDEBAR.WORKSPACE_OPTIONS");

  const { newMindMap, isPending } = useNewMindMap(workspaceId);
  return (
    <Button
      disabled={isPending}
      onClick={() => {
        newMindMap();
      }}
      className="justify-start items-center gap-2"
      variant="ghost"
      size="sm"
    >
      <Plus size={16} />
      {isPending ? (
        <Loading text={t("ADD_MIND_MAP_PENDING")} />
      ) : (
        t("ADD_MIND_MAP")
      )}
    </Button>
  );
};

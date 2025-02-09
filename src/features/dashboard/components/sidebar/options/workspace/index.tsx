"use client";

import { PencilRuler, Workflow } from "lucide-react";
import { useTranslations } from "next-intl";
import { NewTask } from "./actions/new-task";
import { useQuery } from "@tanstack/react-query";
import { WorkspaceShortcuts } from "@/features/dashboard/types/workspace";
import { WorkspaceOption } from "./option";
import { NewMindMap } from "./actions/new-mind-map";
import { UsersContainer } from "./users";

type WorkspaceOptionsProps = {
  workspaceId: string;
}

export const WorkspaceOptions = ({ workspaceId }: WorkspaceOptionsProps) => {
  const t = useTranslations("SIDEBAR.WORKSPACE_OPTIONS");

  const { data: workspaceShortcuts, isLoading } = useQuery({
    queryFn: async () => {
      const res = await fetch(
        `/api/workspace/get/workspace_shortcuts?workspaceId=${workspaceId}`
      );

      if (!res.ok) return null;

      const data = await res.json();
      return data as WorkspaceShortcuts;
    },
    queryKey: ["getWorkspaceShortcuts", workspaceId],
  });

  return (
    <div>
      <div>
        <p>{t("SHORTCUTS")}</p>
        {!isLoading && workspaceShortcuts && (
          <div>
            <WorkspaceOption
              workspaceId={workspaceId}
              href={`tasks/task`}
              fields={workspaceShortcuts.tasks}
              defaultName="Test"
            >
              <PencilRuler size={16} />
              {t("TASKS")}
            </WorkspaceOption>
            <WorkspaceOption
              workspaceId={workspaceId}
              href={`mind-maps/mind-map`}
              fields={workspaceShortcuts.mindMaps}
              defaultName={t("DEFAULT_NAME")}
            >
              <Workflow size={16} />
              {t("MIND_MAPS")}
            </WorkspaceOption>
          </div>
        )}
      </div>
      <div>
        <p className="text-xs sm:text-sm uppercase text-muted-foreground">
          {t("ACTIONS")}
        </p>
        <div className="flex flex-col gap-2 w-full mt-2">
          <NewTask workspaceId={workspaceId} />
          <NewMindMap workspaceId={workspaceId} />
        </div>
      </div>
      <UsersContainer />
    </div>
  );
};

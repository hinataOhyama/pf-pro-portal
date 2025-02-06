import React from "react";
import { DashboardHeader } from "../header";
import { InviteUsers } from "../settings-workspace/invite-users";
import { UserPermission, Workspace } from "@prisma/client";
import { changeCodeToEmoji } from "@/lib/change-code-to-emoji";
import { ReadonlyContent } from "./readonly-content";
import { ExtendedTask } from "@/features/dashboard/types/task";
import { TaskShortcut } from "../shortcut";
import { Session } from "@/features/onboarding/lib/check-completed";

type TaskDetailPresentationProps = {
  workspace: Workspace;
  workspaceId: string;
  userRole: UserPermission;
  task: ExtendedTask;
  isSavedByUser: boolean;
  session: Session;
};

const TaskDetailPresentation = ({
  workspace,
  workspaceId,
  userRole,
  task,
  isSavedByUser,
  session,
}: TaskDetailPresentationProps) => {
  return (
    <>
      <DashboardHeader
        addManualRoutes={[
          {
            name: "DASHBOARD",
            href: "/dashboard",
            useTranslate: true,
          },
          {
            name: workspace.name,
            href: `/dashboard/workspace/${workspaceId}`,
          },
          {
            name: `${task.title ? task.title : "UNTITLED"}`,
            emoji: changeCodeToEmoji(task.emoji),
            href: "/",
            useTranslate: task.title ? false : true,
          },
        ]}
      >
        {(userRole === "ADMIN" || userRole === "OWNER") && (
          <InviteUsers workspace={workspace} />
        )}
        <TaskShortcut userId={session!.user.id} />
      </DashboardHeader>
      <main className="flex flex-col gap-2">
        <ReadonlyContent
          task={task}
          isSavedByUser={isSavedByUser}
          userRole={userRole}
        />
      </main>
    </>
  );
};

export default TaskDetailPresentation;

import React from "react";
import { AutosaveIndicatorProvider } from "../../context/auto-save-indicator";
import { DashboardHeader } from "../header";
import { InviteUsers } from "../settings-workspace/invite-users";
import { TaskShortcut } from "../shortcut";
import { UserPermission, Workspace } from "@prisma/client";
import { Session } from "@/features/onboarding/lib/check-completed";
import { ExtendedTask } from "../../types/task";
import { TaskContainer } from "./container";

type EditTaskPresentationProps = {
  workspace: Workspace;
  userRole: UserPermission | null;
  task: ExtendedTask;
  session: Session;
  taskId: string;
  workspaceId: string;
};

const EditTaskPresentation = (
  { workspace, userRole, task, session
  , taskId, workspaceId
   }: EditTaskPresentationProps
) => {
  return (
    <AutosaveIndicatorProvider>
      {" "}
      <DashboardHeader showBackBtn hideBreadCrumb showingSavingStatus>
        {(userRole === "ADMIN" || userRole === "OWNER") && (
          <InviteUsers workspace={workspace} />
        )}
        <TaskShortcut userId={session!.user.id} />
      </DashboardHeader>
      <main className="flex flex-col gap-2">
        <TaskContainer
          taskId={taskId}
          workspaceId={workspaceId}
          initialActiveTags={task.tags}
          title={task.title}
          content={task.content as unknown as JSON}
          emoji={task.emoji}
          from={task?.taskDate?.from}
          to={task?.taskDate?.to}
        />
      </main>
    </AutosaveIndicatorProvider>
  );
};

export default EditTaskPresentation;

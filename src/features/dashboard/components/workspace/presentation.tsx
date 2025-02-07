import React from "react";
import { DashboardHeader } from "../header";
import { ExtendedWorkspace } from "../../types/workspace";
import { UserPermission } from "@prisma/client";
import { Session } from "@/features/onboarding/lib/check-completed";
import { FilterByUsersAndTagsInWorkspaceProvider } from "../../context/filter-by-users-tags-in-workspace";
import { InviteUsers } from "../settings-workspace/invite-users";
import { TaskShortcut } from "../shortcut";
import { ShortcutContainer } from "./shortcuts";
import { FilterContainer } from "./filter";
import { RecentActivityContainer } from "./recent-activity";
import { LeaveWorkspace } from "./leave";

type WorkspacePresentationProps = {
  workspace: ExtendedWorkspace;
  workspaceId: string;
  userRole: UserPermission | null;
  session: Session;
};

const WorkspacePresentation = ({
  workspace,
  workspaceId,
  userRole,
  session,
}: WorkspacePresentationProps) => {
  return (
    <FilterByUsersAndTagsInWorkspaceProvider>
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
        ]}
      >
        {(userRole === "ADMIN" || userRole === "OWNER") && (
          <InviteUsers workspace={workspace} />
        )}
        {userRole !== "OWNER" && <LeaveWorkspace workspace={workspace} />}
        <TaskShortcut userId={session!.user.id} />
      </DashboardHeader>
      <main className="flex flex-col gap-2 w-full">
        <ShortcutContainer workspace={workspace} userRole={userRole} />
        <FilterContainer sessionUserId={session!.user.id} />
        <RecentActivityContainer
          userId={session!.user.id}
          workspaceId={workspace.id}
        />
      </main>
    </FilterByUsersAndTagsInWorkspaceProvider>
  );
};

export default WorkspacePresentation;

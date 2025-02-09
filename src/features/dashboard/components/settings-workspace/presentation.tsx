import React from "react";
import { DashboardHeader } from "../header";
import { Session } from "@/features/onboarding/lib/check-completed";
import { SettingsWorkspace } from "@/features/dashboard/types/workspace";
import { SubscriptionUser } from "@/features/dashboard/types/info";
import { WorkspaceTab } from "./tab";
import { InviteUsers } from "./invite-users";

type WorkspacePresentationProps = {
  workspace: SettingsWorkspace;
  user?: SubscriptionUser;
  session: Session;
};

const WorkspacePresentation = ({
  workspace,
  user,
  session,
}: WorkspacePresentationProps) => {
  return (
    <>
      <DashboardHeader
        className="mb-2 sm:mb-0"
        addManualRoutes={[
          {
            name: "DASHBOARD",
            href: "/dashboard",
            useTranslate: true,
          },
          {
            name: "settings",
            href: "/dashboard/settings",
          },
          {
            name: workspace.name,
            href: "/",
          },
        ]}
      >
        {(user?.userRole === "ADMIN" || user?.userRole === "OWNER") && (
          <InviteUsers workspace={workspace} />
        )}
        {/* <AddTaskShortcut userId={session.user.id} /> */}
      </DashboardHeader>
      <main className="flex flex-col gap-2">
        <WorkspaceTab workspace={workspace} workspaceId={workspace.id} />
      </main>
    </>
  );
};

export default WorkspacePresentation;

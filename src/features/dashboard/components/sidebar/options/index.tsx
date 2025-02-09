"use client";

import { usePathname } from "@/lib/i18n";
import { Settings } from "./settings";
import { CreatedWorkspacesInfo } from "./create-workspace-info";
import { Workspace } from "@prisma/client";
import { WorkspaceOptions } from "./workspace";
import { ScrollArea } from "@/components/shadcn-ui/scroll-area";
import { AssignedToMeFilter } from "./assigned-to";

interface Props {
  createdWorkspaces: number;
  userAdminWorkspaces: Workspace[];
  userWorkspaces: Workspace[];
}

export const OptionsSidebar = ({
  createdWorkspaces,
  userAdminWorkspaces,
  userWorkspaces,
}: Props) => {
  const pathname = usePathname();
  if (pathname === "/dashboard") return null;

  const urlWorkspaceId: string | undefined = pathname.split("/")[3];
  const urlAdditionalId: string | undefined = pathname.split("/")[6];
  const chatId: string | undefined = pathname.split("/")[5];
  const workspaceId = urlWorkspaceId ? urlWorkspaceId : "";

  if (
    pathname === "/dashboard" ||
    pathname === "/dashboard/starred" ||
    pathname === "/dashboard/calendar" ||
    (urlAdditionalId &&
      pathname ===
        `/dashboard/workspace/${workspaceId}/tasks/task/${urlAdditionalId}/edit`) ||
    (urlAdditionalId &&
      pathname ===
        `/dashboard/workspace/${workspaceId}/mind-maps/mind-map/${urlAdditionalId}/edit`)
  ) {
    return null;
  }
  return (
    <div className="border-r sm:w-64 w-52 h-full p-4 sm:py-6 flex flex-col justify-between">
      <ScrollArea className="h-full">
        {pathname.includes("/dashboard/settings") && (
          <Settings userAdminWorkspaces={userAdminWorkspaces} />
        )}
        {(pathname === `/dashboard/workspace/${workspaceId}` ||
          pathname ===
            `/dashboard/workspace/${workspaceId}/tasks/task/${urlAdditionalId}` ||
          pathname ===
            `/dashboard/workspace/${workspaceId}/mind-maps/mind-map/${urlAdditionalId}` ||
          pathname ===
            `/dashboard/workspace/${workspaceId}/chat/${chatId}`) && (
          <WorkspaceOptions workspaceId={workspaceId} />
        )}

        {pathname === "/dashboard/assigned-to-me" && (
          <AssignedToMeFilter userWorkspaces={userWorkspaces} />
        )}
      </ScrollArea>

      <CreatedWorkspacesInfo createdNumber={createdWorkspaces} />
    </div>
  );
};

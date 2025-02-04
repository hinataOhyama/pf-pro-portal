"use client";

import { useToggleSidebar } from "@/features/dashboard/context/toggle-sidebar";
import { ShortcutSidebar } from "./shortcut";
import { CloseSidebar } from "./close";
import { Workspace } from "@prisma/client";

type SidebarContainerProps = {
  userWorkspaces: Workspace[];
  userId: string;
  userAdminWorkspaces: Workspace[];
}

export const SidebarContainer = ({
  userWorkspaces,
  userId,
  // userAdminWorkspaces,
}: SidebarContainerProps) => {
  const { isOpen, setIsOpen } = useToggleSidebar();
  const createdWorkspaces = userWorkspaces.filter(
    (workspace) => workspace.creatorId == userId
  );
  return (
    <>
      <aside
        className={`fixed z-50 top-0 h-full left-0 lg:static bg-background border-r flex lg:translate-x-0 transition-all duration-300 ${
          isOpen ? "translate-x-0 shadow-sm" : "translate-x-[-100%]"
        }`}
      >
        <ShortcutSidebar
          userWorkspaces={userWorkspaces ? userWorkspaces : []}
          createdWorkspaces={createdWorkspaces.length}
        />
        <CloseSidebar />
      </aside>
      <div
        onClick={() => {
          setIsOpen(false);
        }}
        className={`fixed h-screen w-full top-0 left-0 bg-black/80 z-40 lg:hidden ${
          isOpen ? "block" : "hidden"
        }`}
      ></div>
    </>
  );
};

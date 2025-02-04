import { Workspace } from "@prisma/client";
import { Bottom } from "./bottom";
import { Top } from "./top";
import { Workspaces } from "./workspaces";
import { ScrollArea } from "@/components/shadcn-ui/scroll-area";

type ShortcutSidebarProps = {
  userWorkspaces: Workspace[];
  createdWorkspaces: number;
}

export const ShortcutSidebar = ({
  userWorkspaces,
  // createdWorkspaces,
}: ShortcutSidebarProps) => {
  return (
    <div className="border-r h-full flex flex-col justify-between items-center p-4 sm:py-6">
      <ScrollArea className="max-h-[35rem]">
        <div className="w-full space-y-3 p-1">
          <Top />
          <Workspaces
            userWorkspaces={userWorkspaces}
            href="/dashboard/workspace"
          />
        </div>
      </ScrollArea>

      <Bottom />
    </div>
  );
};

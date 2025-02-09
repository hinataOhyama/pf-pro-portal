"use client";

import { ScrollArea } from "@/components/shadcn-ui/scroll-area";
import { UserPermission } from "@prisma/client";
import { BtnItem } from "./btn-item";
import { MessagesSquare, PencilRuler, Workflow } from "lucide-react";
import { LeaveWorkspace } from "../leave";
import { useNewTask } from "@/features/dashboard/hooks/use-new-task";
import { useNewMindMap } from "@/features/dashboard/hooks/use-new-mind-map";
import { PermissionIndicator } from "./permission-indicator";
import { LinkItem } from "./link-item";
import { ExtendedWorkspace } from "@/features/dashboard/types/workspace";

interface Props {
  workspace: ExtendedWorkspace;
  userRole: UserPermission | null;
}

export const ShortcutContainer = ({ workspace, userRole }: Props) => {
  const { newTask, isPending: isNewTaskLoading } = useNewTask(workspace.id);
  const { newMindMap, isPending: isNewMindMapLoading } = useNewMindMap(
    workspace.id
  );
  return (
    <ScrollArea className="w-full">
      <div className="flex w-max space-x-4 pb-4 mt-4">
        <PermissionIndicator
          userRole={userRole}
          workspaceName={workspace.name}
        />
        <LinkItem
          userRole={userRole}
          Icon={MessagesSquare}
          title="Group chat"
          href={`/dashboard/workspace/${workspace.id}/chat/${workspace.conversation?.id}`}
        />
        <BtnItem
          userRole={userRole}
          Icon={PencilRuler}
          title="New task"
          isLoading={isNewTaskLoading}
          onClickAction={newTask}
        />
        <BtnItem
          userRole={userRole}
          Icon={Workflow}
          title="New mind map"
          isLoading={isNewMindMapLoading}
          onClickAction={newMindMap}
        />
        {userRole !== "OWNER" && <LeaveWorkspace workspace={workspace} />}
      </div>
    </ScrollArea>
  );
};

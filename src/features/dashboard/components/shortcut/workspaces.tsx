import { Workspace } from "@prisma/client";
import { ScrollArea } from "@/components/shadcn-ui/scroll-area";
import { SelectWorkspace } from "./select-workspace";

type WorkspacesProps = {
  workspaces?: Workspace[];
  onSelectActiveWorkspace: (workspace: Workspace) => void;
}

export const Workspaces = ({ workspaces, onSelectActiveWorkspace }: WorkspacesProps) => {
  return (
    <ScrollArea className="w-full max-h-64 sm:max-h-72 bg-background/70 border border-border p-4 rounded-md shadow-sm">
      <div className="w-full h-full flex flex-col">
        {workspaces &&
          workspaces.map((workspace) => (
            <SelectWorkspace
              key={workspace.id}
              workspace={workspace}
              onSelectActiveWorkspaceAction={onSelectActiveWorkspace}
            />
          ))}
      </div>
    </ScrollArea>
  );
};

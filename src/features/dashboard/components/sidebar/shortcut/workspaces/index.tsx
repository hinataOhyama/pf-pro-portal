import { Workspace } from "@prisma/client";
import React from "react";
import { WorkspaceComponent } from "./workspace";

type WorkspacesProps = {
  userWorkspaces: Workspace[];
  href: string;
};

export const Workspaces = ({ userWorkspaces, href }: WorkspacesProps) => {
  return (
    <div className="flex flex-col gap-3">
      {userWorkspaces.map((workspace) => (
        <WorkspaceComponent
          key={workspace.id}
          workspace={workspace}
          href={href}
        />
      ))}
    </div>
  );
};

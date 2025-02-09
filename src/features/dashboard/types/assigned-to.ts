import { Workspace } from "@prisma/client";
import { UserInfo } from "./info";

export type AssignedItemType = "task" | "mindMap";

export type AssignedToMindMapUser = {
  user: {
    id: string;
    image: string | null;
    username: string;
    assignedToMindMap: {
      userId: string;
    }[];
  };
};

export type UsersAssignedToMindMapInfo = {
  subscribers: AssignedToMindMapUser[];
} & Workspace;

export type AssignedToMeDataItem = {
  id: string;
  title: string;
  emoji: string;
  link: string;
  workspaceName: string;
  createdAt: Date;
  type: AssignedItemType;
  updated: {
    at: Date;
    by?: UserInfo | null;
  };
  workspaceId: string;
  starred: boolean;
}

export type AssignedToMeTaskAndMindMaps = {
  tasks: AssignedToMeDataItem[];
  mindMaps: AssignedToMeDataItem[];
}

import { Workspace } from "@prisma/client";
import { UserInfo } from "./info";

export type AssignedItemType = "task" | "mindMap";

export interface AssignedToMindMapUser {
  user: {
    id: string;
    image: string | null;
    username: string;
    assignedToMindMap: {
      userId: string;
    }[];
  };
}

export interface UsersAssignedToMindMapInfo extends Workspace {
  subscribers: AssignedToMindMapUser[];
}

export interface AssignedToMeDataItem {
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

export interface AssignedToMeTaskAndMindMaps {
  tasks: AssignedToMeDataItem[];
  mindMaps: AssignedToMeDataItem[];
}
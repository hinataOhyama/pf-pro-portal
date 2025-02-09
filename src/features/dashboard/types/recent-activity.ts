import { CustomColors, Tag } from "@prisma/client";
import {
  AssignedItemType,
  AssignedToMeDataItem,
  AssignedToMeTaskAndMindMaps,
} from "./assigned-to";
import { UserInfo } from "./info";

export type HomeRecentActivity = {
  starred: boolean;
} & AssignedToMeDataItem;

export type HomeRecentTasksAndMindMapsActivity = AssignedToMeTaskAndMindMaps;

export type WorkspaceRecentActivityTagItem = {
  id: string;
  name: string;
  color: CustomColors;
}

export type WorkspaceRecentActivityAssignedToItem = {
  user: {
    id: string;
    image: string | null;
    username: string;
  };
  id: string;
  userId: string;
  mindMapId?: string;
  taskId?: string;
}

export type WorkspaceRecentActivity = {
  id: string;
  title: string;
  emoji: string;
  type: AssignedItemType;
  updated: {
    at: Date;
    by?: UserInfo | null;
  };
  starred: boolean;
  tags: Tag[];
  assignedTo: WorkspaceRecentActivityAssignedToItem[];
  link: string;
}

export type AssignedToMeTaskAndMindMapsWorkspaceRecentActivity = {
  tasks: WorkspaceRecentActivity[];
  mindMaps: WorkspaceRecentActivity[];
}

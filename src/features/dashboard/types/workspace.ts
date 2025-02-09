import { Tag, Workspace } from "@prisma/client";
import { SubscriptionUser, UserInfo } from "./info";
import { AssignedItemType } from "./assigned-to";
import { ShortTask } from "./task";
import { ShortMindMap } from "./mind-map";

export type SettingsWorkspace = {
  subscribers: SubscriptionUser[];
} & Workspace;

export type ExtendedWorkspace = {
  conversation: {
    id: string;
  };
} & Workspace;

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

export interface WorkspaceShortcuts extends Workspace {
  tasks: ShortTask[];
  mindMaps: ShortMindMap[];
}
import { UserPermission, Workspace } from "@prisma/client";

export type SubscriptionUser = {
  userRole: UserPermission;
  user: {
    id: string;
    image?: string | null;
    username: string;
  };
};

export type SettingsWorkspace = {
  subscribers: SubscriptionUser[];
} & Workspace;

export type ExtendedWorkspace = {
  conversation: {
    id: string;
  };
} & Workspace;

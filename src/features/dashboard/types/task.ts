import { savedTask, Tag, Task, Workspace } from "@prisma/client";
import { UserInfo } from "./info";

export type ShortTask = {
  id: string;
  emoji: string;
  title: string;
};

export type ExtendedTask = {
  tags: Tag[];
  taskDate?: {
    id: string;
    from: Date | undefined;
    to: Date | undefined;
  };
  savedTask?: savedTask[];
  creator: UserInfo;
  updatedBy: UserInfo;
} & Task;

export type AssignedToTaskUser = {
  user: {
    id: string;
    image: string | null;
    username: string;
    assignedToTask: {
      userId: string;
    }[];
  };
};

export type UsersAssignedToTaskInfo = {
  subscribers: AssignedToTaskUser[];
} & Workspace;

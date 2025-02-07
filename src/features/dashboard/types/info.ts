import { UserPermission } from "@prisma/client";

export type UserInfo = {
  id: string;
  username: string;
  image?: string | null;
  name?: string | null;
  surname?: string | null;
}

export type UserActiveItemList = {
  id: string;
  username: string;
  image: string | null;
  userRole: UserPermission;
}

export type FilterUser = {
  id: string;
  username: string;
  image: string | null;
}

export type SubscriptionUser = {
  userRole: UserPermission;
  user: {
    id: string;
    image?: string | null;
    username: string;
  };
};
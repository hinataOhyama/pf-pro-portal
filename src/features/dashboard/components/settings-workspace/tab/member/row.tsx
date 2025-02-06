"use client";

import { UserAvatar } from "@/components/ui/user-avatar";
import { SubscriptionUser } from "@/features/dashboard/types/workspace";
import { UserPermission as UserPermissionType } from "@prisma/client";
import React from "react";
import { RowMoreOptions } from "./row-more-options";
import { RowUserPermission } from "./row-user-permisson";

type MembersRowProps = {
  userRole: UserPermissionType;
  user: {
    id: string;
    image?: string | null | undefined;
    username: string;
  };
  workspaceId: string;
  onSetworkspacesubscribersAction: React.Dispatch<
    React.SetStateAction<SubscriptionUser[]>
  >;
};

export const MembersRow = ({
  user,
  userRole,
  workspaceId,
  onSetworkspacesubscribersAction,
}: MembersRowProps) => {
  return (
    <li className="w-full grid grid-cols-3 items-center grid-rows-1 gap-4 p-4 border-b last:border-b-0 text-sm sm:text-base h-16">
      <div className="flex items-center gap-2">
        <UserAvatar
          profileImage={user.image}
          size={14}
          className="w-8 h-8 hidden sm:flex"
        />
        <p className="font-semibold">{user.username}</p>
      </div>
      <RowUserPermission
        workspaceId={workspaceId}
        user={user}
        userRole={userRole}
        onSetworkspacesubscribersAction={onSetworkspacesubscribersAction}
      />

      <RowMoreOptions
        workspaceId={workspaceId}
        userId={user.id}
        userRole={userRole}
        onSetworkspacesubscribersAction={onSetworkspacesubscribersAction}
      />
    </li>
  );
};

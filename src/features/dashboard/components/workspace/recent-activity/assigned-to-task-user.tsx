"use client";

import { UserAvatar } from "@/components/ui/user-avatar";
import { useTruncateText } from "@/hooks/use-truncate-text";
import { WorkspaceRecentActivityAssignedToItem } from "@/features/dashboard/types/workspace";

type AssignedToTaskUserProps = {
  userInfo: WorkspaceRecentActivityAssignedToItem;
}

export const AssignedToTaskUser = ({
  userInfo: {
    user: { image, username },
  },
}: AssignedToTaskUserProps) => {
  const name = useTruncateText(username, 25);

  return (
    <div className="w-fit flex gap-2 items-center px-2.25 py-0.5 h-fit text-xs rounded-lg border border-input bg-background">
      <UserAvatar className="w-4 h-4" size={10} profileImage={image} />
      <p className="text-secondary-foreground">{name}</p>
    </div>
  );
};

"use client";

import { Button } from "@/components/shadcn-ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/shadcn-ui/hover-card";
import { UserAvatar } from "@/components/ui/user-avatar";
import { cn } from "@/lib/shadcn-utils";
import { UserInfo } from "@/features/dashboard/types/info";

type HoverUserInfoProps = {
  user: UserInfo;
  className?: string;
};

export const HoverUserInfo = ({ user, className }: HoverUserInfoProps) => {
  return (
    <HoverCard openDelay={250} closeDelay={250}>
      <HoverCardTrigger asChild>
        <Button
          variant={"ghost"}
          size={"sm"}
          className={cn(
            `px-1.5 w-fit hover:bg-transparent text-secondary-foreground font-semibold h-fit`,
            className
          )}
        >
          {user?.username}
        </Button>
      </HoverCardTrigger>
      <HoverCardContent avoidCollisions={false} align="start" side="top">
        <div className="flex justify-center items-center gap-2">
          <UserAvatar
            profileImage={user?.image}
            className="w-10 h-10"
            size={12}
          />

          <div className="flex flex-col">
            <p> {user?.username}</p>

            {user?.name && user?.surname && (
              <p className="text-xs text-muted-foreground">
                {user.name} {user.username}
              </p>
            )}
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

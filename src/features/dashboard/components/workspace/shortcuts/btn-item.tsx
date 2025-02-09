"use client";

import { Button } from "@/components/shadcn-ui/button";
import { Loading } from "@/components/ui/loading";
import { UserPermission } from "@prisma/client";
import { LucideIcon } from "lucide-react";

type BtnItemProps = {
  title: string;
  Icon: LucideIcon;
  userRole: UserPermission | null;
  isLoading: boolean;
  onClickAction: () => void;
}

export const BtnItem = ({
  Icon,
  title,
  userRole,
  isLoading,
  onClickAction,
}: BtnItemProps) => {
  return (
    <Button
      disabled={isLoading}
      onClick={onClickAction}
      variant={"outline"}
      className={`text-sm md:text-base min-w-[10rem] sm:min-w-[13rem] h-14 p-2 rounded-lg shadow-sm flex justify-center items-center gap-1 md:gap-2 ${
        userRole !== "OWNER" ? "w-1/5" : "w-1/4"
      }`}
    >
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Icon size={16} />
          <h4 className="break-words">{title}</h4>
        </>
      )}
    </Button>
  );
};

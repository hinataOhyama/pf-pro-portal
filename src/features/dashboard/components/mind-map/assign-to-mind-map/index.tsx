import { Button } from "@/components/shadcn-ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/shadcn-ui/dropdown-menu";
import { Loading } from "@/components/ui/loading";
import { cn } from "@/lib/shadcn-utils";
import { UsersAssignedToMindMapInfo } from "@/features/dashboard/types/assigned-to";
import { useQuery } from "@tanstack/react-query";
import { User2 } from "lucide-react";
import { useRouter } from "@/lib/i18n";
import { CommandContainer } from "./command";
import { useTranslations } from "next-intl";

type AssignedToMindMapSelectorProps = {
  className?: string;
  plusIconSize?: number;
  dropdownSizeOffset?: number;
  workspaceId: string;
  mindMapId: string;
}

export const AssignedToMindMapSelector = ({
  className,
  dropdownSizeOffset,
  plusIconSize = 16,
  mindMapId,
  workspaceId,
}: AssignedToMindMapSelectorProps) => {
  const t = useTranslations("MIND_MAP.ASSIGNMENT");
  const { data: assignedUsersInfo, isLoading: isLoadingInfo } = useQuery({
    queryFn: async () => {
      const res = await fetch(
        `/api/assigned_to/mind_maps/get?workspaceId=${workspaceId}&mindMapId=${mindMapId}`
      );

      if (!res.ok) throw new Error();

      const data = await res.json();
      return data as UsersAssignedToMindMapInfo;
    },

    queryKey: ["getAssignedToMindMapInfo", mindMapId],
  });

  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className={cn(
            `w-fit h-fit text-xs justify-start text-left font-normal px-2.5 py-0.5`,
            className
          )}
          variant={"outline"}
          size={"sm"}
        >
          <User2 size={plusIconSize} className="mr-1" />
          <span>{t("TRIGGER")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        sideOffset={dropdownSizeOffset && dropdownSizeOffset}
      >
        {isLoadingInfo && (
          <div className="p-3 flex justify-center items-center">
            <Loading />
          </div>
        )}
        {!isLoadingInfo && assignedUsersInfo ? (
          <CommandContainer
            users={assignedUsersInfo.subscribers}
            mindMapId={mindMapId}
            workspaceId={workspaceId}
          />
        ) : (
          <div className="p-3 text-sm flex justify-center items-center flex-col gap-4">
            <p>{t("ERROR_MSG")}</p>
            <Button
              className="w-full"
              size={"sm"}
              variant={"default"}
              onClick={() => router.refresh()}
            >
              {t("ERROR_BTN")}
            </Button>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

"use client";

import { Button } from "@/components/shadcn-ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/shadcn-ui/dropdown-menu";
import { Plus } from "lucide-react";
import { CommandContainer } from "./command-container";
import { CustomColors, Tag } from "@prisma/client";
import { Loading } from "@/components/ui/loading";
import { useRouter } from "@/lib/i18n";
import { cn } from "@/lib/shadcn-utils";

type TagSelectorProps = {
  tags?: Tag[];
  currentActiveTags: Tag[];
  onSelectActiveTag: (id: string) => void;
  workspaceId: string;
  onUpdateActiveTags: (
    tagId: string,
    color: CustomColors,
    name: string
  ) => void;
  isLoading: boolean;
  onDeleteActiveTag: (tagId: string) => void;
  className?: string;
  plusIconSize?: number;
  dropDownSizeOffset?: number;
  isError: boolean;
}

export const TagSelector = ({
  tags,
  currentActiveTags,
  onSelectActiveTag,
  workspaceId,
  onUpdateActiveTags,
  isLoading,
  onDeleteActiveTag,
  className,
  plusIconSize = 16,
  dropDownSizeOffset,
  isError,
}: TagSelectorProps) => {
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
          <Plus size={plusIconSize} className="mr-1" />
          <span className="hidden sm:inline">New Tag</span>
          <span className="sm:hidden">Tag</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        sideOffset={dropDownSizeOffset && dropDownSizeOffset}
      >
        {isLoading && (
          <div className="p-3 flex justify-center items-center">
            <Loading />
          </div>
        )}
        {!isLoading && tags && (
          <CommandContainer
            tags={tags}
            currentActiveTags={currentActiveTags}
            onSelectActiveTag={onSelectActiveTag}
            workspaceId={workspaceId}
            onUpdateActiveTags={onUpdateActiveTags}
            onDeleteActiveTag={onDeleteActiveTag}
          />
        )}
        {isError && (
          <div className="p-3 text-sm flex justify-center items-center flex-col gap-4">
            <p>Oops, something went wrong</p>
            <Button
              onClick={() => router.refresh()}
              className="w-full"
              size={"sm"}
              variant={"default"}
            >
              Refresh
            </Button>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

"use client";

import { Button } from "@/components/shadcn-ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/shadcn-ui/dropdown-menu";
import { useMessage } from "@/store/chat/messages";
import { ExtendedMessage } from "@/features/dashboard/types/chat";
import { MoreHorizontal } from "lucide-react";
import { useTranslations } from "next-intl";

type OptionsProps = {
  onChangeEditAction: (editing: boolean) => void;
  message: ExtendedMessage;
}

export const Options = ({ onChangeEditAction, message }: OptionsProps) => {
  const { setMessageToDelete } = useMessage((state) => state);
  const t = useTranslations("CHAT.OPTIONS");
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} size={"icon"}>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => {
            onChangeEditAction(true);
          }}
          className="cursor-pointer"
        >
          {t("EDIT")}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setMessageToDelete(message);
            document.getElementById("trigger-delete")?.click();
          }}
          className="text-destructive focus:bg-destructive focus:text-white cursor-pointer"
        >
          {t("DELETE")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

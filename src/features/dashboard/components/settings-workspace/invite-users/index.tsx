import { Workspace } from "@prisma/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn-ui/dialog";
import { Button } from "@/components/shadcn-ui/button";
import { UserPlus2 } from "lucide-react";
import { InviteUsersContent } from "./content";
import { useTranslations } from "next-intl";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/shadcn-ui/hover-card";

type InviteUsersProps = {
  workspace: Workspace;
}

export const InviteUsers = ({ workspace }: InviteUsersProps) => {
  const t = useTranslations("INVITE");
  return (
    <Dialog>
      <HoverCard openDelay={250} closeDelay={250}>
        <HoverCardTrigger asChild>
          <DialogTrigger asChild>
            <Button
              size={"icon"}
              className="text-primary sm:bg-primary/10 sm:text-primary sm:font-semibold sm:hover:bg-primary sm:hover:text-white sm:h-9 sm:rounded-md sm:px-3 sm:w-auto sm:space-x-2"
              variant={"ghost"}
            >
              <span className="hidden sm:inline">{t("INVITE")}</span>
              <UserPlus2 size={18} />
            </Button>
          </DialogTrigger>
        </HoverCardTrigger>
        <HoverCardContent align="center">
          <span>{t("HINT")}</span>
        </HoverCardContent>
      </HoverCard>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <span>{t("TITLE")}</span> <span>{workspace.name}</span>
          </DialogTitle>
          <DialogDescription>{t("DESC")}</DialogDescription>
        </DialogHeader>
        <InviteUsersContent workspace={workspace} />
      </DialogContent>
    </Dialog>
  );
};

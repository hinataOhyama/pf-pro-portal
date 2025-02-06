import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
} from "@/components/shadcn-ui/command";
import { AssignedToTaskUser } from "@/features/dashboard/types/task";
import { CommandUser } from "./command-user";
import { useTranslations } from "next-intl";

type CommandContainerProps = {
  users: AssignedToTaskUser[];
  taskId: string;
  workspaceId: string;
  canEdit: boolean;
}

export const CommandContainer = ({
  users,
  taskId,
  workspaceId,
  canEdit,
}: CommandContainerProps) => {
  const t = useTranslations("TASK.ASSIGNMENT");
  return (
    <Command className="w-[15rem]">
      <CommandInput className="text-xs" placeholder={t("PLACEHOLDER")} />
      <CommandList>
        <CommandEmpty>{t("NOT_FOUND")}</CommandEmpty>
        <CommandGroup heading={t("HEADING")}>
          {users?.map((user) => (
            <CommandUser
              key={user.user.id}
              user={user}
              taskId={taskId}
              workspaceId={workspaceId}
              canEdit={canEdit}
            />
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
};

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
} from "@/components/shadcn-ui/command";
import { AssignedToMindMapUser } from "@/features/dashboard/types/assigned-to";
import { CommandUser } from "./command-user";
import { useTranslations } from "next-intl";

interface Props {
  users: AssignedToMindMapUser[];
  mindMapId: string;
  workspaceId: string;
}

export const CommandContainer = ({ users, mindMapId, workspaceId }: Props) => {
  const t = useTranslations("MIND_MAP.ASSIGNMENT");
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
              mindMapId={mindMapId}
              workspaceId={workspaceId}
            />
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
};

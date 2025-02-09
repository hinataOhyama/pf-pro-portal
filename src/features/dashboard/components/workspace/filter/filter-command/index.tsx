import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
  CommandSeparator,
} from "@/components/shadcn-ui/command";
import { CommandUserItem } from "./user";
import { CommandTagItem } from "./tag";
import { useFilterByUsersAndTagsInWorkspace } from "@/features/dashboard/context/filter-by-users-tags-in-workspace";
import { useTranslations } from "next-intl";

type CommandContainerProps = {
  sessionUserId: string;
}

export const CommandContainer = ({ sessionUserId }: CommandContainerProps) => {
  const { allUsers, filterAssignedUsers, allTags, filterTags } =
    useFilterByUsersAndTagsInWorkspace();

  const t = useTranslations("WORKSPACE_MAIN_PAGE.COMMAND");
  return (
    <Command className="w-[15rem]">
      <CommandInput placeholder={t("SEARCH")} />
      <CommandList>
        <CommandEmpty>{t("NO_RESULTS_FOUND")}</CommandEmpty>
        <CommandGroup heading={t("ASSIGNED_TO")}>
          {allUsers.map((user) => {
            const isActive = filterAssignedUsers.some(
              (activeUser) => activeUser.id === user.id
            );

            return (
              <CommandUserItem
                key={user.id}
                sessionUserId={sessionUserId}
                username={user.username}
                image={user.image}
                id={user.id}
                active={isActive}
              />
            );
          })}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading={t("TAG")}>
          {allTags &&
            allTags.map((tag) => {
              const isActive = filterTags.some(
                (activeTag) => activeTag.id === tag.id
              );

              return (
                <CommandTagItem key={tag.id} tag={tag} active={isActive} />
              );
            })}
        </CommandGroup>
      </CommandList>
    </Command>
  );
};

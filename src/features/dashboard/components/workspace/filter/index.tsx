"use client";

import { Clear } from "./clear";
import { Filter } from "./filter";

import { ActiveFilteredUser } from "./active-filtered/user";

import { ActiveFilteredTag } from "./active-filtered/tag";
import { useFilterByUsersAndTagsInWorkspace } from "@/features/dashboard/context/filter-by-users-tags-in-workspace";

interface Props {
  sessionUserId: string;
}

export const FilterContainer = ({ sessionUserId }: Props) => {
  const { filterAssignedUsers, filterTags } =
    useFilterByUsersAndTagsInWorkspace();

  return (
    <div className="flex w-full flex-wrap pb-4 gap-2">
      <Filter sessionUserId={sessionUserId} />
      {filterAssignedUsers.map((user) => (
        <ActiveFilteredUser
          key={user.id}
          id={user.id}
          image={user.image}
          username={user.username}
        />
      ))}
      {filterTags.map((tag) => (
        <ActiveFilteredTag tag={tag} key={tag.id} />
      ))}
      {(filterAssignedUsers.length > 0 || filterTags.length > 0) && <Clear />}
    </div>
  );
};

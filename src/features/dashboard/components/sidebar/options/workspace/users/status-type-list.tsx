import { UserActiveItemList } from "@/features/dashboard/types/info";
import { UserStatus } from "./status";

type UserStatusTypeListProps = {
  users: UserActiveItemList[];
  title: string;
  active?: boolean;
}

export const UserStatusTypeList = ({ users, title, active }: UserStatusTypeListProps) => {
  if (users.length === 0) return null;

  return (
    <div>
      <p className="text-xs sm:text-sm uppercase text-muted-foreground">
        {title} - {users.length}
      </p>
      <div className="flex flex-col gap-2 w-full mt-2">
        {users.map((user) => (
          <UserStatus
            key={user.id}
            image={user.image}
            username={user.username}
            active={active}
          />
        ))}
      </div>
    </div>
  );
};

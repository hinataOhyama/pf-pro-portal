import { getAuthSession } from "@/features/auth/lib";
import { SidebarContainer } from "./container";
import {
  getUserAdminWorkspaces,
  getWorkspaces,
} from "@/features/dashboard/api/workspace";

export const Sidebar = async () => {
  const session = await getAuthSession();
  if (!session) return null;

  const [userWorkspaces, userAdminWorkspaces] = await Promise.all([
    getWorkspaces(session.user.id),
    getUserAdminWorkspaces(session.user.id),
  ]);

  return (
    <SidebarContainer
      userWorkspaces={userWorkspaces ? userWorkspaces : []}
      userAdminWorkspaces={userAdminWorkspaces ? userAdminWorkspaces : []}
      userId={session.user.id}
    />
  );
};

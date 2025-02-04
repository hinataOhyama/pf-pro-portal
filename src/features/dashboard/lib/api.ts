import { Workspace } from "@prisma/client";

export const domain =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3000"
    : "http://localhost:3000";

export const getWorkspaces = async (userId: string): Promise<Workspace[]> => {
  const res = await fetch(
    `${domain}/api/workspace/get/user_workspaces?userId=${userId}`,
    {
      method: "GET",
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return [];
  }

  return res.json();
};

export const getUserAdminWorkspaces = async (
  userId: string
): Promise<Workspace[]> => {
  const res = await fetch(
    `${domain}/api/workspace/get/user_admin_workspaces?userId=${userId}`,
    {
      method: "GET",
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return [];
  }

  return res.json();
};

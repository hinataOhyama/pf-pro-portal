import { Workspace } from "@prisma/client";
import { notFound } from "next/navigation";
import { SettingsWorkspace } from "../types";
import { domain } from "@/constants/domain";

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


export const getWorkspaceSettings = async (
  workspace_id: string,
  userId: string
) => {
  const res = await fetch(
    `${domain}/api/workspace/get/settings/${workspace_id}?userId=${userId}`,
    {
      method: "GET",
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return notFound();
  }

  return res.json() as Promise<SettingsWorkspace>;
};

import { UserPermission, Workspace } from "@prisma/client";
import { notFound } from "next/navigation";
import { ExtendedWorkspace, SettingsWorkspace } from "../types/workspace";
import { domain } from "@/constants/domain";

export const getWorkspace = async (workspaceId: string, userId: string) => {
  const res = await fetch(
    `${domain}/api/workspace/get/workspace_details/${workspaceId}?userId=${userId}`,
    {
      method: "GET",
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return notFound();
  }

  return res.json() as Promise<Workspace>;
};

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
  workspaceId: string,
  userId: string
) => {
  const res = await fetch(
    `${domain}/api/workspace/get/settings/${workspaceId}?userId=${userId}`,
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

export const getUserWorkspaceRole = async (
  workspaceId: string,
  userId: string
) => {
  const res = await fetch(
    `${domain}/api/workspace/get/user_role?workspaceId=${workspaceId}&userId=${userId}`,
    {
      method: "GET",
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return null;
  }

  return res.json() as Promise<UserPermission>;
};

export const getWorkspaceWithChatId = async (
  workspaceId: string,
  userId: string
) => {
  const res = await fetch(
    `${domain}/api/workspace/get/workspace_with_chat/${workspaceId}?userId=${userId}`,
    {
      method: "GET",
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return notFound();
  }

  return res.json() as Promise<ExtendedWorkspace>;
};
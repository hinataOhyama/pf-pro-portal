import { domain } from "@/constants/domain";
import { notFound } from "next/navigation";
import { ExtendedTask } from "../types/task";

export const getTask = async (task_id: string, userId: string) => {
  const res = await fetch(
    `${domain}/api/task/get/details/${task_id}?userId=${userId}`,
    {
      method: "GET",
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return notFound();
  }

  return res.json() as Promise<ExtendedTask>;
};
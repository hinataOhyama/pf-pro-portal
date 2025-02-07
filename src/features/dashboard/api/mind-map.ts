import { domain } from "@/constants/domain";
import { notFound } from "next/navigation";
import { ExtendedMindMap } from "../types/mind-map";

export const getMindMap = async (mind_map_id: string, userId: string) => {
  const res = await fetch(
    `${domain}/api/mind_maps/get/details/${mind_map_id}?userId=${userId}`,
    {
      method: "GET",
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return notFound();
  }

  return res.json() as Promise<ExtendedMindMap>;
};
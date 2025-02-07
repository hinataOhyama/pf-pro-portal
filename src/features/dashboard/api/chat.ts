import { domain } from "@/constants/domain";
import { notFound } from "next/navigation";
import { ExtendedMessage } from "../types/chat";

export const getInitialMessages = async (userId: string, chatId: string) => {
  const res = await fetch(
    `${domain}/api/conversation/get/initial_messages?userId=${userId}&chatId=${chatId}`,
    {
      method: "GET",
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return notFound();
  }

  return res.json() as Promise<ExtendedMessage[]>;
};
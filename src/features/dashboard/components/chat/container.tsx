"use client";
import { ExtendedMessage } from "@/features/dashboard/types/chat";
import { Header } from "./header";
import { MessagesContainer } from "./messages";
import { NewMessageContainer } from "./new-message";
import { useEffect, useRef } from "react";
import { MESSAGES_LIMIT } from "@/constants/chat";
import { useMessage } from "@/store/chat/messages";

interface Props {
  chatId: string;
  initialMessages: ExtendedMessage[];
  sessionUserId: string;
  workspaceName: string;
}

export const ChatContainer = ({
  chatId,
  initialMessages,
  sessionUserId,
  workspaceName,
}: Props) => {
  const initState = useRef(false);

  const hasMore = initialMessages.length >= MESSAGES_LIMIT;

  useEffect(() => {
    if (!initState.current) {
      useMessage.setState({
        messages: initialMessages.reverse(),
        hasMore,
        initialMessagesLoading: false,
      });
    }
    initState.current = true;
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-between border border-border rounded-md shadow-sm relative">
      <Header workspaceName={workspaceName} />
      <MessagesContainer chatId={chatId} sessionUserId={sessionUserId} />
      <NewMessageContainer chatId={chatId} />
    </div>
  );
};

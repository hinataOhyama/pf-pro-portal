"use client";

import { Loading } from "@/components/ui/loading";
import { useMessage } from "@/store/chat/messages";
import React, { useEffect, useRef, useState } from "react";
import { Message } from "./message";
import { DeleteMessage } from "./delete";
import { supabase } from "@/lib/supabase";
import {
  RealtimePostgresDeletePayload,
  RealtimePostgresInsertPayload,
  RealtimePostgresUpdatePayload,
} from "@supabase/supabase-js";
import axios from "axios";
import { ExtendedMessage } from "@/features/dashboard/types/chat";
import { domain } from "@/constants/domain";
import { ScrollDown } from "./scroll-down";
import { LoadMoreMessages } from "./load-more-messages";
import { MessageSquare } from "lucide-react";
import { useTranslations } from "next-intl";

type MessagesContainerProps = {
  chatId: string;
  sessionUserId: string;
}

export const MessagesContainer = ({
  chatId,
  sessionUserId,
}: MessagesContainerProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const [userScrolled, setUserScrolled] = useState(false);

  const {
    messages,
    initialMessagesLoading,
    addMessage,
    editMessage,
    deleteMessage,
    hasMore,
  } = useMessage((state) => state);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer && !userScrolled) {
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }, [messages, userScrolled]);

  const [notifications, setNotifications] = useState(0);

  useEffect(() => {
    const supabaseClient = supabase();

    const handleAddMessage = async (
      payload: RealtimePostgresInsertPayload<{
        [key: string]: any;
      }>
    ) => {
      if (sessionUserId !== payload.new.senderId) {
        try {
          const { data } = await axios.get<ExtendedMessage>(
            `${domain}/api/conversation/get/new_message?messageId=${payload.new.id}`
          );
          console.log(data);

          if (data) addMessage(data);

          const scrollContainer = scrollRef.current;
          if (scrollContainer && scrollContainer.scrollTop < scrollContainer.scrollHeight - scrollContainer.clientHeight - 10) {
            setNotifications((current) => current + 1);
          }
        } catch (err) {
          console.log(err);
        }
      }
    };

    const handleUpdateMessage = (
      payload: RealtimePostgresUpdatePayload<{
        [key: string]: any;
      }>
    ) => {
      if (sessionUserId !== payload.new.senderId) {
        editMessage(payload.new.id, payload.new.content);
      }
    };

    const handleDeleteMessage = (
      payload: RealtimePostgresDeletePayload<{
        [key: string]: any;
      }>
    ) => {
      const messageExists = messages.find(
        (message) => message.id === payload.old.id
      );

      if (messageExists) deleteMessage(payload.old.id);
    };

    const channel = supabaseClient
      .channel(`chat-${chatId}`)
      .on(
        `postgres_changes`,
        { event: "INSERT", schema: "public", table: "Message" },
        handleAddMessage
      )
      .on(
        `postgres_changes`,
        { event: "UPDATE", schema: "public", table: "Message" },
        handleUpdateMessage
      )
      .on(
        `postgres_changes`,
        { event: "DELETE", schema: "public", table: "Message" },
        handleDeleteMessage
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [chatId, messages, sessionUserId]);

  const handleOnScroll = () => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      const isScroll =
        scrollContainer.scrollTop <
        scrollContainer.scrollHeight - scrollContainer.clientHeight - 10;
      setUserScrolled(isScroll);
      if (
        scrollContainer.scrollTop ===
        scrollContainer.scrollHeight - scrollContainer.clientHeight
      ) {
        setNotifications(0);
      }
    }
  };

  const scrollDown = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
    setNotifications(0);
  };

  const t = useTranslations("CHAT.NO_MESSAGES");

  if (initialMessagesLoading) {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="flex flex-col gap-2 sm:text-lg font-semibold items-center p-2 justify-center">
        <MessageSquare className="w-16 h-16 sm:w-28 sm:h-28" />
        <div className="text-center">
          <p>{t("FIRST")}</p>
          <p>{t("SECOND")}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={scrollRef}
      onScroll={handleOnScroll}
      className="h-full flex flex-col gap-2 px-4 py-2 overflow-y-auto scrollbar-thin scrollbar-thumb-secondary scrollbar-track-background"
    >
      {hasMore && (
        <LoadMoreMessages chatId={chatId} sessionUserId={sessionUserId} />
      )}
      {messages.map((message) => (
        <Message
          key={message.id}
          message={message}
          sessionUserId={sessionUserId}
        />
      ))}
      <DeleteMessage />
      {userScrolled && (
        <ScrollDown notifications={notifications} onScrollDown={scrollDown} />
      )}
    </div>
  );
};

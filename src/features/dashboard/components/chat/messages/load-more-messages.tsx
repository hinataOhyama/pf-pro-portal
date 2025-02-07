"use client";

import { Button } from "@/components/shadcn-ui/button";
import { Loading } from "@/components/ui/loading";
import { useToast } from "@/hooks/use-toast";
import { domain } from "@/constants/domain";
import { useMessage } from "@/store/chat/messages";
import { ExtendedMessage } from "@/features/dashboard/types/chat";
import axios from "axios";
import { useTranslations } from "next-intl";
import { useState } from "react";

interface Props {
  chatId: string;
  sessionUserId: string;
}

export const LoadMoreMessages = ({ chatId, sessionUserId }: Props) => {
  const m = useTranslations("MESSAGES");
  const [isLoading, setIsLoading] = useState(false);
  const t = useTranslations("CHAT");

  const { toast } = useToast();

  const { nextPage, amountOfNewMessages, setMessages } = useMessage(
    (state) => state
  );

  const getMoreMessages = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get<ExtendedMessage[]>(
        `${domain}/api/conversation/get/initial_messages?userId=${sessionUserId}&chatId=${chatId}&page=${nextPage}&amountOfNewMessages=${amountOfNewMessages}`
      );

      if (data) setMessages(data.reverse());
    } catch {
      toast({
        title: m("CANT_LOAD_MORE"),
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="w-full flex justify-center my-2">
      <Button
        className="flex justify-center items-center"
        onClick={() => {
          getMoreMessages();
        }}
        disabled={isLoading}
        size={"sm"}
        variant={"ghost"}
      >
        {isLoading ? <Loading /> : t("LOAD_MORE")}
      </Button>
    </div>
  );
};

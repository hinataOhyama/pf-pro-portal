"use client";

import { EmojiSelector } from "@/components/common/emoji-selector";
import { Button } from "@/components/shadcn-ui/button";
import { useToast } from "@/hooks/use-toast";
import { useOnKeyDown } from "@/features/dashboard/hooks/use-on-key-down";
import { EditMessageSchema } from "@/features/dashboard/schema/message";
import { useMessage } from "@/store/chat/messages";
import { ExtendedMessage } from "@/features/dashboard/types/chat";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { Smile } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

type EditMessageProps = {
  messageInfo: ExtendedMessage;
  content: string;
  onChangeEditAction: (editing: boolean) => void;
}

export const EditMessage = ({ content, messageInfo, onChangeEditAction }: EditMessageProps) => {
  const [message, setMessage] = useState(content);

  const m = useTranslations("MESSAGES");
  const { toast } = useToast();

  const onSelectEmojiHandler = (emojiCode: string) => {
    const emoji = String.fromCodePoint(parseInt(emojiCode, 16));
    setMessage((prevMessage) => prevMessage + emoji);
  };

  const { editMessage: updateClientMessages, setMessageToDelete } = useMessage(
    (state) => state
  );

  const { mutate: editMessage } = useMutation({
    mutationFn: async () => {
      const editedMessage: EditMessageSchema = {
        id: messageInfo.id,
        content: message,
      };
      await axios.post(`/api/conversation/update`, editedMessage);
    },
    onError: (err: AxiosError) => {
      const error = err?.response?.data ? err.response.data : "ERRORS.DEFAULT";

      updateClientMessages(messageInfo.id, content);
      toast({ title: m(error), variant: "destructive" });
    },
    onMutate: () => {
      updateClientMessages(messageInfo.id, message);
      onChangeEditAction(false);
    },
    mutationKey: ["editMessage", messageInfo.id],
  });

  const textAreaRef = useRef<HTMLTextAreaElement>(null!);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.focus();
      textAreaRef.current.selectionStart = textAreaRef.current.selectionEnd =
        message.trim().length;
    }
  }, []);

  useOnKeyDown(textAreaRef, (event) => {
    if (textAreaRef.current && event.key === "Enter") {
      if (!event.shiftKey) {
        if (message.trim().length > 0) {
          if (message.trim() !== content.trim()) {
            editMessage();
          } else {
            onChangeEditAction(false);
          }
        } else {
          event.preventDefault();
          setMessageToDelete(messageInfo);
          onChangeEditAction(false);
          document.getElementById("trigger-delete")?.click();
        }
      }
    }

    if (textAreaRef.current && event.key === "Escape") {
      onChangeEditAction(false);
    }
  });

  const t = useTranslations("CHAT.EDIT.TEXT");

  return (
    <div className="mt-2 flex flex-col gap-1">
      <div className="flex justify-between items-center gap-2 px-2 py-1 w-full bg-popover rounded-md shadow-sm border border-border">
        <TextareaAutosize
          ref={textAreaRef}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          className="w-full flex-grow resize-none appearance-none overflow-hidden bg-transparent  placeholder:text-muted-foreground focus:outline-none max-h-28 overflow-y-auto scrollbar-thin scrollbar-thumb-secondary scrollbar-track-background  "
        />
        <div className="hidden sm:block">
          <EmojiSelector
            id="edit-message-emoji-selector"
            asChild
            slide="right"
            align="end"
            onSelectedEmojiAction={onSelectEmojiHandler}
          >
            <Button
              className="w-8 h-8 sm:w-10 sm:h-10"
              size={"icon"}
              variant={"ghost"}
            >
              <Smile className="w-5 h-5 sm:w-auto sm:h-auto" />
            </Button>
          </EmojiSelector>
        </div>
      </div>

      <div className="text-xs text-muted-foreground">
        <p>
          {t("FIRST")}{" "}
          <span
            onClick={() => {
              onChangeEditAction(false);
            }}
            className="text-primary font-semibold border-transparent inline-block hover:border-primary transition-colors border-b cursor-pointer"
          >
            esc
          </span>
          {t("SECOND")}{" "}
          <span
            onClick={() => {
              if (message.trim().length > 0) editMessage();
              else {
                setMessageToDelete(messageInfo);
                onChangeEditAction(false);
                document.getElementById("trigger-delete")?.click();
              }
            }}
            className="text-primary font-semibold border-transparent inline-block hover:border-primary transition-colors border-b cursor-pointer"
          >
            enter
          </span>{" "}
          {t("THIRD")}
        </p>
      </div>
    </div>
  );
};

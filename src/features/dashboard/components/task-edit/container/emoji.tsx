"use client";

import { EmojiSelector } from "@/components/common/emoji-selector";
import { useAutosaveIndicator } from "@/features/dashboard/context/auto-save-indicator";
import { useChangeCodeToEmoji } from "@/hooks/use-change-code-to-emoji";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

type EmojiProps = {
  onFormSelectAction: (emoji: string) => void;
  emoji: string;
  taskId: string;
  workspaceId: string;
}

export const Emoji = ({ onFormSelectAction, emoji, taskId, workspaceId }: EmojiProps) => {
  const [selectedEmoji, setSelectedEmoji] = useState(emoji);
  const { status, onSetStatus } = useAutosaveIndicator();
  const renderedEmoji = useChangeCodeToEmoji(selectedEmoji);

  const { mutate: updateTaskEmoji } = useMutation({
    mutationFn: async () => {
      await axios.post("/api/task/update/emoji", {
        workspaceId,
        selectedEmoji,
        taskId,
      });
    },
    onSuccess: () => {
      onSetStatus("saved");
    },
    onError: () => {
      onSetStatus("unsaved");
    },
  });

  const selectEmojiHandler = (emoji: string) => {
    if (status !== "unsaved") onSetStatus("unsaved");
    setSelectedEmoji(emoji);
    onFormSelectAction(emoji);
    debounced();
  };

  const debounced = useDebouncedCallback(() => {
    onSetStatus("pending");
    updateTaskEmoji();
  }, 2000);

  return (
    <EmojiSelector onSelectedEmojiAction={selectEmojiHandler}>
      <span
        role="img"
        aria-label="emoji"
        className="w-16 h-16 rounded-lg bg-secondary flex justify-center items-center text-3xl"
      >
        {renderedEmoji}
      </span>
    </EmojiSelector>
  );
};

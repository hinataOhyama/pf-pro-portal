"use client";

import { EmojiSelector } from "@/components/common/emoji-selector";
import { useChangeCodeToEmoji } from "@/hooks/use-change-code-to-emoji";
import { useState } from "react";

type ChangeEmojiProps = {
  emoji: string;
  onFormSelectAction: (emoji: string) => void;
}

export const ChangeEmoji = ({ emoji, onFormSelectAction }: ChangeEmojiProps) => {
  const [selectedEmoji, setSelectedEmoji] = useState(emoji);
  const renderedEmoji = useChangeCodeToEmoji(selectedEmoji);

  const selectEmojiHandler = (emoji: string) => {
    setSelectedEmoji(emoji);
    onFormSelectAction(emoji);
  };

  return (
    <EmojiSelector onSelectedEmojiAction={selectEmojiHandler}>
      <span className="w-16 h-16 rounded-lg bg-secondary flex justify-center items-center text-3xl">
        {renderedEmoji}
      </span>
    </EmojiSelector>
  );
};

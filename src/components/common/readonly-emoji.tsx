import { changeCodeToEmoji } from "@/lib/change-code-to-emoji";
import { cn } from "@/lib/shadcn-utils";

type ReadonlyEmojiProps = {
  selectedEmoji?: string;
  className?: string;
};

export const ReadonlyEmoji = ({
  selectedEmoji,
  className,
}: ReadonlyEmojiProps) => {
  return (
    <div
      className={cn(
        `w-16 h-16 rounded-lg bg-secondary flex justify-center items-center text-3xl px-3`,
        className
      )}
    >
      {changeCodeToEmoji(selectedEmoji ? selectedEmoji : "1f9e0")}
    </div>
  );
};

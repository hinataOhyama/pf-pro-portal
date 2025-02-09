import { cn } from "@/lib/shadcn-utils";

type VideoContainerProps = {
  className?: string;
}

export const VideoContainer = ({ className }: VideoContainerProps) => {
  return (
    <div
      className={cn(
        `w-full h-full bg-secondary rounded-3xl border border-border`,
        className
      )}
    ></div>
  );
};

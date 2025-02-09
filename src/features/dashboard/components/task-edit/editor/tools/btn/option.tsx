import { Button } from "@/components/shadcn-ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/shadcn-ui/hover-card";
import { cn } from "@/lib/shadcn-utils";
import { forwardRef } from "react";

export type OptionBtnProps = {
  hoverText: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const OptionBtn = forwardRef<HTMLButtonElement, OptionBtnProps>(
  (
    { onClick, children, className, hoverText, ...props }: OptionBtnProps,
    ref
  ) => {
    return (
      <HoverCard openDelay={250} closeDelay={250}>
        <HoverCardTrigger asChild>
          <Button
            ref={ref}
            className={cn(
              "w-7 h-7 flex justify-center items-center rounded-sm text-muted-foreground",
              className
            )}
            type="button"
            size={"icon"}
            variant={"ghost"}
            onClick={onClick}
            {...props}
          >
            {children}
          </Button>
        </HoverCardTrigger>
        <HoverCardContent className="text-sm" align="start" side="top">
          {hoverText}
        </HoverCardContent>
      </HoverCard>
    );
  }
);

OptionBtn.displayName = "OptionButton";

export { OptionBtn };

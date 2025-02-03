import { cn } from "@/lib/shadcn-utils";
import { SvgProps } from "@/types/svg-props";
import { Loader2 } from "lucide-react";

type LoadingProps =  {
  text?: string;
  hideIcon?: boolean;
} & SvgProps;

export const Loading = ({
  text,
  hideIcon = false,
  className,
  ...props
}: LoadingProps) => {
  return (
    <>
      {!hideIcon && (
        <Loader2
          className={cn(`mr-2 h-4 2-4 animate-spin`, className)}
          {...props}
        />
      )}
      {text && <p>{text}</p>}
    </>
  );
};
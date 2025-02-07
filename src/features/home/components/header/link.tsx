import { Button } from "@/components/shadcn-ui/button";
import { scrollToHash } from "@/features/home/lib/scroll-to-hash";
import { LucideIcon } from "lucide-react";

interface Props {
  Icon: LucideIcon;
  title: string;
  href: string;
}

export const HeaderLink = ({ Icon, href, title }: Props) => {
  return (
    <Button
      onClick={() => {
        scrollToHash(href);
      }}
      className="text-secondary-foreground p-4 h-24 w-40 rounded-md gap-4 hover:bg-accent/50 flex flex-col justify-center items-center bg-transparent transition-colors duration-200"
    >
      <Icon />
      <p>{title}</p>
    </Button>
  );
};

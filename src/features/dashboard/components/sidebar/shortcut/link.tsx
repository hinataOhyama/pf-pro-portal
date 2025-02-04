"use client";

import { ActiveLink } from "@/components/ui/active-link";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/shadcn-ui/hover-card";
import { LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";

type SidebarLinkProps = {
  href: string;
  Icon: LucideIcon;
  hoverTextKey: string;
  include?: string;
}

export const SidebarLink = ({ hoverTextKey, href, Icon, include }: SidebarLinkProps) => {
  const t = useTranslations("SIDEBAR.MAIN");

  return (
    <HoverCard openDelay={250} closeDelay={250}>
      <HoverCardTrigger asChild>
        <ActiveLink
          include={include}
          variant={"ghost"}
          size={"icon"}
          href={href}
        >
          <Icon />
        </ActiveLink>
      </HoverCardTrigger>
      <HoverCardContent align="start">
        <span>{t(hoverTextKey)}</span>
      </HoverCardContent>
    </HoverCard>
  );
};

"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/shadcn-ui/dropdown-menu";
import { Button } from "@/components/shadcn-ui/button";
import { Loading } from "@/components/ui/loading";
import { useLocale, useTranslations } from "next-intl";
import { HoverCard, HoverCardContent } from "@/components/shadcn-ui/hover-card";
import { useChangeLocale } from "@/hooks/use-change-locale";

type LocaleSwitcherProps = {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null;
  size?: "default" | "sm" | "lg" | "icon" | null;
  alignHover?: "center" | "start" | "end";
  alignDropdown?: "center" | "start" | "end";
  textSize?: "text-lg" | "text-base";
};

export const LocaleSwitcher = ({
  size = "default",
  variant = "default",
  alignHover = "center",
  alignDropdown = "center",
  textSize = "text-base",
}: LocaleSwitcherProps) => {
  const locale = useLocale();

  const t = useTranslations("COMMON");

  const { loading, onSelectChange } = useChangeLocale();

  return (
    <HoverCard openDelay={250} closeDelay={250}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            disabled={loading}
            variant={variant}
            size={size}
            className={textSize}
          >
            {loading ? <Loading className="mr-0" /> : locale.toUpperCase()}
            <span className="sr-only">{t("LANG_HOVER")}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align={alignDropdown}>
          <DropdownMenuItem
            onClick={() => {
              onSelectChange("ja");
            }}
            className="cursor-pointer"
          >
            TE
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              onSelectChange("en");
            }}
            className="cursor-pointer"
          >
            EN
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <HoverCardContent align={alignHover}>
        <span>{t("LANG_HOVER")}</span>
      </HoverCardContent>
    </HoverCard>
  );
};

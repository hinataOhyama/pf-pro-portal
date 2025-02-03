"use client";

import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/shadcn-ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/shadcn-ui/dropdown-menu";
import { useTheme } from "next-themes";
import { HoverCard, HoverCardContent } from "@/components/shadcn-ui/hover-card";
import { useTranslations } from "next-intl";

type ThemeSwitcherProps = {
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
};

export const ThemeSwitcher = ({
  variant = "default",
  size = "default",
  alignHover = "center",
  alignDropdown = "center",
}: ThemeSwitcherProps) => {
  const { setTheme } = useTheme();
  const t = useTranslations("COMMON");

  return (
    <HoverCard openDelay={250} closeDelay={250}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={variant} size={size}>
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:-rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle Theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align={alignDropdown}>
          <DropdownMenuItem onClick={() => setTheme("light")}>
            Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <HoverCardContent align={alignHover}>
        <span>{t("THEME_HOVER")}</span>
      </HoverCardContent>
    </HoverCard>
  );
};

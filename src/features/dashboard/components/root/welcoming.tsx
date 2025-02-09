"use client";
import React from "react";
import { usePathname } from "@/lib/i18n";
import { cn } from "@/lib/shadcn-utils";
import { useFormatter, useTranslations } from "next-intl";

type WelcomingProps = {
  hideOnMobile?: boolean;
  hideOnDesktop?: boolean;
  showOnlyOnPath?: string;
  username: string;
  name?: string | null;
  surname?: string | null;
} & React.HTMLAttributes<HTMLDivElement>

export const Welcoming = React.forwardRef<HTMLDivElement, WelcomingProps>(
  (
    {
      className,
      hideOnMobile,
      hideOnDesktop,
      showOnlyOnPath,
      username,
      surname,
      name,
      ...props
    },
    ref
  ) => {
    const pathname = usePathname();

    const format = useFormatter();

    const dateTime = new Date();
    const t = useTranslations("COMMON");

    const day = format.dateTime(dateTime, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    if (showOnlyOnPath && pathname !== showOnlyOnPath) return null;
    else {
      return (
        <div
          ref={ref}
          className={cn(
            `space-y-1 ${hideOnDesktop ? "lg:hidden" : ""} ${
              hideOnMobile ? "hidden lg:block" : ""
            }`,
            className
          )}
          {...props}
        >
          <p className="font-bold sm:text-3xl text-2xl">
            {t("WELCOME_BACK")},{" "}
            <span>
              {name
                ? name && surname
                  ? `${name} ${surname}`
                  : name
                : username}
            </span>{" "}
            👋
          </p>
          <p className="text-muted-foreground max-w-sm sm:max-w-xl">
            {day[0].toUpperCase() + day.slice(1)}
          </p>
        </div>
      );
    }
  }
);

Welcoming.displayName = "Welcoming";

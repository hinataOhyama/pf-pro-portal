"use client";
import React from "react";
import { Link } from "@/lib/i18n";
import { usePathname } from "@/lib/i18n";
import { cn } from "@/lib/shadcn-utils";
import { buttonVariants } from "@/components/shadcn-ui/button";

type ActiveLinkProps = {
  href: string;
  className?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null;
  size?: "default" | "sm" | "lg" | "icon" | null;
  children?: React.ReactNode;
  include?: string;
  workspaceIcon?: boolean;
  disableActiveStateColor?: boolean;
}

export const ActiveLink = React.forwardRef<HTMLAnchorElement, ActiveLinkProps>(
  (
    {
      href,
      className,
      variant = "default",
      size = "default",
      children,
      include,
      workspaceIcon,
      disableActiveStateColor = false,
      ...props
    }: ActiveLinkProps,
    ref
  ) => {
    const pathname = usePathname();
    return (
      <Link
        href={href}
        className={cn(
          `${buttonVariants({ variant, size })} ${
            href === pathname || (include && pathname.includes(include))
              ? workspaceIcon
                ? "font-semibold border-secondary-foreground border-2"
                : disableActiveStateColor
                ? ""
                : "bg-secondary font-semibold"
              : ""
          }`,
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </Link>
    );
  }
);

ActiveLink.displayName = "ActiveLink";

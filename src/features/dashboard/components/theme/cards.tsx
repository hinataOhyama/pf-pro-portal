"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn-ui/card";
import { Loading } from "@/components/ui/loading";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { ThemeCard } from "./card";

export const ThemeCards = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div>
        <Loading className="w-12 h-12" />
      </div>
    );
  }
  return (
    <Card className="bg-background border-none shadow-none">
      <CardHeader>
        <CardTitle>Theme</CardTitle>
        <CardDescription className="text-base">
          Select how you would like your interface to look. Select theme from
          dark, light or system.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap justify-center gap-6">
        <ThemeCard onThemeAction={setTheme} theme="light" activeTheme={theme} />
        <ThemeCard onThemeAction={setTheme} theme="dark" activeTheme={theme} />
        <ThemeCard onThemeAction={setTheme} theme="system" activeTheme={theme} />
      </CardContent>
    </Card>
  );
};

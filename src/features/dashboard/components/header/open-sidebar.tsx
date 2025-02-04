"use client";

import { useToggleSidebar } from "@/features/dashboard/context/toggle-sidebar";
import { Button } from "@/components/shadcn-ui/button";
import { PanelLeftOpen } from "lucide-react";

export const OpenSidebar = () => {
  const { setIsOpen } = useToggleSidebar();

  return (
    <Button
      onClick={() => {
        setIsOpen(true);
      }}
      className="text-muted-foreground lg:hidden"
      variant={"ghost"}
      size={"icon"}
    >
      <PanelLeftOpen />
    </Button>
  );
};

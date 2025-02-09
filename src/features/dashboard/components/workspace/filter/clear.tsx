"use client";

import { Button } from "@/components/shadcn-ui/button";
import { useFilterByUsersAndTagsInWorkspace } from "@/features/dashboard/context/filter-by-users-tags-in-workspace";
import { Eraser } from "lucide-react";
import { useTranslations } from "next-intl";

export const Clear = () => {
  const { onClearAll } = useFilterByUsersAndTagsInWorkspace();
  const t = useTranslations("WORKSPACE_MAIN_PAGE.FILTER");
  return (
    <Button
      size={"sm"}
      variant={"secondary"}
      className="flex gap-2 items-center rounded-lg"
      onClick={onClearAll}
    >
      <Eraser size={16} /> {t("CLEAR_BTN")}
    </Button>
  );
};

"use client";

import { useAutosaveIndicator } from "@/features/dashboard/context/auto-save-indicator";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/shadcn-ui/hover-card";
import { FileWarning, Save } from "lucide-react";
import { Loading } from "@/components/ui/loading";
import { cn } from "@/lib/shadcn-utils";
import { useTranslations } from "next-intl";

export const SavingStatus = () => {
  const { status } = useAutosaveIndicator();
  const t = useTranslations("COMMON.SAVING_STATUS");

  return (
    <HoverCard openDelay={250} closeDelay={250}>
      <HoverCardTrigger asChild>
        <div
          className={cn(
            `px-3 h-9 py-1.5 flex justify-center items-center rounded-md font-semibold gap-2 text-sm bg-primary text-white ${
              status === "pending" ? "bg-yellow-400" : ""
            } ${status === "unsaved" ? "bg-red-500" : ""}`
          )}
        >
          {status === "saved" && (
            <>
              <Save size={18} />
              <p className="hidden sm:inline-block">{t("SAVED")}</p>
            </>
          )}
          {status === "pending" && (
            <>
              <Loading />
              <p className="hidden sm:inline-block">{t("SAVING")}</p>
            </>
          )}
          {status === "unsaved" && (
            <>
              <FileWarning size={18} />
              <p className="hidden sm:inline-block">{t("UNSAVED")}</p>
            </>
          )}
        </div>
      </HoverCardTrigger>
      <HoverCardContent align="start">
        We save your files automatically
      </HoverCardContent>
    </HoverCard>
  );
};

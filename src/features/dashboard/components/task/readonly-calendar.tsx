"use client";

import { Badge } from "@/components/shadcn-ui/badge";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useMemo } from "react";

type ReadonlyCalendarProps = {
  from?: Date;
  to?: Date;
};

export const ReadonlyCalendar = ({ from, to }: ReadonlyCalendarProps) => {
  const lang = useLocale();
  const t = useTranslations("TASK.EDITOR.READ_ONLY");

  const currentLocale = useMemo(() => {
    if (lang === "ja") return ja;
  }, [lang]);
  return (
    <Badge
      className="px-2.5 py-0.5 h-fit text-xs bg-background"
      variant={"outline"}
    >
      <CalendarIcon size={16} className="mr-2 w-3 h-3" />
      {from ? (
        to ? (
          <>
            {format(new Date(from), "dd LLL y", {
              locale: currentLocale,
            })}{" "}
            -{" "}
            {format(new Date(to), "dd LLL y", {
              locale: currentLocale,
            })}
          </>
        ) : (
          format(new Date(from), "dd LLL y", {
            locale: currentLocale,
          })
        )
      ) : (
        <span>{t("NO_DATE")}</span>
      )}
    </Badge>
  );
};

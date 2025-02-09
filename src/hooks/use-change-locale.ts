"use client";

import { usePathname, useRouter } from "@/lib/i18n";
import { useState, useTransition } from "react";

export const useChangeLocale = () => {
  const [loading, setLoading] = useState(false);
  const [pending, startTransition] = useTransition();

  const router = useRouter();
  const pathname = usePathname();

  const onSelectChange = (nextLocale: "ja" | "en") => {
    setLoading(true);
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
      setLoading(false);
    });
  };

  return { loading, pending, onSelectChange };
};

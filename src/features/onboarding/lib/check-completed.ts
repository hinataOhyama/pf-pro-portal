"use server";

import { redirect } from "@/lib/i18n";
import { getAuthSession } from "@/features/auth/lib";

export const checkCompletedOnboarding = async (currentPath: string) => {
  const session = await getAuthSession();

  if (!session) {
    redirect({ href: "/", locale: "en" });
    return;
  }
  if (session.user.completedOnboarding && currentPath === "/onboarding")
    redirect({ href: "/dashboard", locale: "en" });
  if (!session.user.completedOnboarding && currentPath !== "/onboarding") {
    redirect({
      href: "/onboarding?error=not-completed-onboarding",
      locale: "en",
    });
  }

  return session;
};

export type Session = Awaited<ReturnType<typeof checkCompletedOnboarding>>;

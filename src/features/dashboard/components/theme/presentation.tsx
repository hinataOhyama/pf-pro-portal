// import { AddTaskShortcut } from "@/features/dashboard/components/add-task-shortcut";
import { DashboardHeader } from "@/features/dashboard/components/header";
import { ThemeCards } from "./cards";
import { Session } from "@/features/onboarding/lib/check-completed";

type ThemePresentationProps = {
  session: Session;
};

export const ThemePresentation = ({ session }: ThemePresentationProps) => {
  return (
    <>
      <DashboardHeader>{session!.user.username}</DashboardHeader>
      <ThemeCards />
    </>
  );
};

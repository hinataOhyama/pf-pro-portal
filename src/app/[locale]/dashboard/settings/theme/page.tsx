import { ThemePresentation } from "@/features/dashboard/components/settings-theme/presentation";
import { checkCompletedOnboarding } from "@/features/onboarding/lib/check-completed";

const ThemeSettingsPage = async () => {
  const session = await checkCompletedOnboarding("/dashboard/settings");

  return <ThemePresentation session={session} />;
};

export default ThemeSettingsPage;

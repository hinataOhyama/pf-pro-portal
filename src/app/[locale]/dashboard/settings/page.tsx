import { SettingsPresentation } from "@/features/dashboard/components/settings/presentation";
import { checkCompletedOnboarding } from "@/features/onboarding/lib/check-completed";

const SettingsPage = async () => {
  const session = await checkCompletedOnboarding("/dashboard/settings");

  return <SettingsPresentation session={session} />;
};

export default SettingsPage;

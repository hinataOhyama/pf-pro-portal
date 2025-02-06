import SecurityPresentation from "@/features/dashboard/components/settings-security/presentation";
import { checkCompletedOnboarding } from "@/features/onboarding/lib/check-completed";

const SecuritySettingsPage = async () => {
  const session = await checkCompletedOnboarding("/dashboard/settings");

  return <SecurityPresentation session={session} />;
};

export default SecuritySettingsPage;

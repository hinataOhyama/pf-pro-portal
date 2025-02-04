import DashboardPresentation from "@/features/dashboard/components/root/presentation";
import { checkCompletedOnboarding } from "@/features/onboarding/lib/check-completed";

const DashboardPage = async () => {
  const session = await checkCompletedOnboarding("/dashboard");

  return <DashboardPresentation session={session} />;
};

export default DashboardPage;

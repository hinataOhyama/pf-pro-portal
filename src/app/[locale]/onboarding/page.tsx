import { checkCompletedOnboarding } from "../../../features/onboarding/lib/check-completed";
import { OnboardingFormProvider } from "../../../features/onboarding/context/form";
import { AdditionalSection } from "@/features/onboarding/components/section/additional-section";
import { SummarySection } from "@/features/onboarding/components/section/summary-section";

const OnboardingPage = async () => {
  const session = await checkCompletedOnboarding("/onboarding");
  if (!session) return <div>Loading...</div>;

  return (
    <OnboardingFormProvider session={session}>
      <AdditionalSection profileImage={session.user?.image} />
      <SummarySection />
    </OnboardingFormProvider>
  );
};

export default OnboardingPage;

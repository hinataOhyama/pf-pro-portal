import { checkCompletedOnboarding } from "./_lib/check-completed";
import { OnboardingFormProvider } from "./_context/form";
import { AdditionalSection } from "./_components/additional-section";
import { SummarySection } from "./_components/summary-section";

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

import { checkCompletedOnboarding } from "./_lib/check-completed";
import { OnboardingFormProvider } from "./_context/form";

const OnboardingPage = async () => {
  const session = await checkCompletedOnboarding("/onboarding");

  return <OnboardingFormProvider session={session}>OnboardingPage</OnboardingFormProvider>;
};

export default OnboardingPage;

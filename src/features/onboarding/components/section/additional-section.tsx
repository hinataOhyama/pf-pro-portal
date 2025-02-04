"use client";

import { AppTitle } from "@/components/ui/app-title";
import { useOnboardingForm } from "../../context/form";
import { FirstStep } from "../step/first-step";
import { SecondStep } from "../step/second-step";
import { ThirdStep } from "../step/third-step";
import { LastStep } from "../step/last-step";
import { StepProgress } from "../step/step-progress";

type AdditionalSectionProps = {
  profileImage?: string | null;
};

export const AdditionalSection = ({ profileImage }: AdditionalSectionProps) => {
  const { currentStep } = useOnboardingForm();

  return (
    <section className="w-full lg:w-1/2 bg-card min-h-full flex flex-col justify-between items-center p-4 md:p-6">
      <div className="mt-16 mb-8 w-full flex flex-col items-center">
        <AppTitle />

        {currentStep === 1 && <FirstStep profileImage={profileImage} />}
        {currentStep === 2 && <SecondStep />}
        {currentStep === 3 && <ThirdStep />}
        {currentStep === 4 && <LastStep />}
      </div>
      <StepProgress />
    </section>
  );
};

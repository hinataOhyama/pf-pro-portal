import React from "react";
import { DashboardHeader } from "../header";
import { Session } from "@/features/onboarding/lib/check-completed";
import { SecurityCard } from "./card";

type SecurityPresentationProps = {
  session: Session;
};

const SecurityPresentation = ({ session }: SecurityPresentationProps) => {
  return (
    <>
      <DashboardHeader>
        {session!.user.email}
      </DashboardHeader>
      <SecurityCard />
    </>
  );
};

export default SecurityPresentation;

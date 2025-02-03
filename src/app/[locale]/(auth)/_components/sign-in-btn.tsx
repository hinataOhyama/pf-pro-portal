"use client";

import { Button } from "@/components/shadcn-ui/button";
import { useLocale } from "next-intl";
import { signIn } from "next-auth/react";
import { useLoginError } from "@/app/[locale]/(auth)/_hooks/use-login-error";
import { useState } from "react";

type SignInBtnProps = {
  children: React.ReactNode;
  providerName: "google" | "github" | "apple";
  onLoadingAction: React.Dispatch<React.SetStateAction<boolean>>;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const SignInBtn = ({
  children,
  providerName,
  onLoadingAction,
  ...props
}: SignInBtnProps) => {
  const [showLoggedData, setShowLoggedData] = useState(false);
  const locale = useLocale();
  useLoginError(showLoggedData);

  const signInHandler = async () => {
    onLoadingAction(true);
    setShowLoggedData(true);
    try {
      await signIn(providerName, { callbackUrl: `/${locale}/onboarding` });
    } catch (err) {
      console.error(err);
    }
    onLoadingAction(false);
  };

  return (
    <Button
      onClick={signInHandler}
      {...props}
      variant={"secondary"}
      type="button"
    >
      {children}
    </Button>
  );
};

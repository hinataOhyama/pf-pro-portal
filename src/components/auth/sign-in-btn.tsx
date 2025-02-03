"use client";

import { Button } from "@/components/shadcn-ui/button";
import { useLocale } from "next-intl";
import { signIn } from "next-auth/react";

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
  const locale = useLocale();

  const signInHandler = async () => {
    onLoadingAction(true);
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

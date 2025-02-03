import { AuthCard } from "@/app/[locale]/(auth)/_components/card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your account",
};

const SignInPage = () => {
  return <AuthCard signIn />;
};

export default SignInPage;

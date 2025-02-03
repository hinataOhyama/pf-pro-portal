import { AuthCard } from "@/components/auth/card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Sign up for an account",
};

const SignUpPage = () => {
  return <AuthCard />;
};

export default SignUpPage;

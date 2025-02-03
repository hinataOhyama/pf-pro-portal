import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn-ui/card";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { SignInCardContent } from "./sign-in-card-content";
import { SignUpCardContent } from "./sign-up-card-content";

type AuthCardProps = {
  signIn?: boolean;
};

export const AuthCard = ({ signIn = false }: AuthCardProps) => {
  const t = useTranslations("AUTH");
  
  return (
    <>
      <Card className="w-full sm:min-w-[28rem] sm:w-auto">
        <CardHeader>
          <Image
            src="https://github.com/shadcn.png"
            alt="shadcn"
            width={50}
            height={50}
            className="rounded-full object-cover self-center"
          />
          <CardTitle className="pt-2">
            {signIn ? t("SIGN_IN.TITLE") : t("SIGN_UP.TITLE")}
          </CardTitle>
          <CardDescription>
            {signIn ? t("SIGN_IN.DESCRIPTION") : t("SIGN_UP.DESCRIPTION")}
          </CardDescription>
        </CardHeader>
        {signIn ? <SignInCardContent /> : <SignUpCardContent />}
      </Card>
      <p className="text-sm">
        {signIn
          ? t("SIGN_IN.DONT_HAVE_ACCOUNT.FIRST")
          : t("SIGN_UP.HAVE_ACCOUNT.FIRST")}{" "}
        <Link className="text-primary" href={signIn ? "/sign-up" : "/sign-in"}>
          {signIn
            ? t("SIGN_IN.DONT_HAVE_ACCOUNT.SECOND")
            : t("SIGN_UP.HAVE_ACCOUNT.SECOND")}{" "}
        </Link>
      </p>
    </>
  );
};

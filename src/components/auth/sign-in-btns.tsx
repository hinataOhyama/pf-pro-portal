import { GithubLogo } from "@/components/svg/github-logo";
import { GoogleLogo } from "@/components/svg/google-logo";
import { useTranslations } from "next-intl";
import { SignInBtn } from "./sign-in-btn";

type SignInBtnProps = {
  onLoading: React.Dispatch<React.SetStateAction<boolean>>;
  disabled?: boolean;
  signIn?: boolean;
};

export const SignInBtns = (
  { onLoading, disabled, signIn }: SignInBtnProps
) => {
  const t = useTranslations("AUTH");

  return (
    <div className="flex flex-col gap-2">
      <SignInBtn
        disabled={disabled}
        onLoadingAction={onLoading}
        providerName="google"
        className="w-full rounded-[2rem] border text-sm h-12 sm:h-10 sm:text-base"
      >
        <GoogleLogo className="mr-2" width={20} height={20} />
        {signIn
          ? t("SIGN_IN.PROVIDERS.GOOGLE")
          : t("SIGN_UP.PROVIDERS.GOOGLE")}
      </SignInBtn>

      <SignInBtn
        disabled={disabled}
        onLoadingAction={onLoading}
        providerName="github"
        className="w-full rounded-[2rem] border text-sm h-12 sm:h-10 sm:text-base"
      >
        <GithubLogo className="fill-foreground mr-2" width={20} height={20} />
        {signIn
          ? t("SIGN_IN.PROVIDERS.GITHUB")
          : t("SIGN_UP.PROVIDERS.GITHUB")}
      </SignInBtn>
    </div>
  );
};
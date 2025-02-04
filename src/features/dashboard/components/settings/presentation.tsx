import { DashboardHeader } from "../header";
import { Session } from "@/features/onboarding/lib/check-completed";
import { Separator } from "@/components/shadcn-ui/separator";
import { Heading } from "./heading";
import { DeleteAccount } from "./delete";
import { AccountInfo } from "./info";

type SettingsPresentationProps = {
  session: Session;
};

export const SettingsPresentation = ({
  session,
}: SettingsPresentationProps) => {
  return (
    <>
      <DashboardHeader>{session!.user.email}</DashboardHeader>
      <main>
        <Heading />
        <AccountInfo session={session} />
        <div className="p-4 sm:p-6">
          <Separator />
        </div>
        <DeleteAccount />
      </main>
    </>
  );
};

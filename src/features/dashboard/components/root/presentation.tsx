import { Welcoming } from "./welcoming";
import { DashboardHeader } from "../header";
import { Session } from "@/features/onboarding/lib/check-completed";

type DashboardPresentationProps = {
  session: Session;
};

const DashboardPresentation = ({ session }: DashboardPresentationProps) => {
  if (!session) {
    return null;
  }

  return (
    <>
      <DashboardHeader />
      <main className="h-full w-full">
        <Welcoming
          hideOnDesktop
          className="px-4 py-2"
          username={session.user.username!}
          name={session.user.name}
          surname={session.user.surname}
        />
      </main>
    </>
  );
};

export default DashboardPresentation;

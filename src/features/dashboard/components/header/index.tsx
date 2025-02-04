import { getAuthSession } from "@/features/auth/lib";
import { BreadcrumbNav } from "./breadcrumb-nav";
import { User } from "./user";
import { Welcoming } from "../root/welcoming";
import { OpenSidebar } from "./open-sidebar";
import { cn } from "@/lib/shadcn-utils";
import { SavingStatus } from "./saving-status";
import { BackButton } from "./back-button";

type DashboardHeaderProps = {
  addManualRoutes?: {
    name: string;
    href: string;
    useTranslate?: boolean;
    emoji?: string;
  }[];
  className?: string;
  children?: React.ReactNode;
  workspaceHref?: string;
  hideBreadCrumb?: boolean;
  showingSavingStatus?: boolean;
  showBackBtn?: boolean;
};

export const DashboardHeader = async ({
  addManualRoutes,
  className,
  children,
  workspaceHref,
  hideBreadCrumb,
  showingSavingStatus,
  showBackBtn,
}: DashboardHeaderProps) => {
  const session = await getAuthSession();
  if (!session) return null;

  return (
    <header
      className={cn(
        "flex w-full justify-between items-center mb-4 py-2 gap-2",
        className
      )}
    >
      <div className="flex items-center gap-2">
        <OpenSidebar />
        <Welcoming
          hideOnMobile
          hideOnDesktop
          username={session?.user.username || ""}
          name={session?.user.name}
          surname={session?.user.surname}
          showOnlyOnPath="/dashboard"
        />
        {showBackBtn && <BackButton />}
        {showingSavingStatus && <SavingStatus />}
        {!hideBreadCrumb && (
          <BreadcrumbNav
            addManualRoutes={addManualRoutes}
            workspaceHref={workspaceHref}
          />
        )}
      </div>
      <div className="flex items-center gap-1 sm:gap-2">
        <div className="flex flex-wrap items-center gap-0.5 sm:gap-1">
          {children}
        </div>

        <User
          profileImage={session?.user.image}
          username={session.user.username!}
          email={session.user.email!}
        />
      </div>
    </header>
  );
};

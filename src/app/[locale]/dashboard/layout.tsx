import { Sidebar } from "@/features/dashboard/components/sidebar";
import { UserEditableWorkspacesProvider } from "@/features/dashboard/context/editable-workspaces";
import { ToggleSidebarProvider } from "@/features/dashboard/context/toggle-sidebar";
import { UserActivityStatusProvider } from "@/features/dashboard/context/user-activity-status";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <UserActivityStatusProvider>
      <UserEditableWorkspacesProvider>
        <ToggleSidebarProvider>
          <div className="flex h-0 min-h-screen w-full overflow-hidden">
            <Sidebar />
            <div className="relative p-4 md:p-6 lg:px-10 flex-grow flex flex-col overflow-y-auto scrollbar-thin scrollbar-thumb-secondary scrollbar-track-background">
              {children}
            </div>
          </div>
        </ToggleSidebarProvider>
      </UserEditableWorkspacesProvider>
    </UserActivityStatusProvider>
  );
};

export default DashboardLayout;

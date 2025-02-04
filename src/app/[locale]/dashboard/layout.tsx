import { Sidebar } from "@/features/dashboard/components/sidebar";
import { ToggleSidebarProvider } from "@/features/dashboard/context/toggle-sidebar";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <ToggleSidebarProvider>
      <div className="flex h-0 min-h-screen w-full overflow-hidden">
        <Sidebar />
        <div className="relative p-4 md:p-6 lg:px-10 flex-grow flex flex-col overflow-y-auto scrollbar-thin scrollbar-thumb-secondary scrollbar-track-background">
          {children}
        </div>
      </div>
    </ToggleSidebarProvider>
  );
};

export default DashboardLayout;

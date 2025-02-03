import { LocaleSwitcher } from "@/components/switchers/locale-switcher";
import ThemeSwitcher from "@/components/switchers/theme-switcher";

type AuthLayoutProps = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <main className="flex flex-col gap-3 justify-center items-center min-h-screen w-full p-4 md:p-6">
      <div className="absolute top-0 left-0 w-full flex justify-end">
        <div className="flex items-center gap-2 max-w-7xl p-4 md:p-6">
          <LocaleSwitcher
            alignHover="end"
            alignDropdown="end"
            size={"icon"}
            variant={"outline"}
          />
          <ThemeSwitcher
            alignHover="end"
            alignDropdown="end"
            size={"icon"}
            variant={"outline"}
          />
        </div>
      </div>
      {children}
    </main>
  );
};

export default AuthLayout;

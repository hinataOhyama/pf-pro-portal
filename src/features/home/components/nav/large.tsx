"use client";
import { AppleLogo } from "@/components/svg/apple-logo";
import { LocaleSwitcher } from "@/components/switchers/locale-switcher";
import { ThemeSwitcher } from "@/components/switchers/theme-switcher";
import { buttonVariants, Button } from "@/components/shadcn-ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/shadcn-ui/navigation-menu";
import { navLinks } from "@/constants/home";
import { scrollToHash } from "@/features/home/lib/scroll-to-hash";
import Link from "next/link";

export const LargeNav = () => {
  return (
    <div className="container md:flex py-4 max-w-screen-xl mx-auto items-center justify-between hidden">
      <div className="flex items-center">
        <Button
          className="w-fit bg-transparent text-secondary-foreground hover:bg-transparent flex items-center gap-2 hover:scale-105 transition-transform duration-200"
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
        >
          <AppleLogo className="w-10 h-10" />
          <p className="text-2xl font-semibold">
            Pro<span className="text-primary">Portal</span>
          </p>
        </Button>

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-lg">
                Product
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:grid-cols-2">
                  {navLinks.map((link, i) => (
                    <div key={i}>
                      <Button
                        onClick={() => {
                          scrollToHash(link.href);
                        }}
                        className="w-full text-left bg-transparent text-secondary-foreground block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        {link.title}
                      </Button>
                    </div>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-4">
          <Link
            className="border-b inline-block border-transparent hover:border-primary duration-200 transition-colors"
            href={"/sign-in"}
          >
            Log in
          </Link>
          <Link
            className={`${buttonVariants({ variant: "default" })}`}
            href={"/sign-up"}
          >
            Sign up
          </Link>
        </div>
        <div className="flex items-center gap-2">
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
    </div>
  );
};

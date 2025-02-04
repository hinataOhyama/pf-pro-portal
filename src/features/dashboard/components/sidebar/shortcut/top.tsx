"use client";

import { Home } from "lucide-react";

import { SidebarLink } from "./link";

const topSidebarLinks = [
  {
    href: "/dashboard",
    include: "home",
    Icon: Home,
    hoverTextKey: "HOME_HOVER",
  },
];

export const Top = () => {
  return (
    <div className="flex flex-col items-center gap-3">
      {topSidebarLinks.map((link, i) => (
        <SidebarLink
          key={`link_${i}`}
          Icon={link.Icon}
          hoverTextKey={link.hoverTextKey}
          href={link.href}
          include={link?.include}
        />
      ))}
    </div>
  );
};

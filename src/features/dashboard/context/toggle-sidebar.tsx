"use client";

import { createContext, useContext, useState } from "react";

type ToggleSidebarProviderProps = {
  children: React.ReactNode;
}

type ToggleSidebarContext = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ToggleSidebarCtx = createContext<ToggleSidebarContext | null>(
  null
);

export const ToggleSidebarProvider = ({ children }: ToggleSidebarProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ToggleSidebarCtx.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </ToggleSidebarCtx.Provider>
  );
};

export const useToggleSidebar = () => {
  const ctx = useContext(ToggleSidebarCtx);
  if (!ctx) throw new Error("invalid use");

  return ctx;
};

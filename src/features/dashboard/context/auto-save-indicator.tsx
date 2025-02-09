"use client";

import { createContext, useContext, useState } from "react";

type AutosaveIndicatorProviderProps = {
  children: React.ReactNode;
}

type AutosaveIndicatorContext = {
  status: "unsaved" | "saved" | "pending";
  onSetStatus: (status: "unsaved" | "saved" | "pending") => void;
}

export const AutosaveIndicatorCtx =
  createContext<AutosaveIndicatorContext | null>(null);

export const AutosaveIndicatorProvider = ({ children }: AutosaveIndicatorProviderProps) => {
  const [status, setStatus] = useState<"unsaved" | "saved" | "pending">(
    "saved"
  );

  const onSetStatus = (status: "unsaved" | "saved" | "pending") => {
    setStatus(status);
  };

  return (
    <AutosaveIndicatorCtx.Provider value={{ status, onSetStatus }}>
      {children}
    </AutosaveIndicatorCtx.Provider>
  );
};

export const useAutosaveIndicator = () => {
  const ctx = useContext(AutosaveIndicatorCtx);
  if (!ctx) throw new Error("invalid use");

  return ctx;
};

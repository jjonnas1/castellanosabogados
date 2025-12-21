"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { defaultLocale, dictionaries, type Dictionary, type SupportedLocale } from "@/lib/i18n/config";

type LanguageContextValue = {
  locale: SupportedLocale;
  setLocale: (locale: SupportedLocale) => void;
  messages: Dictionary;
  t: (path: string) => string;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

function getFromPath(path: string, messages: Dictionary): string {
  return path.split(".").reduce<any>((acc, key) => (acc ? acc[key as keyof typeof acc] : undefined), messages) as string;
}

export function LanguageProvider({
  children,
  initialLocale,
}: {
  children: React.ReactNode;
  initialLocale?: SupportedLocale;
}) {
  const [locale, setLocaleState] = useState<SupportedLocale>(initialLocale ?? defaultLocale);

  useEffect(() => {
    if (initialLocale) return;
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem("ca_locale") as SupportedLocale | null;
    if (stored && dictionaries[stored]) {
      setLocaleState(stored);
    }
  }, [initialLocale]);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
    }
    if (typeof window !== "undefined") {
      window.localStorage.setItem("ca_locale", locale);
      document.cookie = `ca_locale=${locale}; path=/; max-age=${60 * 60 * 24 * 365}`;
    }
  }, [locale]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      locale,
      setLocale: setLocaleState,
      messages: dictionaries[locale],
      t: (path: string) => getFromPath(path, dictionaries[locale]) ?? path,
    }),
    [locale],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}

"use client";

import { LanguageProvider } from "./LanguageProvider";
import { type SupportedLocale } from "@/lib/i18n/config";

export default function ClientLayout({
  children,
  initialLocale,
}: {
  children: React.ReactNode;
  initialLocale: SupportedLocale;
}) {
  return <LanguageProvider initialLocale={initialLocale}>{children}</LanguageProvider>;
}

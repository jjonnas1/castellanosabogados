import "./globals.css";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import ClientLayout from "./components/ClientLayout";
import { defaultLocale, supportedLocales, type SupportedLocale } from "@/lib/i18n/config";

export const metadata: Metadata = {
  title: "Castellanos Abogados",
  description:
    "Acompañamiento estratégico y preventivo del riesgo penal asociado a decisiones sensibles en contratación estatal.",
};

async function getInitialLocale(): Promise<SupportedLocale> {
  const cookieStore = await cookies();
  const stored = cookieStore.get("ca_locale")?.value as SupportedLocale | undefined;
  if (stored && supportedLocales.includes(stored)) return stored;
  return defaultLocale;
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialLocale = await getInitialLocale();

  return (
    <html lang={initialLocale} className="theme-a">
      <body className="min-h-screen bg-canvas text-ink antialiased">
        <ClientLayout initialLocale={initialLocale}>{children}</ClientLayout>
      </body>
    </html>
  );
}

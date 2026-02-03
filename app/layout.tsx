import "./globals.css";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import ClientLayout from "./components/ClientLayout";
import { defaultLocale, supportedLocales, type SupportedLocale } from "@/lib/i18n/config";

export const metadata: Metadata = {
  title: "Castellanos Abogados | Gestión penal preventiva",
  description:
    "Estrategia penal preventiva para decisiones sensibles, juntas y comités. Enfoque en trazabilidad, documentación y control.",
  openGraph: {
    title: "Castellanos Abogados",
    description:
      "Estrategia penal preventiva para decisiones sensibles, juntas y comités. Trazabilidad y documentación ejecutiva.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Castellanos Abogados",
    description:
      "Estrategia penal preventiva para decisiones sensibles, juntas y comités. Trazabilidad y documentación ejecutiva.",
  },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LegalService",
              name: "Castellanos Abogados",
              description:
                "Estrategia penal preventiva para decisiones sensibles, juntas y comités. Trazabilidad y documentación ejecutiva.",
              areaServed: "CO",
              serviceType: "Criminal risk prevention",
            }),
          }}
        />
        <ClientLayout initialLocale={initialLocale}>{children}</ClientLayout>
      </body>
    </html>
  );
}

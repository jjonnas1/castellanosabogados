import "./globals.css";
import type { Metadata } from "next";
import SiteHeader from "./components/SiteHeader";
import { ScrollToTop } from "./components/ScrollToTop";

export const metadata: Metadata = {
  title: "Castellanos Abogados",
  description:
    "Gestión y control del riesgo penal en decisiones críticas para organizaciones y personas, con método y trazabilidad.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="theme-a">
      <body className="min-h-screen bg-canvas text-ink antialiased">
        <SiteHeader />
        <ScrollToTop />
        <main className="pt-[76px] md:pt-24">{children}</main>
      </body>
    </html>
  );
}

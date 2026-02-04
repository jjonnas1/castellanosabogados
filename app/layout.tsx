import "./globals.css";
import type { Metadata } from "next";
import WhatsAppFloatingButton from "@/app/components/WhatsAppFloatingButton";

export const metadata: Metadata = {
  title: "Castellanos Abogados",
  description:
    "Acompañamiento estratégico y preventivo del riesgo penal asociado a decisiones sensibles en contratación estatal.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="theme-a">
      <body className="min-h-screen bg-canvas text-ink antialiased">
        {children}
        <WhatsAppFloatingButton />
      </body>
    </html>
  );
}

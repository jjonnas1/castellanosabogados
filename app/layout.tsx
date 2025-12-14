import "./globals.css";
import type { Metadata } from "next";

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
    <html lang="es">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}

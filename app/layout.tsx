// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Castellanos Abogados",
  description: "Asesoría legal virtual en 20 minutos",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head />
      <body style={{ backgroundColor: "#f8f9fa", color: "#222", fontFamily: "system-ui" }}>
        {children}
      </body>
    </html>
  );
}

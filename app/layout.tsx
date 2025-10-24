// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "./components/SiteHeader";

export const metadata: Metadata = {
  title: "Castellanos Abogados",
  description: "Asesoría legal virtual en menos de 20 minutos.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        {/* Enlace de salto accesible */}
        <a className="skip-link" href="#main">Saltar al contenido</a>

        {/* Header fijo */}
        <SiteHeader />

        {/* margen superior para que el header fijo no tape el contenido */}
        <main id="main" className="page" role="main" tabIndex={-1}>
          {children}
        </main>

        <footer className="site-footer">
          © {new Date().getFullYear()} Castellanos Abogados. Orientación legal confiable.
        </footer>
      </body>
    </html>
  );
}

// app/layout.tsx
import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Castellanos Abogados",
  description: "Asesoría legal clara y cercana en menos de 20 minutos.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        {/* HEADER STICKY (no fixed) */}
        <header className="site-header">
          <div className="wrap">
            <Link href="/" className="brand">Castellanos <span>Abogados</span></Link>

            <nav className="nav">
              <Link href="/">Inicio</Link>
              <Link href="/#servicios">Servicios</Link>
              <Link href="/agenda">Agenda</Link>
              <Link href="/#contacto">Contacto</Link>
              <Link href="/agenda" className="cta">Agendar asesoría</Link>
            </nav>
          </div>
        </header>

        {/* El contenido siempre reserva el alto del header */}
        <main className="page" role="main">{children}</main>

        <footer className="site-footer" id="contacto">
          © {new Date().getFullYear()} Castellanos Abogados. Orientación legal confiable.
        </footer>
      </body>
    </html>
  );
}

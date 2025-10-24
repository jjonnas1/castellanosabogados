// app/layout.tsx
import "./globals.css";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Castellanos Abogados",
  description: "Asesoría legal clara y cercana. Agenda en línea con abogados verificados.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <header className="site-header">
          <div className="wrap header-grid">
            <Link href="/" className="brand">
              <span className="brand-title">Castellanos</span>
              <span className="brand-sub">Abogados</span>
            </Link>

            <nav className="main-nav">
              <Link className="nav-link" href="/">Inicio</Link>
              <Link className="nav-link" href="/servicios">Servicios</Link>
              <Link className="nav-link" href="/agenda">Agenda</Link>
              <Link className="nav-link" href="/contacto">Contacto</Link>
            </nav>

            <div className="header-cta">
              <Link href="/agenda" className="btn btn--primary btn--sm">Agendar asesoría</Link>
            </div>
          </div>
        </header>

        <main className="page">{children}</main>

        <footer className="site-footer">
          <div className="wrap footer-grid">
            <div>
              <div className="footer-brand">Castellanos Abogados</div>
              <p className="muted">Orientación legal puntual. No constituye representación judicial.</p>
            </div>
            <div className="footer-links">
              <Link className="link" href="/servicios">Servicios</Link>
              <Link className="link" href="/agenda">Agenda</Link>
              <Link className="link" href="/contacto">Contacto</Link>
              <Link className="link" href="/">Inicio</Link>
            </div>
          </div>
          <div className="wrap footer-legal">© {new Date().getFullYear()} Castellanos Abogados</div>
        </footer>
      </body>
    </html>
  );
}


// app/layout.tsx
import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Castellanos Abogados",
  description: "Orientación legal clara y confiable en 20 minutos.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        {/* Topbar */}
        <header className="topbar">
          <div className="wrap">
            <Link href="/" className="brand" aria-label="Inicio">
              <span className="brand__fallback">Castellanos <span style={{fontWeight:700}}>Abogados</span></span>
            </Link>
            <nav className="nav" aria-label="Navegación principal">
              <Link href="/agenda" className="btn btn--primary">Agendar asesoría</Link>
            </nav>
          </div>
        </header>

        {/* Main */}
        <main className="main">
          {children}
        </main>

        {/* Footer */}
        <footer className="footer">
          <div className="wrap footer__grid">
            <div>
              <div className="footer__title">Castellanos Abogados</div>
              <div className="footer__muted">
                Orientación legal puntual y confiable. No constituye representación judicial.
              </div>
            </div>
            <div className="footer__links" aria-label="Enlaces">
              <Link className="link" href="/agenda">Agenda</Link>
              <a className="link" href="#como-funciona">Cómo funciona</a>
              <a className="link" href="#servicios">Servicios</a>
            </div>
          </div>
          <div className="wrap footer__legal">
            © {new Date().getFullYear()} Castellanos Abogados.
          </div>
        </footer>
      </body>
    </html>
  );
}

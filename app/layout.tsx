// app/layout.tsx
import "./globals.css";
import Link from "next/link";
import { headers } from "next/headers";

function NavLink({
  href,
  children,
  exact,
}: {
  href: string;
  children: React.ReactNode;
  exact?: boolean;
}) {
  const h = headers();
  const currentPath = h.get("x-pathname") || "/";
  const isActive = exact ? currentPath === href : currentPath.startsWith(href);
  return (
    <Link
      href={href}
      className={`nav-link ${isActive ? "nav-link--active" : ""}`}
    >
      {children}
    </Link>
  );
}

export const metadata = {
  title: "Castellanos Abogados",
  description:
    "Asesoría legal clara y cercana. Agenda en línea con abogados verificados.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        {/* Header */}
        <header className="site-header">
          <div className="wrap header-grid">
            <Link href="/" className="brand">
              <span className="brand-title">Castellanos</span>
              <span className="brand-sub">Abogados</span>
            </Link>

            <nav className="main-nav">
              <NavLink href="/" exact>
                Inicio
              </NavLink>
              <NavLink href="/servicios">Servicios</NavLink>
              <NavLink href="/agenda">Agenda</NavLink>
              <NavLink href="/contacto">Contacto</NavLink>
            </nav>

            <div className="header-cta">
              <Link href="/agenda" className="btn btn--primary btn--sm">
                Agendar asesoría
              </Link>
            </div>
          </div>
        </header>

        {/* Contenido principal */}
        <main className="page">{children}</main>

        {/* Footer */}
        <footer className="site-footer">
          <div className="wrap footer-grid">
            <div>
              <div className="footer-brand">Castellanos Abogados</div>
              <p className="muted">
                Orientación legal puntual. No constituye representación judicial.
              </p>
            </div>
            <div className="footer-links">
              <Link className="link" href="/servicios">
                Servicios
              </Link>
              <Link className="link" href="/agenda">
                Agenda
              </Link>
              <Link className="link" href="/contacto">
                Contacto
              </Link>
              <Link className="link" href="/">
                Inicio
              </Link>
            </div>
          </div>
          <div className="wrap footer-legal">
            © {new Date().getFullYear()} Castellanos Abogados
          </div>
        </footer>
      </body>
    </html>
  );
}

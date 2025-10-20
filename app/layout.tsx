import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Castellanos Abogados",
  description:
    "Asesoría legal virtual en 20 minutos. Agenda tu cita, paga con seguridad y conéctate por videollamada.",
  metadataBase: new URL("https://castellanosabogados.vercel.app"),
  openGraph: {
    title: "Castellanos Abogados",
    description:
      "Asesoría legal virtual en 20 minutos. Agenda tu cita, paga con seguridad y conéctate por videollamada.",
    url: "https://castellanosabogados.vercel.app",
    siteName: "Castellanos Abogados",
    images: [{ url: "/brand.png", width: 1200, height: 630, alt: "Castellanos Abogados" }],
    type: "website",
  },
  icons: { icon: "/brand.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        {/* Tipografía elegante para el brand */}
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;700&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {/* Topbar */}
        <header className="topbar">
          <div className="wrap">
            <a className="brand" href="/" aria-label="Ir al inicio">
              <img
                src="/brand.png"
                alt="Castellanos Abogados"
                className="brand__img"
                onError={(e) => {
                  // fallback si no está brand.png
                  (e.currentTarget.style.display = "none");
                  const span = document.createElement("span");
                  span.className = "brand__fallback";
                  span.textContent = "CASTELLANOS • ABOGADOS";
                  e.currentTarget.parentElement?.appendChild(span);
                }}
              />
            </a>

            <nav className="nav">
              <a href="/#servicios" className="btn btn--ghost">
                Servicios
              </a>
              <a href="/agenda" className="btn btn--ghost">
                Agenda
              </a>
              <a href="/agenda" className="btn btn--primary">
                Agendar ahora
              </a>
            </nav>
          </div>
        </header>

        {/* Contenido */}
        <main className="main">{children}</main>

        {/* Footer */}
        <footer className="footer">
          <div className="wrap footer__grid">
            <div className="footer__brand">
              <div className="footer__title">CASTELLANOS • ABOGADOS</div>
              <p className="footer__muted">
                Orientación legal puntual. No constituye representación judicial.
              </p>
            </div>
            <div className="footer__links">
              <a href="/agenda" className="link">Agendar</a>
              <a href="/#servicios" className="link">Servicios</a>
              <a href="mailto:contacto@castellanosabogados.com" className="link">Contacto</a>
            </div>
          </div>
          <div className="footer__legal">
            © {new Date().getFullYear()} Castellanos Abogados. Todos los derechos reservados.
          </div>
        </footer>
      </body>
    </html>
  );
}

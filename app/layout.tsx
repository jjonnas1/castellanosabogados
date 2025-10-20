export const metadata = {
  title: "Castellanos Abogados",
  description:
    "Asesoría legal virtual clara y cercana. Agenda segura y conecta con un abogado experto en menos de 20 minutos.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <header className="site-header">
          <div className="container site-header__inner">
            <a href="/" className="brand">
              <strong className="brand__title">Castellanos</strong>
              <span className="brand__subtitle">Abogados</span>
            </a>

            <nav className="nav" aria-label="Principal">
              <a className="btn btn--ghost" href="/agenda">Agenda</a>
              <a className="btn" href="/agenda">Agendar asesoría</a>
            </nav>
          </div>
        </header>

        <main>{children}</main>

        <footer className="site-footer">
          <div className="container site-footer__inner">
            <div className="site-footer__muted">
              © {new Date().getFullYear()} Castellanos Abogados · Orientación legal confiable
            </div>
            <nav className="nav">
              <a className="btn btn--ghost" href="/agenda">Agenda</a>
            </nav>
          </div>
        </footer>
      </body>
    </html>
  );
}

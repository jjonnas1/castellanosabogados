// app/layout.tsx
import './globals.css';

export const metadata = {
  title: 'Castellanos Abogados',
  description: 'Asesoría legal virtual en menos de 20 minutos.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <header className="site-header">
          <a className="brand" href="/">
            <img src="/logo.png" alt="Castellanos Abogados" width={190} height={48} />
          </a>
          <nav className="nav">
            <a href="/agenda" className="btn-primary">Agendar asesoría</a>
          </nav>
        </header>

        <main className="page">{children}</main>

        <footer className="site-footer">
          © {new Date().getFullYear()} Castellanos Abogados · Orientación legal puntual.
        </footer>
      </body>
    </html>
  );
}

import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Castellanos Abogados',
  description: 'Orientación legal puntual y confiable.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <header className="site-header">
          <div className="container">
            <div className="brand">Castellanos <span style={{opacity:.7,fontWeight:500}}>Abogados</span></div>
            <nav className="nav">
              <a href="/agenda">Agenda</a>
              <a href="/agenda" className="btn btn-ghost">Agendar asesoría</a>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()} Castellanos Abogados · Orientación legal confiable
        </footer>
      </body>
    </html>
  );
}

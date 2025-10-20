// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { Inter, Playfair_Display } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Castellanos Abogados",
  description: "Asesoría legal virtual en 20 minutos.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        {/* Topbar */}
        <header className="topbar">
          <div className="container topbar__inner">
            <Link href="/" className="brand">
              {/* Si quieres texto en vez de imagen, borra el <img> y deja el span */}
              <img src="/logo.png" alt="Castellanos" className="brand__img" />
              <span className="brand__fallback">Castellanos</span>
            </Link>

            <nav className="nav">
              <Link href="/agenda" className="btn btn--ghost">¿Cómo funciona?</Link>
              <Link href="/agenda" className="btn btn--primary">Agendar asesoría</Link>
            </nav>
          </div>
        </header>

        <main>{children}</main>

        <footer className="site-footer">
          © {new Date().getFullYear()} Castellanos Abogados · Orientación legal puntual · No constituye representación judicial.
        </footer>
      </body>
    </html>
  );
}

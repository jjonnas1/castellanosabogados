import "./globals.css";

export const metadata = {
  title: "CastellanosAbogados",
  description: "Asesorías legales virtuales en 20 minutos",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <div className="container">
          <header>
            <h1>CastellanosAbogados</h1>
            <nav><a href="/agenda" className="btn">Agenda tu asesoría</a></nav>
          </header>
          {children}
          <footer style={{ marginTop: 40 }}>
            <small className="muted">
              © {new Date().getFullYear()} CastellanosAbogados · Orientación legal puntual. No constituye representación judicial.
            </small>
          </footer>
        </div>
      </body>
    </html>
  );
}

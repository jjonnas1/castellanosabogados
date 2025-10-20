// app/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Castellanos Abogados",
  description: "Asesoría legal virtual en 20 minutos",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          backgroundColor: "#0b1220", // fondo oscuro visible
          color: "#e6edf6",           // texto claro visible
          fontFamily: "system-ui, -apple-system, Segoe UI, Inter, Roboto, Helvetica, Arial",
        }}
      >
        {children ?? <div>Sin contenido</div>}
      </body>
    </html>
  );
}

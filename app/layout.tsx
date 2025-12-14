import "./globals.css";

export const metadata = {
  title: "Castellanos Abogados",
  description:
    "Asesoría estratégica y preventiva del riesgo penal asociado a decisiones sensibles en contratación estatal.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}

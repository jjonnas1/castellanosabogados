// app/layout.tsx
import './globals.css';

export const metadata = {
  title: 'CastellanosAbogados',
  description: 'Asesoría legal virtual',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}

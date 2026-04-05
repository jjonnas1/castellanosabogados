import './globals.css';
import type { Metadata, Viewport } from 'next';
import { GoogleTagManager } from '@next/third-parties/google';
import AdminConsultChat from '@/app/components/AdminConsultChat';
import AdminFloatingAccess from '@/app/components/AdminFloatingAccess';

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
export const metadata: Metadata = {
  title: 'Castellanos Abogados',
  description:
    'Acompañamiento estratégico y preventivo del riesgo penal asociado a decisiones sensibles en contratación estatal.',
  manifest: '/manifest.webmanifest',
  icons: {
    icon: '/icons/icon.svg',
    apple: '/icons/icon.svg',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Castellanos',
  },
};

export const viewport: Viewport = {
  themeColor: '#0f172a',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="theme-a">
      <body className="min-h-screen bg-canvas text-ink antialiased">
        {GTM_ID ? <GoogleTagManager gtmId={GTM_ID} /> : null}
        {children}
        <AdminConsultChat />
        <AdminFloatingAccess />
      </body>
    </html>
  );
}

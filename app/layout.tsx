import './globals.css';
import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import AdminConsultChat from '@/app/components/AdminConsultChat';
import AdminFloatingAccess from '@/app/components/AdminFloatingAccess';
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
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18056733453"
          strategy="afterInteractive"
        />
        <Script id="google-ads-base-tag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', 'AW-18056733453');
          `}
        </Script>
        {children}
        <AdminConsultChat />
        <AdminFloatingAccess />
      </body>
    </html>
  );
}

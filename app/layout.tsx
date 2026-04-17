import './globals.css';
import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { GoogleTagManager } from '@next/third-parties/google';
import AdminConsultChat from '@/app/components/AdminConsultChat';
import AdminFloatingAccess from '@/app/components/AdminFloatingAccess';
import WhatsAppFloat from '@/app/components/WhatsAppFloat';
import WhatsAppLeadModal from '@/app/components/WhatsAppLeadModal';
import VisitTracker from '@/app/components/VisitTracker';
import ClientPortalModal from '@/app/components/ClientPortalModal';

// Google Ads — Global Site Tag (carga en todas las páginas)
const GADS_ID = 'AW-18056733453';

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
        {/* Google Ads — Global Site Tag */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GADS_ID}`}
          strategy="afterInteractive"
        />
        <Script id="gads-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GADS_ID}');
        `}</Script>

        {GTM_ID ? <GoogleTagManager gtmId={GTM_ID} /> : null}
        {children}
        <VisitTracker />
        <ClientPortalModal />
        <AdminConsultChat />
        <AdminFloatingAccess />
        <WhatsAppFloat />
        <WhatsAppLeadModal />
      </body>
    </html>
  );
}

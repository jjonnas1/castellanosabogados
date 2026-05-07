import './globals.css';
import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { GoogleTagManager } from '@next/third-parties/google';
import AdminFloatingAccess from '@/app/components/AdminFloatingAccess';
import SiteFooter from '@/app/components/SiteFooter';
import ClientWidgets from '@/app/components/ClientWidgets';
import Providers from '@/app/components/Providers';

const GADS_ID = 'AW-18056733453';
const GT_ID   = 'GT-NCNRRTDW';

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["LegalService", "Attorney"],
  name: "Castellanos Abogados",
  description:
    "Firma jurídica integral con enfoque en derecho penal, ejecución de penas, tutelas y asesoría jurídica estratégica.",
  url: "https://jonatancastellanosabogado.com",
  telephone: "+573148309306",
  email: "jonatancastellanosabogado@gmail.com",
  priceRange: "$$",
  areaServed: [
    { "@type": "City", name: "Pereira" },
    { "@type": "AdministrativeArea", name: "Risaralda" },
    { "@type": "AdministrativeArea", name: "Eje Cafetero" },
    { "@type": "Country", name: "Colombia" },
  ],
  hasMap: "https://maps.google.com/?q=Pereira,Risaralda,Colombia",
  founder: {
    "@type": "Person",
    name: "Jonatan Castellanos",
    jobTitle: "Abogado",
  },
  sameAs: [
    "https://wa.me/573148309306",
  ],
};

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
export const metadata: Metadata = {
  metadataBase: new URL('https://jonatancastellanosabogado.com'),
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
      <head>
        {/* Prevent flash of wrong theme on load */}
        <script dangerouslySetInnerHTML={{ __html: `(function(){var t=localStorage.getItem('theme');if(t==='dark'){document.documentElement.classList.remove('theme-a');document.documentElement.classList.add('theme-dark');}})();` }} />
      </head>
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
          gtag('config', '${GT_ID}');
        `}</Script>

        {GTM_ID ? <GoogleTagManager gtmId={GTM_ID} /> : null}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Providers>
          {children}
          <SiteFooter />
        </Providers>
        <AdminFloatingAccess />
        <ClientWidgets />
      </body>
    </html>
  );
}

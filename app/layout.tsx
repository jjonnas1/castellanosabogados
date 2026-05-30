import './globals.css';
import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { GoogleTagManager } from '@next/third-parties/google';
import AdminFloatingAccess from '@/app/components/AdminFloatingAccess';
import SiteFooter from '@/app/components/SiteFooter';
import ClientWidgets from '@/app/components/ClientWidgets';
import ScrollReveal from '@/app/components/ScrollReveal';
import { ThemeProvider } from '@/components/theme-provider';
import { LanguageProvider } from '@/contexts/LanguageContext';

const GADS_ID = 'AW-18056733453';
const GT_ID   = 'GT-NCNRRTDW';

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["LegalService", "Attorney"],
  name: "Castellanos Abogados",
  description:
    "Firma jurídica con enfoque en derecho penal, ejecución de penas, tutelas y asesoría jurídica estratégica en Pereira, Manizales y Armenia (Eje Cafetero).",
  url: "https://jonatancastellanosabogado.com",
  telephone: "+573148309306",
  email: "jonatancastellanosabogado@gmail.com",
  priceRange: "$$",
  image: "https://jonatancastellanosabogado.com/og-image.png",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Pereira",
    addressRegion: "Risaralda",
    addressCountry: "CO",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "6",
    bestRating: "5",
    worstRating: "1",
  },
  areaServed: [
    { "@type": "City", name: "Pereira" },
    { "@type": "City", name: "Manizales" },
    { "@type": "City", name: "Armenia" },
    { "@type": "AdministrativeArea", name: "Risaralda" },
    { "@type": "AdministrativeArea", name: "Caldas" },
    { "@type": "AdministrativeArea", name: "Quindío" },
    { "@type": "AdministrativeArea", name: "Eje Cafetero" },
    { "@type": "Country", name: "Colombia" },
  ],
  hasMap: "https://maps.google.com/?q=Pereira,Risaralda,Colombia",
  founder: {
    "@type": "Person",
    name: "Jonatan Castellanos",
    jobTitle: "Abogado",
    alumniOf: [
      { "@type": "CollegeOrUniversity", name: "Universidad Libre de Pereira" },
      { "@type": "CollegeOrUniversity", name: "Universidad de Caldas" },
    ],
    knowsLanguage: ["es", "en", "fr", "it"],
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "07:00",
      closes: "16:00",
    },
  ],
  sameAs: [
    "https://wa.me/573148309306",
  ],
};

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
export const metadata: Metadata = {
  metadataBase: new URL('https://jonatancastellanosabogado.com'),
  title: 'Castellanos Abogados',
  description:
    'Asesoría jurídica estratégica en derecho penal, tutelas, ejecución de penas, familia y laboral. Atendemos en Pereira, Manizales y Armenia (Eje Cafetero).',
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
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    url: 'https://jonatancastellanosabogado.com',
    siteName: 'Castellanos Abogados',
    title: 'Castellanos Abogados | Firma jurídica en Pereira, Manizales y Armenia',
    description:
      'Asesoría jurídica estratégica en derecho penal, tutelas, ejecución de penas, familia y laboral. Atendemos en Pereira, Manizales y Armenia (Eje Cafetero).',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Castellanos Abogados — Firma jurídica en Pereira, Manizales y Armenia',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Castellanos Abogados | Firma jurídica en Pereira, Manizales y Armenia',
    description:
      'Asesoría jurídica estratégica en derecho penal, tutelas, ejecución de penas, familia y laboral. Pereira, Manizales y Armenia.',
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
    <html lang="es" suppressHydrationWarning>
      <body className="min-h-screen bg-canvas text-ink antialiased">
        <LanguageProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            disableTransitionOnChange
          >
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
            <ScrollReveal />
            {children}
            <SiteFooter />
            <AdminFloatingAccess />
            <ClientWidgets />
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}

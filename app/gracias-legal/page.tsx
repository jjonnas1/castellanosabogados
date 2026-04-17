import { Suspense } from 'react';
import Script from 'next/script';
import type { Metadata } from 'next';
import GraciasLegalClient from './GraciasLegalClient';

export const metadata: Metadata = {
  title: 'Conectando con la oficina — Castellanos Abogados',
  robots: { index: false, follow: false },
};

/**
 * Event Snippet de conversión de Google Ads.
 * Se dispara únicamente cuando el usuario llega a /gracias-legal,
 * es decir, justo después de completar el formulario del modal de WhatsApp.
 *
 * El Global Site Tag (gtag.js) se carga en app/layout.tsx para todo el sitio.
 * send_to: AW-18056733453  →  cuenta de Google Ads de Castellanos Abogados
 */
function ConversionScript() {
  return (
    <Script id="gads-conversion" strategy="afterInteractive">{`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('event', 'conversion', {
        'send_to':  'AW-18056733453',
        'value':    1.0,
        'currency': 'COP'
      });
    `}</Script>
  );
}

export default function GraciasLegalPage() {
  return (
    <>
      {/* Conversión de Google Ads — solo se ejecuta en esta página */}
      <ConversionScript />

      <Suspense>
        <GraciasLegalClient />
      </Suspense>
    </>
  );
}

/**
 * /gracias-legal — Página de confirmación y puente de conversión para Google Ads.
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 * PASO 1 — GLOBAL SITE TAG  (pegar UNA SOLA VEZ, en app/layout.tsx)
 * ───────────────────────────────────────────────────────────────────────────────
 * Si aún no tienes el tag de Google Ads en tu sitio, abre app/layout.tsx y pega
 * dentro del bloque <head> (usando next/script con strategy="afterInteractive"):
 *
 *   import Script from 'next/script';
 *
 *   // En el <head> o justo antes de </body>:
 *   <Script
 *     src="https://www.googletagmanager.com/gtag/js?id=AW-XXXXXXXXX"
 *     strategy="afterInteractive"
 *   />
 *   <Script id="gtag-init" strategy="afterInteractive">{`
 *     window.dataLayer = window.dataLayer || [];
 *     function gtag(){dataLayer.push(arguments);}
 *     gtag('js', new Date());
 *     gtag('config', 'AW-XXXXXXXXX');
 *   `}</Script>
 *
 * Reemplaza AW-XXXXXXXXX con tu ID de cuenta de Google Ads.
 * Si ya usas GTM (Google Tag Manager), este paso no es necesario — configura
 * la etiqueta de conversión directamente en tu contenedor GTM activada con un
 * trigger de Page View sobre la URL /gracias-legal.
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * PASO 2 — EVENT SNIPPET DE CONVERSIÓN  (ya incluido abajo, solo reemplaza IDs)
 * ───────────────────────────────────────────────────────────────────────────────
 * Busca el componente <ConversionScript /> más abajo y sustituye:
 *   • 'AW-XXXXXXXXX/YYYYYYYYYYYYYYY'  →  el valor 'send_to' de tu Event Snippet
 *   • value / currency               →  ajusta según tu configuración de conversión
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { Suspense } from 'react';
import Script from 'next/script';
import type { Metadata } from 'next';
import GraciasLegalClient from './GraciasLegalClient';

export const metadata: Metadata = {
  title: 'Conectando con la oficina — Castellanos Abogados',
  robots: { index: false, follow: false },
};

/**
 * PASO 2 — EVENT SNIPPET
 * Reemplaza 'AW-XXXXXXXXX/YYYYYYYYYYYYYYY' con el valor exacto de tu
 * "send_to" que aparece en la configuración de conversión de Google Ads.
 */
function ConversionScript() {
  return (
    <Script id="gads-conversion" strategy="afterInteractive">{`
      if (typeof gtag !== 'undefined') {
        gtag('event', 'conversion', {
          'send_to':  'AW-XXXXXXXXX/YYYYYYYYYYYYYYY',
          'value':    1.0,
          'currency': 'COP'
        });
      }
    `}</Script>
  );
}

export default function GraciasLegalPage() {
  return (
    <>
      {/* ── Event Snippet de Google Ads ── ver instrucciones al tope del archivo */}
      <ConversionScript />

      <Suspense>
        <GraciasLegalClient />
      </Suspense>
    </>
  );
}

'use client';

export const GOOGLE_ADS_CONVERSION_LABELS = {
  // Etiqueta que ya estaba activa en producción para WhatsApp.
  whatsapp: 'AW-18056733453/cC0KCL_sk58cEI3Gj6JD',
  // Sustituir únicamente cuando Google Ads entregue las etiquetas reales.
  phone: 'AW-XXXXXXXXX/LLAMADA',
  form: 'AW-XXXXXXXXX/FORMULARIO',
} as const;

const GA4_EVENT_NAMES = {
  whatsapp: 'whatsapp_click',
  phone: 'phone_click',
  form: 'form_submit',
} as const;

type ConversionType = keyof typeof GOOGLE_ADS_CONVERSION_LABELS;
type Gtag = (...args: unknown[]) => void;
type ConversionWindow = Window & { gtag?: Gtag };

function isConfiguredGoogleAdsLabel(label: string) {
  return !label.includes('XXXXXXXXX') && !label.includes('/LLAMADA') && !label.includes('/FORMULARIO');
}

export function trackConversion(type: ConversionType, payload: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return;

  const conversionWindow = window as ConversionWindow;
  const eventName = GA4_EVENT_NAMES[type];
  const eventPayload = { event_category: 'contacto', ...payload };

  conversionWindow.gtag?.('event', eventName, eventPayload);

  // No se envían conversiones de Ads mientras la etiqueta siga siendo provisional.
  const sendTo = GOOGLE_ADS_CONVERSION_LABELS[type];
  if (isConfiguredGoogleAdsLabel(sendTo)) {
    conversionWindow.gtag?.('event', 'conversion', {
      send_to: sendTo,
      event_label: eventName,
      ...eventPayload,
    });
  }
}

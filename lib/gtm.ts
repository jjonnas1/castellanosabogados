'use client';

type DataLayerEvent = Record<string, unknown> & {
  event: string;
};

type WindowWithDataLayer = Window & {
  dataLayer?: DataLayerEvent[];
};

export function pushToDataLayer(event: DataLayerEvent) {
  if (typeof window === 'undefined') return;
  const win = window as WindowWithDataLayer;
  win.dataLayer = win.dataLayer || [];
  win.dataLayer.push(event);
}

export function trackClickWhatsapp(payload?: Record<string, unknown>) {
  pushToDataLayer({ event: 'click_whatsapp', ...payload });
}

export function trackClickEmail(payload?: Record<string, unknown>) {
  pushToDataLayer({ event: 'click_email', ...payload });
}

export function trackClickContacto(payload?: Record<string, unknown>) {
  pushToDataLayer({ event: 'click_contacto', ...payload });
}

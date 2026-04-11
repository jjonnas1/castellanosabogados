export const contactConfig = {
  email: 'jonatan@jonatancastellanosabogado.com',
  whatsapp: '573148309306',
  whatsappDisplay: '+57 314 830 9306',
};

type MailtoParams = {
  area?: string;
  source?: string;
  intent?: string;
  subject?: string;
  message?: string;
};

type WhatsAppParams = {
  area?: string;
  source?: string;
  intent?: string;
  message?: string;
};

export function buildMailtoUrl(params: MailtoParams = {}) {
  const subject = params.subject || 'Solicitud de contacto';
  const base = params.message?.trim() || '';
  const area = params.area ? `Área: ${params.area}` : '';
  const source = params.source ? `Origen: ${params.source}` : '';
  const intent = params.intent ? `Intento: ${params.intent}` : '';

  const body = [base, area, source, intent].filter(Boolean).join('\n');

  return `mailto:${contactConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function buildWhatsAppUrl(params: WhatsAppParams = {}) {
  const base = params.message?.trim() || 'Hola, quisiera agendar una evaluación.';
  const area = params.area ? `Área: ${params.area}` : '';
  const source = params.source ? `Origen: ${params.source}` : '';
  const intent = params.intent ? `Intento: ${params.intent}` : '';

  const text = [base, area, source, intent].filter(Boolean).join('\n');

  return `https://wa.me/${contactConfig.whatsapp}?text=${encodeURIComponent(text)}`;
}

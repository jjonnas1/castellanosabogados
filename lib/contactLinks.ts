// lib/contactLinks.ts
export const contactConfig = {
  email: "jonatancastellanosabogado@gmail.com",
  whatsapp: "573148309306",
  whatsappDisplay: "+57 314 830 9306",
};

type WhatsAppParams = {
  area?: string;
  source?: string;
  message?: string;
};

type MailtoParams = {
  area?: string;
  source?: string;
  subject?: string;
  message?: string;
};

export function buildWhatsAppUrl(params: WhatsAppParams = {}) {
  const area = params.area ? `Área: ${params.area}` : "";
  const source = params.source ? `Origen: ${params.source}` : "";
  const base = params.message?.trim() || "Hola, quisiera agendar una evaluación.";

  const text = [base, area, source].filter(Boolean).join("\n");
  const encoded = encodeURIComponent(text);

  // wa.me requiere número en formato internacional sin +
  return `https://wa.me/${contactConfig.whatsapp}?text=${encoded}`;
}

export function buildMailtoUrl(params: MailtoParams = {}) {
  const area = params.area ? `Área: ${params.area}` : "";
  const source = params.source ? `Origen: ${params.source}` : "";
  const body = [params.message || "", area, source].filter(Boolean).join("\n");

  const subject = params.subject || "Solicitud de contacto";
  return `mailto:${contactConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

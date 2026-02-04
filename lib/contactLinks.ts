// lib/contactLinks.ts
export const contactConfig = {
  email: "jonatancastellanosabogado@gmail.com",
  whatsapp: "573148309306",
  whatsappDisplay: "+57 314 830 9306",
};

type WhatsAppParams = {
  area?: string;
  source?: string;
  intent?: string;
  message?: string;
};

type MailtoParams = {
  area?: string;
  source?: string;
  intent?: string; // ✅ FIX: ahora sí existe
  subject?: string;
  message?: string;
};

export function buildWhatsAppUrl(params: WhatsAppParams = {}) {
  const base = params.message?.trim() || "Hola, quisiera agendar una evaluación.";
  const area = params.area ? `Área: ${params.area}` : "";
  const source = params.source ? `Origen: ${params.source}` : "";
  const intent = params.intent ? `Intento: ${params.intent}` : "";

  const text = [base, area, source, intent].filter(Boolean).join("\n");
  const encoded = encodeURIComponent(text);

  return `https://wa.me/${contactConfig.whatsapp}?text=${encoded}`;
}

export function buildMailtoUrl(params: MailtoParams = {}) {
  const subject = params.subject || "Solicitud de contacto";

  const base = params.message?.trim() || "";
  const area = params.area ? `Área: ${params.area}` : "";
  const source = params.source ? `Origen: ${params.source}` : "";
  const intent = params.intent ? `Intento: ${params.intent}` : "";

  const body = [base, area, source, intent].filter(Boolean).join("\n");

  return `mailto:${contactConfig.email}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
}

export function buildMailtoUrl(params: MailtoParams = {}) {
  const area = params.area ? `Área: ${params.area}` : "";
  const source = params.source ? `Origen: ${params.source}` : "";
  const body = [params.message || "", area, source].filter(Boolean).join("\n");

  const subject = params.subject || "Solicitud de contacto";
  return `mailto:${contactConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

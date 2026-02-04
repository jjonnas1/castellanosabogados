const CONTACT_EMAIL = "jonatancastellanosabogado@gmail.com";
const WHATSAPP_URL = "https://wa.me/573148309306";

type ContactContext = {
  area: string;
  source: string;
  message?: string;
};

export function buildWhatsAppUrl({ area, source, message }: ContactContext) {
  const text = [
    message || "Hola, quisiera agendar una sesión.",
    `Área/servicio: ${area}`,
    `Origen: ${source}`,
  ].join("\n");

  return `${WHATSAPP_URL}?text=${encodeURIComponent(text)}`;
}

type MailtoParams = ContactContext & {
  subject: string;
};

export function buildMailtoUrl({ area, source, subject, message }: MailtoParams) {
  const body = [
    message || "Hola, quisiera solicitar información.",
    "",
    `Área/servicio: ${area}`,
    `Origen: ${source}`,
  ].join("\n");

  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export const contactConfig = {
  email: CONTACT_EMAIL,
  whatsapp: WHATSAPP_URL,
};

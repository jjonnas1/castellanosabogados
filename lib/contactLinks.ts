const CONTACT_EMAIL = "jonatancastellanosabogado@gmail.com";
const WHATSAPP_NUMBER = "3148309306";

export type ContactConfig = {
  email: string;
  whatsapp: string;
  whatsappDisplay: string;
};

export const contactConfig: ContactConfig = {
  email: CONTACT_EMAIL,
  whatsapp: WHATSAPP_NUMBER,
  whatsappDisplay: "314 830 9306",
};

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

  return `https://wa.me/${contactConfig.whatsapp}?text=${encodeURIComponent(text)}`;
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

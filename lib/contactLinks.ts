// lib/contactLinks.ts
export const contactConfig = {
  email: "jonatancastellanosabogado@gmail.com",
  whatsapp: "573148309306", // formato internacional SIN + (Colombia)
  whatsappDisplay: "+57 314 830 9306",
} as const;

type BuildMailtoArgs = {
  area: string;
  source?: string;
  subject?: string;
  message?: string;
  intent?: string;
};

export function buildMailtoUrl(args: BuildMailtoArgs) {
  const subject = args.subject ?? `Solicitud de contacto – ${args.area}`;
  const parts: string[] = [];

  if (args.message) parts.push(args.message);
  parts.push(`Área/servicio: ${args.area}`);
  if (args.source) parts.push(`Origen: ${args.source}`);
  if (args.intent) parts.push(`Intento: ${args.intent}`);

  const body = parts.filter(Boolean).join("\n");

  const params = new URLSearchParams();
  params.set("subject", subject);
  params.set("body", body);

  return `mailto:${contactConfig.email}?${params.toString()}`;
}

type BuildWhatsAppArgs = {
  area: string;
  source?: string;
  message?: string;
  intent?: string;
};

export function buildWhatsAppUrl(args: BuildWhatsAppArgs) {
  const parts: string[] = [];
  if (args.message) parts.push(args.message);
  parts.push(`Área/servicio: ${args.area}`);
  if (args.source) parts.push(`Origen: ${args.source}`);
  if (args.intent) parts.push(`Intento: ${args.intent}`);

  const text = parts.filter(Boolean).join("\n");
  const encoded = encodeURIComponent(text);

  // wa.me requiere número sin + y sin espacios
  return `https://wa.me/${contactConfig.whatsapp}?text=${encoded}`;
}

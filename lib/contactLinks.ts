// lib/contactLinks.ts
export const contactConfig = {
  email: "jonatancastellanosabogado@gmail.com",
  whatsapp: "573148309306", // SIN "+" para wa.me
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

  const bodyParts: string[] = [];
  if (args.message) bodyParts.push(args.message);
  bodyParts.push(`Área/servicio: ${args.area}`);
  if (args.source) bodyParts.push(`Origen: ${args.source}`);
  if (args.intent) bodyParts.push(`Intento: ${args.intent}`);

  const body = bodyParts.filter(Boolean).join("\n");

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
  const bodyParts: string[] = [];
  if (args.message) bodyParts.push(args.message);
  bodyParts.push(`Área/servicio: ${args.area}`);
  if (args.source) bodyParts.push(`Origen: ${args.source}`);
  if (args.intent) bodyParts.push(`Intento: ${args.intent}`);

  const text = bodyParts.filter(Boolean).join("\n");
  const encoded = encodeURIComponent(text);

  return `https://wa.me/${contactConfig.whatsapp}?text=${encoded}`;
}

"use client";

import { buildWhatsAppUrl, contactConfig } from "@/lib/contactLinks";

export default function WhatsAppFloatingButton() {
  const href = buildWhatsAppUrl({
    area: "WhatsApp flotante",
    source: "Global",
    message: "Hola, quisiera agendar una evaluación.",
  });

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`WhatsApp ${contactConfig.whatsappDisplay}`}
      className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 rounded-full bg-ink px-4 py-3 text-sm font-semibold text-white shadow-soft transition duration-300 ease-out hover:-translate-y-[1px] hover:shadow-hover"
    >
      <span aria-hidden>💬</span>
      WhatsApp {contactConfig.whatsappDisplay}
    </a>
  );
}

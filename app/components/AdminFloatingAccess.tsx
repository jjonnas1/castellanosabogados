"use client";

import Link from "next/link";
import { buildWhatsAppUrl, contactConfig } from "@/lib/contactLinks";

export default function AdminFloatingAccess() {
  const whatsappHref = buildWhatsAppUrl({
    area: "Contacto",
    source: "floating-access",
    message: "Hola, quisiera información sobre sus servicios.",
  });

  return (
    <>
      <Link
        href="/admin/login"
        className="fixed bottom-5 left-4 z-[70] rounded-full border border-border/80 bg-white/95 px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted shadow-soft backdrop-blur transition hover:border-ink hover:text-ink sm:left-6"
        aria-label="Acceso administrativo"
      >
        Admin
      </Link>

      <div className="fixed bottom-5 right-4 z-[70] flex flex-col items-end sm:right-6">
      <a
        href={whatsappHref}
        className="rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-soft transition hover:bg-emerald-700"
        aria-label="Contacto por WhatsApp"
      >
        {contactConfig.whatsappDisplay ?? "WhatsApp"}
      </a>
      </div>
    </>
  );
}

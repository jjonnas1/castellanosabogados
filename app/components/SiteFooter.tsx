"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { contactConfig } from "@/lib/contactLinks";
import { useLang } from "@/contexts/LangContext";

const SERVICE_SLUGS = [
  "penal-personas",
  "ejecucion-penas",
  "responsabilidad-penal-pj",
  "capacitaciones-penal-pj",
  "civil",
  "familia",
  "laboral",
  "administrativo",
];

const HIDDEN = ["/admin", "/cliente", "/portal", "/panel", "/login", "/registro"];

export default function SiteFooter() {
  const pathname = usePathname();
  const { t } = useLang();

  if (HIDDEN.some((p) => pathname.startsWith(p))) return null;

  return (
    <footer style={{ background: "linear-gradient(180deg, #0c111d 0%, #0e1829 100%)" }}>
      <div className="container grid gap-10 py-12 text-sm sm:grid-cols-3">

        {/* Firma */}
        <div className="space-y-3">
          <p className="font-heading text-base font-semibold text-white">Castellanos Abogados</p>
          <p className="text-white/55">{t.footer.tagline}</p>
          <p className="text-xs text-white/35">{t.footer.motto}</p>
        </div>

        {/* Servicios — 2 columnas */}
        <div className="space-y-3">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/50">
            {t.footer.services}
          </p>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5">
            {SERVICE_SLUGS.map((slug) => (
              <li key={slug}>
                <Link
                  href={`/servicios/${slug}`}
                  className="text-white/65 transition hover:text-white"
                >
                  {t.mega.serviceNames[slug]}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contacto */}
        <div className="space-y-3">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/50">
            {t.footer.contact}
          </p>
          <ul className="space-y-2">
            <li>
              <a
                href={`tel:+${contactConfig.whatsapp}`}
                className="text-white/70 transition hover:text-white"
              >
                {contactConfig.whatsappDisplay.replace("+57 ", "")}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${contactConfig.email}`}
                className="break-all text-white/70 transition hover:text-white"
              >
                {contactConfig.email}
              </a>
            </li>
          </ul>
          <div className="border-t border-white/10 pt-4 text-xs text-white/40">
            © {new Date().getFullYear()} {t.footer.rights}
          </div>
        </div>

      </div>
    </footer>
  );
}

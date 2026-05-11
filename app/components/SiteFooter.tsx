"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { contactConfig } from "@/lib/contactLinks";
import { useLanguage } from "@/contexts/LanguageContext";

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
  const { t } = useLanguage();

  if (HIDDEN.some((p) => pathname.startsWith(p))) return null;

  return (
    <footer style={{ background: "linear-gradient(180deg, #0c111d 0%, #0e1829 100%)" }}>
      <div className="container grid gap-10 py-12 text-sm sm:grid-cols-3">

        {/* Firma */}
        <div className="space-y-4">
          <div>
            <p className="font-heading text-base font-semibold text-white">Castellanos Abogados</p>
            <p className="text-white/55 mt-1">{t.footer.tagline}</p>
            <p className="text-xs text-white/35 mt-1">{t.footer.motto}</p>
          </div>
          
          <div className="flex items-center gap-4 pt-2">
            <a 
              href="https://www.facebook.com/profile.php?id=61588299650396&locale=es_LA" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/40 hover:text-[#1877F2] transition-colors"
              aria-label="Facebook de Castellanos Abogados"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a 
              href="https://www.instagram.com/castellanos_abogado/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/40 hover:text-[#E1306C] transition-colors"
              aria-label="Instagram de Castellanos Abogados"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
          </div>
        </div>

        {/* Servicios */}
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
                  {t.header.serviceNames[slug]}
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

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
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

const QUICK_LINKS = [
  { href: "/tutela", labelKey: "tutelas" as const },
  { href: "/blog", labelKey: "blog" as const },
  { href: "/nosotros", labelKey: "about" as const },
  { href: "/contacto", labelKey: "contact" as const },
];

const HIDDEN = ["/admin", "/cliente", "/portal", "/panel", "/login", "/registro"];

const WA_URL = `https://wa.me/${contactConfig.whatsapp}?text=${encodeURIComponent("Hola, quisiera solicitar orientación jurídica.")}`;

function PhoneIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6 6l1.27-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function WhatsAppIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.122.553 4.122 1.52 5.86L0 24l6.335-1.502A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.01-1.378l-.36-.213-3.732.885.899-3.628-.234-.373A9.772 9.772 0 0 1 2.182 12C2.182 6.568 6.568 2.182 12 2.182S21.818 6.568 21.818 12 17.432 21.818 12 21.818z" fill="#25D366"/>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" fill="#25D366"/>
    </svg>
  );
}

export default function SiteFooter() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const [visibleEmail, setVisibleEmail] = useState<string | null>(null);

  useEffect(() => {
    const u = "jonatan";
    const d = "jonatancastellanosabogado.com";
    setVisibleEmail(`${u}@${d}`);
  }, []);

  if (HIDDEN.some((p) => pathname.startsWith(p))) return null;

  const year = new Date().getFullYear();

  return (
    <footer style={{ background: "#0d1528" }}>
      {/* Accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />

      <div className="container py-14">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">

          {/* Marca */}
          <div className="space-y-6 lg:pr-6">
            <div className="space-y-1.5">
              <p className="font-heading text-[15px] font-semibold tracking-tight text-white">
                Castellanos Abogados
              </p>
              <p className="text-[13px] leading-relaxed text-white/50">{t.footer.tagline}</p>
            </div>

            <p className="text-xs italic text-white/25">{t.footer.motto}</p>

            <div className="flex items-center gap-2 text-xs text-white/35">
              <LocationIcon />
              <span>{t.footer.location}</span>
            </div>

            <div className="space-y-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/30">
                {t.footer.followUs}
              </p>
              <div className="flex items-center gap-2.5">
                <a
                  href="https://www.facebook.com/profile.php?id=61588299650396&locale=es_LA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1877F2]/90 text-white shadow transition hover:bg-[#1877F2]"
                  aria-label="Facebook"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
                <a
                  href="https://www.instagram.com/castellanos_abogado/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-full text-white shadow transition hover:opacity-90"
                  style={{ background: "linear-gradient(135deg, #FFDC80 0%, #F56040 40%, #833AB4 100%)" }}
                  aria-label="Instagram"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                </a>
              </div>
            </div>
          </div>

          {/* Servicios */}
          <div className="space-y-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/30">
              {t.footer.services}
            </p>
            <ul className="space-y-2.5">
              {SERVICE_SLUGS.map((slug) => (
                <li key={slug}>
                  <Link
                    href={`/servicios/${slug}`}
                    className="text-[13px] text-white/55 transition hover:text-white"
                  >
                    {t.header.serviceNames[slug]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Accesos rápidos */}
          <div className="space-y-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/30">
              {t.footer.quickLinks}
            </p>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map(({ href, labelKey }) => (
                <li key={href}>
                  <Link href={href} className="text-[13px] text-white/55 transition hover:text-white">
                    {t.nav[labelKey]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div className="space-y-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/30">
              {t.footer.contact}
            </p>
            <div className="space-y-3">
              <a
                href={`tel:+${contactConfig.whatsapp}`}
                className="flex items-center gap-2.5 text-[13px] text-white/60 transition hover:text-white"
              >
                <PhoneIcon />
                {contactConfig.whatsappDisplay.replace("+57 ", "")}
              </a>

              {visibleEmail && (
                <a
                  href={`mailto:${visibleEmail}`}
                  className="block break-all text-[13px] text-white/50 transition hover:text-white"
                >
                  {visibleEmail}
                </a>
              )}

              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-2.5 rounded-full border border-[#25D366]/30 bg-[#25D366]/10 px-4 py-2.5 text-[12px] font-semibold text-[#4ade80] transition hover:bg-[#25D366]/20"
              >
                <WhatsAppIcon size={14} />
                {t.footer.whatsappCta}
              </a>

              <div className="pt-1 border-t border-white/[0.07] space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/25">{t.footer.hoursLabel}</p>
                <p className="text-[13px] text-white/55">{t.footer.hours}</p>
                <p className="text-[11px] text-white/25">{t.footer.hoursNote}</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Barra inferior */}
      <div className="border-t border-white/[0.07]">
        <div className="container flex flex-col gap-1.5 py-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[11px] text-white/25">
            © {year} Castellanos Abogados · {t.footer.rights}
          </p>
          <p className="text-[11px] text-white/15">
            {t.footer.location}
          </p>
        </div>
      </div>
    </footer>
  );
}

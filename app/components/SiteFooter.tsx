"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { contactConfig } from "@/lib/contactLinks";

const SERVICES = [
  { name: "Penal Personas", href: "/servicios/penal-personas" },
  { name: "Ejecución de Penas", href: "/servicios/ejecucion-penas" },
  { name: "Responsabilidad Penal PJ", href: "/servicios/responsabilidad-penal-pj" },
  { name: "Capacitaciones Penal PJ", href: "/servicios/capacitaciones-penal-pj" },
  { name: "Civil", href: "/servicios/civil" },
  { name: "Familia", href: "/servicios/familia" },
  { name: "Laboral", href: "/servicios/laboral" },
  { name: "Administrativo", href: "/servicios/administrativo" },
];

const HIDDEN = ["/admin", "/cliente", "/portal", "/panel", "/login", "/registro"];

export default function SiteFooter() {
  const pathname = usePathname();
  if (HIDDEN.some((p) => pathname.startsWith(p))) return null;

  return (
    <footer style={{ background: "linear-gradient(180deg, #0c111d 0%, #0e1829 100%)" }}>
      <div className="container grid gap-10 py-12 text-sm sm:grid-cols-3">

        {/* Firma */}
        <div className="space-y-3">
          <p className="font-heading text-base font-semibold text-white">Castellanos Abogados</p>
          <p className="text-white/55">Firma · Asesoría jurídica estratégica integral</p>
          <p className="text-xs text-white/35">Criterio · Control · Tranquilidad</p>
        </div>

        {/* Servicios — 2 columnas */}
        <div className="space-y-3">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/50">Servicios</p>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5">
            {SERVICES.map((s) => (
              <li key={s.href}>
                <Link href={s.href} className="text-white/65 transition hover:text-white">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contacto */}
        <div className="space-y-3">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/50">Contacto</p>
          <ul className="space-y-2">
            <li>
              <a href={`tel:+${contactConfig.whatsapp}`} className="text-white/70 transition hover:text-white">
                {contactConfig.whatsappDisplay.replace("+57 ", "")}
              </a>
            </li>
            <li>
              <a href={`mailto:${contactConfig.email}`} className="break-all text-white/70 transition hover:text-white">
                {contactConfig.email}
              </a>
            </li>
          </ul>
          <div className="border-t border-white/10 pt-4 text-xs text-white/40">
            © {new Date().getFullYear()} Todos los derechos reservados.
          </div>
        </div>

      </div>
    </footer>
  );
}

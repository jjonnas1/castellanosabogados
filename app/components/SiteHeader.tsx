"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Inicio", exact: true },
  { href: "/servicios", label: "Servicios" },
  { href: "/agenda", label: "Agenda" },
  { href: "/contacto", label: "Contacto" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <header className="sitebar">
      <div className="wrap nav">
        <Link href="/" className="logo" aria-label="Castellanos Abogados">
          <strong>Castellanos</strong> <span style={{ opacity: 0.7 }}>Abogados</span>
        </Link>

        <nav aria-label="Principal" style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={isActive(l.href, l.exact) ? "active" : undefined}
              style={{ padding: "8px 14px", borderRadius: 12 }}
            >
              {l.label}
            </Link>
          ))}

          {/* CTA para abogados */}
          <Link href="/trabaja" className="btn btn--ghost" style={{ marginLeft: 8 }}>
            Trabaja con nosotros
          </Link>

          {/* CTA de cliente (mantiene el flujo actual) */}
          <Link href="/agenda" className="btn btn--primary">
            Agendar asesoría
          </Link>

          {/* Acceso futuro a panel (clientes/abogados) */}
          <Link href="/login" className="btn btn--ghost">
            Iniciar sesión
          </Link>
        </nav>
      </div>
    </header>
  );
}

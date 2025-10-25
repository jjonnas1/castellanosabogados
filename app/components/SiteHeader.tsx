// app/components/SiteHeader.tsx
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
        {/* Logo principal */}
        <Link href="/" className="logo" aria-label="Castellanos Abogados">
          <strong>Castellanos</strong>{" "}
          <span style={{ opacity: 0.7 }}>Abogados</span>
        </Link>

        {/* Navegación */}
        <nav
          aria-label="Principal"
          style={{ display: "flex", gap: 8, alignItems: "center" }}
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={isActive(l.href, l.exact) ? "active" : undefined}
              style={{
                padding: "8px 14px",
                borderRadius: 12,
                fontWeight: 500,
              }}
            >
              {l.label}
            </Link>
          ))}

          {/* CTA para abogados */}
          <Link
            href="/trabaja"
            className="btn btn--ghost"
            style={{ marginLeft: 8 }}
          >
            Trabaja con nosotros
          </Link>

          {/* CTA de clientes */}
          <Link href="/agenda" className="btn btn--primary">
            Agendar asesoría
          </Link>

          {/* Acceso general (abogados/clientes) */}
          <Link
            href="/login"
            className="btn btn--ghost"
            style={{ border: "1px solid #e5e9f5" }}
          >
            Iniciar sesión
          </Link>
        </nav>
      </div>
    </header>
  );
}

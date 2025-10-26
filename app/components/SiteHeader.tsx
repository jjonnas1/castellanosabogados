"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Item = { href: string; label: string };

function isActivePath(pathname: string, href: string, exact?: boolean) {
  return exact ? pathname === href : pathname.startsWith(href);
}

function NavLink({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={active ? "active" : undefined}
      style={{ padding: "8px 14px", borderRadius: 12 }}
    >
      {label}
    </Link>
  );
}

function DropMenu({
  label,
  items,
  active,
}: {
  label: string;
  items: Item[];
  active?: boolean;
}) {
  return (
    <details className={`dropdown ${active ? "active" : ""}`}>
      <summary className="dropdown-trigger">
        {label}
        <span className="chev">▾</span>
      </summary>
      <div className="dropdown-panel">
        {items.map((it) => (
          <Link key={it.href} href={it.href} className="dropdown-item">
            {it.label}
          </Link>
        ))}
      </div>
    </details>
  );
}

export default function SiteHeader() {
  const pathname = usePathname();

  const clientesItems: Item[] = [
    { href: "/agenda", label: "Agendar asesoría" },
    { href: "/servicios", label: "Ver servicios" },
    { href: "/contacto", label: "Soporte y contacto" },
    { href: "/clientes/paquetes", label: "Paquetes (próximamente)" },
  ];

  const abogadosItems: Item[] = [
    { href: "/registro/abogado", label: "Registro de abogados" },
    { href: "/login", label: "Acceso / Iniciar sesión" },
    { href: "/panel", label: "Mi panel" },
  ];

  return (
    <header className="sitebar">
      <div className="wrap nav">
        {/* IZQUIERDA: logo + navegación primaria */}
        <div className="nav-left">
          <Link href="/" className="logo" aria-label="Castellanos Abogados">
            <strong>Castellanos</strong>{" "}
            <span style={{ opacity: 0.7 }}>Abogados</span>
          </Link>

          <nav aria-label="Principal" className="nav-main">
            <NavLink
              href="/"
              label="Inicio"
              active={isActivePath(pathname, "/", true)}
            />
            <NavLink
              href="/servicios"
              label="Servicios"
              active={isActivePath(pathname, "/servicios")}
            />
            <NavLink
              href="/contacto"
              label="Contacto"
              active={isActivePath(pathname, "/contacto")}
            />

            <DropMenu
              label="Clientes"
              items={clientesItems}
              active={isActivePath(pathname, "/clientes")}
            />
            <DropMenu
              label="Abogados"
              items={abogadosItems}
              active={isActivePath(pathname, "/abogados") || isActivePath(pathname, "/registro") || isActivePath(pathname, "/panel") || isActivePath(pathname, "/login")}
            />
          </nav>
        </div>

        {/* DERECHA: CTAs separados y balanceados */}
        <div className="nav-right">
          <Link href="/trabaja" className="btn btn--ghost">
            Trabaja con nosotros
          </Link>
          <Link href="/agenda" className="btn btn--primary">
            Agendar asesoría
          </Link>
        </div>
      </div>
    </header>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/", label: "Inicio", exact: true },
  { href: "/servicios", label: "Servicios" },
  { href: "/agenda", label: "Agenda" },
  { href: "/contacto", label: "Contacto" },
];

export default function SiteHeader() {
  const pathname = usePathname() || "/";

  return (
    <header className="site-header">
      <div className="wrap">
        <Link href="/" className="brand">Castellanos <span className="brand-sub">Abogados</span></Link>

        <nav className="nav">
          {nav.map((item) => {
            const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link ${isActive ? "is-active" : ""}`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link href="/agenda" className="btn btn--primary btn--sm">Agendar asesoría</Link>
        </nav>
      </div>
    </header>
  );
}

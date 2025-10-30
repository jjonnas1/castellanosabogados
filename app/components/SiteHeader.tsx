"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient, Session } from "@supabase/supabase-js";

type Item = { href: string; label: string };

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

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

  const [session, setSession] = useState<Session | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session ?? null);
      setLoaded(true);
    })();
    const { data: sub } = supabase.auth.onAuthStateChange((_evt, s) =>
      setSession(s)
    );
    return () => sub.subscription.unsubscribe();
  }, []);

  const clientesItems: Item[] = [
    { href: "/cliente/acceso", label: "Acceso / Panel de cliente" },
  ];

  const abogadosItems: Item[] = [
    { href: "/registro/abogado", label: "Registro de abogados" },
    { href: "/login", label: "Acceso / Iniciar sesión" },
    { href: "/panel", label: "Mi panel" },
  ];

  // HREF del CTA principal según sesión
  const ctaHref = !loaded
    ? "/agenda"
    : session
    ? "/agenda"
    : "/cliente/acceso";

  return (
    <header className="sitebar">
      <div className="wrap nav">
        {/* IZQUIERDA */}
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
              active={isActivePath(pathname, "/cliente")}
            />
            <DropMenu
              label="Abogados"
              items={abogadosItems}
              active={
                isActivePath(pathname, "/abogados") ||
                isActivePath(pathname, "/registro") ||
                isActivePath(pathname, "/panel") ||
                isActivePath(pathname, "/login")
              }
            />
          </nav>
        </div>

        {/* DERECHA: CTAs */}
        <div className="nav-right">
          <Link href="/trabaja" className="btn btn--ghost">
            Trabaja con nosotros
          </Link>
          {/* Siempre visible; decide a dónde envía según sesión */}
          <Link href={ctaHref} className="btn btn--primary">
            Agendar asesoría
          </Link>
        </div>
      </div>
    </header>
  );
}

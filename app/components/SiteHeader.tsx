"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

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
  const router = useRouter();
  const [hasSession, setHasSession] = useState<boolean>(false);

  useEffect(() => {
    let mounted = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setHasSession(!!data.session);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      setHasSession(!!s);
    });
    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  // Menú “Clientes”: acceso, registro y panel del cliente
  const clientesItems: Item[] = [
    { href: "/cliente/acceso", label: "Iniciar sesión" },
    { href: "/cliente/registro", label: "Registrarme" },
    { href: "/cliente/panel", label: "Mi panel" },
  ];

  // Menú “Abogados”: acceso, registro y panel profesional
  const abogadosItems: Item[] = [
    { href: "/abogados/acceso", label: "Iniciar sesión (abogados)" },
    { href: "/abogados/registro", label: "Registro de abogados" },
    { href: "/panel", label: "Mi panel (abogado)" },
  ];

  // CTA de “Agendar”: si no hay sesión → lleva a /cliente/acceso, si la hay → /agenda
  function goAgenda() {
    if (hasSession) router.push("/agenda");
    else router.push("/cliente/acceso");
  }

  return (
    <header className="sitebar">
      <div className="wrap nav">
        {/* IZQUIERDA: logo + navegación primaria */}
        <div className="nav-left" style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <Link href="/" className="logo" aria-label="Castellanos Abogados">
            <strong>Castellanos</strong>{" "}
            <span style={{ opacity: 0.7 }}>Abogados</span>
          </Link>

          <nav aria-label="Principal" className="nav-main" style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <NavLink
              href="/"
              label="Inicio"
              active={isActivePath(pathname, "/", true)}
            />
            <NavLink
              href="/contacto"
              label="Contacto"
              active={isActivePath(pathname, "/contacto")}
            />
            <DropMenu
              label="Clientes"
              items={clientesItems}
              active={
                isActivePath(pathname, "/cliente") ||
                isActivePath(pathname, "/clientes")
              }
            />
            <DropMenu
              label="Abogados"
              items={abogadosItems}
              active={
                isActivePath(pathname, "/abogados") ||
                isActivePath(pathname, "/panel") ||
                isActivePath(pathname, "/registro")
              }
            />
          </nav>
        </div>

        {/* DERECHA: CTAs claros */}
        <div className="nav-right" style={{ display: "flex", gap: 8 }}>
          <Link href="/trabaja" className="btn btn--ghost">
            Trabaja con nosotros
          </Link>
          <button className="btn btn--primary" onClick={goAgenda}>
            Agendar asesoría
          </button>
        </div>
      </div>
    </header>
  );
}

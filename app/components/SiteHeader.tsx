"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

function isActive(path: string, href: string, exact?: boolean) {
  return exact ? path === href : path.startsWith(href);
}

function NavLink(props: { href: string; label: string; active?: boolean }) {
  return (
    <Link
      href={props.href}
      className={props.active ? "active" : undefined}
      style={{ padding: "8px 14px", borderRadius: 12 }}
    >
      {props.label}
    </Link>
  );
}

export default function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [role, setRole] = useState<"client" | "lawyer" | "admin" | null>(null);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      const user = data.user ?? null;
      setUserEmail(user?.email ?? null);

      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .single();
        setRole((profile?.role as any) ?? "client");
      }
      setLoading(false);
    })();
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <header className="sitebar">
      <div className="wrap nav">
        <div className="nav-left">
          <Link href="/" className="logo" aria-label="Castellanos Abogados">
            <strong>Castellanos</strong> <span style={{ opacity: .7 }}>Abogados</span>
          </Link>

          <nav aria-label="Principal" className="nav-main">
            <NavLink href="/" label="Inicio" active={isActive(pathname, "/", true)} />
            <NavLink href="/servicios" label="Servicios" active={isActive(pathname, "/servicios")} />
            <NavLink href="/contacto" label="Contacto" active={isActive(pathname, "/contacto")} />

            {/* CLIENTES */}
            <details className={`dropdown ${isActive(pathname, "/cliente") ? "active": ""}`}>
              <summary className="dropdown-trigger">
                Clientes <span className="chev">▾</span>
              </summary>
              <div className="dropdown-panel">
                {!loading && !userEmail && (
                  <>
                    <Link href="/cliente/registro" className="dropdown-item">Registrarse</Link>
                    <Link href="/cliente/login" className="dropdown-item">Iniciar sesión</Link>
                  </>
                )}
                {!loading && userEmail && (
                  <>
                    <Link href="/cliente/panel" className="dropdown-item">Mi panel</Link>
                    <button onClick={logout} className="dropdown-item" style={{ textAlign:"left" }}>
                      Cerrar sesión
                    </button>
                  </>
                )}
              </div>
            </details>

            {/* ABOGADOS */}
            <details className={`dropdown ${isActive(pathname, "/panel") || isActive(pathname, "/login") || isActive(pathname, "/registro") ? "active": ""}`}>
              <summary className="dropdown-trigger">
                Abogados <span className="chev">▾</span>
              </summary>
              <div className="dropdown-panel">
                <Link href="/registro/abogado" className="dropdown-item">Registro de abogados</Link>
                <Link href="/login" className="dropdown-item">Acceso / Iniciar sesión</Link>
                <Link href="/panel" className="dropdown-item">Mi panel</Link>
              </div>
            </details>
          </nav>
        </div>

        <div className="nav-right">
          <Link href="/trabaja" className="btn btn--ghost">Trabaja con nosotros</Link>
          <Link href="/agenda" className="btn btn--primary">Agendar asesoría</Link>
        </div>
      </div>
    </header>
  );
}

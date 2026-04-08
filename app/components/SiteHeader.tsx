"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { buildMailtoUrl } from "@/lib/contactLinks";
import { getProfileRoleByUserId, type AppRole } from "@/lib/profile-role";
import { supabase } from "@/lib/supabase-browser";

type NavItem = {
  label: string;
  href: string;
  highlight?: boolean;
  children?: Array<{ label: string; href: string }>;
};

const NAV_ITEMS: NavItem[] = [
  {
    label: "Servicios",
    href: "/servicios",
    children: [
      { label: "Penal Personas", href: "/servicios/penal-personas" },
      { label: "Ejecución de Penas", href: "/servicios/ejecucion-penas" },
      { label: "Responsabilidad Penal PJ", href: "/servicios/responsabilidad-penal-pj" },
      { label: "Capacitaciones Penal PJ", href: "/servicios/capacitaciones-penal-pj" },
      { label: "Civil", href: "/servicios/civil" },
      { label: "Familia", href: "/servicios/familia" },
      { label: "Laboral", href: "/servicios/laboral" },
      { label: "Administrativo", href: "/servicios/administrativo" },
    ],
  },
  { label: "Tutelas", href: "/tutela", highlight: true },
  { label: "Blog", href: "/blog" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Contacto", href: "/contacto" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const servicesMenuId = useId();
  const mobileServicesId = useId();
  const servicesRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [role, setRole] = useState<AppRole>(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname?.startsWith(href));

  const isServicesActive = () =>
    !!pathname?.startsWith("/servicios");

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (!servicesRef.current?.contains(e.target as Node)) setServicesOpen(false);
    };
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setServicesOpen(false); setMobileServicesOpen(false); setOpen(false); }
    };
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onEscape);
    return () => { document.removeEventListener("mousedown", onClickOutside); document.removeEventListener("keydown", onEscape); };
  }, []);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.auth.getSession();
      const user = data.session?.user;
      if (!user) { setLoggedIn(false); setRole(null); return; }
      setLoggedIn(true);
      setRole(await getProfileRoleByUserId(user.id));
    };
    load();
    const { data: sub } = supabase.auth.onAuthStateChange(load);
    return () => sub.subscription.unsubscribe();
  }, []);

  const logout = async () => { await supabase.auth.signOut(); router.push("/login"); };
  const panelHref = role === "admin" ? "/admin" : "/cliente";

  const mailtoHref = buildMailtoUrl({
    area: "Contacto general",
    source: "Header",
    subject: "Solicitud de evaluación",
    message: "Hola, quisiera solicitar una evaluación estratégica.",
  });

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-white/95 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between gap-6">

        {/* Logo */}
        <Link href="/" className="shrink-0 font-heading text-[15px] font-semibold tracking-tight text-ink">
          Castellanos Abogados
        </Link>

        {/* Nav — desktop */}
        <nav className="hidden flex-1 items-center justify-center gap-7 text-[13.5px] font-medium text-muted md:flex">
          {NAV_ITEMS.map((item) => {
            if (item.children) {
              return (
                <div key={item.label} className="relative" ref={servicesRef}>
                  <button
                    type="button"
                    aria-expanded={servicesOpen}
                    aria-controls={servicesMenuId}
                    onClick={() => setServicesOpen((v) => !v)}
                    className={`inline-flex items-center gap-1.5 transition-colors hover:text-ink ${isServicesActive() ? "text-ink" : ""}`}
                  >
                    {item.label}
                    <svg className={`h-3 w-3 transition-transform ${servicesOpen ? "rotate-180" : ""}`} viewBox="0 0 12 8" fill="none" aria-hidden>
                      <path d="M1 1.5 6 6.5 11 1.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  {servicesOpen && (
                    <div id={servicesMenuId} className="absolute left-1/2 top-full mt-3 w-64 -translate-x-1/2 rounded-2xl border border-border bg-white p-2 shadow-lg">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setServicesOpen(false)}
                          className={`block rounded-xl px-3 py-2 text-[13px] transition hover:bg-subtle hover:text-ink ${isActive(child.href) ? "bg-subtle text-ink" : "text-muted"}`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }
            if (item.highlight) {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-full bg-[#7b1e2b] px-3.5 py-1.5 text-[13px] font-semibold text-white transition hover:bg-[#6a1624]"
                >
                  {item.label}
                </Link>
              );
            }
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`transition-colors hover:text-ink ${isActive(item.href) ? "text-ink" : ""}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Actions — desktop */}
        <div className="hidden shrink-0 items-center gap-3 md:flex">
          {loggedIn ? (
            <>
              <Link
                href={panelHref}
                className="inline-flex h-9 w-36 items-center justify-center rounded-full bg-ink text-[13px] font-semibold text-white transition hover:bg-ink/85"
              >
                {role === "admin" ? "Panel admin" : "Área cliente"}
              </Link>
              <button
                type="button"
                onClick={logout}
                className="inline-flex h-9 w-36 items-center justify-center rounded-full border border-border text-[13px] font-semibold text-ink transition hover:border-ink"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <a
                href={mailtoHref}
                className="inline-flex h-9 w-44 items-center justify-center rounded-full bg-ink text-[13px] font-semibold text-white transition hover:bg-ink/85"
              >
                Solicitar evaluación
              </a>
              <Link
                href="/cliente/login"
                className="inline-flex h-9 w-36 items-center justify-center rounded-full border border-border text-[13px] font-semibold text-ink transition hover:border-ink"
              >
                Área cliente
              </Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => { setOpen((v) => !v); setServicesOpen(false); setMobileServicesOpen(false); }}
          aria-label="Abrir menú"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-white text-ink transition hover:shadow-soft md:hidden"
        >
          <div className="flex h-3.5 flex-col justify-between">
            <span className="block h-px w-5 bg-ink" />
            <span className="block h-px w-5 bg-ink" />
            <span className="block h-px w-5 bg-ink" />
          </div>
        </button>
      </div>

      {/* Mobile nav */}
      {open && (
        <div className="border-t border-border/60 bg-white/98 backdrop-blur-md md:hidden">
          <div className="container flex flex-col gap-1 py-4">
            {/* Servicios dropdown */}
            <button
              type="button"
              onClick={() => setMobileServicesOpen((v) => !v)}
              aria-expanded={mobileServicesOpen}
              aria-controls={mobileServicesId}
              className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium text-muted transition hover:bg-subtle hover:text-ink"
            >
              <span className={isServicesActive() ? "text-ink" : ""}>Servicios</span>
              <svg className={`h-3 w-3 transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`} viewBox="0 0 12 8" fill="none" aria-hidden>
                <path d="M1 1.5 6 6.5 11 1.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {mobileServicesOpen && (
              <div id={mobileServicesId} className="ml-3 flex flex-col gap-1 border-l border-border pl-3">
                {NAV_ITEMS.find((i) => i.children)?.children?.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    onClick={() => { setOpen(false); setMobileServicesOpen(false); }}
                    className={`rounded-xl px-3 py-2 text-sm transition hover:bg-subtle hover:text-ink ${isActive(child.href) ? "bg-subtle text-ink" : "text-muted"}`}
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            )}

            {NAV_ITEMS.filter((i) => !i.children).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={
                  item.highlight
                    ? "mx-0 mt-1 rounded-xl bg-[#7b1e2b] px-3 py-2.5 text-sm font-semibold text-white"
                    : `rounded-xl px-3 py-2.5 text-sm font-medium transition hover:bg-subtle hover:text-ink ${isActive(item.href) ? "bg-subtle text-ink" : "text-muted"}`
                }
              >
                {item.label}
              </Link>
            ))}

            <div className="mt-3 flex flex-col gap-2 border-t border-border pt-3">
              {loggedIn ? (
                <>
                  <Link href={panelHref} onClick={() => setOpen(false)} className="rounded-xl bg-ink px-4 py-2.5 text-center text-sm font-semibold text-white">
                    {role === "admin" ? "Panel admin" : "Área cliente"}
                  </Link>
                  <button type="button" onClick={async () => { setOpen(false); await logout(); }} className="rounded-xl border border-border px-4 py-2.5 text-sm font-semibold text-muted">
                    Cerrar sesión
                  </button>
                </>
              ) : (
                <>
                  <a href={mailtoHref} onClick={() => setOpen(false)} className="rounded-xl bg-ink px-4 py-2.5 text-center text-sm font-semibold text-white">
                    Solicitar evaluación
                  </a>
                  <Link href="/cliente/login" onClick={() => setOpen(false)} className="rounded-xl border border-border px-4 py-2.5 text-center text-sm font-semibold text-ink">
                    Área cliente
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

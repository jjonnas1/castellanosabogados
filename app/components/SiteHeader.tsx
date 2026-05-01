"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { buildMailtoUrl, buildWhatsAppUrl, contactConfig } from "@/lib/contactLinks";
import { getProfileRoleByUserId, type AppRole } from "@/lib/profile-role";
import { supabase } from "@/lib/supabase-browser";

// ── Mega-menu data ──────────────────────────────────────────────────────────

const MEGA_GROUPS = [
  {
    label: "Para personas",
    services: [
      {
        slug: "penal-personas",
        name: "Penal Personas",
        desc: "Defensa e investigación penal para personas naturales.",
        for: "Personas imputadas o investigadas",
      },
      {
        slug: "ejecucion-penas",
        name: "Ejecución de Penas",
        desc: "Redenciones, prisión domiciliaria y libertad condicional.",
        for: "Personas privadas de la libertad",
      },
      {
        slug: "civil",
        name: "Civil",
        desc: "Conflictos patrimoniales, contratos y obligaciones.",
        for: "Personas y familias",
      },
      {
        slug: "familia",
        name: "Familia",
        desc: "Custodia, alimentos, divorcio y protección familiar.",
        for: "Familias en conflicto",
      },
      {
        slug: "laboral",
        name: "Laboral",
        desc: "Defensa en controversias laborales y prestaciones sociales.",
        for: "Trabajadores y empleadores",
      },
      {
        slug: "administrativo",
        name: "Administrativo",
        desc: "Recursos ante entidades públicas y jurisdicción contenciosa.",
        for: "Ciudadanos y empresas",
      },
    ],
  },
  {
    label: "Para empresas",
    services: [
      {
        slug: "responsabilidad-penal-pj",
        name: "Responsabilidad Penal PJ",
        desc: "Prevención y defensa penal para personas jurídicas y juntas.",
        for: "Empresas y directivos",
      },
      {
        slug: "capacitaciones-penal-pj",
        name: "Capacitaciones Penal PJ",
        desc: "Formación en prevención y trazabilidad penal corporativa.",
        for: "Comités de cumplimiento y órganos de control",
      },
    ],
  },
];

const PLAIN_NAV = [
  { label: "Tutelas", href: "/tutela", highlight: true },
  { label: "Metodología", href: "/metodologia" },
  { label: "Blog", href: "/blog" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Contacto", href: "/contacto" },
];

// ── Mega-menu panel (desktop) ───────────────────────────────────────────────

function MegaMenuPanel({
  id,
  onClose,
  mailtoHref,
}: {
  id: string;
  onClose: () => void;
  mailtoHref: string;
}) {
  return (
    <div
      id={id}
      role="region"
      aria-label="Menú de servicios"
      className="absolute left-1/2 top-full z-50 mt-2 w-[820px] -translate-x-1/2 overflow-hidden rounded-2xl border border-border bg-white shadow-[0_24px_64px_rgba(13,21,40,.14)]"
    >
      <div className="flex">
        {/* Left: service groups */}
        <div className="flex-1 p-5 space-y-5">
          {MEGA_GROUPS.map((group) => (
            <div key={group.label}>
              <p className="mb-2 px-2 text-[10px] font-bold uppercase tracking-[0.18em] text-muted">
                {group.label}
              </p>
              <div
                className={
                  group.services.length >= 4
                    ? "grid grid-cols-2 gap-0.5"
                    : "grid grid-cols-1 gap-0.5"
                }
              >
                {group.services.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/servicios/${s.slug}`}
                    onClick={onClose}
                    className="group flex flex-col gap-0.5 rounded-xl px-3 py-2.5 transition hover:bg-canvas"
                  >
                    <span className="text-[13px] font-semibold text-ink">
                      {s.name}
                    </span>
                    <span className="text-[11px] text-muted leading-snug">
                      {s.desc}
                    </span>
                    <span className="hidden text-[10px] font-medium text-accent group-hover:block">
                      Para: {s.for}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}

          <div className="border-t border-border pt-3 px-2">
            <p className="text-[12px] text-muted">
              ¿No encuentra su área?{" "}
              <a
                href={mailtoHref}
                onClick={onClose}
                className="font-semibold text-accent underline underline-offset-2 hover:text-accent-strong"
              >
                Consultar directamente →
              </a>
            </p>
          </div>
        </div>

        {/* Right: Tutelas destacado + acceso cliente */}
        <div className="flex w-[200px] shrink-0 flex-col gap-3 border-l border-border bg-[#fafafa] p-5">
          <Link
            href="/tutela"
            onClick={onClose}
            className="flex flex-col gap-2 rounded-2xl bg-[#7b1e2b] p-4 text-white transition hover:bg-[#6a1624]"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/70">
              Destacado
            </span>
            <span className="font-heading text-base font-semibold leading-snug">
              Tutelas
            </span>
            <span className="text-[12px] leading-snug text-white/85">
              Protección de derechos ante EPS, entidades públicas y privadas.
            </span>
            <span className="mt-1 inline-flex w-fit items-center gap-1 rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-semibold text-white">
              ⚡ Fallo en 10 días hábiles
            </span>
          </Link>

          <Link
            href="/cliente/login"
            onClick={onClose}
            className="block w-full rounded-xl border border-border bg-white px-3 py-2.5 text-center text-[13px] font-semibold text-ink transition hover:border-ink hover:bg-subtle"
          >
            Área cliente
          </Link>
        </div>
      </div>
    </div>
  );
}

// ── Main header ─────────────────────────────────────────────────────────────

export default function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const megaMenuId = useId();
  const mobileServicesId = useId();
  const megaRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [role, setRole] = useState<AppRole>(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname?.startsWith(href));

  const isServicesActive = () => !!pathname?.startsWith("/servicios");

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (!megaRef.current?.contains(e.target as Node)) setMegaOpen(false);
    };
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMegaOpen(false);
        setMobileServicesOpen(false);
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onEscape);
    };
  }, []);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.auth.getSession();
      const user = data.session?.user;
      if (!user) {
        setLoggedIn(false);
        setRole(null);
        return;
      }
      setLoggedIn(true);
      setRole(await getProfileRoleByUserId(user.id));
    };
    load();
    const { data: sub } = supabase.auth.onAuthStateChange(load);
    return () => sub.subscription.unsubscribe();
  }, []);

  // Close mega-menu on route change
  useEffect(() => {
    setMegaOpen(false);
    setOpen(false);
    setMobileServicesOpen(false);
  }, [pathname]);

  const logout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const panelHref = role === "admin" ? "/admin" : "/cliente";

  const mailtoHref = buildMailtoUrl({
    area: "Contacto general",
    source: "Header",
    subject: "Solicitud de evaluación",
    message: "Hola, quisiera solicitar una evaluación estratégica.",
  });

  const whatsappHref = buildWhatsAppUrl({
    area: "Contacto general",
    source: "Header",
    message: "Hola, quisiera solicitar una evaluación estratégica.",
  });

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-white/95 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between gap-6">

        {/* Logo */}
        <Link
          href="/"
          className="group shrink-0 flex items-center gap-3"
          aria-label="Castellanos Abogados — Inicio"
        >
          {/* Monograma */}
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-ink transition group-hover:bg-accent-strong">
            <svg viewBox="0 0 512 512" className="h-[18px] w-[18px]" aria-hidden fill="none">
              <path d="M128 176h256v24H128zm42 72h172v24H170z" fill="white"/>
              <circle cx="256" cy="128" r="52" stroke="white" strokeWidth="24" fill="none"/>
              <path d="M158 312h196l28 72H130z" fill="rgba(255,255,255,0.55)"/>
            </svg>
          </div>
          {/* Nombre completo — una sola línea, legible */}
          <span className="font-heading text-[17px] font-semibold tracking-tight text-ink">
            Castellanos Abogados
          </span>
        </Link>

        {/* Nav — desktop */}
        <nav
          className="hidden flex-1 items-center justify-center gap-7 text-[13.5px] font-medium text-muted md:flex"
          aria-label="Navegación principal"
        >
          {/* Servicios — mega-menu trigger */}
          <div className="relative" ref={megaRef}>
            <button
              type="button"
              aria-expanded={megaOpen}
              aria-controls={megaMenuId}
              aria-haspopup="true"
              onClick={() => setMegaOpen((v) => !v)}
              className={`inline-flex items-center gap-1.5 transition-colors hover:text-ink ${
                isServicesActive() ? "text-ink" : ""
              }`}
            >
              Servicios
              <svg
                className={`h-3 w-3 transition-transform ${megaOpen ? "rotate-180" : ""}`}
                viewBox="0 0 12 8"
                fill="none"
                aria-hidden
              >
                <path
                  d="M1 1.5 6 6.5 11 1.5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {megaOpen && (
              <MegaMenuPanel
                id={megaMenuId}
                onClose={() => setMegaOpen(false)}
                mailtoHref={mailtoHref}
              />
            )}
          </div>

          {/* Plain nav items */}
          {PLAIN_NAV.map((item) => {
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
                className={`transition-colors hover:text-ink ${
                  isActive(item.href) ? "text-ink" : ""
                }`}
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
              <Link
                href="/cliente/login"
                className="inline-flex h-9 items-center justify-center rounded-full bg-ink px-5 text-[13px] font-semibold text-white transition hover:bg-ink/85"
              >
                Área cliente
              </Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => {
            setOpen((v) => !v);
            setMegaOpen(false);
            setMobileServicesOpen(false);
          }}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-white text-ink transition hover:shadow-soft md:hidden"
        >
          <div className="flex h-3.5 flex-col justify-between" aria-hidden>
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

            {/* Servicios dropdown (mobile) */}
            <button
              type="button"
              onClick={() => setMobileServicesOpen((v) => !v)}
              aria-expanded={mobileServicesOpen}
              aria-controls={mobileServicesId}
              className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium text-muted transition hover:bg-subtle hover:text-ink"
            >
              <span className={isServicesActive() ? "text-ink" : ""}>
                Servicios
              </span>
              <svg
                className={`h-3 w-3 transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`}
                viewBox="0 0 12 8"
                fill="none"
                aria-hidden
              >
                <path
                  d="M1 1.5 6 6.5 11 1.5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {mobileServicesOpen && (
              <div
                id={mobileServicesId}
                className="ml-3 flex flex-col gap-3 border-l border-border pl-3"
              >
                {MEGA_GROUPS.map((group) => (
                  <div key={group.label}>
                    <p className="mb-1 px-1 text-[10px] font-bold uppercase tracking-[0.14em] text-muted">
                      {group.label}
                    </p>
                    {group.services.map((s) => (
                      <Link
                        key={s.slug}
                        href={`/servicios/${s.slug}`}
                        onClick={() => {
                          setOpen(false);
                          setMobileServicesOpen(false);
                        }}
                        className={`block rounded-xl px-3 py-2 text-sm transition hover:bg-subtle hover:text-ink ${
                          isActive(`/servicios/${s.slug}`)
                            ? "bg-subtle text-ink"
                            : "text-muted"
                        }`}
                      >
                        {s.name}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            )}

            {PLAIN_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={
                  item.highlight
                    ? "mx-0 mt-1 rounded-xl bg-[#7b1e2b] px-3 py-2.5 text-sm font-semibold text-white"
                    : `rounded-xl px-3 py-2.5 text-sm font-medium transition hover:bg-subtle hover:text-ink ${
                        isActive(item.href) ? "bg-subtle text-ink" : "text-muted"
                      }`
                }
              >
                {item.label}
              </Link>
            ))}

            <div className="mt-3 flex flex-col gap-2 border-t border-border pt-3">
              {loggedIn ? (
                <>
                  <Link
                    href={panelHref}
                    onClick={() => setOpen(false)}
                    className="rounded-xl bg-ink px-4 py-2.5 text-center text-sm font-semibold text-white"
                  >
                    {role === "admin" ? "Panel admin" : "Área cliente"}
                  </Link>
                  <button
                    type="button"
                    onClick={async () => {
                      setOpen(false);
                      await logout();
                    }}
                    className="rounded-xl border border-border px-4 py-2.5 text-sm font-semibold text-muted"
                  >
                    Cerrar sesión
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/cliente/login"
                    onClick={() => setOpen(false)}
                    className="rounded-xl bg-ink px-4 py-2.5 text-center text-sm font-semibold text-white"
                  >
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

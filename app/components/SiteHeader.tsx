"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "./LanguageProvider";

export default function SiteHeader() {
  const pathname = usePathname();
  const { locale, setLocale, messages } = useLanguage();
  const [open, setOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const closeTimer = useRef<NodeJS.Timeout | null>(null);

  const navLinks = useMemo(
    () => [
      { href: "/", label: messages.navigation.home },
      {
        label: messages.navigation.business,
        children: [
          { href: "/penal-empresarial", label: messages.navigation.services },
          { href: "/contacto", label: messages.navigation.contact },
        ],
      },
      {
        label: messages.navigation.people,
        children: [
          { href: "/personas", label: messages.navigation.services },
          { href: "/asesoria-personas", label: messages.navigation.advisory },
          { href: "/registro", label: messages.navigation.register },
          { href: "/login", label: messages.navigation.login },
        ],
      },
      { href: "/a-quien-servimos", label: messages.navigation.about },
      { href: "/contacto", label: messages.navigation.contact },
    ],
    [messages.navigation],
  );

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href));

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenDropdown(null);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleOpen = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenDropdown(label);
  };

  const handleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 240);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-white/90 backdrop-blur">
      <div className="container flex h-20 items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex flex-col leading-tight">
            <span className="text-base font-heading font-semibold text-ink">Castellanos Abogados</span>
            <span className="text-[11px] uppercase tracking-[0.22em] text-muted">
              Riesgo penal · decisiones críticas
            </span>
          </div>
          <span className="hidden rounded-full bg-subtle px-3 py-1 text-[11px] font-semibold text-ink/80 ring-1 ring-border lg:inline-flex">
            Contratación estatal · juntas · crisis
          </span>
        </div>

        <nav className="hidden items-center gap-6 text-sm font-medium text-muted md:flex">
          {navLinks.map((item) =>
            item.children ? (
              <div
                key={item.label}
                className="group relative"
                onMouseEnter={() => handleOpen(item.label)}
                onMouseLeave={handleClose}
                onFocus={() => handleOpen(item.label)}
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget as Node)) handleClose();
                }}
              >
                <button
                  type="button"
                  className="flex items-center gap-1 transition hover:text-ink"
                  aria-haspopup="true"
                  aria-expanded={openDropdown === item.label}
                  onClick={() =>
                    setOpenDropdown((current) => (current === item.label ? null : item.label))
                  }
                >
                  {item.label}
                  <span className="text-xs text-muted">▾</span>
                </button>
                <div
                  className={`pointer-events-auto absolute left-0 top-full z-40 mt-2 min-w-[220px] flex-col gap-1 rounded-2xl border border-border bg-white/95 p-3 shadow-soft transition ${
                    openDropdown === item.label ? "flex" : "hidden"
                  }`}
                  onMouseEnter={() => handleOpen(item.label)}
                  onMouseLeave={handleClose}
                >
                  <div className="absolute -top-2 left-0 h-3 w-full" aria-hidden />
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      className={`rounded-xl px-3 py-2 text-left transition hover:bg-subtle hover:text-ink ${
                        isActive(child.href) ? "bg-subtle text-ink" : ""
                      }`}
                      href={child.href}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                className={`group relative transition hover:text-ink ${
                  isActive(item.href) ? "text-ink" : ""
                }`}
                href={item.href}
              >
                {item.label}
                <span
                  className={`absolute -bottom-2 left-0 h-[2px] bg-ink transition-all duration-200 ${
                    isActive(item.href) ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/agenda" className="hidden btn-primary md:inline-flex">
            Solicitar evaluación
          </Link>
          <Link
            href="/cliente/acceso"
            className="btn-secondary border-transparent bg-white/70 px-4 py-2 text-sm font-semibold hover:border-accent-700"
          >
            {messages.navigation.signIn}
          </Link>
          <Link
            href="/asesoria-personas"
            className="hidden text-sm font-semibold text-muted underline-offset-4 transition hover:text-ink md:inline-flex"
          >
            {messages.navigation.peopleAdvisory}
          </Link>
          <div className="hidden items-center gap-1 rounded-full border border-border bg-white/80 px-2 py-1 text-xs font-semibold text-ink shadow-soft md:flex">
            <button
              type="button"
              className={`rounded-full px-2 py-1 transition ${
                locale === "es" ? "bg-subtle text-ink" : "text-muted hover:text-ink"
              }`}
              onClick={() => setLocale("es")}
              aria-pressed={locale === "es"}
            >
              ES
            </button>
            <span className="text-muted">|</span>
            <button
              type="button"
              className={`rounded-full px-2 py-1 transition ${
                locale === "en" ? "bg-subtle text-ink" : "text-muted hover:text-ink"
              }`}
              onClick={() => setLocale("en")}
              aria-pressed={locale === "en"}
            >
              EN
            </button>
          </div>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-ink transition hover:-translate-y-[1px] hover:shadow-soft md:hidden"
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Abrir menú"
          >
            <span className="sr-only">Menú</span>
            <div className="flex h-3 flex-col justify-between">
              <span className="block h-0.5 w-5 rounded-full bg-ink" />
              <span className="block h-0.5 w-5 rounded-full bg-ink" />
              <span className="block h-0.5 w-5 rounded-full bg-ink" />
            </div>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border/70 bg-white/95 backdrop-blur md:hidden">
          <div className="container flex flex-col gap-3 py-4 text-sm font-medium text-muted">
            {navLinks.map((item) =>
              item.children ? (
                <div key={item.label} className="rounded-xl bg-subtle px-3 py-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ink">{item.label}</p>
                  <div className="mt-2 flex flex-col gap-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={`rounded-lg px-2 py-2 transition hover:bg-white ${
                          isActive(child.href) ? "bg-white text-ink" : ""
                        }`}
                        onClick={() => setOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-xl px-3 py-2 transition hover:bg-subtle hover:text-ink ${
                    isActive(item.href) ? "bg-subtle text-ink" : ""
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ),
            )}
            <Link
              href="/asesoria-personas"
              className="rounded-xl px-3 py-2 text-ink transition hover:bg-subtle"
              onClick={() => setOpen(false)}
            >
              {messages.navigation.peopleAdvisory}
            </Link>
            <Link
              href="/agenda"
              className="btn-primary w-full justify-center"
              onClick={() => setOpen(false)}
            >
              Solicitar evaluación
            </Link>
            <Link
              href="/cliente/acceso"
              className="btn-secondary w-full justify-center"
              onClick={() => setOpen(false)}
            >
              {messages.navigation.signIn}
            </Link>
            <div className="flex items-center justify-between rounded-xl bg-subtle px-3 py-2 text-xs font-semibold text-ink">
              <span>Idioma</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className={`rounded-full px-3 py-1 transition ${
                    locale === "es" ? "bg-white text-ink shadow-soft" : "text-muted hover:text-ink"
                  }`}
                  onClick={() => setLocale("es")}
                  aria-pressed={locale === "es"}
                >
                  ES
                </button>
                <button
                  type="button"
                  className={`rounded-full px-3 py-1 transition ${
                    locale === "en" ? "bg-white text-ink shadow-soft" : "text-muted hover:text-ink"
                  }`}
                  onClick={() => setLocale("en")}
                  aria-pressed={locale === "en"}
                >
                  EN
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

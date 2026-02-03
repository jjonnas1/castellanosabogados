"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "./LanguageProvider";

export default function SiteHeader() {
  const pathname = usePathname();
  const { locale, setLocale, messages } = useLanguage();
  const [open, setOpen] = useState(false);

  const navLinks = useMemo(
    () => [
      { href: "/", label: messages.navigation.home },
      { href: "/penal-empresarial", label: messages.navigation.business },
      { href: "/personas", label: messages.navigation.people },
      { href: "/metodologia", label: messages.navigation.methodology },
      { href: "/a-quien-servimos", label: messages.navigation.about },
      { href: "/contacto", label: messages.navigation.contact },
    ],
    [messages.navigation],
  );

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-surface/90 backdrop-blur">
      <div className="container flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="flex flex-col leading-tight">
            <span className="text-base font-heading font-semibold text-ink">Castellanos Abogados</span>
            <span className="text-[10px] uppercase tracking-[0.18em] text-muted">Riesgo penal preventivo</span>
          </div>
        </div>

        <nav className="hidden items-center gap-5 text-sm font-medium text-muted md:flex">
          {navLinks.map((item) => (
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
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/agenda" className="hidden btn-primary md:inline-flex">
            {messages.home.hero.ctaPrimary}
          </Link>
          <div className="hidden items-center gap-1 rounded-[14px] border border-border bg-white/80 px-2 py-1 text-xs font-semibold text-ink shadow-soft md:flex">
            <button
              type="button"
              className={`rounded-[14px] px-2 py-1 transition ${
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
              className={`rounded-[14px] px-2 py-1 transition ${
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
            className="inline-flex h-10 w-10 items-center justify-center rounded-[14px] border border-border bg-white text-ink transition hover:-translate-y-[1px] hover:shadow-soft md:hidden"
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Abrir menú"
          >
            <span className="sr-only">Menú</span>
            <div className="flex h-3 flex-col justify-between">
              <span className="block h-0.5 w-5 rounded-[14px] bg-ink" />
              <span className="block h-0.5 w-5 rounded-[14px] bg-ink" />
              <span className="block h-0.5 w-5 rounded-[14px] bg-ink" />
            </div>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border/70 bg-surface/95 backdrop-blur md:hidden">
          <div className="container flex flex-col gap-3 py-4 text-sm font-medium text-muted">
            {navLinks.map((item) => (
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
            ))}
            <Link
              href="/agenda"
              className="btn-primary w-full justify-center"
              onClick={() => setOpen(false)}
            >
              {messages.home.hero.ctaPrimary}
            </Link>
            <div className="flex items-center justify-between rounded-xl bg-subtle px-3 py-2 text-xs font-semibold text-ink">
              <span>{messages.navigation.language}</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className={`rounded-[14px] px-3 py-1 transition ${
                    locale === "es" ? "bg-white text-ink shadow-soft" : "text-muted hover:text-ink"
                  }`}
                  onClick={() => setLocale("es")}
                  aria-pressed={locale === "es"}
                >
                  ES
                </button>
                <button
                  type="button"
                  className={`rounded-[14px] px-3 py-1 transition ${
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

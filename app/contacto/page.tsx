"use client";

import { useState } from "react";
import Link from "next/link";

import SiteHeader from "@/app/components/SiteHeader";
import { useLanguage } from "../components/LanguageProvider";

export default function ContactoPage() {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<null | boolean>(null);
  const [err, setErr] = useState<string | null>(null);
  const { messages } = useLanguage();
  const { contact, navigation } = messages;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setOk(null);
    setErr(null);

    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") || ""),
      company: String(fd.get("company") || ""),
      role: String(fd.get("role") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      caseType: String(fd.get("caseType") || ""),
      urgency: String(fd.get("urgency") || ""),
      message: String(fd.get("message") || ""),
      privacy: Boolean(fd.get("privacy")),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (json.ok) setOk(true);
      else {
        setOk(false);
        setErr(json.error || "No pudimos enviar tu mensaje.");
      }
    } catch (e: any) {
      setOk(false);
      setErr(e?.message || "Error de red.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="bg-canvas text-ink">
      <SiteHeader />

      <header className="border-b border-border bg-surface">
        <div className="container section-shell space-y-4">
          <p className="pill w-fit">{navigation.contact}</p>
          <h1 className="max-w-3xl">{contact.hero.title}</h1>
          <p className="max-w-2xl text-muted">{contact.hero.description}</p>
        </div>
      </header>

      <section className="container section-shell grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div className="space-y-5">
          <p className="pill w-fit">{contact.form.title}</p>
          <h2>{contact.form.description}</h2>
          <ul className="space-y-2 text-sm text-muted">
            {contact.info.items.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-1 h-2 w-2 rounded-[14px] bg-ink" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-3">
            <Link href="/" className="btn-secondary">
              {messages.common.backHome}
            </Link>
            <Link href="/agenda" className="btn-primary">
              {messages.home.hero.ctaPrimary}
            </Link>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="card-shell bg-white p-6 shadow-soft/40 space-y-4">
          <p className="pill w-fit">{contact.form.title}</p>
          <h3 className="mt-2 text-ink">{contact.form.description}</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-ink" htmlFor="name">
                {contact.form.fields.name}
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder={contact.form.fields.name}
                className="w-full rounded-[14px] border border-border bg-subtle px-3 py-2 text-sm text-ink outline-none transition focus:border-accent-500 focus:bg-white focus:ring-2 focus:ring-accent-500/20"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-ink" htmlFor="company">
                {contact.form.fields.company}
              </label>
              <input
                id="company"
                name="company"
                type="text"
                placeholder={contact.form.fields.company}
                className="w-full rounded-[14px] border border-border bg-subtle px-3 py-2 text-sm text-ink outline-none transition focus:border-accent-500 focus:bg-white focus:ring-2 focus:ring-accent-500/20"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-ink" htmlFor="role">
                {contact.form.fields.role}
              </label>
              <input
                id="role"
                name="role"
                type="text"
                placeholder={contact.form.fields.role}
                className="w-full rounded-[14px] border border-border bg-subtle px-3 py-2 text-sm text-ink outline-none transition focus:border-accent-500 focus:bg-white focus:ring-2 focus:ring-accent-500/20"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-ink" htmlFor="email">
                {contact.form.fields.email}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder={contact.form.fields.email}
                className="w-full rounded-[14px] border border-border bg-subtle px-3 py-2 text-sm text-ink outline-none transition focus:border-accent-500 focus:bg-white focus:ring-2 focus:ring-accent-500/20"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-ink" htmlFor="phone">
                {contact.form.fields.phone}
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder={contact.form.fields.phone}
                className="w-full rounded-[14px] border border-border bg-subtle px-3 py-2 text-sm text-ink outline-none transition focus:border-accent-500 focus:bg-white focus:ring-2 focus:ring-accent-500/20"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-ink" htmlFor="caseType">
                  {contact.form.fields.caseType}
                </label>
                <select
                  id="caseType"
                  name="caseType"
                  className="w-full rounded-[14px] border border-border bg-subtle px-3 py-2 text-sm text-ink outline-none transition focus:border-accent-500 focus:bg-white focus:ring-2 focus:ring-accent-500/20"
                  defaultValue=""
                  required
                >
                  <option value="" disabled>
                    {contact.form.fields.caseType}
                  </option>
                  {contact.form.options.caseType.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-ink" htmlFor="urgency">
                  {contact.form.fields.urgency}
                </label>
                <select
                  id="urgency"
                  name="urgency"
                  className="w-full rounded-[14px] border border-border bg-subtle px-3 py-2 text-sm text-ink outline-none transition focus:border-accent-500 focus:bg-white focus:ring-2 focus:ring-accent-500/20"
                  defaultValue=""
                  required
                >
                  <option value="" disabled>
                    {contact.form.fields.urgency}
                  </option>
                  {contact.form.options.urgency.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-ink" htmlFor="message">
                {contact.form.fields.message}
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                required
                placeholder={contact.form.fields.message}
                className="w-full rounded-[14px] border border-border bg-subtle px-3 py-3 text-sm text-ink outline-none transition focus:border-accent-500 focus:bg-white focus:ring-2 focus:ring-accent-500/20"
              />
            </div>

            <label className="flex items-start gap-3 text-sm text-muted">
              <input
                type="checkbox"
                name="privacy"
                className="mt-1 h-4 w-4 rounded-[14px] border border-border text-ink focus:ring-ink/20"
                required
              />
              {contact.form.fields.privacy}
            </label>
            <p className="text-xs text-muted">{contact.hero.description}</p>

            <div className="flex flex-wrap gap-3">
              <button className="btn-primary" type="submit" disabled={loading}>
                {loading ? messages.common.loading : contact.form.fields.submit}
              </button>
              <a href="/" className="btn-secondary">
                {messages.common.backHome}
              </a>
            </div>

            {ok && (
              <div className="rounded-xl border border-green-500/40 bg-green-50 px-4 py-3 text-sm font-semibold text-ink">
                ✅ ¡Gracias! Recibimos tu mensaje y te escribiremos pronto.
              </div>
            )}
            {ok === false && (
              <div className="rounded-xl border border-red-500/30 bg-red-50 px-4 py-3 text-sm font-semibold text-ink">
                ❌ {err}
              </div>
            )}
          </div>
        </form>
      </section>
    </main>
  );
}

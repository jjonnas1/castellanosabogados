'use client';

import { Suspense, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import SiteHeader from '@/app/components/SiteHeader';
import { Alert, Badge, Button, Input, Progress, Textarea } from '@/components/ui';
import { buildWhatsAppUrl } from '@/lib/contactLinks';
import { useLanguage } from '@/contexts/LanguageContext';

type FieldErrors = {
  name?: string;
  email?: string;
  message?: string;
};

export default function ContactoPage() {
  return (
    <Suspense fallback={<main className="container section-shell">Cargando formulario…</main>}>
      <ContactoContent />
    </Suspense>
  );
}

function ContactoContent() {
  const { t } = useLanguage();
  const p = t.pages.contacto;

  const searchParams = useSearchParams();
  const area = searchParams.get('area') ?? 'Contacto prioritario';
  const intent = searchParams.get('intent') ?? '';
  const source = searchParams.get('source') ?? '/contacto';

  const subject = useMemo(() => {
    if (intent === 'ingreso-evaluacion') return `Ingreso a evaluación – ${area}`;
    if (intent === 'coordinar-junta') return `Solicitud de coordinación con junta – ${area}`;
    return `Solicitud de contacto – ${area}`;
  }, [area, intent]);

  const validateName = (value: string) => {
    if (!value.trim()) return p.validName;
    if (value.trim().length < 2) return p.validNameMin;
    if (value.trim().length > 100) return p.validNameMax;
    return '';
  };

  const validateEmail = (value: string) => {
    if (!value.trim()) return p.validEmail;
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    return isValid ? '' : p.validEmailFormat;
  };

  const validateMessage = (value: string) => {
    if (!value.trim()) return p.validMessage;
    if (value.trim().length < 10) return p.validMessageMin;
    if (value.trim().length > 1000) return p.validMessageMax;
    return '';
  };

  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<null | boolean>(null);
  const [err, setErr] = useState<string | null>(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const [errors, setErrors] = useState<FieldErrors>({});

  useEffect(() => {
    setErrors({
      name: validateName(name),
      email: validateEmail(email),
      message: validateMessage(message),
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, email, message, t]);

  const hasErrors = useMemo(() => Boolean(errors.name || errors.email || errors.message), [errors]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (hasErrors) {
      setErr(p.validErrors);
      setOk(false);
      return;
    }

    setLoading(true);
    setOk(null);
    setErr(null);

    const payload = { name, email, message, area, source, intent, subject };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (json.ok) {
        setOk(true);
        setErr(null);
        setName('');
        setEmail('');
        setMessage('');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setOk(false);
        setErr(json.error || p.errorTitle);
      }
    } catch (error: any) {
      setOk(false);
      setErr(error?.message || p.errorTitle);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="bg-canvas text-ink">
      <SiteHeader />

      <header className="border-b border-border bg-gradient-to-r from-ink via-ink/92 to-accent-700 dark:from-[#0c111d] dark:via-[#0c111d]/92 dark:to-[#1f365d] text-white animate-gradient">
        <div className="container section-shell space-y-4 animate-fade-in-up">
          <Badge variant="info">{p.badge}</Badge>
          <h1 className="max-w-3xl text-white">{p.heroTitle}</h1>
          <p className="max-w-2xl text-slate-100">{p.heroParagraph}</p>

          <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.18em] text-slate-200">
            {p.badges.map((item) => (
              <span key={item} className="rounded-full bg-white/10 px-3 py-1 font-semibold ring-1 ring-white/20">
                {item}
              </span>
            ))}
          </div>
        </div>
      </header>

      <section className="container section-shell grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div className="space-y-4 animate-fade-in-up">
          <Badge variant="neutral">{p.priorityBadge}</Badge>
          <h2>{p.priorityTitle}</h2>
          <p className="max-w-2xl text-muted">{p.prioritySubtitle}</p>

          <ul className="space-y-2 text-sm text-muted">
            {p.bulletItems.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-ink" aria-hidden />
                {item}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-3">
            <Link href="/" className="btn-secondary">{p.backBtn}</Link>
            <a
              href={buildWhatsAppUrl({
                area,
                source: '/contacto',
                message: 'Hola, quisiera agendar una evaluación.',
              })}
              className="btn-primary"
            >
              {p.scheduleBtn}
            </a>
          </div>

          <div className="rounded-2xl border border-border bg-card p-4 shadow-soft/30">
            <div className="flex items-center justify-between text-sm text-muted">
              <span>{p.progressLabel}</span>
              <span>{ok ? '100%' : '60%'}</span>
            </div>
            <Progress value={ok ? 100 : 60} />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="card-shell p-6 shadow-soft/40 animate-fade-in-up">
          <Badge variant="info">{p.formBadge}</Badge>
          <h3 className="mt-2 text-ink">{p.formTitle}</h3>

          <div className="mt-4 space-y-4">
            <Input
              id="name"
              name="name"
              label={p.nameLabel}
              required
              placeholder={p.namePlaceholder}
              value={name}
              onChange={(event) => setName(event.target.value)}
              error={errors.name}
              icon="👤"
            />

            <Input
              id="email"
              name="email"
              type="email"
              label={p.emailLabel}
              required
              placeholder={p.emailPlaceholder}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              error={errors.email}
              icon="✉️"
            />

            <Textarea
              id="message"
              name="message"
              label={p.messageLabel}
              required
              placeholder={p.messagePlaceholder}
              rows={6}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              error={errors.message}
              maxLength={1000}
              showCount
            />

            <div className="flex flex-wrap gap-3">
              <Button type="submit" loading={loading} disabled={loading || hasErrors}>
                {loading ? p.sendingBtn : p.sendBtn}
              </Button>

              <a href="/" className="btn-secondary">{p.backBtn}</a>
            </div>

            {ok && (
              <Alert variant="success" title={p.successTitle}>
                {p.successMsg}
              </Alert>
            )}

            {ok === false && err && (
              <Alert variant="error" title={p.errorTitle}>
                {err}
              </Alert>
            )}
          </div>
        </form>
      </section>
    </main>
  );
}

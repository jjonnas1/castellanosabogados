'use client';

import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import { Alert, Badge, Button, Input, Textarea } from '@/components/ui';
import { useLanguage } from '@/contexts/LanguageContext';

type FieldErrors = {
  name?: string;
  email?: string;
  message?: string;
};

export default function ContactFormClient() {
  const { t } = useLanguage();
  const p = t.pages.contacto;
  const searchParams = useSearchParams();

  const area = searchParams.get('area') ?? 'Contacto prioritario';
  const intent = searchParams.get('intent') ?? '';
  const source = searchParams.get('source') ?? '/contacto';

  const subject = useMemo(() => {
    if (intent === 'ingreso-evaluacion') return `Ingreso a evaluación - ${area}`;
    if (intent === 'coordinar-junta') return `Solicitud de coordinación con junta - ${area}`;
    return `Solicitud de contacto - ${area}`;
  }, [area, intent]);

  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<null | boolean>(null);
  const [err, setErr] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const errors = useMemo<FieldErrors>(() => {
    const next: FieldErrors = {};
    if (!name.trim()) next.name = p.validName;
    else if (name.trim().length < 2) next.name = p.validNameMin;
    else if (name.trim().length > 100) next.name = p.validNameMax;

    if (!email.trim()) next.email = p.validEmail;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = p.validEmailFormat;

    if (!message.trim()) next.message = p.validMessage;
    else if (message.trim().length < 10) next.message = p.validMessageMin;
    else if (message.trim().length > 1000) next.message = p.validMessageMax;
    return next;
  }, [email, message, name, p]);

  const hasErrors = Boolean(errors.name || errors.email || errors.message);

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

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ name, email, message, area, source, intent, subject }),
      });
      const json = await res.json();

      if (!json.ok) throw new Error(json.error || p.errorTitle);
      setOk(true);
      setName('');
      setEmail('');
      setMessage('');
    } catch (error: any) {
      setOk(false);
      setErr(error?.message || p.errorTitle);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card-shell p-6 shadow-soft/40">
      <Badge variant="info">{p.formBadge}</Badge>
      <h3 className="mt-2 text-ink">{p.formTitle}</h3>
      <p className="mt-2 text-sm text-muted">Área detectada: {area}</p>

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

        <Button type="submit" loading={loading} disabled={loading || hasErrors}>
          {loading ? p.sendingBtn : p.sendBtn}
        </Button>

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
  );
}

"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import SiteHeader from "@/app/components/SiteHeader";
import { Alert, Badge, Button, Input, Progress, Textarea } from "@/components/ui";
import { buildWhatsAppUrl } from "@/lib/contactLinks";

type FieldErrors = {
  name?: string;
  email?: string;
  message?: string;
};

const validateName = (value: string) => {
  if (!value.trim()) return "El nombre es obligatorio.";
  if (value.trim().length < 2) return "El nombre debe tener al menos 2 caracteres.";
  if (value.trim().length > 100) return "El nombre no puede superar 100 caracteres.";
  return "";
};

const validateEmail = (value: string) => {
  if (!value.trim()) return "El correo es obligatorio.";
  const isValid = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value);
  return isValid ? "" : "Ingresa un correo válido.";
};

const validateMessage = (value: string) => {
  if (!value.trim()) return "El mensaje es obligatorio.";
  if (value.trim().length < 10) return "El mensaje debe tener al menos 10 caracteres.";
  if (value.trim().length > 1000) return "El mensaje no puede superar 1000 caracteres.";
  return "";
};

export default function ContactoPage() {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<null | boolean>(null);
  const [err, setErr] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const searchParams = useSearchParams();
  const area = searchParams.get("area") ?? "Contacto prioritario";
  const intent = searchParams.get("intent") ?? "";
  const source = searchParams.get("source") ?? "/contacto";

  const subject = useMemo(() => {
    if (intent === "ingreso-evaluacion") {
      return `Ingreso a evaluación – ${area}`;
    }
    if (intent === "coordinar-junta") {
      return `Solicitud de coordinación con junta – ${area}`;
    }
    return `Solicitud de contacto – ${area}`;
  }, [area, intent]);

  useEffect(() => {
    setErrors({
      name: validateName(name),
      email: validateEmail(email),
      message: validateMessage(message),
    });
  }, [name, email, message]);

  const hasErrors = useMemo(
    () => Boolean(errors.name || errors.email || errors.message),
    [errors]
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (hasErrors) {
      setErr("Revisa los campos marcados antes de enviar.");
      setOk(false);
      return;
    }

    setLoading(true);
    setOk(null);
    setErr(null);

    const payload = { name, email, message, area, source, intent, subject };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (json.ok) {
        setOk(true);
        setErr(null);
        setName("");
        setEmail("");
        setMessage("");
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
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

      <header className="border-b border-border bg-gradient-to-r from-ink via-ink/92 to-accent-700 text-white animate-gradient">
        <div className="container section-shell space-y-4 animate-fade-in-up">
          <Badge variant="info">Contacto</Badge>
          <h1 className="max-w-3xl text-white">Coordinemos una evaluación prioritaria</h1>
          <p className="max-w-2xl text-slate-100">
            Déjanos los datos mínimos para asignar un responsable y definir el primer control. No utilizamos esta línea para promoción,
            solo para coordinación estratégica. ✨
          </p>
          <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.18em] text-slate-200">
            {["Confidencialidad", "Respuesta rápida", "Seguimiento estratégico"].map((item) => (
              <span key={item} className="rounded-full bg-white/10 px-3 py-1 font-semibold ring-1 ring-white/20">
                {item}
              </span>
            ))}
          </div>
        </div>
      </header>

      <section className="container section-shell grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div className="space-y-4 animate-fade-in-up">
          <Badge variant="neutral">Prioridad</Badge>
          <h2>Datos mínimos para actuar</h2>
          <p className="max-w-2xl text-muted">
            Si requieres defensa litigiosa, lo articulamos con aliados manteniendo trazabilidad. Este formulario es para coordinar la
            revisión estratégica inicial.
          </p>
          <ul className="space-y-2 text-sm text-muted">
            {["Sin spam ni campañas.", "Respuesta prioritaria.", "Puedes volver al inicio o agenda en cualquier momento."].map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-ink" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-3">
            <Link href="/" className="btn-secondary">
              Volver al inicio
            </Link>
            <a
              href={buildWhatsAppUrl({
                area,
                source: "/contacto",
                message: "Hola, quisiera agendar una evaluación.",
              })}
              className="btn-primary"
            >
              Agendar evaluación
            </a>
          </div>
          <div className="rounded-2xl border border-border bg-white p-4 shadow-soft/30">
            <div className="flex items-center justify-between text-sm text-muted">
              <span>Progreso de envío</span>
              <span>{ok ? "100%" : "60%"}</span>
            </div>
            <Progress value={ok ? 100 : 60} />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="card-shell bg-white p-6 shadow-soft/40 animate-fade-in-up">
          <Badge variant="info">Formulario</Badge>
          <h3 className="mt-2 text-ink">Mensaje confidencial</h3>
          <div className="mt-4 space-y-4">
            <Input
              id="name"
              name="name"
              label="Nombre"
              required
              placeholder="Tu nombre"
              value={name}
              onChange={(event) => setName(event.target.value)}
              error={errors.name}
              icon="👤"
            />

            <Input
              id="email"
              name="email"
              type="email"
              label="Correo"
              required
              placeholder="tucorreo@ejemplo.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              error={errors.email}
              icon="✉️"
            />

            <Textarea
              id="message"
              name="message"
              label="Mensaje"
              required
              placeholder="Cuéntanos brevemente tu caso"
              rows={6}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              error={errors.message}
              maxLength={1000}
              showCount
            />

            <div className="flex flex-wrap gap-3">
              <Button type="submit" loading={loading} disabled={loading || hasErrors}>
                {loading ? "Enviando…" : "Enviar"}
              </Button>
              <a href="/" className="btn-secondary">
                Volver al inicio
              </a>
            </div>

            {ok && (
              <Alert variant="success" title="Mensaje enviado">
                ¡Gracias! Recibimos tu mensaje y te escribiremos pronto.
              </Alert>
            )}
            {ok === false && err && (
              <Alert variant="error" title="No pudimos enviar">
                {err}
              </Alert>
            )}
          </div>
        </form>
      </section>
    </main>
  );
}

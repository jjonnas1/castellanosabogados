"use client";

import { useState } from "react";

const STEPS = [
  {
    id: "entidad",
    question: "¿Qué entidad vulneró su derecho?",
    hint: "Seleccione la que mejor describe su caso.",
    options: [
      { label: "EPS / Aseguradora", value: "eps" },
      { label: "IPS / Hospital", value: "ips" },
      { label: "Colpensiones / Fondo pensional", value: "pension" },
      { label: "Entidad pública o gubernamental", value: "publica" },
      { label: "Empresa privada", value: "privada" },
      { label: "Otra entidad", value: "otra" },
    ],
  },
  {
    id: "derecho",
    question: "¿Qué le negaron o incumplieron?",
    hint: "Elija la situación principal.",
    options: [
      { label: "Medicamento o tratamiento", value: "medicamento" },
      { label: "Procedimiento médico o cirugía", value: "procedimiento" },
      { label: "Cita médica o especialista", value: "cita" },
      { label: "Pensión o prestación económica", value: "pension" },
      { label: "Derecho laboral o prestación social", value: "laboral" },
      { label: "Otro derecho fundamental", value: "otro" },
    ],
  },
  {
    id: "respuesta",
    question: "¿Tiene alguna respuesta de la entidad?",
    hint: "No importa si es verbal o escrita.",
    options: [
      { label: "Sí, tengo respuesta escrita", value: "escrita" },
      { label: "Me respondieron verbalmente", value: "verbal" },
      { label: "No respondieron nada", value: "silencio" },
      { label: "Me están aplazando sin dar fecha", value: "aplazando" },
    ],
  },
  {
    id: "tiempo",
    question: "¿Hace cuánto ocurre esta situación?",
    hint: "La urgencia puede determinar la estrategia.",
    options: [
      { label: "Menos de 2 semanas", value: "urgente" },
      { label: "Entre 2 semanas y 1 mes", value: "reciente" },
      { label: "Entre 1 y 3 meses", value: "moderado" },
      { label: "Más de 3 meses", value: "prolongado" },
    ],
  },
] as const;

const TOTAL = STEPS.length + 1; // +1 for contact step

export default function EvaluadorTutela() {
  const [stepIdx, setStepIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [contact, setContact] = useState({ nombre: "", contacto: "", via: "whatsapp" as "whatsapp" | "email" });
  const [done, setDone] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isContactStep = stepIdx === STEPS.length;

  const handleOption = (value: string) => {
    const stepId = STEPS[stepIdx].id;
    setAnswers((prev) => ({ ...prev, [stepId]: value }));
    setStepIdx((i) => i + 1);
  };

  const handleSubmit = async () => {
    if (!contact.contacto) return;
    setSending(true);
    setError(null);
    try {
      const summary = Object.entries(answers)
        .map(([k, v]) => `${k}: ${v}`)
        .join(" | ");

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          area: "Tutelas",
          source: "/tutela (Evaluador)",
          subject: "Evaluación preliminar de tutela",
          name: contact.nombre || (contact.via === "whatsapp" ? `WhatsApp: ${contact.contacto}` : contact.contacto),
          email: contact.via === "email" ? contact.contacto : "sin-email@evaluador-tutela.web",
          message: `Evaluación preliminar de tutela.\nRespuestas: ${summary}`,
          intent: "evaluador-tutela",
        }),
      });
      if (!res.ok) throw new Error("Error al enviar");

      if (contact.via === "whatsapp") {
        const text = encodeURIComponent(
          `Hola, realicé la evaluación de tutela en su sitio web. Mi caso involucra: ${summary}. Quisiera orientación.`
        );
        window.open(`https://wa.me/573148309306?text=${text}`, "_blank");
      }
      setDone(true);
    } catch {
      setError("No se pudo enviar. Intente de nuevo o escríbanos directamente.");
    } finally {
      setSending(false);
    }
  };

  const handleReset = () => {
    setStepIdx(0);
    setAnswers({});
    setContact({ nombre: "", contacto: "", via: "whatsapp" });
    setDone(false);
    setError(null);
  };

  if (done) {
    return (
      <div className="card-shell bg-white p-8 text-center space-y-4">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft text-accent text-2xl">
          ✓
        </div>
        <div>
          <h3 className="text-ink">Evaluación recibida</h3>
          <p className="mt-1 text-sm text-muted">
            Un abogado de Castellanos revisa su caso y le contacta en menos de 4 horas hábiles.
          </p>
        </div>
        <button
          type="button"
          onClick={handleReset}
          className="btn-secondary text-sm"
        >
          Evaluar otro caso
        </button>
      </div>
    );
  }

  return (
    <div className="card-shell bg-white p-6 md:p-8 space-y-6">
      {/* Encabezado y progreso */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-accent">
            Evaluador de tutela
          </span>
          <span className="text-[11px] text-muted">
            {Math.min(stepIdx + 1, TOTAL)} / {TOTAL}
          </span>
        </div>
        <div className="flex gap-1.5">
          {Array.from({ length: TOTAL }).map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-colors ${
                i < stepIdx ? "bg-accent" : i === stepIdx ? "bg-accent/50" : "bg-border"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="rounded-xl border border-border bg-canvas px-4 py-3 text-[12px] text-muted leading-relaxed">
        Esta evaluación es preliminar y orientativa. No reemplaza el análisis profesional de su caso por parte de un abogado.
      </div>

      {/* Pasos de selección */}
      {!isContactStep && (
        <div className="space-y-4">
          <div>
            <h3 className="text-base text-ink">{STEPS[stepIdx].question}</h3>
            <p className="text-sm text-muted">{STEPS[stepIdx].hint}</p>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {STEPS[stepIdx].options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => handleOption(opt.value)}
                className="flex items-center gap-3 rounded-xl border border-border bg-canvas px-4 py-3 text-left text-[13px] font-medium text-ink transition hover:border-accent hover:bg-accent-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
              >
                {opt.label}
              </button>
            ))}
          </div>
          {stepIdx > 0 && (
            <button
              type="button"
              onClick={() => setStepIdx((i) => i - 1)}
              className="text-[12px] text-muted underline underline-offset-2 hover:text-ink"
            >
              ← Volver
            </button>
          )}
        </div>
      )}

      {/* Paso de contacto */}
      {isContactStep && (
        <div className="space-y-4">
          <div>
            <h3 className="text-base text-ink">¿Cómo le contactamos?</h3>
            <p className="text-sm text-muted">
              Un abogado revisa su caso y le responde en menos de 4 horas hábiles.
            </p>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-semibold text-ink">
              Nombre (opcional)
              <input
                type="text"
                value={contact.nombre}
                onChange={(e) => setContact({ ...contact, nombre: e.target.value })}
                placeholder="Su nombre"
                className="mt-1.5 w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm text-ink focus:border-ink focus:outline-none focus:ring-2 focus:ring-accent-soft"
              />
            </label>

            <div>
              <p className="mb-1.5 text-sm font-semibold text-ink">Canal de contacto</p>
              <div className="flex gap-2">
                {(["whatsapp", "email"] as const).map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setContact({ ...contact, via: v })}
                    className={`flex-1 rounded-lg border py-2 text-[13px] font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent ${
                      contact.via === v
                        ? "border-accent bg-accent-soft text-accent"
                        : "border-border bg-white text-muted hover:border-ink"
                    }`}
                  >
                    {v === "whatsapp" ? "WhatsApp" : "Correo"}
                  </button>
                ))}
              </div>
            </div>

            <label className="block text-sm font-semibold text-ink">
              {contact.via === "whatsapp" ? "Número de WhatsApp" : "Correo electrónico"}
              <input
                type={contact.via === "whatsapp" ? "tel" : "email"}
                value={contact.contacto}
                onChange={(e) => setContact({ ...contact, contacto: e.target.value })}
                placeholder={contact.via === "whatsapp" ? "300 000 0000" : "nombre@correo.com"}
                required
                className="mt-1.5 w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm text-ink focus:border-ink focus:outline-none focus:ring-2 focus:ring-accent-soft"
              />
            </label>

            {error && (
              <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-[12px] text-red-700">
                {error}
              </p>
            )}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStepIdx((i) => i - 1)}
                className="btn-secondary text-sm"
              >
                ← Volver
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!contact.contacto || sending}
                className="btn-primary flex-1 justify-center text-sm disabled:cursor-not-allowed disabled:opacity-50"
              >
                {sending ? "Enviando…" : "Solicitar orientación"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

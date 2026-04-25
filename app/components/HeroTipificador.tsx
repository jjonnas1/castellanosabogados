"use client";

import { useState } from "react";

const AREAS = [
  {
    key: "penal",
    label: "Penal Personas",
    desc: "Defensa e investigación penal para personas naturales.",
    prompt: "Cuéntenos brevemente el caso penal (etapa procesal, hechos).",
  },
  {
    key: "tutela",
    label: "Tutela",
    desc: "Protección de derechos ante EPS o entidades que incumplieron.",
    prompt: "¿Qué le negaron y qué entidad? (EPS, hospital, entidad pública…)",
  },
  {
    key: "ejecucion",
    label: "Ejecución de Penas",
    desc: "Beneficios, redenciones y prisión domiciliaria.",
    prompt: "¿Cuánto lleva privado de la libertad y qué beneficio busca?",
  },
  {
    key: "civil",
    label: "Civil / Familia",
    desc: "Divorcios, custodia, alimentos y conflictos patrimoniales.",
    prompt: "¿Cuál es la situación familiar o civil que enfrenta?",
  },
  {
    key: "empresa",
    label: "Penal Empresarial",
    desc: "Prevención y defensa penal para empresas y directivos.",
    prompt: "¿Cuál es el riesgo o imputación que enfrenta la empresa?",
  },
  {
    key: "otro",
    label: "Otro / No sé",
    desc: "Cuéntenos su situación y le orientamos al área correcta.",
    prompt: "Cuéntenos brevemente su situación.",
  },
] as const;

type AreaKey = (typeof AREAS)[number]["key"];
type Via = "whatsapp" | "email";

type FormState = {
  mensaje: string;
  contacto: string;
  via: Via;
};

const INITIAL_FORM: FormState = { mensaje: "", contacto: "", via: "whatsapp" };

export default function HeroTipificador() {
  const [step, setStep] = useState<0 | 1 | 2>(0);
  const [selectedKey, setSelectedKey] = useState<AreaKey | null>(null);
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const area = AREAS.find((a) => a.key === selectedKey) ?? null;

  const handleSelectArea = (key: AreaKey) => {
    setSelectedKey(key);
    setStep(1);
  };

  const handleSubmit = async () => {
    if (!form.contacto || !area) return;
    setSending(true);
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          area: area.label,
          source: "/ (Hero Tipificador)",
          subject: `Evaluación de caso – ${area.label}`,
          email: form.via === "email" ? form.contacto : "sin-email@tipificador.web",
          name: form.via === "whatsapp" ? `WhatsApp: ${form.contacto}` : form.contacto,
          message: form.mensaje || "(Sin descripción adicional)",
          intent: `tipificador-${area.key}`,
        }),
      });
      if (!res.ok) throw new Error("Error al enviar");

      // Si eligió WhatsApp, redirigir
      if (form.via === "whatsapp") {
        const text = encodeURIComponent(
          `Hola, necesito asesoría jurídica en: ${area.label}.\n${form.mensaje}`
        );
        window.open(`https://wa.me/573148309306?text=${text}`, "_blank");
      }
      setStep(2);
    } catch {
      setError("No se pudo enviar. Intente de nuevo o contáctenos directamente.");
    } finally {
      setSending(false);
    }
  };

  const handleReset = () => {
    setStep(0);
    setSelectedKey(null);
    setForm(INITIAL_FORM);
    setError(null);
  };

  return (
    <div className="card-shell relative overflow-hidden rounded-3xl border border-white/15 bg-white/10 p-7 shadow-soft ring-1 ring-white/15 backdrop-blur animate-fade-in-left delay-200">
      <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/85 to-accent-700/75" aria-hidden />

      <div className="relative space-y-5 text-white">
        {/* Step 0 — selección de área */}
        {step === 0 && (
          <>
            <div>
              <p className="text-[10px] uppercase tracking-[0.16em] text-slate-300">
                Castellanos Abogados
              </p>
              <h3 className="mt-1 text-white">Necesito ayuda con…</h3>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {AREAS.map((a) => (
                <button
                  key={a.key}
                  type="button"
                  onClick={() => handleSelectArea(a.key)}
                  className="flex flex-col items-start gap-1 rounded-xl border border-white/15 bg-white/8 px-3 py-2.5 text-left text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                >
                  <span>{a.label}</span>
                  <span className="text-[11px] font-normal text-slate-300 leading-snug">
                    {a.desc}
                  </span>
                </button>
              ))}
            </div>
          </>
        )}

        {/* Step 1 — formulario contextualizado */}
        {step === 1 && area && (
          <>
            <div>
              <p className="text-[10px] uppercase tracking-[0.16em] text-slate-300">
                {area.label}
              </p>
              <h3 className="mt-1 text-white">Cuéntenos su caso</h3>
            </div>

            <div className="space-y-3">
              <label className="block text-[12px] font-semibold text-slate-200">
                {area.prompt}
                <textarea
                  rows={3}
                  value={form.mensaje}
                  onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
                  placeholder="Describa brevemente su situación…"
                  className="mt-1.5 w-full resize-none rounded-xl border border-white/20 bg-white/10 px-3 py-2.5 text-sm text-white placeholder-slate-400 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
                />
              </label>

              {/* Canal */}
              <div>
                <p className="mb-1.5 text-[12px] font-semibold text-slate-200">
                  Prefiero que me contacten por
                </p>
                <div className="flex gap-2">
                  {(["whatsapp", "email"] as Via[]).map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setForm({ ...form, via: v })}
                      className={`flex-1 rounded-lg border py-2 text-[12px] font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-white ${
                        form.via === v
                          ? "border-white bg-white/20 text-white"
                          : "border-white/20 bg-white/5 text-slate-300 hover:bg-white/10"
                      }`}
                    >
                      {v === "whatsapp" ? "WhatsApp" : "Correo"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contacto */}
              <label className="block text-[12px] font-semibold text-slate-200">
                {form.via === "whatsapp" ? "Su número de WhatsApp" : "Su correo electrónico"}
                <input
                  type={form.via === "whatsapp" ? "tel" : "email"}
                  value={form.contacto}
                  onChange={(e) => setForm({ ...form, contacto: e.target.value })}
                  placeholder={
                    form.via === "whatsapp" ? "300 000 0000" : "nombre@correo.com"
                  }
                  className="mt-1.5 w-full rounded-xl border border-white/20 bg-white/10 px-3 py-2.5 text-sm text-white placeholder-slate-400 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
                />
              </label>

              {error && (
                <p className="rounded-lg bg-red-900/40 px-3 py-2 text-[12px] text-red-200">
                  {error}
                </p>
              )}

              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleReset}
                  className="rounded-full border border-white/30 px-4 py-2.5 text-[13px] font-semibold text-slate-200 transition hover:bg-white/10"
                >
                  ← Cambiar
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!form.contacto || sending}
                  className="flex-1 rounded-full bg-white px-4 py-2.5 text-[13px] font-semibold text-ink transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {sending ? "Enviando…" : "Enviar → respondemos en 4h"}
                </button>
              </div>
            </div>
          </>
        )}

        {/* Step 2 — confirmación */}
        {step === 2 && (
          <div className="flex flex-col items-center gap-4 py-6 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-white/15 text-2xl">
              ✓
            </div>
            <div>
              <h3 className="text-white">Evaluación recibida</h3>
              <p className="mt-1 text-sm text-slate-200">
                Un abogado de Castellanos revisa su caso y le contacta en menos de 4 horas hábiles.
              </p>
            </div>
            <button
              type="button"
              onClick={handleReset}
              className="text-[12px] text-slate-300 underline underline-offset-2 hover:text-white"
            >
              Evaluar otro caso
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

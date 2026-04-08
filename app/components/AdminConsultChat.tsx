"use client";

import { useEffect, useRef, useState } from "react";

type Msg = {
  from: "bot" | "user";
  text: string;
  options?: string[];
  whatsapp?: string;
};

const WA_BASE = "https://wa.me/573148309306?text=";
const TOPICS = ["Tutela", "Penal", "Familia", "Laboral", "Administrativo", "Otro"];

function waUrl(topic?: string) {
  const text = topic
    ? `Hola,%20necesito%20asesoría%20sobre%20${encodeURIComponent(topic)}`
    : "Hola,%20necesito%20asesor%C3%ADa%20jur%C3%ADdica%20sobre...";
  return WA_BASE + text;
}

function autoReply(input: string, topic?: string): Msg {
  const t = input.toLowerCase();

  if (t.includes("costo") || t.includes("cuesta") || t.includes("precio") || t.includes("honorario") || t.includes("cobran") || t.includes("valor")) {
    return { from: "bot", text: "Nuestros honorarios dependen de la complejidad del caso y el tipo de proceso. Contáctanos para una evaluación inicial sin costo.", whatsapp: waUrl(topic) };
  }
  if (t.includes("ubicad") || t.includes("dirección") || t.includes("direccion") || t.includes("donde están") || t.includes("dónde") || t.includes("oficina")) {
    return { from: "bot", text: "Atendemos principalmente de forma virtual por videollamada o llamada. Para reuniones presenciales se coordina directamente con el abogado según disponibilidad." };
  }
  if (t.includes("dura") || t.includes("tiempo") || t.includes("cuánto demora") || t.includes("demora") || t.includes("plazo")) {
    return { from: "bot", text: "Depende del tipo de proceso. Una tutela se resuelve en 10 días hábiles; un proceso penal puede durar entre 1 y 4 años. Lo importante es actuar a tiempo." };
  }
  if (t.includes("tutela")) {
    return { from: "bot", text: "Para tutelas evaluamos el caso, redactamos y acompañamos todo el trámite. ¿Quieres hablar directamente con un abogado?", whatsapp: waUrl("Tutela") };
  }
  if (t.includes("penal") || t.includes("delito") || t.includes("pena") || t.includes("imputad") || t.includes("capturad")) {
    return { from: "bot", text: "En materia penal, cada caso requiere una revisión técnica. Te recomendamos hablar directamente con el abogado.", whatsapp: waUrl("Penal") };
  }
  if (t.includes("familia") || t.includes("custodia") || t.includes("alimentos") || t.includes("divorcio")) {
    return { from: "bot", text: "Atendemos asuntos de familia: custodia, alimentos, divorcio y medidas de protección. ¿Quieres agendar una revisión?", whatsapp: waUrl("Familia") };
  }
  if (t.includes("laboral") || t.includes("trabajo") || t.includes("despido") || t.includes("empleado")) {
    return { from: "bot", text: "En derecho laboral apoyamos tanto a empleados como a empresas en controversias y prevención. ¿Quieres contactar al abogado?", whatsapp: waUrl("Laboral") };
  }
  if (t.includes("administrativo") || t.includes("entidad") || t.includes("estado") || t.includes("contencioso")) {
    return { from: "bot", text: "Para asuntos administrativos o contenciosos, es clave actuar en los términos legales. ¿Hablamos?", whatsapp: waUrl("Administrativo") };
  }

  return {
    from: "bot",
    text: "Entendido. Para darte una orientación precisa, lo mejor es hablar directamente con el abogado.",
    whatsapp: waUrl(topic),
  };
}

const INITIAL_MESSAGES: Msg[] = [
  { from: "bot", text: "Hola, bienvenido a Castellanos Abogados. ¿Sobre qué necesitas asesoría?", options: TOPICS },
];

export default function AdminConsultChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [topic, setTopic] = useState<string | undefined>();
  const [notified, setNotified] = useState(false);
  const [showWaPrompt, setShowWaPrompt] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Reset 2-min timer on every user message
  const resetTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setShowWaPrompt(false);
    timerRef.current = setTimeout(() => setShowWaPrompt(true), 2 * 60 * 1000);
  };

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  const sendNotification = (message: string, selectedTopic?: string) => {
    if (notified) return;
    setNotified(true);
    fetch("/api/chat/notify", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ message, topic: selectedTopic ?? "No especificado" }),
    }).catch(() => null);
  };

  const addBotMessage = (msg: Omit<Msg, "from">) => {
    setMessages((prev) => [...prev, { from: "bot", ...msg }]);
  };

  const handleTopicSelect = (t: string) => {
    setTopic(t);
    setMessages((prev) => [
      ...prev,
      { from: "user", text: t },
      {
        from: "bot",
        text: "Entendido. Puedes continuar aquí o hablar directamente con un abogado:",
        whatsapp: waUrl(t),
      },
    ]);
    sendNotification(`Tema seleccionado: ${t}`, t);
    resetTimer();
  };

  const send = (text: string) => {
    const userText = text.trim();
    if (!userText) return;
    setInput("");
    const reply = autoReply(userText, topic);
    setMessages((prev) => [...prev, { from: "user", text: userText }, reply]);
    sendNotification(userText, topic);
    resetTimer();
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); }
  };

  // Show quick-reply options only on the first bot message if no topic yet
  const showTopicOptions = !topic;

  return (
    <div className="fixed bottom-24 right-4 z-[65] sm:right-6">
      {open && (
        <div className="mb-2 flex w-[300px] flex-col rounded-2xl border border-border bg-white shadow-lg">
          {/* Header */}
          <div className="flex items-center justify-between rounded-t-2xl border-b border-border bg-ink px-4 py-3">
            <div>
              <p className="text-xs font-semibold text-white">Castellanos Abogados</p>
              <p className="text-[11px] text-slate-400">Respondemos en breve</p>
            </div>
            <button type="button" onClick={() => setOpen(false)} className="text-slate-400 hover:text-white text-lg leading-none">×</button>
          </div>

          {/* Messages */}
          <div className="max-h-72 overflow-y-auto space-y-2 px-3 py-3 text-sm">
            {messages.map((msg, i) => (
              <div key={i} className={`flex flex-col gap-1 ${msg.from === "user" ? "items-end" : "items-start"}`}>
                <div className={`rounded-2xl px-3 py-2 text-[13px] leading-relaxed max-w-[85%] ${msg.from === "bot" ? "bg-subtle text-ink" : "bg-ink text-white"}`}>
                  {msg.text}
                </div>
                {msg.from === "bot" && msg.options && showTopicOptions && i === messages.length - 1 && (
                  <div className="mt-1 flex flex-wrap gap-1">
                    {msg.options.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => handleTopicSelect(opt)}
                        className="rounded-full border border-border px-2.5 py-1 text-[11px] font-medium text-ink transition hover:border-ink hover:bg-subtle"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
                {msg.from === "bot" && msg.whatsapp && (
                  <a
                    href={msg.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-[#25D366] px-3 py-1.5 text-[12px] font-semibold text-white transition hover:bg-[#1ebe5d]"
                  >
                    <svg viewBox="0 0 24 24" fill="white" className="h-3.5 w-3.5" aria-hidden>
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.114.553 4.1 1.518 5.826L.057 23.57a.5.5 0 0 0 .609.61l5.842-1.528A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.737 9.737 0 0 1-4.964-1.355l-.356-.211-3.688.965.984-3.595-.231-.369A9.718 9.718 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
                    </svg>
                    Hablar por WhatsApp
                  </a>
                )}
              </div>
            ))}

            {/* 2-min WhatsApp prompt */}
            {showWaPrompt && (
              <div className="flex flex-col items-start gap-1">
                <div className="rounded-2xl bg-subtle px-3 py-2 text-[13px] text-ink max-w-[85%]">
                  ¿Prefieres hablar por WhatsApp ahora?
                </div>
                <a
                  href={waUrl(topic)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#25D366] px-3 py-1.5 text-[12px] font-semibold text-white transition hover:bg-[#1ebe5d]"
                >
                  <svg viewBox="0 0 24 24" fill="white" className="h-3.5 w-3.5" aria-hidden>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.114.553 4.1 1.518 5.826L.057 23.57a.5.5 0 0 0 .609.61l5.842-1.528A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.737 9.737 0 0 1-4.964-1.355l-.356-.211-3.688.965.984-3.595-.231-.369A9.718 9.718 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
                  </svg>
                  Ir a WhatsApp
                </a>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="border-t border-border px-3 py-2">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Escribe tu pregunta..."
                className="min-w-0 flex-1 rounded-xl border border-border px-3 py-2 text-[13px] focus:border-ink focus:outline-none"
              />
              <button
                type="button"
                onClick={() => send(input)}
                className="rounded-xl bg-ink px-3 py-2 text-[13px] font-semibold text-white transition hover:bg-ink/85"
              >
                →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-full border border-border/80 bg-white/95 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted shadow-soft backdrop-blur transition hover:border-ink hover:text-ink"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5" aria-hidden>
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Chat
      </button>
    </div>
  );
}

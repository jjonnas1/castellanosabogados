"use client";

import { useMemo, useState } from "react";

type ChatMessage = {
  from: "bot" | "user";
  text: string;
  action?: { label: string; href: string };
};

const WELCOME =
  "Hola. Puedo ayudarte con información sobre consultas, modalidad de atención y pasos para agendar.";

const LEGAL_FALLBACK =
  "No puedo responder consultas jurídicas por este medio. Sí puedo ayudarte a agendar una consulta para revisión profesional del caso.";

const OPTIONS = [
  "Agendar consulta",
  "Áreas de atención",
  "Modalidad del servicio",
  "Documentos necesarios",
  "Contacto",
];

function resolveAdminAnswer(input: string): Omit<ChatMessage, "from"> {
  const text = input.toLowerCase();

  const legalKeywords = [
    "demanda",
    "delito",
    "pena",
    "sentencia",
    "abogado",
    "juríd",
    "jurid",
    "caso",
    "defensa",
    "denuncia",
  ];

  if (legalKeywords.some((word) => text.includes(word))) return { text: LEGAL_FALLBACK };

  if (text.includes("modalidad") || text.includes("virtual") || text.includes("presencial")) {
    return {
      text: "La atención se realiza principalmente de forma virtual, mediante llamada o videollamada previamente agendada. Si el caso lo requiere, puede coordinarse una reunión presencial directamente con el abogado.",
    };
  }

  if (text.includes("agendar") || text.includes("agenda") || text.includes("consulta")) {
    return { text: "Puedes agendar tu consulta escribiendo por WhatsApp o dejando tus datos de contacto para ser atendido." };
  }

  if (text.includes("área") || text.includes("areas") || text.includes("servicio")) {
    return {
      text: "El despacho atiende asuntos en penal, ejecución de penas, civil, familia, laboral, administrativo y responsabilidad penal para personas jurídicas.",
    };
  }

  if (text.includes("documento")) {
    return {
      text: "Los documentos dependen del caso. Puedes agendar una consulta o enviar primero una descripción breve del asunto para indicarte qué información inicial presentar.",
    };
  }

  if (text.includes("contacto") || text.includes("whatsapp") || text.includes("correo")) {
    return {
      text: "Puedes comunicarte directamente por WhatsApp para agendar tu consulta.",
      action: {
        label: "Ir a WhatsApp",
        href: "https://wa.me/573148309306?text=Hola,%20quisiera%20agendar%20una%20consulta%20jur%C3%ADdica.",
      },
    };
  }

  return {
    text: "Puedo ayudarte con información sobre el proceso de consulta y agendamiento. Para una orientación jurídica específica, es necesario agendar una revisión profesional.",
  };
}

export default function AdminConsultChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([{ from: "bot", text: WELCOME }]);
  const [input, setInput] = useState("");

  const hasMessages = useMemo(() => messages.length > 0, [messages.length]);

  const send = (text: string) => {
    const userText = text.trim();
    if (!userText) return;

    const answer = resolveAdminAnswer(userText);
    setMessages((prev) => [...prev, { from: "user", text: userText }, { from: "bot", ...answer }]);
    setInput("");
  };

  return (
    <div className="fixed bottom-24 right-4 z-[65] sm:right-6">
      {open && (
        <div className="mb-2 w-[280px] rounded-2xl border border-border bg-white shadow-soft">
          <div className="border-b border-border px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted">
            Chat administrativo
          </div>

          <div className="max-h-64 space-y-2 overflow-auto px-3 py-3 text-sm">
            {hasMessages &&
              messages.map((msg, idx) => (
                <div
                  key={`${msg.from}-${idx}`}
                  className={`rounded-xl px-3 py-2 ${
                    msg.from === "bot" ? "bg-subtle text-ink" : "ml-6 bg-ink text-white"
                  }`}
                >
                  {msg.text}
                  {msg.from === "bot" && msg.action && (
                    <a
                      href={msg.action.href}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 inline-flex rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold text-white hover:bg-emerald-700"
                    >
                      {msg.action.label}
                    </a>
                  )}
                </div>
              ))}
          </div>

          <div className="border-t border-border px-3 py-2">
            <div className="mb-2 flex flex-wrap gap-1">
              {OPTIONS.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => send(option)}
                  className="rounded-full border border-border px-2 py-1 text-[11px] text-muted hover:border-ink hover:text-ink"
                >
                  {option}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribe tu pregunta"
                className="min-w-0 flex-1 rounded-lg border border-border px-2 py-1 text-xs"
              />
              <button
                type="button"
                onClick={() => send(input)}
                className="rounded-lg bg-ink px-3 py-1 text-xs font-semibold text-white"
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="rounded-full border border-border/80 bg-white/95 px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted shadow-soft backdrop-blur transition hover:border-ink hover:text-ink"
      >
        Chat
      </button>
    </div>
  );
}

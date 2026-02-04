"use client";

import { useEffect, useMemo, useState } from "react";

type ServiceItem = {
  title: string;
  description: string;
};

export default function ServiceCarousel({ items }: { items: ServiceItem[] }) {
  const [index, setIndex] = useState(0);
  const safeItems = useMemo(() => items.filter(Boolean), [items]);

  useEffect(() => {
    if (safeItems.length <= 1) return;
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % safeItems.length);
    }, 5000);
    return () => clearInterval(id);
  }, [safeItems.length]);

  if (safeItems.length === 0) return null;
  const current = safeItems[index];

  return (
    <div className="rounded-2xl border border-white/20 bg-white/10 p-4 text-white shadow-soft animate-fade-in-up">
      <p className="text-xs uppercase tracking-[0.18em] text-white/70">Servicios destacados</p>
      <p className="mt-2 text-lg font-semibold">{current.title}</p>
      <p className="mt-1 text-sm text-white/80">{current.description}</p>
      <div className="mt-3 flex gap-2">
        {safeItems.map((_, idx) => (
          <span
            key={idx}
            className={`h-1.5 w-6 rounded-full transition duration-300 ${
              idx === index ? "bg-white" : "bg-white/30"
            }`}
            aria-hidden
          />
        ))}
      </div>
    </div>
  );
}

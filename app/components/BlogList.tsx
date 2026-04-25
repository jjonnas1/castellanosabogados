"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

type Article = {
  slug: string;
  title: string;
  summary: string;
  date: string;
  category: string;
};

export default function BlogList({ articles }: { articles: Article[] }) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories = useMemo(
    () => Array.from(new Set(articles.map((a) => a.category))),
    [articles]
  );

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return articles.filter((a) => {
      const matchesQuery =
        !q ||
        a.title.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q);
      const matchesCategory = !activeCategory || a.category === activeCategory;
      return matchesQuery && matchesCategory;
    });
  }, [articles, query, activeCategory]);

  return (
    <div className="space-y-6">
      {/* Búsqueda + filtros */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-xs">
          <svg
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden
          >
            <circle cx="8.5" cy="8.5" r="5.5" stroke="currentColor" strokeWidth="1.5" />
            <path
              d="M13.5 13.5 17 17"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar artículo…"
            aria-label="Buscar en el blog"
            className="w-full rounded-xl border border-border bg-white py-2.5 pl-9 pr-4 text-sm text-ink placeholder-muted focus:border-ink focus:outline-none focus:ring-2 focus:ring-accent-soft"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveCategory(null)}
            className={`rounded-full px-3 py-1.5 text-[12px] font-semibold transition ${
              activeCategory === null
                ? "bg-ink text-white"
                : "border border-border bg-white text-muted hover:border-ink hover:text-ink"
            }`}
          >
            Todos
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat === activeCategory ? null : cat)}
              className={`rounded-full px-3 py-1.5 text-[12px] font-semibold transition ${
                activeCategory === cat
                  ? "bg-ink text-white"
                  : "border border-border bg-white text-muted hover:border-ink hover:text-ink"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Resultados */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-border bg-white py-12 text-center text-muted">
          <p className="text-sm">No se encontraron artículos para su búsqueda.</p>
          <button
            type="button"
            onClick={() => { setQuery(""); setActiveCategory(null); }}
            className="mt-3 text-[12px] underline underline-offset-2 hover:text-ink"
          >
            Limpiar filtros
          </button>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2">
          {filtered.map((a) => (
            <article
              key={a.slug}
              className="card-shell flex flex-col justify-between gap-4 bg-white p-6"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="pill text-xs">{a.category}</span>
                  <time
                    dateTime={a.date}
                    className="text-xs text-muted"
                  >
                    {new Date(a.date).toLocaleDateString("es-CO", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </div>
                <h2 className="text-lg">{a.title}</h2>
                <p className="text-sm text-muted">{a.summary}</p>
              </div>
              <Link href={`/blog/${a.slug}`} className="btn-secondary w-fit">
                Leer artículo
              </Link>
            </article>
          ))}
        </div>
      )}

      {query || activeCategory ? (
        <p className="text-[12px] text-muted">
          {filtered.length} artículo{filtered.length !== 1 ? "s" : ""} encontrado
          {filtered.length !== 1 ? "s" : ""}
        </p>
      ) : null}
    </div>
  );
}

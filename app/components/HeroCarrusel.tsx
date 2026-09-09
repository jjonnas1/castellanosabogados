"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import WaIcon from "./WaIcon";

export default function HeroCarrusel() {
  const { t, language } = useLanguage();
  const slides = t.hero.serviceSlides;
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [focused, setFocused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const words = {
    es: ["Pausar carrusel", "Reproducir carrusel", "Explora la firma"],
    en: ["Pause carousel", "Play carousel", "Explore the firm"],
    fr: ["Mettre en pause", "Lire le carrousel", "Découvrir le cabinet"],
    it: ["Pausa carosello", "Riprendi carosello", "Scopri lo studio"],
  }[language];
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    if (paused || focused || reduced) return;
    const id = setTimeout(
      () => setCurrent((c) => (c + 1) % slides.length),
      7000,
    );
    return () => clearTimeout(id);
  }, [current, paused, focused, reduced, slides.length]);
  const slide = slides[current];
  return (
    <section
      className="hero"
      aria-roledescription="carousel"
      aria-label={t.nav.services}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node))
          setFocused(false);
      }}
    >
      <Image
        src="/hero-despacho.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center scale-[1.02]"
        aria-hidden
      />
      <div className="hero-overlay" />
      <div className="hero-grain" />
      <div className="hero-top">
        <span>PEREIRA · EJE CAFETERO</span>
        <span>{slides[0].pill}</span>
      </div>
      <div className="hero-stage">
        <div className="hero-copy">
          <div className="eyebrow" key={"tag" + current}>
            <span className="line" />
            {slide.tag}
          </div>
          <div className="headline-mask">
            <h1 key={"title" + current}>{slide.title}</h1>
          </div>
          <p className="hero-description" key={"copy" + current}>
            {slide.subtitle}
          </p>
          <div className="hero-actions">
            <Link className="button light" href={slide.href}>
              {slide.cta}
              <span aria-hidden>↗</span>
            </Link>
            <a
              className="phone"
              href={`https://wa.me/573148309306?text=${encodeURIComponent(slide.whatsappText)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WaIcon size={20} />
              314 830 9306
            </a>
          </div>
        </div>
        <aside className="hero-aside">
          <div className="panel-top">
            <span>CASTELLANOS ABOGADOS</span>
            <span className="panel-number" key={"number" + current}>
              {String(current + 1).padStart(2, "0")}
            </span>
          </div>
          <div className="panel-content" key={"panel" + current}>
            <span className="panel-kicker">PEREIRA · EJE CAFETERO</span>
            <h2>{slide.panelTitle}</h2>
            <p>{slide.panelBody}</p>
            <div className="panel-stats">
              {Object.values(slide.stats).map((s) => (
                <div key={s.label}>
                  <strong>{s.value}</strong>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="panel-footer">
            <span className="status-dot" />
            {slides[0].tag}
            <span aria-hidden>↗</span>
          </div>
        </aside>
      </div>
      <div className="hero-bottom">
        <div className="chapter-nav" aria-label={t.nav.services}>
          {slides.map((s, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrent(i)}
              className={i === current ? "selected" : ""}
              aria-current={i === current ? "true" : undefined}
              aria-label={s.title}
            >
              <span className="chapter-num">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{i === 0 ? s.tag : s.title}</span>
              <span className="chapter-track">
                {current === i && (
                  <i
                    key={current}
                    style={{
                      animationPlayState:
                        paused || focused || reduced ? "paused" : "running",
                    }}
                  />
                )}
              </span>
            </button>
          ))}
        </div>
        <button
          type="button"
          className="pause"
          onClick={() => setPaused((p) => !p)}
          aria-label={paused ? words[1] : words[0]}
        >
          {paused ? "▷" : "Ⅱ"}
        </button>
      </div>
      <a href="#servicios" className="scroll-cue">
        <span>{words[2]}</span>
        <span className="scroll-line" />
      </a>
    </section>
  );
}

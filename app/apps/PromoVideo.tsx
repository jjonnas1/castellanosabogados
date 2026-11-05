'use client';

import { useRef, useState } from 'react';
import styles from './apps.module.css';

type Props = { src: string; poster: string; title: string; label: string; theme: 'codice' | 'luci' };

export default function PromoVideo({ src, poster, title, label, theme }: Props) {
  const video = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  async function play() {
    if (!video.current) return;
    setStarted(true);
    try { await video.current.play(); } catch { /* Los controles nativos quedan disponibles si el navegador bloquea la reproducción. */ }
  }
  return <div className={`${styles.videoFrame} ${theme === 'luci' ? styles.luciFrame : ''}`}>
    <video ref={video} controls={started} playsInline preload="none" poster={poster} aria-label={title}><source src={src} type="video/mp4" />Tu navegador no puede reproducir este video.</video>
    {!started && <button className={styles.videoPlay} type="button" onClick={play} aria-label={`Reproducir ${title}`}><span className={styles.playCircle} aria-hidden="true">▶</span><span>{label}</span></button>}
    {!started && <span className={styles.videoCorner}>VIDEO / 01</span>}
  </div>;
}

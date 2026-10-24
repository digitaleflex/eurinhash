"use client";

import { useEffect, useRef } from "react";

/* Barre de progression de lecture : mesure la portion d’article parcourue.
   Écriture directe dans le DOM via requestAnimationFrame, sans re-render React. */
export function ReadingProgress({ targetId }: { targetId: string }) {
  const barRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    const article = document.getElementById(targetId);
    if (!bar || !article) return;

    let frame = 0;

    const paint = () => {
      frame = 0;
      const rect = article.getBoundingClientRect();
      const total = Math.max(1, rect.height - window.innerHeight * 0.5);
      const progress = Math.min(1, Math.max(0, -rect.top / total));
      bar.style.transform = `scaleX(${progress.toFixed(4)})`;
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(paint);
    };

    paint();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [targetId]);

  return (
    <div className="reading-progress" aria-hidden="true">
      <span ref={barRef} className="reading-progress__bar" />
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";

export default function FloatingBees() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // clear container in case of strict mode double invocation
    container.innerHTML = "";

    const beeCount = 8;
    const beeSVG = `
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 8C5 8 0 4 2 3C4 2 8 6 8 10" fill="currentColor" opacity="0.6"/>
          <path d="M19 8C19 8 24 4 22 3C20 2 16 6 16 10" fill="currentColor" opacity="0.6"/>
          <ellipse cx="12" cy="12" rx="5" ry="8" fill="currentColor" />
          <path d="M8.5 10H15.5" stroke="var(--color-bg)" stroke-width="1.5" stroke-linecap="round"/>
          <path d="M8.5 13H15.5" stroke="var(--color-bg)" stroke-width="1.5" stroke-linecap="round"/>
          <path d="M9.5 16H14.5" stroke="var(--color-bg)" stroke-width="1.5" stroke-linecap="round"/>
          <path d="M10 5L8 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          <path d="M14 5L16 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
    `;

    for (let i = 0; i < beeCount; i++) {
      const bee = document.createElement("div");
      bee.className = "bee";
      bee.innerHTML = beeSVG;

      const left = 5 + Math.random() * 90;
      const top = 10 + Math.random() * 80;
      const scale = 0.6 + Math.random() * 0.6;

      bee.style.left = `${left}%`;
      bee.style.top = `${top}%`;
      bee.style.transform = `scale(${scale})`;

      const svg = bee.querySelector("svg");
      if (svg) {
        if (i >= beeCount - 2) {
          bee.classList.add("bee-explorer");
          svg.style.animation = "none";
        } else {
          const newDuration = 10 + Math.random() * 10;
          svg.style.animationDuration = `${newDuration}s`;
          svg.style.animationDelay = `-${Math.random() * 20}s`;
        }
      }

      container.appendChild(bee);
    }
  }, []);

  return <div ref={containerRef} id="bees-container" className="bees-container" />;
}

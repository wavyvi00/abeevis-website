"use client";

import { useEffect, useRef } from "react";

export default function FloatingPollen() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const initPollen = () => {
      container.innerHTML = "";

      const pollenCount = 25; // Good amount of dust/pollen particles

      for (let i = 0; i < pollenCount; i++) {
        const pollen = document.createElement("div");
        
        const size = 2 + Math.random() * 4;
        pollen.style.position = "absolute";
        pollen.style.width = `${size}px`;
        pollen.style.height = `${size}px`;
        pollen.style.borderRadius = "50%";
        pollen.style.backgroundColor = "var(--color-accent)";
        pollen.style.boxShadow = "0 0 10px 2px rgba(232, 169, 94, 0.6)";
        pollen.style.opacity = `${0.1 + Math.random() * 0.4}`;
        pollen.style.pointerEvents = "none";
        pollen.style.zIndex = "0";

        const left = Math.random() * 100;
        const top = Math.random() * 100;

        pollen.style.left = `${left}%`;
        pollen.style.top = `${top}%`;
        
        // Use a generic drift animation
        const driftX = (Math.random() - 0.5) * 60; // -30px to +30px
        const driftY = (Math.random() - 0.5) * 60; // -30px to +30px
        
        // Set up CSS variables for the keyframes
        pollen.style.setProperty('--drift-x', `${driftX}px`);
        pollen.style.setProperty('--drift-y', `${driftY}px`);

        pollen.style.animation = `pollenDrift ${10 + Math.random() * 15}s ease-in-out infinite alternate`;
        pollen.style.animationDelay = `-${Math.random() * 20}s`;

        container.appendChild(pollen);
      }
    };

    let timeoutId: ReturnType<typeof setTimeout>;
    
    // Defer execution slightly to not block render
    timeoutId = setTimeout(initPollen, 300);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  return <div ref={containerRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }} />;
}

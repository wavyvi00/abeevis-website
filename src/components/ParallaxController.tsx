"use client";

import { useEffect } from "react";

export default function ParallaxController() {
  useEffect(() => {
    let parallaxData: { el: HTMLElement; speed: number; parentTop: number }[] = [];
    let isMobile = false;

    const cacheParallaxPositions = () => {
      isMobile = window.innerWidth <= 768;
      const elements = document.querySelectorAll<HTMLElement>(
        ".parallax-layer, .parallax-bg, .parallax-shape"
      );

      if (isMobile) {
        elements.forEach((el) => {
          el.style.transform = "";
        });
        parallaxData = [];
        return;
      }

      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      parallaxData = Array.from(elements).map((el) => {
        const parent = el.parentElement;
        const rect = parent ? parent.getBoundingClientRect() : { top: 0 };
        return {
          el,
          speed: parseFloat(el.getAttribute("data-speed") || "0"),
          parentTop: rect.top + scrollY,
        };
      });
    };

    let scrollTicked = false;
    const onScroll = () => {
      if (isMobile || parallaxData.length === 0) return;
      if (!scrollTicked) {
        requestAnimationFrame(() => {
          const scrollY = window.pageYOffset || document.documentElement.scrollTop;
          parallaxData.forEach((data) => {
            const yPos = (scrollY - data.parentTop) * data.speed;
            data.el.style.transform = `translateY(${yPos}px)`;
          });
          scrollTicked = false;
        });
        scrollTicked = true;
      }
    };

    const adjustFooterReveal = () => {
      const footer = document.querySelector<HTMLElement>(".site-footer");
      const main = document.querySelector<HTMLElement>("main");
      if (window.innerWidth > 768 && footer && main) {
        const footerHeight = footer.offsetHeight;
        main.style.marginBottom = `${footerHeight}px`;
        footer.style.height = `${footerHeight}px`;
      } else if (main) {
        main.style.marginBottom = "0px";
      }
    };

    const initParallax = () => {
      cacheParallaxPositions();
      adjustFooterReveal();

      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener(
        "resize",
        () => {
          cacheParallaxPositions();
          onScroll();
          adjustFooterReveal();
        },
        { passive: true }
      );
    };

    let idleCallbackId: number;
    let timeoutId: ReturnType<typeof setTimeout>;

    if ('requestIdleCallback' in window) {
      idleCallbackId = requestIdleCallback(initParallax, { timeout: 1000 });
    } else {
      timeoutId = setTimeout(initParallax, 300);
    }

    return () => {
      if (idleCallbackId) cancelIdleCallback(idleCallbackId);
      if (timeoutId) clearTimeout(timeoutId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", adjustFooterReveal);
    };
  }, []);

  return null;
}

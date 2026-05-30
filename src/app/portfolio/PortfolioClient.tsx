"use client";

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { motion, useSpring, useMotionValue } from "framer-motion";
import AnimatedProjectCard from "@/components/AnimatedProjectCard";
import HoneycombBackground from "@/components/HoneycombBackground";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const projects = [
  {
    title: "Florida CDL Website",
    category: "Web Design & Development",
    imageSrc: "/assets/images/florida-cdl.webp",
    link: "https://floridacdl.com",
  },
  {
    title: "CDL ZERO Website / Study App",
    category: "Web Platform & Mobile App",
    imageSrc: "/assets/images/cdl-zero.webp",
    link: "https://cdlzero.com",
  },
  {
    title: "Order Easy",
    category: "Digital Product",
    imageSrc: "/assets/images/order-easy.webp",
    link: "https://order-easy-omega.vercel.app",
  },
  {
    title: "Family Transport USA",
    category: "Web Design & Development",
    imageSrc: "/assets/images/family-transport.webp",
    link: "https://www.familytransportusa.com/",
  },
  {
    title: "VR Enterprise",
    category: "Web Design & Development",
    imageSrc: "/assets/images/vr-enterprise.webp",
    link: "https://www.vrenterprisepr.com/",
  },
];

export default function PortfolioClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollSectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Custom Cursor state
  const [cursorHovered, setCursorHovered] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16); // Center the 32px cursor
      cursorY.set(e.clientY - 16);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('.work-item')) {
        setCursorHovered(true);
      } else {
        setCursorHovered(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  useGSAP(() => {
    if (!trackRef.current || !scrollSectionRef.current) return;
    
    // 3D Text Shatter Entrance (Always runs)
    gsap.fromTo(".char", 
      { 
        opacity: 0, 
        z: () => gsap.utils.random(-400, 400),
        x: () => gsap.utils.random(-100, 100),
        y: () => gsap.utils.random(-100, 100),
        rotationX: () => gsap.utils.random(-90, 90),
        rotationY: () => gsap.utils.random(-90, 90),
      },
      {
        opacity: 1,
        z: 0,
        x: 0,
        y: 0,
        rotationX: 0,
        rotationY: 0,
        duration: 1.5,
        stagger: 0.05,
        ease: "back.out(1.7)",
        transformOrigin: "50% 50% -50px"
      }
    );

    let mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
      // Horizontal Scroll Trigger - Pinned to the section (Desktop Only)
      gsap.to(trackRef.current, {
        x: () => -(trackRef.current!.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: scrollSectionRef.current,
          pin: true,
          scrub: 1,
          end: () => "+=" + trackRef.current?.offsetWidth,
          invalidateOnRefresh: true, 
        }
      });
    });

    mm.add("(max-width: 768px)", () => {
      // Vertical Scroll - Simple fade up (Mobile Only)
      const cards = gsap.utils.toArray(".horizontal-card");
      cards.forEach((card: any) => {
        gsap.from(card, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          }
        });
      });
    });

  }, { scope: containerRef });

  const titleText = "Digital Portfolio.";

  return (
    <div ref={containerRef}>
      <style>{`
        .portfolio-track-section {
          height: 100vh;
          overflow: hidden;
          display: flex;
          align-items: center;
          background-color: transparent;
        }
        .portfolio-track {
          display: flex;
          width: fit-content;
          padding-left: 10vw;
        }
        .horizontal-card {
          width: 60vw;
          min-width: 300px;
          max-width: 800px;
          flex-shrink: 0;
          padding-right: 5vw;
        }
        .mobile-spacer {
          width: 5vw;
          flex-shrink: 0;
        }
        .custom-cursor {
          position: fixed;
          left: 0;
          top: 0;
          width: 40px;
          height: 40px;
          pointer-events: none;
          z-index: 9999;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .hide-cursor-desktop {
          cursor: none;
        }
        
        @media (max-width: 768px) {
          .portfolio-track-section {
            height: auto;
            overflow: visible;
            display: block;
            padding: 2rem 5vw;
          }
          .portfolio-track {
            flex-direction: column;
            width: 100%;
            padding-left: 0;
            gap: 2rem;
          }
          .horizontal-card {
            width: 100%;
            max-width: 100%;
            padding-right: 0;
          }
          .mobile-spacer {
            display: none;
          }
          .custom-cursor {
            display: none !important;
          }
          .hide-cursor-desktop {
            cursor: auto !important;
          }
        }
      `}</style>

      {/* Interactive 3D Honeycomb Hive - Global Background */}
      <HoneycombBackground />

      {/* Custom Reactive Cursor - Bee */}
      <motion.div
        className="custom-cursor"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={{
          scale: cursorHovered ? 2 : 1,
          rotate: cursorHovered ? 15 : 0,
        }}
      >
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          style={{ 
            width: "100%", 
            height: "100%", 
            color: "var(--color-accent)",
            opacity: cursorHovered ? 0.2 : 1, 
            transition: "opacity 0.3s ease"
          }}
        >
            <path d="M5 8C5 8 0 4 2 3C4 2 8 6 8 10" fill="currentColor" opacity="0.6"/>
            <path d="M19 8C19 8 24 4 22 3C20 2 16 6 16 10" fill="currentColor" opacity="0.6"/>
            <ellipse cx="12" cy="12" rx="5" ry="8" fill="currentColor" />
            <path d="M8.5 10H15.5" stroke="var(--color-bg)" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M8.5 13H15.5" stroke="var(--color-bg)" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M9.5 16H14.5" stroke="var(--color-bg)" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M10 5L8 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M14 5L16 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        {cursorHovered && (
          <span style={{ 
            position: "absolute", 
            color: "var(--color-accent-text)", 
            fontSize: "10px", 
            fontWeight: "bold",
            mixBlendMode: "normal"
          }}>
            VIEW
          </span>
        )}
      </motion.div>

      {/* Portfolio Header Section */}
      <section className="hero-section" style={{ paddingBottom: "2rem", minHeight: "50vh", overflow: "hidden", position: "relative", background: "transparent" }}>
        <div className="parallax-bg layer-1" data-speed="0.4" style={{ position: "absolute", zIndex: 1 }}></div>
        <div className="parallax-bg layer-2" data-speed="-0.2" style={{ position: "absolute", zIndex: 1 }}></div>

        <div className="container hero-content" style={{ marginTop: "100px", zIndex: 10, position: "relative", perspective: "1000px" }}>
          <span className="eyebrow block mb-4 text-accent">Our Work</span>
          <h1 className="hero-title" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
            {titleText.split("").map((char, i) => (
              <span 
                key={i} 
                className="char" 
                style={{ display: "inline-block", color: char === "." ? "var(--color-accent-text)" : "inherit" }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h1>
          <p className="hero-subtitle">
            A showcase of the digital products, websites, and platforms we've built for forward-thinking businesses.
          </p>
        </div>
      </section>

      {/* Pinned Horizontal GSAP Scroll Section (Vertical on Mobile) */}
      <section ref={scrollSectionRef} className="portfolio-track-section">
        <div ref={trackRef} className="portfolio-track">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="horizontal-card" 
            >
              <AnimatedProjectCard
                title={project.title}
                category={project.category}
                imageSrc={project.imageSrc}
                link={project.link}
                priority={index === 0}
              />
            </div>
          ))}
          {/* Dummy spacer to ensure the final scroll stops perfectly symmetric with a 10vw gap */}
          <div className="mobile-spacer" />
        </div>
      </section>
      
      <div style={{ textAlign: "center", margin: "10rem 0", paddingBottom: "5rem" }}>
        <Link href="/#contact" className="btn-primary">
          Start a Project With Us
        </Link>
      </div>
    </div>
  );
}

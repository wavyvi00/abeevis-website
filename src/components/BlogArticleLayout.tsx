"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

interface BlogArticleLayoutProps {
  title: string;
  category: string;
  subtitle: string;
  image: string;
  children: React.ReactNode;
}

export default function BlogArticleLayout({ title, category, subtitle, image, children }: BlogArticleLayoutProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll for the progress bar and parallax hero
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const { scrollY } = useScroll();
  
  // Parallax calculations for the hero image
  const y = useTransform(scrollY, [0, 1000], [0, 400]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <div ref={containerRef} style={{ position: "relative", backgroundColor: "var(--color-bg)" }}>
      {/* Reading Progress Bar */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          background: "var(--color-accent)",
          transformOrigin: "0%",
          scaleX: scrollYProgress,
          zIndex: 9999,
        }}
      />

      {/* Parallax Hero Section */}
      <div style={{ position: "relative", height: "70vh", minHeight: "500px", overflow: "hidden" }}>
        <motion.div style={{ position: "absolute", inset: 0, y, opacity }}>
          <Image
            src={image}
            alt={title}
            fill
            style={{ objectFit: "cover" }}
            priority
          />
          {/* Gradient overlay to make text readable */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.8) 100%)" }} />
        </motion.div>

        {/* Hero Content - Robust Flex Layout for Mobile */}
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", padding: "100px 5vw 4rem 5vw" }}>
          
          {/* Premium Back Button pushed to the top */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ marginBottom: "auto", zIndex: 50 }}
          >
            <Link href="/blog" style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "10px 20px",
                background: "rgba(0,0,0,0.4)",
                backdropFilter: "blur(10px)",
                borderRadius: "30px",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#fff",
                textDecoration: "none",
                fontSize: "0.9rem",
                fontWeight: 500
            }}>
              <span>&larr;</span> Back to Blog
            </Link>
          </motion.div>

          {/* Title Area at the bottom */}
          <div style={{ maxWidth: "800px", zIndex: 50 }}>
            <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                style={{ fontSize: "1rem", color: "var(--color-accent)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "1rem", display: "block" }}
            >
              {category}
            </motion.span>
            
            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", color: "#fff", lineHeight: 1.1, margin: "0 0 1rem 0", fontWeight: 700 }}
            >
              {title}
            </motion.h1>
            
            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                style={{ fontSize: "clamp(1.2rem, 2vw, 1.5rem)", color: "rgba(255,255,255,0.8)" }}
            >
              {subtitle}
            </motion.p>
          </div>
        </div>
      </div>

      {/* Article Content Area */}
      <div style={{ position: "relative", zIndex: 10, background: "var(--color-bg)", paddingTop: "4rem" }}>
        <article style={{ maxWidth: "750px", margin: "0 auto", padding: "0 1.5rem 6rem 1.5rem" }}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="blog-content-body"
          >
            {children}
          </motion.div>

          {/* Call to Action at bottom of article */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ marginTop: "6rem", paddingTop: "4rem", borderTop: "1px solid rgba(255,255,255,0.1)", textAlign: "center" }}
          >
            <h3 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Need help clarifying your digital voice?</h3>
            <p style={{ color: "var(--color-text-light)", marginBottom: "2rem", fontSize: "1.1rem" }}>
              Let's craft a strategy that sets you apart from the noise.
            </p>
            <Link href="/#contact" className="btn-primary" style={{ display: "inline-block", border: "none" }}>
              Start a Strategy Session
            </Link>
          </motion.div>
        </article>
      </div>

      {/* Global typography styles for the blog body */}
      <style>{`
        .blog-content-body p {
          font-size: 1.25rem;
          line-height: 1.8;
          margin-bottom: 2rem;
          color: rgba(255,255,255,0.85);
        }
        .blog-content-body h2 {
          font-size: 2.2rem;
          margin-top: 4rem;
          margin-bottom: 1.5rem;
          color: #fff;
          font-weight: 700;
        }
        .blog-content-body h3 {
          font-size: 1.8rem;
          margin-top: 3rem;
          margin-bottom: 1rem;
          color: #fff;
          font-weight: 600;
        }
        .blog-content-body ul {
          margin-bottom: 2rem;
          padding-left: 1.5rem;
          color: rgba(255,255,255,0.85);
        }
        .blog-content-body li {
          margin-bottom: 0.8rem;
          line-height: 1.6;
          font-size: 1.15rem;
        }
      `}</style>
    </div>
  );
}

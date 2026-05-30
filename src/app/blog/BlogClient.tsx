"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import FireflyBackground from "@/components/FireflyBackground";

const blogPosts = [
  {
    title: "Expanding Your Social Media Presence",
    category: "Growth",
    image: "/assets/images/Blog-social-meadia1.webp",
    link: "/blog/social-media"
  },
  {
    title: "5 Tips for Business Owners on Digital Presence",
    category: "Strategy",
    image: "/assets/images/Blog-strategy1.webp",
    link: "/blog/digital-presence"
  },
  {
    title: "Why Your Business Needs a High-Performance Website",
    category: "Technology",
    image: "/assets/images/Blog-performance1.webp",
    link: "/blog/importance-of-websites"
  }
];

const AccordionPanel = ({ post, index, activeIndex, setActiveIndex, isMobile }: any) => {
  const isActive = activeIndex === index;
  const isDefault = activeIndex === null;
  
  // Parallax Background Physics - Heavily damped to prevent jerky movements
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { damping: 40, stiffness: 40 });
  const smoothY = useSpring(mouseY, { damping: 40, stiffness: 40 });
  
  // Very subtle 1% parallax shift
  const parallaxX = useTransform(smoothX, [-0.5, 0.5], ["-1%", "1%"]);
  const parallaxY = useTransform(smoothY, [-0.5, 0.5], ["-1%", "1%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isActive || isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      className="accordion-panel"
      onMouseEnter={() => !isMobile && setActiveIndex(index)}
      onMouseLeave={() => !isMobile && setActiveIndex(null)}
      onClick={() => isMobile && setActiveIndex(isActive ? null : index)}
      onMouseMove={handleMouseMove}
      animate={{
        flex: isActive ? 5 : isDefault ? 2 : 1
      }}
      transition={{ type: "spring", bounce: 0, duration: 1.2 }}
    >
      {/* Background Image with Parallax */}
      <motion.div 
        className="accordion-bg"
        animate={{ 
            scale: 1, // Removed hover scale completely
            filter: isActive ? "grayscale(0%)" : "grayscale(50%)",
        }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div style={{ width: "110%", height: "110%", position: "absolute", top: "-5%", left: "-5%", x: parallaxX, y: parallaxY }}>
            <Image 
                src={post.image} 
                fill 
                style={{ objectFit: "cover" }} 
                alt={post.title} 
                priority={index === 0}
            />
        </motion.div>
      </motion.div>
      
      {/* Gradient Overlay */}
      <div className="accordion-overlay" />
      
      {/* Panel Content */}
      <div className="accordion-content">
         <motion.div
            initial={false}
            animate={{ 
                y: isActive ? 0 : 20,
                opacity: isActive ? 1 : isDefault ? 0.9 : 0.4 
            }}
            transition={{ duration: 0.5 }}
         >
           <span style={{ color: "var(--color-accent)", fontSize: "0.8rem", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 700, display: "block", marginBottom: "0.5rem" }}>
               {post.category}
           </span>
           <h2 style={{ color: "#fff", fontSize: "clamp(1.5rem, 3vw, 2.5rem)", lineHeight: 1.1, margin: 0, fontWeight: 700 }}>
               {post.title}
           </h2>
           
           <AnimatePresence>
             {isActive && (
               <motion.div
                 initial={{ opacity: 0, height: 0, marginTop: 0 }}
                 animate={{ opacity: 1, height: "auto", marginTop: "1.5rem" }}
                 exit={{ opacity: 0, height: 0, marginTop: 0 }}
                 transition={{ duration: 0.4 }}
                 style={{ overflow: "hidden" }}
               >
                  <Link href={post.link} onClick={(e) => e.stopPropagation()} className="btn-primary" style={{ display: "inline-block", background: "var(--color-accent)", color: "#000", border: "none" }}>
                      Read Article
                  </Link>
               </motion.div>
             )}
           </AnimatePresence>
         </motion.div>
      </div>
    </motion.div>
  );
};

export default function BlogClient() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={{ padding: "100px 5vw", minHeight: "100vh", position: "relative" }}>
      <FireflyBackground />
      
      <div style={{ paddingBottom: "2rem", textAlign: "center", position: "relative", zIndex: 10 }}>
        <span className="eyebrow block mb-2 text-accent">Abeevis Insights</span>
        <h1 className="hero-title" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", margin: 0 }}>
          Digital Strategy.
        </h1>
        <p style={{ marginTop: "1rem" }}>Explore our latest thoughts on creativity, technology, and growth.</p>
      </div>

      <div className="accordion-container">
        {blogPosts.map((post, index) => (
          <AccordionPanel 
            key={index} 
            post={post} 
            index={index} 
            activeIndex={activeIndex} 
            setActiveIndex={setActiveIndex} 
            isMobile={isMobile}
          />
        ))}
      </div>
    </div>
  );
}

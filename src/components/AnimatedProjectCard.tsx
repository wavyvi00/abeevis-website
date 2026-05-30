"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";

interface AnimatedProjectCardProps {
  title: string;
  category: string;
  imageSrc: string;
  link: string;
  priority?: boolean;
}

export default function AnimatedProjectCard({
  title,
  category,
  imageSrc,
  link,
  priority = false,
}: AnimatedProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 40 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 40 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  // Glare effect based on mouse position
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 60%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="work-item"
      style={{ 
        display: "block", 
        textDecoration: "none",
        perspective: "1000px",
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
    >
      <motion.div 
        ref={ref}
        className="work-visual hide-cursor-desktop" 
        style={{ 
          overflow: "hidden",
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] as const }}
      >
        <motion.div
          style={{ width: "100%", height: "100%", transform: "translateZ(30px)" }} // Pop out the image slightly
        >
          <Image
            src={imageSrc}
            alt={title}
            width={800}
            height={500}
            style={{ objectFit: "cover", width: "100%", height: "100%", pointerEvents: "none" }}
            priority={priority}
          />
        </motion.div>
        
        {/* Holographic Glare Layer */}
        <motion.div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: glareBackground,
            pointerEvents: "none",
            transform: "translateZ(40px)",
            mixBlendMode: "overlay",
          }}
        />
      </motion.div>

      <motion.div 
        className="work-info"
        style={{ transform: "translateZ(20px)" }} // Also pop out the text
      >
        <h3>{title}</h3>
        <p>{category}</p>
      </motion.div>
    </motion.a>
  );
}

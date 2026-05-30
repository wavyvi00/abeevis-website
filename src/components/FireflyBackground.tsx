"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const Firefly = ({ id, mouseX, mouseY, windowSize }: any) => {
  // Randomize initial properties
  const [initialX] = useState(() => Math.random() * (windowSize.width || 1000));
  const [initialY] = useState(() => Math.random() * (windowSize.height || 1000));
  const [size] = useState(() => Math.random() * 4 + 2); // 2px to 6px
  const [duration] = useState(() => Math.random() * 20 + 10); // 10s to 30s
  const [delay] = useState(() => Math.random() * -30); // Random start time

  // Physics for scattering away from mouse
  const distanceX = useTransform(() => mouseX.get() - initialX);
  const distanceY = useTransform(() => mouseY.get() - initialY);
  
  const scatterX = useTransform(distanceX, [-200, 0, 200], [100, 0, -100]);
  const scatterY = useTransform(distanceY, [-200, 0, 200], [100, 0, -100]);

  // Combine floating animation with mouse scatter
  return (
    <motion.div
      style={{
        position: "absolute",
        left: initialX,
        top: initialY,
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: "rgba(232, 169, 94, 0.8)", // Golden honey color
        boxShadow: `0 0 ${size * 3}px ${size}px rgba(232, 169, 94, 0.4)`, // Glow
        x: scatterX,
        y: scatterY,
      }}
      animate={{
        y: [initialY, initialY - 100, initialY + 50, initialY],
        x: [initialX, initialX + 50, initialX - 50, initialX],
        opacity: [0.2, 1, 0.2],
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        ease: "linear",
        delay: delay,
      }}
    />
  );
};

export default function FireflyBackground() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isMounted, setIsMounted] = useState(false);

  const rawMouseX = useMotionValue(-1000);
  const rawMouseY = useMotionValue(-1000);
  const mouseX = useSpring(rawMouseX, { damping: 20, stiffness: 50 });
  const mouseY = useSpring(rawMouseY, { damping: 20, stiffness: 50 });

  useEffect(() => {
    setIsMounted(true);
    
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      rawMouseX.set(e.clientX);
      rawMouseY.set(e.clientY);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [rawMouseX, rawMouseY]);

  // Generate 40 fireflies once
  const [fireflies] = useState(() => Array.from({ length: 40 }).map((_, i) => i));

  if (!isMounted) return null;

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      overflow: "hidden",
      pointerEvents: "none",
      zIndex: -1, // Keep behind everything
    }}>
      {fireflies.map((id) => (
        <Firefly 
          key={id} 
          id={id} 
          mouseX={mouseX} 
          mouseY={mouseY} 
          windowSize={dimensions} 
        />
      ))}
    </div>
  );
}

"use client";

import React, { useEffect, useState, useMemo } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const R = 45; // radius of hexagon
const W = 2 * R;
const H = Math.sqrt(3) * R;

const Hexagon = ({ xPos, yPos, globalMouseX, globalMouseY }: any) => {
  // Calculate distance from mouse to the center of this hexagon
  const distance = useTransform(() => {
    const dx = globalMouseX.get() - xPos;
    const dy = globalMouseY.get() - yPos;
    return Math.sqrt(dx * dx + dy * dy);
  });

  // Reactive Physics based on distance
  const scale = useTransform(distance, [0, 150, 400], [1.1, 0.9, 0.75]);
  const z = useTransform(distance, [0, 150, 400], [60, 10, 0]);
  const opacity = useTransform(distance, [0, 200, 500], [0.8, 0.3, 0.08]);
  // Resting color is a faint honey tint, active color is bright honey/gold
  const color = useTransform(distance, [0, 150], ["#E8A95E", "rgba(232, 169, 94, 0.2)"]);

  return (
    <motion.div
      style={{
        position: "absolute",
        left: xPos - W / 2,
        top: yPos - H / 2,
        width: W,
        height: H,
        // Flat-topped hexagon SVG clip path
        clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
        backgroundColor: color,
        opacity,
        scale,
        z,
        transformStyle: "preserve-3d",
      }}
    />
  );
};

export default function HoneycombBackground() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  
  // Track global mouse
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);
  
  // Add physics spring to mouse movement so the rippling feels liquid/organic
  const springConfig = { damping: 40, stiffness: 200 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    // Initial setup
    handleResize();

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  // Pre-calculate grid to avoid massive re-renders
  const hexagons = useMemo(() => {
    if (dimensions.width === 0) return [];
    
    const cols = Math.ceil(dimensions.width / (1.5 * R)) + 2;
    // Cover the full viewport height since it's now position: fixed
    const rows = Math.ceil(dimensions.height / H) + 2;

    const hexList = [];
    for (let c = -1; c < cols; c++) {
      for (let r = -1; r < rows; r++) {
        const xPos = c * 1.5 * R;
        const yPos = r * H + (Math.abs(c) % 2 === 1 ? H / 2 : 0);
        hexList.push(
          <Hexagon 
            key={`${c}-${r}`} 
            xPos={xPos} 
            yPos={yPos} 
            globalMouseX={smoothMouseX} 
            globalMouseY={smoothMouseY} 
          />
        );
      }
    }
    return hexList;
  }, [dimensions, smoothMouseX, smoothMouseY]);

  if (dimensions.width === 0) return null;

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      overflow: "hidden",
      pointerEvents: "none",
      perspective: "1200px", // Enables the 3D pop effect
      zIndex: 0,
    }}>
      {/* Container slightly rotated to look more dynamic in 3D */}
      <motion.div style={{
        width: "100%",
        height: "100%",
        rotateX: 10,
        rotateY: -5,
        transformStyle: "preserve-3d"
      }}>
        {hexagons}
      </motion.div>
    </div>
  );
}

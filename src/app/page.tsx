"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import FloatingBees from "@/components/FloatingBees";
import FloatingPollen from "@/components/FloatingPollen";
import ContactForm from "@/components/ContactForm";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function Home() {
  const processRef = useRef<HTMLElement>(null);
  
  // Polaroid Auto-Hover Logic
  const [autoHoverIndex, setAutoHoverIndex] = useState<number | null>(null);
  const [userHasHovered, setUserHasHovered] = useState(false);

  useEffect(() => {
    if (userHasHovered) {
      setAutoHoverIndex(null);
      return;
    }

    const interval = setInterval(() => {
      // Pick random polaroid to highlight (0 to 4)
      const nextIndex = Math.floor(Math.random() * 5);
      setAutoHoverIndex(nextIndex);
      
      // Clear highlight after 1.5s
      setTimeout(() => {
        setAutoHoverIndex(null);
      }, 1500);
    }, 3500);

    return () => clearInterval(interval);
  }, [userHasHovered]);

  useGSAP(() => {
    const isMobile = window.innerWidth <= 768;
    
    const timelineLayout = document.querySelector('.process-timeline-layout') as HTMLElement;
    
    if (timelineLayout) {
      // Animate the Glow Track (Desktop & Mobile)
      gsap.to('.glow-track', {
        height: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: timelineLayout,
          start: "top center",
          end: "bottom center",
          scrub: 1
        }
      });

      // Animate the Bee (Desktop & Mobile)
      gsap.to('.scroll-bee', {
        top: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: timelineLayout,
          start: "top center",
          end: "bottom center",
          scrub: 1
        }
      });
    }

    if (!isMobile) {
      if (timelineLayout) {
        // Background Parallax Elements
        gsap.to('.scroll-orb-1', {
          y: '30vh', x: '10vw', ease: 'none',
          scrollTrigger: { trigger: processRef.current, start: "top bottom", end: "bottom top", scrub: 1 }
        });
        gsap.to('.scroll-orb-2', {
          y: '-30vh', x: '-10vw', ease: 'none',
          scrollTrigger: { trigger: processRef.current, start: "top bottom", end: "bottom top", scrub: 1 }
        });
        gsap.to('.scroll-hex', {
          rotation: 180, y: '20vh', ease: 'none',
          scrollTrigger: { trigger: processRef.current, start: "top bottom", end: "bottom top", scrub: 1 }
        });
        gsap.to('.scroll-hex-2', {
          rotation: -120, y: '-20vh', ease: 'none',
          scrollTrigger: { trigger: processRef.current, start: "top bottom", end: "bottom top", scrub: 1 }
        });
      }

      // Animate each step card independently as it enters the center of the screen
      const steps = gsap.utils.toArray('.timeline-card') as HTMLElement[];
      steps.forEach((step) => {
        gsap.to(step, {
          opacity: 1,
          scale: 1.02,
          boxShadow: '0 20px 50px rgba(0,0,0,0.1)',
          borderColor: 'var(--color-accent)',
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: step,
            start: "top 65%",
            end: "bottom 35%",
            toggleActions: "play reverse play reverse",
          }
        });
      });
    } else {
      // Simple fade in for mobile
      const steps = gsap.utils.toArray('.timeline-card') as HTMLElement[];
      steps.forEach((step) => {
        gsap.from(step, {
          opacity: 0,
          y: 20,
          scrollTrigger: {
            trigger: step,
            start: "top 80%",
          }
        });
      });
    }
  }, { scope: processRef });

  return (
    <>
      {/* Hero Section */}
      <section id="hero" className="hero-section">
        <div className="container hero-content">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="eyebrow"
          >
            Abeevis Studio
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hero-title"
          >
            Digital Clarity.<br />
            <span className="text-accent">Engineered Creativity.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="hero-subtitle"
          >
            We build intelligent digital products, apps, software, and AI-assisted solutions for forward-thinking businesses.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="hero-actions"
          >
            <Link href="#contact" className="btn-primary">
              Start a Project
            </Link>
            <Link href="#services" className="btn-secondary">
              Explore Services
            </Link>
          </motion.div>
        </div>
        
        <FloatingBees />
      </section>

      {/* Services Section */}
      <section id="services" className="section relative services-bg" style={{ paddingBottom: '8rem', paddingTop: '8rem' }}>
        <div className="container relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="section-header"
          >
            <h2 className="section-title">What We Build</h2>
            <p className="section-subtitle">Comprehensive digital solutions engineered for impact.</p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.1 } },
              hidden: {}
            }}
            className="bento-grid"
          >
            {/* 1. Digital Products */}
            <motion.div 
              variants={{ hidden: { opacity: 0, y: 20, scale: 0.95 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } } }}
              whileHover={{ scale: 0.98, transition: { duration: 0.2 } }}
              className="bento-card bento-span-2"
              style={{ background: 'linear-gradient(145deg, rgba(24,24,24,1) 0%, rgba(14,14,14,1) 100%)', justifyContent: 'flex-end', color: '#fff' }}
            >
              <div className="bento-number">01</div>
              <div style={{ position: 'absolute', top: '-50px', left: '-50px', width: '200px', height: '200px', background: 'rgba(232,169,94,0.15)', filter: 'blur(50px)', borderRadius: '50%' }}></div>
              
              <h3 style={{ color: '#fff' }}>Digital Products</h3>
              <p style={{ maxWidth: '400px', color: 'rgba(255,255,255,0.7)' }}>End-to-end product design and development, from initial concept to market-ready launch.</p>
            </motion.div>
            
            {/* 3. Platforms */}
            <motion.div 
              variants={{ hidden: { opacity: 0, y: 20, scale: 0.95 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } } }}
              whileHover={{ scale: 0.98, transition: { duration: 0.2 } }}
              className="bento-card"
              style={{ background: 'var(--color-surface)', justifyContent: 'space-between' }}
            >
              <div className="bento-number">03</div>
              <h3 style={{ fontSize: '1.5rem', color: 'var(--color-text)' }}>Platforms</h3>
              <p>Complex web platforms tailored to your business logic.</p>
            </motion.div>

            {/* 2. Websites */}
            <motion.div 
              variants={{ hidden: { opacity: 0, y: 20, scale: 0.95 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } } }}
              whileHover={{ scale: 0.98, transition: { duration: 0.2 } }}
              className="bento-row-span-2"
            >
              <Link href="/websites" className="bento-card bento-link-card"
                    style={{ background: 'linear-gradient(to bottom, rgba(232,169,94,0.05) 0%, rgba(232,169,94,0.15) 100%)', height: '100%', justifyContent: 'flex-end', textDecoration: 'none' }}>
                <div className="bento-number" style={{ left: '20px', right: 'auto', color: 'var(--color-accent)' }}>02</div>
                
                <h3 style={{ fontSize: '2rem', marginTop: '80px', color: 'var(--color-text)' }}>Websites</h3>
                <p style={{ marginBottom: '24px' }}>Professional, high-performance web presences.</p>
                <span className="bento-action">
                  View Services <svg className="icon-arrow" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </span>
              </Link>
            </motion.div>

            {/* 4. Applications */}
            <motion.div 
              variants={{ hidden: { opacity: 0, y: 20, scale: 0.95 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } } }}
              whileHover={{ scale: 0.98, transition: { duration: 0.2 } }}
              className="bento-card"
              style={{ background: 'var(--color-surface)', justifyContent: 'space-between' }}
            >
              <div className="bento-number">04</div>
              <h3 style={{ fontSize: '1.5rem', color: 'var(--color-text)' }}>Applications</h3>
              <p>Native mobile apps & progressive web apps.</p>
            </motion.div>

            {/* 5. AI Integration */}
            <motion.div 
              variants={{ hidden: { opacity: 0, y: 20, scale: 0.95 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } } }}
              whileHover={{ scale: 0.98, transition: { duration: 0.2 } }}
              className="bento-card bento-span-2"
              style={{ background: 'linear-gradient(to top right, rgba(20,20,20,1) 0%, rgba(30,30,40,1) 100%)', justifyContent: 'flex-end', color: '#fff' }}
            >
              <div className="bento-animated-bg"></div>
              <div className="bento-number">05</div>
              
              <h3 style={{ color: '#fff' }}>AI Integration</h3>
              <p style={{ maxWidth: '400px', color: 'rgba(255,255,255,0.7)' }}>Leveraging artificial intelligence to automate workflows and create smarter, self-learning user experiences.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Process Section - Natural Scroll Timeline */}
      <section id="process" className="section bg-light" ref={processRef} style={{ position: 'relative', overflow: 'hidden' }}>
        
        {/* Dynamic Background Elements */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
          {/* Top Left Orb */}
          <div className="scroll-orb-1" style={{ position: 'absolute', top: '-10%', left: '-10%', width: '50vw', height: '50vw', background: 'radial-gradient(circle, rgba(232,169,94,0.12) 0%, rgba(232,169,94,0) 70%)', filter: 'blur(60px)', borderRadius: '50%' }}></div>
          
          {/* Bottom Right Orb */}
          <div className="scroll-orb-2" style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '60vw', height: '60vw', background: 'radial-gradient(circle, rgba(232,169,94,0.08) 0%, rgba(232,169,94,0) 70%)', filter: 'blur(80px)', borderRadius: '50%' }}></div>
          
          {/* Huge Hexagon Graphic */}
          <div className="scroll-hex" style={{ position: 'absolute', top: '15%', right: '5%', opacity: 0.08, width: '40vw', height: '40vw', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', stroke: 'var(--color-accent)', strokeWidth: '0.5', fill: 'none' }}>
              <polygon points="50 1, 95 25, 95 75, 50 99, 5 75, 5 25" />
            </svg>
          </div>
          
          {/* Second Hexagon Graphic */}
          <div className="scroll-hex-2" style={{ position: 'absolute', bottom: '15%', left: '-5%', opacity: 0.06, width: '30vw', height: '30vw', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', stroke: 'var(--color-accent)', strokeWidth: '1', fill: 'none' }}>
              <polygon points="50 1, 95 25, 95 75, 50 99, 5 75, 5 25" />
            </svg>
          </div>
        </div>

        <div className="container" style={{ padding: '4rem 0', position: 'relative', zIndex: 1 }}>
          <div className="section-header" style={{ marginBottom: '6rem', textAlign: 'center', marginLeft: 'auto', marginRight: 'auto' }}>
            <h2 className="section-title">How We Work</h2>
            <p className="section-subtitle">A structured approach to solving complex problems.</p>
          </div>

          <div className="process-timeline-layout" style={{ position: 'relative', maxWidth: '1000px', margin: '0 auto', paddingBottom: '10vh' }}>
            
            {/* Center Track */}
            <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '2px', background: 'var(--color-border)', transform: 'translateX(-50%)', zIndex: 0 }}></div>
            
            {/* Glow Track */}
            <div className="glow-track" style={{ position: 'absolute', left: '50%', top: 0, height: '0%', width: '4px', background: 'var(--color-accent)', transform: 'translateX(-50%)', boxShadow: '0 0 15px var(--color-accent)', zIndex: 0 }}></div>
            
            {/* The Bee */}
            <div className="scroll-bee" style={{ position: 'absolute', top: 0, left: '50%', width: '48px', height: '48px', color: 'var(--color-accent)', transform: 'translate(-50%, -50%)', zIndex: 0 }}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: 'rotate(180deg)', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))' }}>
                <path d="M5 8C5 8 0 4 2 3C4 2 8 6 8 10" fill="currentColor" opacity="0.6"/>
                <path d="M19 8C19 8 24 4 22 3C20 2 16 6 16 10" fill="currentColor" opacity="0.6"/>
                <ellipse cx="12" cy="12" rx="5" ry="8" fill="currentColor" />
                <path d="M8.5 10H15.5" stroke="var(--color-bg)" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M8.5 13H15.5" stroke="var(--color-bg)" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M9.5 16H14.5" stroke="var(--color-bg)" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M10 5L8 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M14 5L16 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>

            {/* Steps Container */}
            <div className="steps-container" style={{ display: 'flex', flexDirection: 'column', gap: '10vh', position: 'relative', zIndex: 2 }}>
              
              <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start' }}>
                <div className="timeline-card" style={{ width: '100%', maxWidth: '420px', background: 'var(--color-surface)', padding: '3.5rem', borderRadius: '24px', border: '1px solid var(--color-border)', opacity: 0.4, transform: 'scale(0.95)', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: '-1.5rem', right: '1rem', fontSize: '8rem', fontWeight: 800, color: 'var(--color-text)', opacity: 0.03, lineHeight: 1, pointerEvents: 'none' }}>01</div>
                  <h3 style={{ fontSize: '2rem', marginBottom: '1rem', position: 'relative', zIndex: 1 }}>Discover</h3>
                  <p style={{ color: 'var(--color-text-light)', fontSize: '1.1rem', position: 'relative', zIndex: 1, lineHeight: 1.6 }}>We start by understanding your core business challenges, user needs, and market opportunities.</p>
                </div>
              </div>

              <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                <div className="timeline-card" style={{ width: '100%', maxWidth: '420px', background: 'var(--color-surface)', padding: '3.5rem', borderRadius: '24px', border: '1px solid var(--color-border)', opacity: 0.4, transform: 'scale(0.95)', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: '-1.5rem', left: '1rem', fontSize: '8rem', fontWeight: 800, color: 'var(--color-text)', opacity: 0.03, lineHeight: 1, pointerEvents: 'none' }}>02</div>
                  <h3 style={{ fontSize: '2rem', marginBottom: '1rem', position: 'relative', zIndex: 1 }}>Design</h3>
                  <p style={{ color: 'var(--color-text-light)', fontSize: '1.1rem', position: 'relative', zIndex: 1, lineHeight: 1.6 }}>We craft intuitive, aesthetic, and functional interfaces that clearly communicate your value.</p>
                </div>
              </div>

              <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start' }}>
                <div className="timeline-card" style={{ width: '100%', maxWidth: '420px', background: 'var(--color-surface)', padding: '3.5rem', borderRadius: '24px', border: '1px solid var(--color-border)', opacity: 0.4, transform: 'scale(0.95)', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: '-1.5rem', right: '1rem', fontSize: '8rem', fontWeight: 800, color: 'var(--color-text)', opacity: 0.03, lineHeight: 1, pointerEvents: 'none' }}>03</div>
                  <h3 style={{ fontSize: '2rem', marginBottom: '1rem', position: 'relative', zIndex: 1 }}>Build</h3>
                  <p style={{ color: 'var(--color-text-light)', fontSize: '1.1rem', position: 'relative', zIndex: 1, lineHeight: 1.6 }}>We engineer robust, scalable solutions using modern tech stacks and AI-assisted workflows.</p>
                </div>
              </div>

              <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                <div className="timeline-card" style={{ width: '100%', maxWidth: '420px', background: 'var(--color-surface)', padding: '3.5rem', borderRadius: '24px', border: '1px solid var(--color-border)', opacity: 0.4, transform: 'scale(0.95)', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: '-1.5rem', left: '1rem', fontSize: '8rem', fontWeight: 800, color: 'var(--color-text)', opacity: 0.03, lineHeight: 1, pointerEvents: 'none' }}>04</div>
                  <h3 style={{ fontSize: '2rem', marginBottom: '1rem', position: 'relative', zIndex: 1 }}>Evolve</h3>
                  <p style={{ color: 'var(--color-text-light)', fontSize: '1.1rem', position: 'relative', zIndex: 1, lineHeight: 1.6 }}>Launch is just the beginning. We iterate based on data to continuously improve performance.</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-transition">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="about-content-centered"
          >
            <h2 className="section-title">Creative Intelligence.</h2>
            <p className="lead-text">
              Abeevis is a structure for clarity in a chaotic digital world. We combine human creativity with the precision of machine intelligence to build digital products that are not just functional, but fundamental.
            </p>
            <p>Our team works with visionaries to translate abstract ideas into concrete digital architecture.</p>
          </motion.div>
        </div>
      </section>

      {/* Work Placeholder */}
      <section id="work" className="section portfolio-bg">
        <FloatingPollen />
        <div className="container relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-header"
            style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 auto', paddingTop: '2rem', maxWidth: '100%' }}
          >
            <h2 className="section-title">Selected Work</h2>
          </motion.div>

          <div 
            className="polaroid-gallery" 
            onMouseEnter={() => setUserHasHovered(true)} 
            onTouchStart={() => setUserHasHovered(true)}
          >
            
            {/* Card 1 */}
            <a href="https://floridacdl.com" target="_blank" rel="noopener noreferrer" className={`polaroid-card ${autoHoverIndex === 0 ? 'hover-active' : ''}`} style={{ '--rotation': '-3deg' } as React.CSSProperties}>
              <div className="polaroid-visual">
                <Image src="/assets/images/florida-cdl.webp" alt="Florida CDL Website" width={800} height={500} style={{ objectFit: "cover", width: "100%", height: "100%" }} priority />
              </div>
              <div className="polaroid-info">
                <h3>Florida CDL Website</h3>
                <p>Web Design & Development</p>
              </div>
            </a>
            
            {/* Card 2 */}
            <a href="https://cdlzero.com" target="_blank" rel="noopener noreferrer" className={`polaroid-card ${autoHoverIndex === 1 ? 'hover-active' : ''}`} style={{ '--rotation': '2deg', marginTop: '2rem' } as React.CSSProperties}>
              <div className="polaroid-visual">
                <Image src="/assets/images/cdl-zero.webp" alt="CDL ZERO Study App" width={800} height={500} style={{ objectFit: "cover", width: "100%", height: "100%" }} />
              </div>
              <div className="polaroid-info">
                <h3>CDL ZERO</h3>
                <p>Web Platform & Mobile App</p>
              </div>
            </a>

            {/* Card 3 */}
            <a href="https://order-easy-omega.vercel.app" target="_blank" rel="noopener noreferrer" className={`polaroid-card ${autoHoverIndex === 2 ? 'hover-active' : ''}`} style={{ '--rotation': '-1deg', marginTop: '-1rem' } as React.CSSProperties}>
              <div className="polaroid-visual">
                <Image src="/assets/images/order-easy.webp" alt="Order Easy Dashboard" width={800} height={500} style={{ objectFit: "cover", width: "100%", height: "100%" }} />
              </div>
              <div className="polaroid-info">
                <h3>Order Easy</h3>
                <p>Digital Product</p>
              </div>
            </a>

            {/* Card 4 */}
            <a href="https://www.familytransportusa.com/" target="_blank" rel="noopener noreferrer" className={`polaroid-card ${autoHoverIndex === 3 ? 'hover-active' : ''}`} style={{ '--rotation': '4deg', marginTop: '3rem' } as React.CSSProperties}>
              <div className="polaroid-visual">
                <Image src="/assets/images/family-transport.webp" alt="Family Transport USA" width={800} height={500} style={{ objectFit: "cover", width: "100%", height: "100%" }} />
              </div>
              <div className="polaroid-info">
                <h3>Family Transport USA</h3>
                <p>Web Design & Development</p>
              </div>
            </a>

            {/* Card 5 */}
            <a href="https://www.vrenterprisepr.com/" target="_blank" rel="noopener noreferrer" className={`polaroid-card ${autoHoverIndex === 4 ? 'hover-active' : ''}`} style={{ '--rotation': '-4deg', marginTop: '1rem' } as React.CSSProperties}>
              <div className="polaroid-visual">
                <Image src="/assets/images/vr-enterprise.webp" alt="VR Enterprise" width={800} height={500} style={{ objectFit: "cover", width: "100%", height: "100%" }} />
              </div>
              <div className="polaroid-info">
                <h3>VR Enterprise</h3>
                <p>Web Design & Development</p>
              </div>
            </a>

          </div>

          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <Link href="/portfolio" className="btn-secondary">
              View Full Portfolio
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        
        {/* Ambient Aurora Background */}
        <div className="ambient-background">
          <div className="ambient-blob blob-1"></div>
          <div className="ambient-blob blob-2"></div>
          <div className="ambient-blob blob-3"></div>
        </div>

        <div className="container contact-container relative z-10">
          <div className="contact-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <h2 className="contact-title" style={{ marginBottom: '1rem' }}>Let's build something fundamental.</h2>
            <p className="contact-text" style={{ maxWidth: '600px', margin: '0 auto 4rem auto', color: 'var(--color-text-light)', lineHeight: '1.6' }}>
              We are currently accepting new projects for Q2 2026. If you have a vision that requires clarity and structure, we'd love to hear from you.
            </p>
            <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

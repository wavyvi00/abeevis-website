"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 100) {
        if (currentScrollY > lastScrollY && !isMenuOpen) {
          setIsVisible(false);
        } else if (currentScrollY < lastScrollY) {
          setIsVisible(true);
        }
      } else {
        setIsVisible(true);
      }
      
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMenuOpen]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("abeevis-theme");
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("abeevis-theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <header 
      className="site-header"
      style={{
        transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 0.3s ease-in-out'
      }}
    >
      <nav className="container">
        <Link href="/" className="logo">
          <Image 
            src="/assets/images/logo.webp" 
            alt="Abeevis Logo" 
            width={48} 
            height={48} 
            priority
          />
        </Link>
        <ul
          className="nav-links"
          style={{
            display: isMenuOpen ? "flex" : "",
            flexDirection: isMenuOpen ? "column" : ("" as any),
            position: isMenuOpen ? "absolute" : "static",
            top: isMenuOpen ? "100%" : "auto",
            left: isMenuOpen ? "0" : "auto",
            width: isMenuOpen ? "100%" : "auto",
            backgroundColor: isMenuOpen ? "var(--color-bg)" : "transparent",
            padding: isMenuOpen ? "2rem" : "0",
            borderBottom: isMenuOpen ? "1px solid var(--color-border)" : "none",
          }}
        >
          <li>
            <Link href="/#services" onClick={() => setIsMenuOpen(false)}>Services</Link>
          </li>
          <li>
            <Link href="/#process" onClick={() => setIsMenuOpen(false)}>Process</Link>
          </li>
          <li>
            <Link href="/portfolio" onClick={() => setIsMenuOpen(false)}>Portfolio</Link>
          </li>
          <li>
            <Link href="/blog" onClick={() => setIsMenuOpen(false)}>Blog</Link>
          </li>
          <li>
            <Link href="/#about" onClick={() => setIsMenuOpen(false)}>About</Link>
          </li>
          <li>
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === "dark" ? (
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.4 14.5A8.2 8.2 0 0 1 9.5 3.6 8.7 8.7 0 1 0 20.4 14.5Z"></path></svg>
              ) : (
                <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg>
              )}
            </button>
          </li>
          <li>
            <Link href="/#contact" className="btn-primary" onClick={() => setIsMenuOpen(false)}>
              Get in Touch
            </Link>
          </li>
        </ul>
        <button
          className="mobile-menu-toggle"
          aria-label="Menu"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span></span>
          <span></span>
        </button>
      </nav>
    </header>
  );
}

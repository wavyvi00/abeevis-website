"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <nav className="container">
        <Link href="/" className="logo">
          <Image src="/assets/images/logo.webp" alt="Abeevis Logo" width={48} height={48} />
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
            <Link href="/blog" onClick={() => setIsMenuOpen(false)}>Blog</Link>
          </li>
          <li>
            <Link href="/#about" onClick={() => setIsMenuOpen(false)}>About</Link>
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

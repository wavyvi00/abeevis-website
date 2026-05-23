import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Importance of High-Performance Websites | Abeevis Insights",
  description: "Speed communicates trust. Discover why a high-performance website is critical for customer conversion and business credibility.",
};

export default function ImportanceOfWebsitesBlogPage() {
  return (
    <main className="blog-container" style={{ maxWidth: "700px", margin: "0 auto", padding: "4rem 1rem" }}>
      <Link href="/blog" className="back-link" style={{ display: "inline-block", marginBottom: "2rem", fontWeight: 600, color: "inherit" }}>
        &larr; Back to Insights
      </Link>

      <article>
        <header className="blog-header" style={{ textAlign: "center", marginBottom: "3rem", paddingBottom: "2rem", borderBottom: "1px solid var(--color-border)" }}>
          <span className="blog-meta" style={{ fontSize: "0.9rem", color: "var(--color-accent-text)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "1rem", display: "block" }}>
            Web Technology
          </span>
          <h1 className="hero-title" style={{ fontSize: "2.5rem" }}>
            Why Your Business Needs a High-Performance Website
          </h1>
          <p className="section-subtitle">Speed is a feature. In 2026, it's the most important one.</p>
        </header>

        <div style={{ marginBottom: "3rem" }}>
          <Image
            src="/assets/images/blog-performance.webp"
            alt="High Performance Website Speed"
            width={1000}
            height={600}
            style={{ width: "100%", height: "auto", borderRadius: "12px", boxShadow: "0 4px 30px rgba(0,0,0,0.08)" }}
          />
        </div>

        <div className="blog-content">
          <p style={{ fontSize: "1.1rem", lineHeight: 1.8, marginBottom: "1.5rem", color: "var(--color-text-light)" }}>
            Your website is your digital lobby. If a customer walked into your physical office and no one greeted
            them for 10 seconds, they would walk out. On the web, you don't even have 10 seconds. You have
            three.
          </p>

          <h2 style={{ fontSize: "1.8rem", marginTop: "3rem", marginBottom: "1rem", color: "var(--color-text)" }}>
            1. Speed Communicates Trust
          </h2>
          <p style={{ fontSize: "1.1rem", lineHeight: 1.8, marginBottom: "1.5rem", color: "var(--color-text-light)" }}>
            We've all visited "janky" websites. Links that jump around as they load. Images that are broken. It
            feels unprofessional. Subconsciously, the user asks: "If they can't handle their website, how can
            they handle my business?"
          </p>
          <blockquote style={{ borderLeft: "4px solid var(--color-accent-text)", paddingLeft: "1.5rem", margin: "2rem 0", fontFamily: "var(--font-heading)", fontStyle: "italic", fontSize: "1.2rem", color: "var(--color-text)" }}>
            "53% of mobile site visits are abandoned if pages take longer than 3 seconds to load." —
            Google Data
          </blockquote>

          <h2 style={{ fontSize: "1.8rem", marginTop: "3rem", marginBottom: "1rem", color: "var(--color-text)" }}>
            2. The SEO Factor
          </h2>
          <p style={{ fontSize: "1.1rem", lineHeight: 1.8, marginBottom: "1.5rem", color: "var(--color-text-light)" }}>
            Google doesn't just rank websites based on keywords anymore. They rank based on "Core Web
            Vitals"—metrics that measure how fast, stable, and responsive your site is. A slow site isn't just
            annoying users; it's invisible to new ones.
          </p>

          <h2 style={{ fontSize: "1.8rem", marginTop: "3rem", marginBottom: "1rem", color: "var(--color-text)" }}>
            3. Conversion is Math
          </h2>
          <p style={{ fontSize: "1.1rem", lineHeight: 1.8, marginBottom: "1.5rem", color: "var(--color-text-light)" }}>
            Every second of delay reduces customer satisfaction and conversions. Amazon found that every 100ms of
            latency cost them 1% in sales. You might not be Amazon, but the principle holds true. Friction kills
            sales.
          </p>

          <h2 style={{ fontSize: "1.8rem", marginTop: "3rem", marginBottom: "1rem", color: "var(--color-text)" }}>
            The Abeevis Standard
          </h2>
          <p style={{ fontSize: "1.1rem", lineHeight: 1.8, marginBottom: "1.5rem", color: "var(--color-text-light)" }}>
            We don't use bloated templates. We code from scratch to ensure your site is a Formula 1 car, not a
            minivan. Efficient code means faster loading, better ranking, and happier customers.
          </p>
        </div>

        <div style={{ marginTop: "4rem", paddingTop: "2rem", borderTop: "1px solid var(--color-border)", textAlign: "center" }}>
          <p style={{ marginBottom: "1rem" }}>Ready to upgrade your digital engine?</p>
          <Link href="/#contact" className="btn-primary">
            Get a Free Site Audit
          </Link>
        </div>
      </article>
    </main>
  );
}

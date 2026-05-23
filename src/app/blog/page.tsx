import Image from "next/image";
import Link from "next/link";
import ParallaxController from "@/components/ParallaxController";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Insights & Blog | Abeevis Studio",
  description: "Expert insights on digital strategy, web design, and AI solutions for forward-thinking businesses.",
};

export default function BlogPage() {
  return (
    <>
      <ParallaxController />
      <section className="hero-section" style={{ minHeight: "50vh", alignItems: "center" }}>
        <div className="parallax-bg layer-1" data-speed="0.4"></div>
        <div className="container hero-content text-center">
          <span className="eyebrow">Abeevis Insights</span>
          <h1 className="hero-title">
            Thoughts on <span className="text-accent">Digital Strategy.</span>
          </h1>
          <p className="hero-subtitle">Exploring the intersection of creativity, technology, and business growth.</p>
        </div>
        <div className="hero-visual parallax-layer" data-speed="0.1" style={{ opacity: 0.05 }}></div>
      </section>

      <section className="section">
        <div className="container">
          <div className="work-grid">
            {/* Article 1 */}
            <Link href="/blog/social-media" className="work-item">
              <div className="work-visual" style={{ background: "transparent", height: "auto" }}>
                <Image
                  src="/assets/images/blog-social-media.webp"
                  alt="Social Media Connections"
                  width={1000}
                  height={600}
                  style={{ width: "100%", height: "auto", borderRadius: "8px", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}
                />
              </div>
              <div className="work-info" style={{ marginTop: "1rem" }}>
                <span style={{ fontSize: "0.8rem", letterSpacing: "0.1em", color: "var(--color-accent-text)", fontWeight: 600, textTransform: "uppercase" }}>
                  Growth
                </span>
                <h3 style={{ marginTop: "0.5rem" }}>Expanding Your Social Media Presence</h3>
                <p style={{ textTransform: "none", marginTop: "0.5rem", lineHeight: 1.6 }}>
                  How to build an authentic community without chasing algorithms.
                </p>
                <span className="btn-secondary" style={{ marginTop: "1rem", padding: "8px 16px", fontSize: "0.8rem", display: "inline-block" }}>
                  Read Article
                </span>
              </div>
            </Link>

            {/* Article 2 */}
            <Link href="/blog/importance-of-websites" className="work-item">
              <div className="work-visual" style={{ background: "transparent", height: "auto" }}>
                <Image
                  src="/assets/images/blog-performance.webp"
                  alt="High Performance Website Speed"
                  width={1000}
                  height={600}
                  style={{ width: "100%", height: "auto", borderRadius: "8px", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}
                />
              </div>
              <div className="work-info" style={{ marginTop: "1rem" }}>
                <span style={{ fontSize: "0.8rem", letterSpacing: "0.1em", color: "var(--color-accent-text)", fontWeight: 600, textTransform: "uppercase" }}>
                  Technology
                </span>
                <h3 style={{ marginTop: "0.5rem" }}>Why Your Business Needs a High-Performance Website</h3>
                <p style={{ textTransform: "none", marginTop: "0.5rem", lineHeight: 1.6 }}>
                  Speed communicates trust. Why a slow site is costing you customers.
                </p>
                <span className="btn-secondary" style={{ marginTop: "1rem", padding: "8px 16px", fontSize: "0.8rem", display: "inline-block" }}>
                  Read Article
                </span>
              </div>
            </Link>

            {/* Article 3 */}
            <Link href="/blog/digital-presence" className="work-item">
              <div className="work-visual" style={{ background: "transparent", height: "auto" }}>
                <Image
                  src="/assets/images/blog-strategy.webp"
                  alt="Digital Strategy and Growth"
                  width={1000}
                  height={600}
                  style={{ width: "100%", height: "auto", borderRadius: "8px", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}
                />
              </div>
              <div className="work-info" style={{ marginTop: "1rem" }}>
                <span style={{ fontSize: "0.8rem", letterSpacing: "0.1em", color: "var(--color-accent-text)", fontWeight: 600, textTransform: "uppercase" }}>
                  Strategy
                </span>
                <h3 style={{ marginTop: "0.5rem" }}>5 Tips for Business Owners on Digital Presence</h3>
                <p style={{ textTransform: "none", marginTop: "0.5rem", lineHeight: 1.6 }}>
                  Fundamental pillars for standing out in a crowded digital marketplace.
                </p>
                <span className="btn-secondary" style={{ marginTop: "1rem", padding: "8px 16px", fontSize: "0.8rem", display: "inline-block" }}>
                  Read Article
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="section bg-light text-center">
        <div className="container">
          <h2 className="section-title">Stay Updated</h2>
          <p className="section-subtitle" style={{ marginBottom: "2rem" }}>
            Get the latest insights delivered to your inbox.
          </p>
          <a href="mailto:wavesparkinc@gmail.com" className="btn-primary">
            Get Updates by Email
          </a>
        </div>
      </section>
    </>
  );
}

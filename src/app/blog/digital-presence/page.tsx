import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "5 Tips for Digital Presence | Abeevis Insights",
  description: "Fundamental pillars for business owners to dominate their digital presence. From consistency to value.",
};

export default function DigitalPresenceBlogPage() {
  return (
    <main className="blog-container" style={{ maxWidth: "700px", margin: "0 auto", padding: "4rem 1rem" }}>
      <Link href="/blog" className="back-link" style={{ display: "inline-block", marginBottom: "2rem", fontWeight: 600, color: "inherit" }}>
        &larr; Back to Insights
      </Link>

      <article>
        <header className="blog-header" style={{ textAlign: "center", marginBottom: "3rem", paddingBottom: "2rem", borderBottom: "1px solid var(--color-border)" }}>
          <span className="blog-meta" style={{ fontSize: "0.9rem", color: "var(--color-accent-text)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "1rem", display: "block" }}>
            Digital Strategy
          </span>
          <h1 className="hero-title" style={{ fontSize: "2.5rem" }}>
            5 Tips for Business Owners on Digital Presence
          </h1>
          <p className="section-subtitle">Small changes that yield massive results.</p>
        </header>

        <div style={{ marginBottom: "3rem" }}>
          <Image
            src="/assets/images/blog-strategy.webp"
            alt="Digital Strategy"
            width={1000}
            height={600}
            style={{ width: "100%", height: "auto", borderRadius: "12px", boxShadow: "0 4px 30px rgba(0,0,0,0.08)" }}
          />
        </div>

        <div className="blog-content">
          <p style={{ fontSize: "1.1rem", lineHeight: 1.8, marginBottom: "1.5rem", color: "var(--color-text-light)" }}>
            You don't need a million-dollar marketing budget to dominate your local market or niche. You just
            need intention. Most businesses fail not because they lack resources, but because they lack focus.
          </p>

          <h2 style={{ fontSize: "1.8rem", marginTop: "3rem", marginBottom: "1rem", color: "var(--color-text)" }}>
            1. Claim Your Territory
          </h2>
          <p style={{ fontSize: "1.1rem", lineHeight: 1.8, marginBottom: "1.5rem", color: "var(--color-text-light)" }}>
            Ensure your Google My Business profile, Apple Maps, and social handles are identical. Nap (Name,
            Address, Phone) consistency is a huge trust signal for search engines.
          </p>

          <h2 style={{ fontSize: "1.8rem", marginTop: "3rem", marginBottom: "1rem", color: "var(--color-text)" }}>
            2. Reviews are Your Currency
          </h2>
          <p style={{ fontSize: "1.1rem", lineHeight: 1.8, marginBottom: "1.5rem", color: "var(--color-text-light)" }}>
            88% of consumers trust online reviews as much as personal recommendations. Automate your "ask." After
            every successful service, send a one-click link to leave a review.
          </p>

          <h2 style={{ fontSize: "1.8rem", marginTop: "3rem", marginBottom: "1rem", color: "var(--color-text)" }}>
            3. Consistency Over Intensity
          </h2>
          <p style={{ fontSize: "1.1rem", lineHeight: 1.8, marginBottom: "1.5rem", color: "var(--color-text-light)" }}>
            Posting 5 times in one week and then disappearing for a month is worse than posting once a week
            religiously. Algorithms favor consistency. Your audience favors reliability.
          </p>

          <h2 style={{ fontSize: "1.8rem", marginTop: "3rem", marginBottom: "1rem", color: "var(--color-text)" }}>
            4. Your Website is Headquarters
          </h2>
          <p style={{ fontSize: "1.1rem", lineHeight: 1.8, marginBottom: "1.5rem", color: "var(--color-text-light)" }}>
            Social media platforms change their rules. Use them to drive traffic, but don't build your whole
            business on them. Your website is the only asset you truly own.
          </p>

          <h2 style={{ fontSize: "1.8rem", marginTop: "3rem", marginBottom: "1rem", color: "var(--color-text)" }}>
            5. Give Before You Ask
          </h2>
          <p style={{ fontSize: "1.1rem", lineHeight: 1.8, marginBottom: "1.5rem", color: "var(--color-text-light)" }}>
            The "Jab, Jab, Jab, Right Hook" philosophy still applies. Provide value—education, entertainment, or
            utility—before asking for the sale. Earn the right to pitch.
          </p>

          <h2 style={{ fontSize: "1.8rem", marginTop: "3rem", marginBottom: "1rem", color: "var(--color-text)" }}>
            Conclusion
          </h2>
          <p style={{ fontSize: "1.1rem", lineHeight: 1.8, marginBottom: "1.5rem", color: "var(--color-text-light)" }}>
            Digital presence is a marathon, not a sprint. Start with these five pillars, and you'll be ahead of
            90% of your competitors.
          </p>
        </div>

        <div style={{ marginTop: "4rem", paddingTop: "2rem", borderTop: "1px solid var(--color-border)", textAlign: "center" }}>
          <p style={{ marginBottom: "1rem" }}>Need a partner for the marathon?</p>
          <Link href="/#contact" className="btn-primary">
            Partner with Abeevis
          </Link>
        </div>
      </article>
    </main>
  );
}

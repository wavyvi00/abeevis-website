import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Expanding Social Media Presence | Abeevis Insights",
  description: "Learn how to expand your social media presence authentically. Strategies for engagement over algorithms.",
};

export default function SocialMediaBlogPage() {
  return (
    <main className="blog-container" style={{ maxWidth: "700px", margin: "0 auto", padding: "4rem 1rem" }}>
      <Link href="/blog" className="back-link" style={{ display: "inline-block", marginBottom: "2rem", fontWeight: 600, color: "inherit" }}>
        &larr; Back to Insights
      </Link>

      <article>
        <header className="blog-header" style={{ textAlign: "center", marginBottom: "3rem", paddingBottom: "2rem", borderBottom: "1px solid var(--color-border)" }}>
          <span className="blog-meta" style={{ fontSize: "0.9rem", color: "var(--color-accent-text)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "1rem", display: "block" }}>
            Growth Strategy
          </span>
          <h1 className="hero-title" style={{ fontSize: "2.5rem" }}>
            Expanding Your Social Media Presence
          </h1>
          <p className="section-subtitle">Authenticity as the ultimate algorithm hack.</p>
        </header>

        <div style={{ marginBottom: "3rem" }}>
          <Image
            src="/assets/images/blog-social-media.webp"
            alt="Social Media Connections"
            width={1000}
            height={600}
            style={{ width: "100%", height: "auto", borderRadius: "12px", boxShadow: "0 4px 30px rgba(0,0,0,0.08)" }}
          />
        </div>

        <div className="blog-content">
          <p style={{ fontSize: "1.1rem", lineHeight: 1.8, marginBottom: "1.5rem", color: "var(--color-text-light)" }}>
            In the crowded digital landscape of 2026, the noise is deafening. Brands are churning out content at
            an industrial scale, chasing trends that vanish as quickly as they appear. For business owners, the
            question is often: "How do I stand out without losing my mind?"
          </p>

          <h2 style={{ fontSize: "1.8rem", marginTop: "3rem", marginBottom: "1rem", color: "var(--color-text)" }}>
            1. Stop "Posting," Start Documenting
          </h2>
          <p style={{ fontSize: "1.1rem", lineHeight: 1.8, marginBottom: "1.5rem", color: "var(--color-text-light)" }}>
            The biggest friction point for businesses is the idea that they need to create "content." Content
            feels like homework. Instead, focus on documenting your process. Share the behind-the-scenes of your
            latest project. Show the messy desk. Explain a problem you solved for a client today.
          </p>
          <p style={{ fontSize: "1.1rem", lineHeight: 1.8, marginBottom: "1.5rem", color: "var(--color-text-light)" }}>
            Documentation is sustainable because it’s already happening. It builds trust because it proves you
            actually do the work.
          </p>

          <h2 style={{ fontSize: "1.8rem", marginTop: "3rem", marginBottom: "1rem", color: "var(--color-text)" }}>
            2. Engagement &gt; Reach
          </h2>
          <p style={{ fontSize: "1.1rem", lineHeight: 1.8, marginBottom: "1.5rem", color: "var(--color-text-light)" }}>
            It is better to have 100 followers who love your work than 10,000 who don't care. The algorithm
            prioritizes retention and interaction. If you treat your social media like a broadcast tower, you
            will fail. Treat it like a telephone.
          </p>
          <ul style={{ marginBottom: "2rem", paddingLeft: "1.5rem", color: "var(--color-text-light)" }}>
            <li style={{ marginBottom: "0.5rem", lineHeight: 1.6 }}>Reply to every comment with a question.</li>
            <li style={{ marginBottom: "0.5rem", lineHeight: 1.6 }}>DM new followers to say thank you (without selling).</li>
            <li style={{ marginBottom: "0.5rem", lineHeight: 1.6 }}>Spend 15 minutes a day engaging with *other people's* content.</li>
          </ul>

          <h2 style={{ fontSize: "1.8rem", marginTop: "3rem", marginBottom: "1rem", color: "var(--color-text)" }}>
            3. The "Hub and Spoke" Model
          </h2>
          <p style={{ fontSize: "1.1rem", lineHeight: 1.8, marginBottom: "1.5rem", color: "var(--color-text-light)" }}>
            Don't build your house on rented land. Social media should be the "spokes" that drive traffic to your
            "hub"—your website and email list. Use simple calls to action that guide interested users to a place
            you control.
          </p>

          <h2 style={{ fontSize: "1.8rem", marginTop: "3rem", marginBottom: "1rem", color: "var(--color-text)" }}>
            Conclusion
          </h2>
          <p style={{ fontSize: "1.1rem", lineHeight: 1.8, marginBottom: "1.5rem", color: "var(--color-text-light)" }}>
            Expanding your presence isn't about shouting louder. It's about speaking clearer to the right people.
            At Abeevis, we help brands clarify their message before amplifying it.
          </p>
        </div>

        <div style={{ marginTop: "4rem", paddingTop: "2rem", borderTop: "1px solid var(--color-border)", textAlign: "center" }}>
          <p style={{ marginBottom: "1rem" }}>Need help clarifying your digital voice?</p>
          <Link href="/#contact" className="btn-primary">
            Start a Strategy Session
          </Link>
        </div>
      </article>
    </main>
  );
}

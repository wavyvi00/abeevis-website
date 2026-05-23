import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legal Information | Abeevis",
  description: "Terms of service and privacy policy for Abeevis Studio.",
};

export default function LegalPage() {
  return (
    <main className="blog-container" style={{ maxWidth: "700px", margin: "0 auto", padding: "4rem 1rem" }}>
      <Link href="/" className="back-link" style={{ display: "inline-block", marginBottom: "2rem", fontWeight: 600, color: "inherit" }}>
        &larr; Back to Home
      </Link>

      <article>
        <header className="blog-header" style={{ textAlign: "center", marginBottom: "3rem", paddingBottom: "2rem", borderBottom: "1px solid var(--color-border)" }}>
          <h1 className="hero-title" style={{ fontSize: "2.5rem" }}>Legal Information</h1>
          <p className="section-subtitle">Last updated: May 2026</p>
        </header>

        <div className="blog-content">
          <h2 style={{ fontSize: "1.8rem", marginTop: "3rem", marginBottom: "1rem", color: "var(--color-text)" }}>
            Terms of Service
          </h2>
          <p style={{ fontSize: "1.1rem", lineHeight: 1.8, marginBottom: "1.5rem", color: "var(--color-text-light)" }}>
            By engaging with Abeevis Studio ("we," "us," or "our"), you agree to be bound by these terms. 
            We provide digital product engineering, custom software, and AI solutions based on individual project agreements. 
            All timelines and deliverables are contingent upon client cooperation and timely feedback.
          </p>
          <p style={{ fontSize: "1.1rem", lineHeight: 1.8, marginBottom: "1.5rem", color: "var(--color-text-light)" }}>
            Upon final payment, intellectual property rights for custom-developed code and designs transfer to the client, 
            excluding any open-source or proprietary framework code utilized.
          </p>

          <h2 style={{ fontSize: "1.8rem", marginTop: "3rem", marginBottom: "1rem", color: "var(--color-text)" }}>
            Privacy Policy
          </h2>
          <p style={{ fontSize: "1.1rem", lineHeight: 1.8, marginBottom: "1.5rem", color: "var(--color-text-light)" }}>
            We respect your privacy. Any information collected through our contact forms (via Web3Forms/hCaptcha) is used 
            solely for the purpose of corresponding with you regarding your project inquiry. We do not sell or distribute 
            your personal information to third parties.
          </p>
          <p style={{ fontSize: "1.1rem", lineHeight: 1.8, marginBottom: "1.5rem", color: "var(--color-text-light)" }}>
            Our website uses minimal analytics (Google Analytics) configured in a privacy-first manner (anonymized IPs, 
            disabled ad personalization signals) to track basic site performance. 
          </p>

          <div style={{ marginTop: "4rem", paddingTop: "2rem", borderTop: "1px solid var(--color-border)", textAlign: "center" }}>
            <p style={{ marginBottom: "1rem" }}>Questions regarding our legal policies?</p>
            <a href="mailto:wavesparkinc@gmail.com" className="btn-primary">Contact Us</a>
          </div>
        </div>
      </article>
    </main>
  );
}

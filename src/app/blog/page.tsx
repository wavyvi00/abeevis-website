import BlogClient from "./BlogClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Insights & Blog | Abeevis Studio",
  description: "Expert insights on digital strategy, web design, and AI solutions for forward-thinking businesses.",
};

export default function BlogPage() {
  return (
    <>
      <BlogClient />

      <section className="section text-center" style={{ position: "relative", zIndex: 10, padding: "6rem 5vw 10rem 5vw" }}>
        <div style={{
            maxWidth: "700px",
            margin: "0 auto",
            padding: "4rem 2rem",
            background: "rgba(20, 20, 20, 0.4)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            borderRadius: "24px",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            boxShadow: "0 30px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)"
        }}>
          <h2 style={{ fontSize: "2.5rem", marginBottom: "1rem", color: "#fff", fontWeight: 700 }}>Stay in the loop</h2>
          <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: "2.5rem", fontSize: "1.1rem" }}>
            Get exclusive insights on digital strategy, premium web design, and tech straight to your inbox.
          </p>
          <form style={{ display: "flex", gap: "1rem", flexDirection: "row", justifyContent: "center", flexWrap: "wrap" }}>
              <input 
                  type="email" 
                  placeholder="Enter your email address..."
                  required
                  style={{
                      padding: "16px 24px",
                      borderRadius: "12px",
                      border: "1px solid rgba(255,255,255,0.15)",
                      background: "rgba(0,0,0,0.6)",
                      color: "#fff",
                      width: "100%",
                      maxWidth: "350px",
                      outline: "none",
                      fontSize: "1rem"
                  }}
              />
              <button type="submit" className="btn-primary" style={{ padding: "16px 32px", border: "none", cursor: "pointer" }}>
                  Subscribe
              </button>
          </form>
        </div>
      </section>
    </>
  );
}

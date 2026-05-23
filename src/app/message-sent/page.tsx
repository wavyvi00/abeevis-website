import Link from "next/link";
import ParallaxController from "@/components/ParallaxController";

export default function MessageSentPage() {
  return (
    <>
      <ParallaxController />
      <main style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div className="container" style={{ textAlign: "center", maxWidth: "600px" }}>
          <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>✨</div>
          <h1 className="hero-title" style={{ fontSize: "2.5rem" }}>Message Received</h1>
          <p className="hero-subtitle" style={{ margin: "1.5rem 0 3rem 0" }}>
            Thank you for reaching out. We have received your message and will review your inquiry shortly. 
            Expect to hear from us within 24-48 business hours.
          </p>
          <Link href="/" className="btn-primary">
            Return to Homepage
          </Link>
        </div>
      </main>
    </>
  );
}

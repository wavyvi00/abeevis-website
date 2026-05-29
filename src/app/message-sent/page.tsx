import Link from "next/link";

export default function MessageSentPage() {
  return (
    <>
      <main className="min-h-screen flex flex-col items-center justify-center py-20">
        <div className="container max-w-2xl text-center">
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

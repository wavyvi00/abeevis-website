import Link from "next/link";
import FloatingBees from "@/components/FloatingBees";
import FloatingPollen from "@/components/FloatingPollen";

export default function Footer() {
  return (
    <footer className="site-footer" style={{ overflow: 'hidden' }}>
      {/* Ambient Aurora Background */}
      <div className="ambient-background">
        <div className="ambient-blob blob-1"></div>
        <div className="ambient-blob blob-2"></div>
        <div className="ambient-blob blob-3"></div>
      </div>

      {/* Floating Particles & Bees */}
      <FloatingPollen />
      <FloatingBees />

      <div className="container footer-content relative z-10" style={{ flexDirection: 'column', justifyContent: 'center', gap: '1.5rem', textAlign: 'center' }}>
        <ul className="footer-social" style={{ display: 'flex', justifyContent: 'center', gap: '2rem', padding: 0, margin: 0 }}>
          <li>
            <a href="https://www.facebook.com/share/18qpCoifgL/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/abeevisco?igsh=c2J3czhjaTRvMzhy&utm_source=qr" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
          </li>
        </ul>
        <p className="copyright" style={{ margin: 0 }}>
          &copy; {new Date().getFullYear()} Abeevis Studio. All rights reserved.{" "}
          <span style={{ margin: "0 10px" }}>|</span>
          <Link href="/legal" style={{ color: "inherit", textDecoration: "none" }}>
            Legal
          </Link>
        </p>
      </div>
    </footer>
  );
}

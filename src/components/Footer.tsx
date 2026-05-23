import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-content">
        <div className="footer-logo">
          <Image src="/assets/images/logo.webp" alt="Abeevis Logo" width={40} height={40} />
        </div>
        <ul className="footer-social">
          <li>
            <a href="#">LinkedIn</a>
          </li>
          <li>
            <a href="#">Twitter</a>
          </li>
          <li>
            <a href="#">Instagram</a>
          </li>
        </ul>
        <p className="copyright">
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

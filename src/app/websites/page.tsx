import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Managed Business Websites | Abeevis",
  description: "High-performance, fully managed websites for businesses. We design, host, and maintain your digital presence so you can focus on growth.",
};

export default function WebsitesPage() {
  return (
    <>
      <section className="hero-section" style={{ minHeight: "70vh" }}>
        <div className="parallax-bg layer-1" data-speed="0.4"></div>

        <div className="container hero-content text-center">
          <span className="eyebrow">Abeevis Websites</span>
          <h1 className="hero-title">
            High-Performance Websites.<br />
            <span className="text-accent">Zero Headache.</span>
          </h1>
          <p className="hero-subtitle">
            We design, build, and maintain your digital presence so you can focus on your business.
          </p>
          <div className="hero-actions">
            <Link href="#services-packages" className="btn-primary">
              View Services
            </Link>
          </div>
        </div>
      </section>

      {/* The Problem/Solution */}
      <section className="section">
        <div className="container">
          <div className="section-header text-center" style={{ margin: "0 auto 4rem auto" }}>
            <h2 className="section-title">Why Managed?</h2>
            <p className="section-subtitle">Most websites are slow, insecure, or hard to update. We fix that.</p>
          </div>

          <div className="services-grid">
            <div className="service-card">
              <h3>Custom Design</h3>
              <p>No cookie-cutter templates. We build a unique aesthetic that matches your brand identity perfectly.</p>
            </div>
            <div className="service-card">
              <h3>Blazing Fast</h3>
              <p>Engineered for speed. We aim for 90+ Google PageSpeed scores, ensuring you don't lose customers to loading screens.</p>
            </div>
            <div className="service-card">
              <h3>Fully Managed</h3>
              <p>Forget plugins and updates. We handle security, hosting, and content changes for you.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services-packages" className="section bg-light">
        <div className="container">
          <div className="section-header text-center" style={{ margin: "0 auto 4rem auto" }}>
            <h2 className="section-title">Our Core Offerings</h2>
            <p className="section-subtitle">Custom website solutions designed to grow with your business.</p>
          </div>

          <div className="pricing-grid" style={{ justifyContent: "center" }}>
            {/* Option 1: Starter */}
            <div className="pricing-card featured">
              <span className="pricing-badge">Recommended</span>
              <h3>Starter Website</h3>
              <ul className="pricing-features">
                <li><strong>Custom Design</strong> & Development</li>
                <li><strong>Secure Hosting</strong> Included</li>
                <li><strong>Mobile Optimized</strong> Layouts</li>
                <li>Contact Form Integration</li>
                <li>Basic SEO Configuration</li>
                <li>SSL Certificate (https)</li>
                <li>Quarterly Maintenance Checks</li>
                <li><strong>Google Page Review</strong> & Fix (if needed)</li>
                <li><strong>Consultations & Support</strong></li>
              </ul>
              <p className="pricing-note">Ideal for small businesses needing a professional brochure site.</p>
              <Link href="/#contact" className="btn-primary btn-block" style={{ textAlign: "center" }}>
                Get a Custom Plan
              </Link>
            </div>

            {/* Option 2: Custom */}
            <div className="pricing-card">
              <h3>Enterprise / Custom</h3>
              <ul className="pricing-features">
                <li>Multi-page / Complex Sites</li>
                <li>CMS Integration (Blog/News)</li>
                <li>E-commerce Functionality</li>
                <li>Custom Web Applications</li>
                <li>Advanced Analytics</li>
                <li>Priority Support</li>
              </ul>
              <Link href="/#contact" className="btn-secondary btn-block" style={{ textAlign: "center" }}>
                Request a Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Deep Dive */}
      <section className="section">
        <div className="container">
          <div className="section-header text-center" style={{ margin: "0 auto 4rem auto" }}>
            <h2 className="section-title">What's Included?</h2>
            <p className="section-subtitle">A closer look at what is included in our Starter package.</p>
          </div>

          <div className="feature-grid">
            <div className="feature-group">
              <h3><span className="icon-check">✓</span> Hosting & Security</h3>
              <p className="feature-desc">We handle the technical infrastructure so you don't have to.</p>
              <ul className="detail-list">
                <li><strong>SSL Certificate:</strong> The "green lock" that protects your visitors' data and boosts Google rankings.</li>
                <li><strong>99.9% Uptime:</strong> Enterprise-grade hosting ensures your site is always online.</li>
                <li><strong>Global CDN:</strong> Your site loads instantly from servers closest to your visitors, anywhere in the world.</li>
              </ul>
            </div>

            <div className="feature-group">
              <h3><span className="icon-check">✓</span> Quarterly Maintenance</h3>
              <p className="feature-desc">Your site stays fresh, secure, and up-to-date without you lifting a finger.</p>
              <ul className="detail-list">
                <li><strong>Security Patches:</strong> We proactively update software to block hackers.</li>
                <li><strong>Content Updates:</strong> Need to change hours, a phone number, or swap a photo? Just email us.</li>
                <li><strong>Performance Scans:</strong> Regular checks to ensure your site stays fast as technology evolves.</li>
              </ul>
            </div>

            <div className="feature-group">
              <h3><span className="icon-check">✓</span> Strategic Design</h3>
              <p className="feature-desc">Built for conversions, not just looks.</p>
              <ul className="detail-list">
                <li><strong>Mobile-First:</strong> Designed for the 60% of traffic that comes from phones.</li>
                <li><strong>SEO Foundation:</strong> Proper headings, meta tags, and structure so Google can find you.</li>
                <li><strong>Premium Assets:</strong> Access to our library of high-quality stock photography and icons.</li>
              </ul>
            </div>

            <div className="feature-group">
              <h3><span className="icon-check">✓</span> Analytics & Growth</h3>
              <p className="feature-desc">Know what's happening on your site.</p>
              <ul className="detail-list">
                <li><strong>Visitor Tracking:</strong> Weekly or monthly reports on how many people visit.</li>
                <li><strong>Lead Capture:</strong> optimized forms that send inquiries directly to your inbox.</li>
                <li><strong>Scalable:</strong> Easily upgrade to add blog or e-commerce features later.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="section">
        <div className="container contact-container">
          <div className="contact-content">
            <h2 className="contact-title">Not sure what you need?</h2>
            <p className="contact-text">Let's chat about your project. No pressure.</p>
            <a href="mailto:wavesparkinc@gmail.com" className="btn-secondary">Email Us</a>
          </div>
        </div>
      </section>
    </>
  );
}

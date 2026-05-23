import Image from "next/image";
import Link from "next/link";
import ParallaxController from "@/components/ParallaxController";
import FloatingBees from "@/components/FloatingBees";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  return (
    <>
      <ParallaxController />
      
      {/* Hero Section */}
      <section id="hero" className="hero-section">
        <div className="parallax-bg layer-1" data-speed="0.4"></div>
        <div className="parallax-bg layer-2" data-speed="-0.2"></div>

        <div className="container hero-content">
          <span className="eyebrow">Abeevis Studio</span>
          <h1 className="hero-title">
            Digital Clarity.<br />
            <span className="text-accent">Engineered Creativity.</span>
          </h1>
          <p className="hero-subtitle">
            We build intelligent digital products, apps, software, and AI-assisted solutions for forward-thinking businesses.
          </p>
          <div className="hero-actions">
            <Link href="#contact" className="btn-primary">
              Start a Project
            </Link>
            <Link href="#services" className="btn-secondary">
              Explore Services
            </Link>
          </div>
        </div>
        
        <FloatingBees />
        <div className="hero-visual parallax-layer" data-speed="0.1"></div>
      </section>

      {/* Services Section */}
      <section id="services" className="section">
        <div className="parallax-shape shape-1" data-speed="0.1"></div>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">What We Build</h2>
            <p className="section-subtitle">Comprehensive digital solutions engineered for impact.</p>
          </div>

          <div className="services-grid">
            <div className="service-card">
              <span className="service-number">01</span>
              <h3>Digital Products</h3>
              <p>End-to-end product design and development, from initial concept to market-ready launch.</p>
            </div>
            <Link href="/websites" className="service-card interactive-card" style={{ textDecoration: "none", color: "inherit", display: "block" }}>
              <span className="service-number">02</span>
              <h3>Websites</h3>
              <p>Professional, high-performance websites. Click to learn more about our web services.</p>
              <span className="card-action">View Services &rarr;</span>
            </Link>
            <div className="service-card">
              <span className="service-number">03</span>
              <h3>Platforms</h3>
              <p>Complex web platforms and dashboards tailored to your specific business logic and workflows.</p>
            </div>
            <div className="service-card">
              <span className="service-number">04</span>
              <h3>Applications</h3>
              <p>Native mobile apps and progressive web apps built for performance and user retention.</p>
            </div>
            <div className="service-card">
              <span className="service-number">05</span>
              <h3>AI Integration</h3>
              <p>Leveraging artificial intelligence to automate workflows and create smarter user experiences.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="section bg-light">
        <div className="parallax-shape shape-2" data-speed="-0.05"></div>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">How We Work</h2>
            <p className="section-subtitle">A structured approach to solving complex problems.</p>
          </div>

          <div className="process-steps">
            <div className="step-item">
              <div className="step-marker">01</div>
              <div className="step-content">
                <h3>Discover</h3>
                <p>We start by understanding your core business challenges, user needs, and market opportunities.</p>
              </div>
            </div>
            <div className="step-item">
              <div className="step-marker">02</div>
              <div className="step-content">
                <h3>Design</h3>
                <p>We craft intuitive, aesthetic, and functional interfaces that clearly communicate your value.</p>
              </div>
            </div>
            <div className="step-item">
              <div className="step-marker">03</div>
              <div className="step-content">
                <h3>Build</h3>
                <p>We engineer robust, scalable solutions using modern tech stacks and AI-assisted workflows.</p>
              </div>
            </div>
            <div className="step-item">
              <div className="step-marker">04</div>
              <div className="step-content">
                <h3>Evolve</h3>
                <p>Launch is just the beginning. We iterate based on data to continuously improve performance.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section">
        <div className="container">
          <div className="about-grid">
            <div className="about-content">
              <h2 className="section-title">Creative Intelligence.</h2>
              <p className="lead-text">
                Abeevis is a structure for clarity in a chaotic digital world. We combine human creativity with the precision of machine intelligence to build digital products that are not just functional, but fundamental.
              </p>
              <p>Our team works with visionaries to translate abstract ideas into concrete digital architecture.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Work Placeholder */}
      <section id="work" className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Selected Work</h2>
          </div>

          <div className="work-grid">
            <a href="https://floridacdl.com" target="_blank" rel="noopener noreferrer" className="work-item">
              <div className="work-visual">
                <Image src="/assets/images/florida-cdl.webp" alt="Florida CDL Website" width={800} height={500} style={{ objectFit: "cover", width: "100%", height: "100%" }} />
              </div>
              <div className="work-info">
                <h3>Florida CDL Website</h3>
                <p>Web Design & Development</p>
              </div>
            </a>
            <a href="https://cdlzero.com" target="_blank" rel="noopener noreferrer" className="work-item">
              <div className="work-visual">
                <Image src="/assets/images/cdl-zero.webp" alt="CDL ZERO Study App" width={800} height={500} style={{ objectFit: "cover", width: "100%", height: "100%" }} />
              </div>
              <div className="work-info">
                <h3>CDL ZERO Website / Study App</h3>
                <p>Web Platform & Mobile App</p>
              </div>
            </a>
            <a href="https://order-easy-omega.vercel.app" target="_blank" rel="noopener noreferrer" className="work-item">
              <div className="work-visual">
                <Image src="/assets/images/order-easy.webp" alt="Order Easy Dashboard" width={800} height={500} style={{ objectFit: "cover", width: "100%", height: "100%" }} />
              </div>
              <div className="work-info">
                <h3>Order Easy</h3>
                <p>Digital Product</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section">
        <div className="container contact-container">
          <div className="contact-content">
            <h2 className="contact-title">Let's build something fundamental.</h2>
            <p className="contact-text">
              We are currently accepting new projects for Q2 2026. If you have a vision that requires clarity and structure, we'd love to hear from you.
            </p>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}

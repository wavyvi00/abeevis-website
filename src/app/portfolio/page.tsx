import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Portfolio | Abeevis Studio",
  description: "Explore our selected work and digital projects.",
};

export default function Portfolio() {
  return (
    <>
      
      {/* Portfolio Header Section */}
      <section className="hero-section" style={{ paddingBottom: "2rem", minHeight: "50vh" }}>
        <div className="parallax-bg layer-1" data-speed="0.4"></div>
        <div className="parallax-bg layer-2" data-speed="-0.2"></div>

        <div className="container hero-content" style={{ marginTop: "100px" }}>
          <span className="eyebrow">Our Work</span>
          <h1 className="hero-title">
            Digital <span className="text-accent">Portfolio.</span>
          </h1>
          <p className="hero-subtitle">
            A showcase of the digital products, websites, and platforms we've built for forward-thinking businesses.
          </p>
        </div>
      </section>

      {/* Portfolio Grid Section */}
      <section className="section" style={{ paddingTop: "2rem" }}>
        <div className="container">
          <div className="work-grid">
            {/* Project 1 */}
            <a href="https://floridacdl.com" target="_blank" rel="noopener noreferrer" className="work-item">
              <div className="work-visual">
                <Image src="/assets/images/florida-cdl.webp" alt="Florida CDL Website" width={800} height={500} style={{ objectFit: "cover", width: "100%", height: "100%" }} priority />
              </div>
              <div className="work-info">
                <h3>Florida CDL Website</h3>
                <p>Web Design & Development</p>
              </div>
            </a>
            
            {/* Project 2 */}
            <a href="https://cdlzero.com" target="_blank" rel="noopener noreferrer" className="work-item">
              <div className="work-visual">
                <Image src="/assets/images/cdl-zero.webp" alt="CDL ZERO Study App" width={800} height={500} style={{ objectFit: "cover", width: "100%", height: "100%" }} />
              </div>
              <div className="work-info">
                <h3>CDL ZERO Website / Study App</h3>
                <p>Web Platform & Mobile App</p>
              </div>
            </a>
            
            {/* Project 3 */}
            <a href="https://order-easy-omega.vercel.app" target="_blank" rel="noopener noreferrer" className="work-item">
              <div className="work-visual">
                <Image src="/assets/images/order-easy.webp" alt="Order Easy Dashboard" width={800} height={500} style={{ objectFit: "cover", width: "100%", height: "100%" }} />
              </div>
              <div className="work-info">
                <h3>Order Easy</h3>
                <p>Digital Product</p>
              </div>
            </a>

            {/* Project 4 */}
            <a href="https://www.familytransportusa.com/" target="_blank" rel="noopener noreferrer" className="work-item">
              <div className="work-visual">
                <Image src="/assets/images/family-transport.webp" alt="Family Transport USA" width={800} height={500} style={{ objectFit: "cover", width: "100%", height: "100%" }} />
              </div>
              <div className="work-info">
                <h3>Family Transport USA</h3>
                <p>Web Design & Development</p>
              </div>
            </a>

            {/* Project 5 */}
            <a href="https://www.vrenterprisepr.com/" target="_blank" rel="noopener noreferrer" className="work-item">
              <div className="work-visual">
                <Image src="/assets/images/vr-enterprise.webp" alt="VR Enterprise" width={800} height={500} style={{ objectFit: "cover", width: "100%", height: "100%" }} />
              </div>
              <div className="work-info">
                <h3>VR Enterprise</h3>
                <p>Web Design & Development</p>
              </div>
            </a>
          </div>
          
          <div style={{ textAlign: "center", marginTop: "4rem" }}>
            <Link href="/#contact" className="btn-primary">
              Start a Project With Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

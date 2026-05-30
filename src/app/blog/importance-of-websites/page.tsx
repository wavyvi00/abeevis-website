import type { Metadata } from "next";
import BlogArticleLayout from "@/components/BlogArticleLayout";

export const metadata: Metadata = {
  title: "Importance of High-Performance Websites | Abeevis Insights",
  description: "Speed communicates trust. Discover why a high-performance website is critical for customer conversion and business credibility.",
};

export default function ImportanceOfWebsitesBlogPage() {
  return (
    <BlogArticleLayout
      title="Why Your Business Needs a High-Performance Website"
      category="Web Technology"
      subtitle="Speed is a feature. In 2026, it's the most important one."
      image="/assets/images/Blog-performance1.webp"
    >
      <p>
        Your website is your digital lobby. If a customer walked into your physical office and no one greeted
        them for 10 seconds, they would walk out. On the web, you don't even have 10 seconds. You have
        three.
      </p>

      <h2>1. Speed Communicates Trust</h2>
      <p>
        We've all visited "janky" websites. Links that jump around as they load. Images that are broken. It
        feels unprofessional. Subconsciously, the user asks: "If they can't handle their website, how can
        they handle my business?"
      </p>
      <blockquote>
        "53% of mobile site visits are abandoned if pages take longer than 3 seconds to load." —
        Google Data
      </blockquote>

      <h2>2. The SEO Factor</h2>
      <p>
        Google doesn't just rank websites based on keywords anymore. They rank based on "Core Web
        Vitals"—metrics that measure how fast, stable, and responsive your site is. A slow site isn't just
        annoying users; it's invisible to new ones.
      </p>

      <h2>3. Conversion is Math</h2>
      <p>
        Every second of delay reduces customer satisfaction and conversions. Amazon found that every 100ms of
        latency cost them 1% in sales. You might not be Amazon, but the principle holds true. Friction kills
        sales.
      </p>

      <h2>The Abeevis Standard</h2>
      <p>
        We don't use bloated templates. We code from scratch to ensure your site is a Formula 1 car, not a
        minivan. Efficient code means faster loading, better ranking, and happier customers.
      </p>
    </BlogArticleLayout>
  );
}

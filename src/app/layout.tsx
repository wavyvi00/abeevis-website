import type { Metadata } from "next";
import { Manrope, Lora } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-heading",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Abeevis | Digital Product Studio & AI Solutions",
  description:
    "Abeevis is a premier digital studio engineering custom software, high-performance websites, mobile apps, and AI-powered solutions for forward-thinking businesses. Structure for clarity in a chaotic digital world.",
  keywords:
    "digital product studio, custom software development, web design, mobile app development, AI solutions, artificial intelligence integration, UX/UI design, engineered creativity",
  authors: [{ name: "Abeevis Studio" }],
  robots: "index, follow",
  openGraph: {
    type: "website",
    url: "https://abeevis.com/",
    title: "Abeevis | Digital Product Studio & AI Solutions",
    description:
      "We build intelligent digital products, apps, software, and AI-assisted solutions. Digital Clarity. Engineered Creativity.",
    images: ["/assets/images/logo.webp"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abeevis | Digital Product Studio & AI Solutions",
    description:
      "We build intelligent digital products, apps, software, and AI-assisted solutions. Digital Clarity. Engineered Creativity.",
    images: ["/assets/images/logo.webp"],
  },
  icons: {
    icon: "/assets/images/favicon.png",
    shortcut: "/assets/images/favicon.png",
    apple: "/assets/images/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${lora.variable}`}>
      <head>
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://challenges.cloudflare.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self' https://www.google-analytics.com https://challenges.cloudflare.com; frame-src 'self' https://challenges.cloudflare.com;"
        />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        
        <Script
          strategy="lazyOnload"
          src="https://www.googletagmanager.com/gtag/js?id=G-XX4HP1THQ2"
        />
        <Script
          id="google-analytics"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              // Security settings
              gtag('config', 'G-XX4HP1THQ2', {
                  'cookie_flags': 'secure;samesite=none',
                  'anonymize_ip': true,
                  'allow_google_signals': false,
                  'allow_ad_personalization_signals': false
              });
            `,
          }}
        />
      </body>
    </html>
  );
}

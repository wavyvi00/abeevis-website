// src/lib/email/types.ts
// Shared types for the email system.

export type BrandTheme = "studio" | "roadside" | "industrial";
export type LogoStyle = "image" | "text" | "banner";
export type LeadQuality = "hot" | "warm" | "cold";
export type Urgency = "urgent" | "normal" | "low";
export type Lang = "en" | "es";

export interface BrandConfig {
  theme: BrandTheme;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  cardColor: string;
  textColor: string;
  mutedTextColor: string;
  borderColor: string;
  logoUrl?: string;
  logoStyle: LogoStyle;
  logoText?: string;
  websiteUrl: string;
  tagline: string;
  eyebrow?: string;
  ctaLabel?: string;
}

export interface SiteConfig {
  siteId: string;
  businessName: string;
  recipientEmail: string;
  allowedOrigins: string[];
  servicesLabel: string;
  brand: BrandConfig;
  /** E.164 phone for tel: links, e.g. "+18635551234" (no spaces). Empty = hide call CTA. */
  supportPhone?: string;
  /** Digits-only WhatsApp number with country code, e.g. "18635551234". Empty = hide WA CTA. */
  whatsappNumber?: string;
  /** Pretty-formatted phone for display, e.g. "(863) 555-1234". */
  displayPhone?: string;
  /** Lead ID prefix, e.g. "ABV", "FTU", "VRE". */
  leadIdPrefix: string;
  /** Service keywords that trigger the URGENT badge. Case-insensitive substring match. */
  urgentServices?: string[];
  /** Language for customer-facing emails ("en" or "es"). */
  customerLang: Lang;
}

export interface LeadDetails {
  // Sanitized values (HTML-escaped, safe to drop into HTML body).
  safeName: string;
  safeEmail: string;
  safePhone: string;
  safeService: string;
  safeMessage: string;
  safeSourcePage: string;
  timestamp: string;
  // Raw values (used inside attribute URLs like mailto:/tel:/wa.me — these get
  // URI-encoded, not HTML-escaped).
  rawName: string;
  rawEmail: string;
  rawPhone: string;
  rawService: string;
  rawMessage: string;
  // Derived metadata.
  leadId: string;
  quality: LeadQuality;
  urgency: Urgency;
  cleanSourcePath: string;
}

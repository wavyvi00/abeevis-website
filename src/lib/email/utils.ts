// src/lib/email/utils.ts
// Pure helpers — escaping, formatting, lead scoring, URL building, plain-text fallback.

import { randomBytes } from "node:crypto";
import type { Lang, LeadDetails, LeadQuality, Urgency } from "./types";

/* ============================================================
 * HTML / DATE
 * ============================================================ */

export const escapeHtml = (unsafe: string): string =>
  unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

export const formatDate = (
  date: Date,
  lang: Lang = "en",
  timezone: string = "America/New_York"
): string => {
  const locale = lang === "es" ? "es-PR" : "en-US";
  return date.toLocaleString(locale, {
    timeZone: timezone,
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

export const getEmailAssetUrl = (path: string): string => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.abeevis.com";
  const baseUrl = siteUrl.replace(/\/$/, "");
  return `${baseUrl}${path.startsWith("/") ? path : "/" + path}`;
};

/* ============================================================
 * LEAD ID + METADATA
 * ============================================================ */

/**
 * Generate a sortable, human-readable lead ID like "ABV-260526-A7K2".
 * Format: {PREFIX}-{YYMMDD}-{4 hex chars uppercase}
 */
export const generateLeadId = (prefix: string): string => {
  const now = new Date();
  const yy = String(now.getFullYear()).slice(-2);
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const rand = randomBytes(2).toString("hex").toUpperCase();
  return `${prefix}-${yy}${mm}${dd}-${rand}`;
};

/** Strip a URL down to a clean display format (hostname + pathname). */
export const cleanSourcePath = (url: string): string => {
  if (!url) return "N/A";
  try {
    const u = new URL(url);
    const hostname = u.hostname.replace(/^www\./, "");
    const pathname = u.pathname === "/" ? "" : u.pathname;
    return `${hostname}${pathname}` || "N/A";
  } catch {
    return url.length > 50 ? url.slice(0, 47) + "…" : url;
  }
};

/**
 * Returns true if the given date falls during 8am–6pm in the target timezone.
 */
export const isBusinessHours = (
  date: Date,
  timezone: string = "America/New_York"
): boolean => {
  const hourStr = date.toLocaleString("en-US", {
    timeZone: timezone,
    hour: "numeric",
    hour12: false,
  });
  const hour = parseInt(hourStr, 10);
  return Number.isFinite(hour) && hour >= 8 && hour < 18;
};

/**
 * Lead quality score:
 *   +30  phone provided
 *   +25  specific service (not blank, not "Other")
 *   +25  message length > 80 chars
 *   +10  message length > 200 chars (bonus)
 *   +10  submitted during business hours
 * 70+ => HOT, 40–69 => WARM, <40 => COLD
 */
export const calculateLeadQuality = (params: {
  hasPhone: boolean;
  hasSpecificService: boolean;
  messageLength: number;
  duringBusinessHours: boolean;
}): LeadQuality => {
  const { hasPhone, hasSpecificService, messageLength, duringBusinessHours } = params;
  let score = 0;
  if (hasPhone) score += 30;
  if (hasSpecificService) score += 25;
  if (messageLength > 80) score += 25;
  if (messageLength > 200) score += 10;
  if (duringBusinessHours) score += 10;
  if (score >= 70) return "hot";
  if (score >= 40) return "warm";
  return "cold";
};

/** Returns "urgent" if the service matches any urgentServices keyword. */
export const calculateUrgency = (
  service: string,
  urgentServices: string[] = []
): Urgency => {
  if (!service) return "normal";
  const s = service.toLowerCase();
  return urgentServices.some((u) => s.includes(u.toLowerCase())) ? "urgent" : "normal";
};

/* ============================================================
 * PHONE / URL BUILDERS
 * ============================================================ */

/** tel: format — strip everything except + and digits. Returns empty if too short. */
export const formatPhoneForTel = (phone: string): string => {
  if (!phone) return "";
  const cleaned = phone.replace(/[^\d+]/g, "");
  return cleaned.replace(/\D/g, "").length >= 7 ? cleaned : "";
};

/** wa.me format — digits only. Returns empty if too short. */
export const formatPhoneForWhatsApp = (phone: string): string => {
  if (!phone) return "";
  const cleaned = phone.replace(/\D/g, "");
  return cleaned.length >= 7 ? cleaned : "";
};

/** Build a mailto: URL with pre-filled subject and body. */
export const buildMailtoUrl = (to: string, subject: string, body: string): string => {
  const qs: string[] = [];
  if (subject) qs.push(`subject=${encodeURIComponent(subject)}`);
  if (body) qs.push(`body=${encodeURIComponent(body)}`);
  return `mailto:${to}${qs.length ? "?" + qs.join("&") : ""}`;
};

/** Build a wa.me URL with pre-filled text. */
export const buildWhatsAppUrl = (number: string, text: string): string => {
  const num = formatPhoneForWhatsApp(number);
  if (!num) return "";
  return `https://wa.me/${num}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
};

/* ============================================================
 * PLAIN-TEXT FALLBACK
 * ============================================================ */

/**
 * Generates a plain-text version of the email for clients that don't render HTML
 * (and for spam-filter scoring — having a real plain-text part helps deliverability).
 */
export const generatePlainText = (params: {
  businessName: string;
  details: LeadDetails;
  isCustomer: boolean;
  lang: Lang;
}): string => {
  const { businessName, details, isCustomer, lang } = params;

  if (isCustomer) {
    if (lang === "es") {
      return [
        `Hola ${details.rawName},`,
        ``,
        `Hemos recibido tu solicitud. Nuestro equipo está revisando los detalles y te contactará pronto.`,
        ``,
        `Resumen:`,
        `  Nombre:   ${details.rawName}`,
        `  Email:    ${details.rawEmail}`,
        details.rawPhone !== "N/A" ? `  Teléfono: ${details.rawPhone}` : "",
        details.rawService !== "N/A" ? `  Servicio: ${details.rawService}` : "",
        ``,
        `Mensaje:`,
        `${details.rawMessage}`,
        ``,
        `Saludos,`,
        businessName,
      ]
        .filter(Boolean)
        .join("\n");
    }
    return [
      `Hi ${details.rawName},`,
      ``,
      `Thank you for reaching out. We have received your request and our team is reviewing the details.`,
      ``,
      `Summary:`,
      `  Name:    ${details.rawName}`,
      `  Email:   ${details.rawEmail}`,
      details.rawPhone !== "N/A" ? `  Phone:   ${details.rawPhone}` : "",
      details.rawService !== "N/A" ? `  Service: ${details.rawService}` : "",
      ``,
      `Your message:`,
      `${details.rawMessage}`,
      ``,
      `Best regards,`,
      businessName,
    ]
      .filter(Boolean)
      .join("\n");
  }

  // Owner notification plain-text
  return [
    `NEW LEAD — ${businessName}`,
    `─────────────────────────────────`,
    `Lead ID:  ${details.leadId}`,
    `Quality:  ${details.quality.toUpperCase()}`,
    `Urgency:  ${details.urgency.toUpperCase()}`,
    `Time:     ${details.timestamp}`,
    ``,
    `Name:     ${details.rawName}`,
    `Email:    ${details.rawEmail}`,
    details.rawPhone !== "N/A" ? `Phone:    ${details.rawPhone}` : "",
    details.rawService !== "N/A" ? `Service:  ${details.rawService}` : "",
    `Source:   ${details.cleanSourcePath}`,
    ``,
    `Message:`,
    details.rawMessage,
    ``,
    `─────────────────────────────────`,
    `Reply directly to this email to respond to the customer.`,
  ]
    .filter(Boolean)
    .join("\n");
};

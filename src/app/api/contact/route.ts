// src/app/api/contact/route.ts
// Multi-tenant contact form handler for Abeevis / Family Transport USA / VR Enterprise.
//
// IMPORTANT CONSTRAINTS (do not break):
//   1. Cloudflare Turnstile verification on every submit
//   2. In-memory rate limit: 5 submits per 10 minutes per IP
//   3. CORS allow-list via SITES[siteId].allowedOrigins
//   4. Honeypot field "companyWebsite" must remain non-fillable
//   5. All user-supplied strings get HTML-escaped before going into email HTML
//   6. Same request/response contract — front-ends don't need to change
//   7. SEND_CUSTOMER_CONFIRMATION env var gates the second send
//   8. Resend errors must not leak to the public response

import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

import { SITES } from "@/lib/email/sites";
import {
  buildAbeevisCustomerEmail,
  buildAbeevisOwnerEmail,
} from "@/lib/email/themes/abeevis";
import {
  buildFamilyTransportCustomerEmail,
  buildFamilyTransportOwnerEmail,
} from "@/lib/email/themes/family-transport";
import {
  buildVrEnterpriseCustomerEmail,
  buildVrEnterpriseOwnerEmail,
} from "@/lib/email/themes/vr-enterprise";
import type { LeadDetails, SiteConfig } from "@/lib/email/types";
import {
  calculateLeadQuality,
  calculateUrgency,
  cleanSourcePath,
  escapeHtml,
  formatDate,
  generateLeadId,
  generatePlainText,
  isBusinessHours,
} from "@/lib/email/utils";

export const runtime = "nodejs";

const resend = new Resend(process.env.RESEND_API_KEY);

/* ============================================================
 * RATE LIMITING (in-memory, per IP)
 * ============================================================ */

const submissionTracker = new Map<string, { count: number; firstSubmission: number }>();
const RATE_LIMIT_WINDOW = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = submissionTracker.get(ip);
  if (!record) {
    submissionTracker.set(ip, { count: 1, firstSubmission: now });
    return false;
  }
  if (now - record.firstSubmission > RATE_LIMIT_WINDOW) {
    submissionTracker.set(ip, { count: 1, firstSubmission: now });
    return false;
  }
  record.count += 1;
  return record.count > RATE_LIMIT_MAX;
}

// Opportunistic cleanup to avoid unbounded memory growth.
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of submissionTracker.entries()) {
    if (now - record.firstSubmission > RATE_LIMIT_WINDOW) {
      submissionTracker.delete(ip);
    }
  }
}, RATE_LIMIT_WINDOW).unref?.();

/* ============================================================
 * CORS
 * ============================================================ */

function getCorsHeaders(origin: string | null, site?: SiteConfig): HeadersInit {
  const headers: HeadersInit = {
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
  if (origin && site && site.allowedOrigins.includes(origin)) {
    (headers as Record<string, string>)["Access-Control-Allow-Origin"] = origin;
  }
  return headers;
}

/* ============================================================
 * TURNSTILE
 * ============================================================ */

async function verifyTurnstile(token: string, remoteIp: string): Promise<boolean> {
  if (!process.env.TURNSTILE_SECRET) {
    console.warn("[contact] TURNSTILE_SECRET missing — failing verification.");
    return false;
  }
  try {
    const body = new URLSearchParams({
      secret: process.env.TURNSTILE_SECRET,
      response: token,
      remoteip: remoteIp,
    });
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch (err) {
    console.error("[contact] Turnstile verify error:", err);
    return false;
  }
}

/* ============================================================
 * OPTIONS (preflight)
 * ============================================================ */

export async function OPTIONS(request: NextRequest): Promise<NextResponse> {
  const origin = request.headers.get("origin");
  // For OPTIONS we don't yet know siteId, so we allow any of the configured origins.
  const knownOrigin = origin
    ? Object.values(SITES).find((s) => s.allowedOrigins.includes(origin))
    : undefined;
  return new NextResponse(null, {
    status: 204,
    headers: getCorsHeaders(origin, knownOrigin),
  });
}

/* ============================================================
 * POST
 * ============================================================ */

interface ContactPayload {
  siteId?: string;
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  message?: string;
  sourcePage?: string;
  companyWebsite?: string; // honeypot
  turnstileToken?: string;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const origin = request.headers.get("origin");

  // 1. Parse body
  let body: ContactPayload;
  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON payload." },
      { status: 400, headers: getCorsHeaders(origin) }
    );
  }

  const {
    siteId,
    name,
    email,
    phone,
    service,
    message,
    sourcePage,
    companyWebsite,
    turnstileToken,
  } = body;

  // 2. Resolve site from siteId
  const site = siteId ? SITES[siteId] : undefined;
  if (!site) {
    return NextResponse.json(
      { error: "Unknown site." },
      { status: 400, headers: getCorsHeaders(origin) }
    );
  }
  if (!site.recipientEmail) {
    return NextResponse.json(
      { error: "Site recipient is not configured." },
      { status: 500, headers: getCorsHeaders(origin, site) }
    );
  }

  // 3. CORS check
  if (origin && !site.allowedOrigins.includes(origin)) {
    return NextResponse.json(
      { error: "Origin not allowed." },
      { status: 403, headers: getCorsHeaders(origin) }
    );
  }

  // 4. Honeypot — silently succeed so bots don't learn
  if (companyWebsite && companyWebsite.trim().length > 0) {
    return NextResponse.json(
      { success: true, message: "Thanks — we'll be in touch." },
      { status: 200, headers: getCorsHeaders(origin, site) }
    );
  }

  // 5. Required field validation
  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Missing required fields." },
      { status: 400, headers: getCorsHeaders(origin, site) }
    );
  }
  if (name.length > 200 || email.length > 254 || message.length > 5000) {
    return NextResponse.json(
      { error: "One or more fields exceed maximum length." },
      { status: 400, headers: getCorsHeaders(origin, site) }
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Invalid email address." },
      { status: 400, headers: getCorsHeaders(origin, site) }
    );
  }

  // 6. Rate limit
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many submissions. Please try again later." },
      { status: 429, headers: getCorsHeaders(origin, site) }
    );
  }

  // 7. Turnstile
  if (!turnstileToken) {
    return NextResponse.json(
      { error: "Missing verification token." },
      { status: 400, headers: getCorsHeaders(origin, site) }
    );
  }
  const turnstileOk = await verifyTurnstile(turnstileToken, ip);
  if (!turnstileOk) {
    return NextResponse.json(
      { error: "Verification failed. Please refresh and try again." },
      { status: 403, headers: getCorsHeaders(origin, site) }
    );
  }

  // 8. Build LeadDetails — both safe (HTML-escaped) and raw (URL-encoded later) versions
  const rawName = name.trim();
  const rawEmail = email.trim();
  const rawPhone = (phone || "").trim() || "N/A";
  const rawService = (service || "").trim() || "N/A";
  const rawMessage = message.trim();
  const rawSourcePage = (sourcePage || "").trim();

  const now = new Date();
  const businessHours = isBusinessHours(now);
  const quality = calculateLeadQuality({
    hasPhone: rawPhone !== "N/A",
    hasSpecificService: rawService !== "N/A" && !/^other$/i.test(rawService),
    messageLength: rawMessage.length,
    duringBusinessHours: businessHours,
  });
  const urgency = calculateUrgency(rawService, site.urgentServices);

  const details: LeadDetails = {
    safeName: escapeHtml(rawName),
    safeEmail: escapeHtml(rawEmail),
    safePhone: escapeHtml(rawPhone),
    safeService: escapeHtml(rawService),
    safeMessage: escapeHtml(rawMessage),
    safeSourcePage: escapeHtml(rawSourcePage),
    timestamp: formatDate(now, site.customerLang),
    rawName,
    rawEmail,
    rawPhone,
    rawService,
    rawMessage,
    leadId: generateLeadId(site.leadIdPrefix),
    quality,
    urgency,
    cleanSourcePath: cleanSourcePath(rawSourcePage),
  };

  // 9. Pick the right theme builders for this site
  const builders = pickThemeBuilders(site.siteId);

  // 10. Send owner notification
  const fromAddress = process.env.FROM_EMAIL || "no-reply@abeevis.com";
  const agencyBcc = process.env.AGENCY_EMAIL || undefined;

  const ownerHtml = builders.owner(site, details);
  const ownerText = generatePlainText({
    businessName: site.businessName,
    details,
    isCustomer: false,
    lang: site.customerLang,
  });
  const urgencyPrefix = details.urgency === "urgent" ? "🚨 URGENT — " : "";
  const subjectLang = site.customerLang === "es"
    ? `${urgencyPrefix}Nueva solicitud: ${rawService !== "N/A" ? rawService : "consulta general"} — ${rawName}`
    : `${urgencyPrefix}New lead: ${rawService !== "N/A" ? rawService : "general inquiry"} — ${rawName}`;

  try {
    const ownerResult = await resend.emails.send({
      from: `${site.businessName} <${fromAddress}>`,
      to: [site.recipientEmail],
      bcc: agencyBcc && agencyBcc !== site.recipientEmail ? [agencyBcc] : undefined,
      replyTo: rawEmail,
      subject: subjectLang,
      html: ownerHtml,
      text: ownerText,
      headers: {
        "X-Entity-Ref-ID": details.leadId,
        "X-Lead-Quality": details.quality,
        "X-Lead-Urgency": details.urgency,
      },
    });
    if (ownerResult.error) {
      console.error("[contact] Owner send error:", ownerResult.error);
      return NextResponse.json(
        { error: "We could not send your message. Please try again." },
        { status: 502, headers: getCorsHeaders(origin, site) }
      );
    }
  } catch (err) {
    console.error("[contact] Owner send exception:", err);
    return NextResponse.json(
      { error: "We could not send your message. Please try again." },
      { status: 502, headers: getCorsHeaders(origin, site) }
    );
  }

  // 11. Customer confirmation (optional, gated by env var)
  if (process.env.SEND_CUSTOMER_CONFIRMATION === "true") {
    const customerHtml = builders.customer(site, details);
    const customerText = generatePlainText({
      businessName: site.businessName,
      details,
      isCustomer: true,
      lang: site.customerLang,
    });
    const customerSubject = site.customerLang === "es"
      ? `Recibimos tu solicitud — ${site.businessName}`
      : `We received your request — ${site.businessName}`;
    try {
      await resend.emails.send({
        from: `${site.businessName} <${fromAddress}>`,
        to: [rawEmail],
        replyTo: site.recipientEmail,
        subject: customerSubject,
        html: customerHtml,
        text: customerText,
        headers: {
          "X-Entity-Ref-ID": details.leadId,
        },
      });
    } catch (err) {
      // Don't block the user's success response if confirmation fails.
      console.error("[contact] Customer confirmation send failed:", err);
    }
  }

  // 12. Success
  const successMessage = site.customerLang === "es"
    ? "Gracias — recibimos tu solicitud."
    : "Thanks — we'll be in touch.";
  return NextResponse.json(
    { success: true, message: successMessage, leadId: details.leadId },
    { status: 200, headers: getCorsHeaders(origin, site) }
  );
}

/* ============================================================
 * THEME ROUTER
 * ============================================================ */

interface ThemeBuilders {
  owner: (site: SiteConfig, details: LeadDetails) => string;
  customer: (site: SiteConfig, details: LeadDetails) => string;
}

function pickThemeBuilders(siteId: string): ThemeBuilders {
  switch (siteId) {
    case "family-transport":
      return {
        owner: buildFamilyTransportOwnerEmail,
        customer: buildFamilyTransportCustomerEmail,
      };
    case "vr-enterprise":
      return {
        owner: buildVrEnterpriseOwnerEmail,
        customer: buildVrEnterpriseCustomerEmail,
      };
    case "abeevis":
    default:
      return {
        owner: buildAbeevisOwnerEmail,
        customer: buildAbeevisCustomerEmail,
      };
  }
}

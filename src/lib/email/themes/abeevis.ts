// src/lib/email/themes/abeevis.ts
// Abeevis Studio — editorial honey aesthetic.
// Light cream background, warm white card, amber accent, refined typography.

import {
  buildButton,
  buildClose,
  buildHead,
  qualityBadgeText,
  renderBadge,
  renderPulseDot,
} from "../shared";
import type { LeadDetails, SiteConfig } from "../types";
import {
  buildMailtoUrl,
  formatPhoneForTel,
  getEmailAssetUrl,
} from "../utils";

/* ============================================================
 * OWNER NOTIFICATION
 * ============================================================ */

export function buildAbeevisOwnerEmail(
  site: SiteConfig,
  details: LeadDetails
): string {
  const b = site.brand;
  const quality = qualityBadgeText(details.quality, "en");

  const preheader = `New lead from ${details.rawName} — ${details.rawService !== "N/A" ? details.rawService : "general inquiry"}`;
  const title = `New Lead • ${site.businessName}`;

  // CTA URLs
  const replyUrl = buildMailtoUrl(
    details.rawEmail,
    `Re: Your ${site.businessName} request`,
    `Hi ${details.rawName},\n\nThanks for reaching out to ${site.businessName}. I've reviewed your request and would love to set up a quick call to discuss your project in more detail.\n\nWhen works best for you?\n\n— ${site.businessName} team`
  );
  const sendPricingUrl = buildMailtoUrl(
    details.rawEmail,
    `${site.businessName} — Pricing & next steps`,
    `Hi ${details.rawName},\n\nThanks for your interest in ${site.businessName}. Based on what you shared (${details.rawService !== "N/A" ? details.rawService : "your project"}), here's a quick overview of pricing and next steps:\n\n[Pricing details here]\n\nHappy to jump on a call to walk through anything. Let me know what works.\n\n— ${site.businessName}`
  );
  const scheduleCallUrl = buildMailtoUrl(
    details.rawEmail,
    `${site.businessName} — Schedule a call`,
    `Hi ${details.rawName},\n\nThanks for your message. I'd love to learn more about your project. Here are a few times that work on my end:\n\n  • [Day, Time 1]\n  • [Day, Time 2]\n  • [Day, Time 3]\n\nLet me know which works best, or share a time that fits your schedule.\n\n— ${site.businessName}`
  );

  const tel = formatPhoneForTel(details.rawPhone);

  const head = buildHead(title, preheader, b);

  return `${head}
<table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:${b.backgroundColor};font-family:'Inter',Helvetica,Arial,sans-serif;">
  <tr>
    <td align="center" style="padding:32px 12px 40px 12px;">
      <table role="presentation" class="container" width="680" border="0" cellspacing="0" cellpadding="0" style="max-width:680px;width:100%;">

        <!-- Logo header -->
        <tr><td align="center" style="padding:0 20px 16px 20px;">
          <img src="${getEmailAssetUrl("/email-assets/abeevis-email-header.png")}" width="240" alt="Abeevis Studio — Digital clarity. Engineered creativity." style="display:block;width:100%;max-width:240px;height:auto;border:0;outline:none;text-decoration:none;margin:0 auto;">
        </td></tr>

        <!-- Card -->
        <tr><td>
          <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:${b.cardColor};border:1px solid ${b.borderColor};border-radius:18px;box-shadow:0 18px 50px rgba(43,43,43,0.06);">
            <tr><td class="px-m py-m" style="padding:42px;">

              <!-- Eyebrow + NEW LEAD pulse -->
              <div style="margin-bottom:8px;">
                ${renderPulseDot(b.accentColor, 10)}<span style="font-family:'Inter',Arial,sans-serif;font-size:11px;font-weight:800;color:${b.accentColor};letter-spacing:0.18em;text-transform:uppercase;vertical-align:middle;">New Lead</span>
              </div>

              <!-- Lead ID + timestamp -->
              <p style="margin:0 0 18px 0;font-family:'SF Mono','Menlo','Consolas',monospace;font-size:12px;color:${b.mutedTextColor};letter-spacing:0.04em;">
                ${details.leadId} &nbsp;•&nbsp; ${details.timestamp}
              </p>

              <!-- Quality + Urgency badges -->
              <div style="margin:0 0 22px 0;">
                ${renderBadge({ emoji: quality.emoji, label: quality.label, bg: quality.bg, fg: quality.fg })}
              </div>

              <!-- Big name + service -->
              <h1 class="name-m" style="margin:0 0 4px 0;font-family:'Inter',Arial,sans-serif;color:${b.textColor};font-size:32px;line-height:1.15;font-weight:700;letter-spacing:-0.02em;">
                ${details.safeName}
              </h1>
              <p style="margin:0 0 28px 0;font-family:'Inter',Arial,sans-serif;color:${b.mutedTextColor};font-size:15px;line-height:1.5;">
                Wants: <strong style="color:${b.accentColor};font-weight:600;">${details.safeService}</strong>
              </p>

              <!-- Info grid -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin:0 0 26px 0;background-color:#F9F4EA;border:1px solid ${b.borderColor};border-radius:12px;">
                <tr><td style="padding:8px 18px 4px 18px;">
                  <p style="margin:14px 0 12px 0;font-family:'Inter',Arial,sans-serif;font-size:10px;font-weight:800;color:${b.accentColor};letter-spacing:0.15em;text-transform:uppercase;">Details</p>
                  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                    ${infoRow(b, "Email", `<a class="link" href="mailto:${details.rawEmail}" style="color:${b.textColor};text-decoration:underline;font-weight:500;">${details.safeEmail}</a>`)}
                    ${details.safePhone !== "N/A" ? infoRow(b, "Phone", tel ? `<a class="link" href="tel:${tel}" style="color:${b.textColor};text-decoration:underline;font-weight:500;">${details.safePhone}</a>` : details.safePhone) : ""}
                    ${infoRow(b, "Source", details.cleanSourcePath)}
                  </table>
                </td></tr>
              </table>

              <!-- Message box -->
              <div style="margin:0 0 32px 0;padding:24px 26px;background:${b.backgroundColor};border-radius:12px;border:1px solid ${b.borderColor};">
                <p style="margin:0 0 10px 0;font-family:'Inter',Arial,sans-serif;font-weight:800;color:${b.accentColor};font-size:10px;text-transform:uppercase;letter-spacing:0.15em;">Message</p>
                <p style="white-space:pre-wrap;margin:0;font-family:'Inter',Arial,sans-serif;color:${b.textColor};font-size:15px;line-height:1.65;">${details.safeMessage}</p>
              </div>

              <!-- Triple CTA row -->
              ${ctaRow(b, replyUrl, tel, "", details.rawName, "abeevis")}

              <!-- Quick reply templates -->
              <div style="margin-top:28px;padding-top:24px;border-top:1px solid ${b.borderColor};">
                <p style="margin:0 0 12px 0;font-family:'Inter',Arial,sans-serif;font-size:10px;font-weight:800;color:${b.mutedTextColor};letter-spacing:0.15em;text-transform:uppercase;">Quick replies</p>
                <p style="margin:0;font-family:'Inter',Arial,sans-serif;font-size:14px;line-height:1.8;">
                  <a class="link" href="${sendPricingUrl}" style="color:${b.textColor};text-decoration:none;font-weight:600;border-bottom:1px solid ${b.accentColor};padding-bottom:2px;">→ Send pricing &amp; next steps</a>
                  <span style="display:inline-block;width:18px;"></span>
                  <a class="link" href="${scheduleCallUrl}" style="color:${b.textColor};text-decoration:none;font-weight:600;border-bottom:1px solid ${b.accentColor};padding-bottom:2px;">→ Propose call times</a>
                </p>
              </div>

            </td></tr>
          </table>
        </td></tr>

        <!-- Footer -->
        <tr><td align="center" style="padding:24px 12px 0 12px;">
          ${footer(b)}
        </td></tr>

      </table>
    </td>
  </tr>
</table>
${buildClose()}`;
}

/* ============================================================
 * CUSTOMER CONFIRMATION
 * ============================================================ */

export function buildAbeevisCustomerEmail(
  site: SiteConfig,
  details: LeadDetails
): string {
  const b = site.brand;
  const preheader = `We've received your request — ${site.businessName} will be in touch shortly.`;
  const title = `We received your request • ${site.businessName}`;
  const head = buildHead(title, preheader, b);

  const replyUrl = buildMailtoUrl(
    site.recipientEmail,
    `Re: My ${site.businessName} request (${details.leadId})`,
    `Hi ${site.businessName},\n\nI'm following up on my request (${details.leadId}).\n\n`
  );

  return `${head}
<table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:${b.backgroundColor};font-family:'Inter',Helvetica,Arial,sans-serif;">
  <tr><td align="center" style="padding:32px 12px 40px 12px;">
    <table role="presentation" class="container" width="680" border="0" cellspacing="0" cellpadding="0" style="max-width:680px;width:100%;">

      <tr><td align="center" style="padding:0 20px 16px 20px;">
        <img src="${getEmailAssetUrl("/email-assets/abeevis-email-header.png")}" width="240" alt="Abeevis Studio" style="display:block;width:100%;max-width:240px;height:auto;border:0;outline:none;text-decoration:none;margin:0 auto;">
      </td></tr>

      <tr><td>
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:${b.cardColor};border:1px solid ${b.borderColor};border-radius:18px;box-shadow:0 18px 50px rgba(43,43,43,0.06);">
          <tr><td class="px-m py-m" style="padding:42px;">

            <div style="margin-bottom:18px;">
              ${renderBadge({ label: "Request Received", bg: b.accentColor, fg: "#FFFFFF" })}
            </div>

            <h1 style="margin:0 0 16px 0;font-family:'Inter',Arial,sans-serif;color:${b.textColor};font-size:28px;line-height:1.2;font-weight:700;letter-spacing:-0.02em;">
              We've got it, ${details.safeName}.
            </h1>
            <p style="margin:0 0 28px 0;font-family:'Inter',Arial,sans-serif;color:${b.mutedTextColor};font-size:15px;line-height:1.65;">
              Thanks for reaching out to <strong style="color:${b.textColor};font-weight:600;">${site.businessName}</strong>. Your request landed in our inbox and our team is already reviewing the details. Expect to hear back within one business day.
            </p>

            <!-- Reference -->
            <p style="margin:0 0 26px 0;padding:14px 18px;background-color:#F9F4EA;border:1px solid ${b.borderColor};border-radius:10px;font-family:'SF Mono','Menlo','Consolas',monospace;font-size:13px;color:${b.mutedTextColor};">
              <span style="color:${b.mutedTextColor};">Reference&nbsp;</span><strong style="color:${b.textColor};font-weight:700;">${details.leadId}</strong>
            </p>

            <!-- Summary card -->
            <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#F9F4EA;border:1px solid ${b.borderColor};border-radius:12px;margin-bottom:30px;">
              <tr><td style="padding:8px 22px 22px 22px;">
                <p style="margin:18px 0 10px 0;font-family:'Inter',Arial,sans-serif;color:${b.accentColor};font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:0.15em;">Your message summary</p>
                <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                  ${infoRow(b, "Name", details.safeName)}
                  ${infoRow(b, "Email", details.safeEmail)}
                  ${details.safePhone !== "N/A" ? infoRow(b, "Phone", details.safePhone) : ""}
                  ${details.safeService !== "N/A" ? infoRow(b, site.servicesLabel, details.safeService) : ""}
                </table>
                <p style="margin:18px 0 0 0;font-family:'Inter',Arial,sans-serif;color:${b.textColor};font-size:14px;line-height:1.65;font-style:italic;white-space:pre-wrap;">"${details.safeMessage}"</p>
              </td></tr>
            </table>

            <!-- What happens next -->
            <p style="margin:0 0 16px 0;font-family:'Inter',Arial,sans-serif;font-size:11px;font-weight:800;color:${b.textColor};text-transform:uppercase;letter-spacing:0.12em;">What happens next</p>
            <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin:0 0 32px 0;">
              ${stepRow(b, "1", "We review your request", "Our team digs into the details you shared.")}
              ${stepRow(b, "2", "We prepare a tailored response", "Recommendations, timeline, and a clear path forward.")}
              ${stepRow(b, "3", "We reply within 1 business day", "Usually faster. Watch your inbox.")}
            </table>

            <!-- CTA -->
            <div style="text-align:center;margin-bottom:16px;">
              ${buildButton({ href: replyUrl, label: "REPLY TO US", bg: b.textColor, fg: "#FFFFFF", width: 220 })}
            </div>
            <p style="margin:0;text-align:center;font-family:'Inter',Arial,sans-serif;font-size:13px;color:${b.mutedTextColor};">
              Or visit&nbsp;<a class="link" href="${b.websiteUrl}" style="color:${b.textColor};text-decoration:underline;font-weight:600;">${b.websiteUrl.replace(/^https?:\/\//, "")}</a>
            </p>

          </td></tr>
        </table>
      </td></tr>

      <tr><td align="center" style="padding:24px 12px 0 12px;">
        ${footer(b)}
      </td></tr>

    </table>
  </td></tr>
</table>
${buildClose()}`;
}

/* ============================================================
 * INTERNAL HELPERS
 * ============================================================ */

function infoRow(b: SiteConfig["brand"], label: string, value: string): string {
  return `<tr>
    <td class="info-l" style="padding:10px 0;font-family:'Inter',Arial,sans-serif;color:${b.mutedTextColor};font-size:12px;line-height:1.5;width:35%;border-bottom:1px solid ${b.borderColor};letter-spacing:0.04em;">
      ${label}
    </td>
    <td class="info-v" style="padding:10px 0;font-family:'Inter',Arial,sans-serif;color:${b.textColor};font-size:14px;line-height:1.5;font-weight:500;border-bottom:1px solid ${b.borderColor};">
      ${value}
    </td>
  </tr>`;
}

function stepRow(
  b: SiteConfig["brand"],
  num: string,
  title: string,
  desc: string
): string {
  return `<tr>
    <td width="40" valign="top" style="padding:0 0 18px 0;">
      <div style="display:inline-block;width:30px;height:30px;line-height:30px;text-align:center;background:${b.accentColor};color:#FFFFFF;border-radius:50%;font-family:'Inter',Arial,sans-serif;font-weight:700;font-size:13px;">${num}</div>
    </td>
    <td valign="top" style="padding:0 0 18px 14px;">
      <p style="margin:0 0 4px 0;font-family:'Inter',Arial,sans-serif;font-size:15px;font-weight:700;color:${b.textColor};">${title}</p>
      <p style="margin:0;font-family:'Inter',Arial,sans-serif;font-size:14px;line-height:1.55;color:${b.mutedTextColor};">${desc}</p>
    </td>
  </tr>`;
}

/**
 * Triple CTA row: Reply • Call (if tel) • Visit Website.
 * Abeevis doesn't use WhatsApp by default — it's a digital agency.
 */
function ctaRow(
  b: SiteConfig["brand"],
  replyUrl: string,
  tel: string,
  _whatsappUrl: string,
  _customerName: string,
  _theme: "abeevis"
): string {
  const hasCall = !!tel;
  return `<table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td class="cta-cell" align="center" style="padding:0 6px;">
        ${buildButton({ href: replyUrl, label: "REPLY TO LEAD", bg: b.textColor, fg: "#FFFFFF", width: hasCall ? 180 : 220 })}
      </td>
      ${hasCall ? `<td class="cta-cell" align="center" style="padding:0 6px;">
        ${buildButton({ href: `tel:${tel}`, label: "📞 CALL", bg: b.accentColor, fg: "#FFFFFF", width: 140 })}
      </td>` : ""}
      <td class="cta-cell" align="center" style="padding:0 6px;">
        ${buildButton({ href: b.websiteUrl, label: "VISIT SITE", bg: "#FFFFFF", fg: b.textColor, width: 140 })}
      </td>
    </tr>
  </table>`;
}

function footer(b: SiteConfig["brand"]): string {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.abeevis.com";
  return `<table role="presentation" border="0" cellspacing="0" cellpadding="0" align="center">
    <tr><td align="center" style="padding:0;font-family:Arial,Helvetica,sans-serif;">
      <p style="margin:0;color:${b.mutedTextColor};font-size:12px;line-height:1.6;">Powered by <strong style="color:${b.textColor};font-weight:600;">Abeevis</strong></p>
      <p style="margin:2px 0 0 0;color:${b.mutedTextColor};font-size:12px;line-height:1.6;">Website form automation by Abeevis</p>
      <a href="${siteUrl}" target="_blank" style="display:inline-block;margin-top:10px;color:${b.accentColor};font-size:12px;line-height:1.6;font-weight:600;text-decoration:none;">www.abeevis.com</a>
    </td></tr>
  </table>`;
}

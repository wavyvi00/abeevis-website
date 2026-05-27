// src/lib/email/shared.ts
// Shared building blocks every theme uses:
//  - <head> with preheader, mobile media queries, dark-mode hints, animations
//  - Bulletproof CTA button (VML for Outlook, fallback for everything else)
//  - Badge pills, pulsing dot, info row helpers

import type { BrandConfig, Lang, LeadQuality, Urgency } from "./types";

/* ============================================================
 * HEAD + GLOBAL CSS
 * ============================================================ */

/**
 * Builds the opening DOCTYPE/html/head/body of every email.
 * Includes:
 *   - color-scheme + supported-color-schemes (Apple Mail, iOS Mail dark mode)
 *   - preheader (inbox preview snippet)
 *   - mobile media queries
 *   - @keyframes for pulse animations (Apple Mail; static fallback elsewhere)
 *   - prefers-reduced-motion respect
 *   - Outlook MSO PixelsPerInch fix
 */
export const buildHead = (
  title: string,
  preheader: string,
  brand: BrandConfig
): string => `<!DOCTYPE html>
<html lang="en" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="x-apple-disable-message-reformatting">
<meta name="color-scheme" content="light dark">
<meta name="supported-color-schemes" content="light dark">
<title>${title}</title>
<!--[if mso]>
<noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript>
<![endif]-->
<style>
  /* Resets */
  body,table,td,a{-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%}
  table,td{mso-table-lspace:0;mso-table-rspace:0}
  img{-ms-interpolation-mode:bicubic;border:0;outline:none;text-decoration:none;display:block}
  body{margin:0!important;padding:0!important;width:100%!important;height:100%!important}
  a[x-apple-data-detectors]{color:inherit!important;text-decoration:inherit!important;font-family:inherit!important;font-weight:inherit!important;font-size:inherit!important;line-height:inherit!important}

  /* Animations — only execute when the user hasn't requested reduced motion.
     In Outlook/Gmail these rules are stripped and the dot/badge stays static. */
  @media (prefers-reduced-motion: no-preference) {
    .pulse-dot{animation:abPulseDot 2s ease-in-out infinite}
    .pulse-glow{animation:abPulseGlow 2.4s ease-in-out infinite}
  }
  @keyframes abPulseDot{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.55;transform:scale(1.18)}}
  @keyframes abPulseGlow{0%,100%{box-shadow:0 0 0 0 ${brand.accentColor}55}50%{box-shadow:0 0 0 7px ${brand.accentColor}00}}

  /* Hover (Apple Mail, Gmail Web) */
  .btn:hover{filter:brightness(1.08);transform:translateY(-1px)}
  .link:hover{text-decoration:underline!important}

  /* Mobile responsiveness */
  @media only screen and (max-width:620px){
    .container{width:100%!important;max-width:100%!important}
    .px-m{padding-left:20px!important;padding-right:20px!important}
    .py-m{padding-top:24px!important;padding-bottom:24px!important}
    .stack{display:block!important;width:100%!important}
    .stack td{display:block!important;width:100%!important;padding:6px 0!important}
    .cta-cell{display:block!important;width:100%!important;padding:6px 0!important}
    .hide-m{display:none!important}
    .name-m{font-size:26px!important;line-height:1.2!important}
    .phone-m{font-size:26px!important}
    .info-l{display:block!important;width:100%!important;padding:14px 0 2px 0!important;border-bottom:0!important}
    .info-v{display:block!important;width:100%!important;padding:0 0 14px 0!important}
    .btn-full{width:100%!important;display:block!important;text-align:center!important}
  }
</style>
</head>
<body style="margin:0;padding:0;background-color:${brand.backgroundColor};">
<div style="display:none;font-size:1px;color:${brand.backgroundColor};line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all;">${escapeAttr(preheader)}</div>
`;

export const buildClose = (): string => `</body></html>`;

/* ============================================================
 * BULLETPROOF BUTTON
 * ============================================================ */

/**
 * Renders a CTA button that survives Outlook (via VML <v:roundrect>)
 * and degrades to a styled <a> in modern clients.
 *
 * Defaults are tuned for use in a 3-column CTA row.
 */
export const buildButton = (params: {
  href: string;
  label: string;
  bg: string;
  fg: string;
  width?: number;
  height?: number;
  /** Optional emoji or HTML prefix (e.g. "📞 "). Kept in the label for plain Outlook fallback. */
}): string => {
  const { href, label, bg, fg } = params;
  const width = params.width ?? 200;
  const height = params.height ?? 48;
  const radius = 8;
  const arcSize = Math.round((radius / height) * 200);
  return `<!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${href}" style="height:${height}px;v-text-anchor:middle;width:${width}px;" arcsize="${arcSize}%" stroke="f" fillcolor="${bg}">
<w:anchorlock/>
<center style="color:${fg};font-family:Arial,sans-serif;font-size:13px;font-weight:bold;letter-spacing:0.05em;">${label}</center>
</v:roundrect>
<![endif]-->
<!--[if !mso]><!-- -->
<a class="btn btn-full" href="${href}" target="_blank" style="display:inline-block;background-color:${bg};color:${fg};font-family:'Inter',Arial,sans-serif;font-size:13px;font-weight:700;letter-spacing:0.04em;text-align:center;text-decoration:none;padding:14px 18px;border-radius:${radius}px;line-height:1.2;mso-padding-alt:0;transition:filter .2s ease, transform .2s ease;">${label}</a>
<!--<![endif]-->`;
};

/* ============================================================
 * BADGES + INDICATORS
 * ============================================================ */

export const qualityBadgeText = (
  quality: LeadQuality,
  lang: Lang = "en"
): { emoji: string; label: string; bg: string; fg: string } => {
  if (quality === "hot") {
    return {
      emoji: "🔥",
      label: lang === "es" ? "LEAD CALIENTE" : "HOT LEAD",
      bg: "#FEE2E2",
      fg: "#991B1B",
    };
  }
  if (quality === "warm") {
    return {
      emoji: "☀",
      label: lang === "es" ? "LEAD TIBIO" : "WARM LEAD",
      bg: "#FEF3C7",
      fg: "#92400E",
    };
  }
  return {
    emoji: "❄",
    label: lang === "es" ? "LEAD FRÍO" : "COLD LEAD",
    bg: "#DBEAFE",
    fg: "#1E40AF",
  };
};

export const urgencyBadgeText = (
  urgency: Urgency,
  lang: Lang = "en"
): { emoji: string; label: string; bg: string; fg: string } | null => {
  if (urgency === "urgent") {
    return {
      emoji: "🚨",
      label: lang === "es" ? "URGENTE" : "URGENT",
      bg: "#DC2626",
      fg: "#FFFFFF",
    };
  }
  return null;
};

/**
 * Render a pill-shaped badge. Optionally pulses (degrades to static).
 */
export const renderBadge = (params: {
  emoji?: string;
  label: string;
  bg: string;
  fg: string;
  pulse?: boolean;
  bordered?: boolean;
  borderColor?: string;
}): string => {
  const { emoji, label, bg, fg, pulse, bordered, borderColor } = params;
  const border = bordered ? `border:1px solid ${borderColor || fg};` : "";
  const cls = pulse ? "pulse-glow" : "";
  return `<span class="${cls}" style="display:inline-block;background-color:${bg};color:${fg};font-family:'Inter',Arial,sans-serif;font-size:11px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;padding:6px 12px;border-radius:99px;line-height:1;${border}">${emoji ? emoji + " " : ""}${label}</span>`;
};

/** Render an inline pulsing dot — fades in Apple Mail, static dot elsewhere. */
export const renderPulseDot = (color: string, size: number = 10): string =>
  `<span class="pulse-dot" style="display:inline-block;width:${size}px;height:${size}px;background-color:${color};border-radius:50%;vertical-align:middle;margin-right:8px;"></span>`;

/* ============================================================
 * SMALL HELPERS
 * ============================================================ */

/**
 * Escape a string for use inside an HTML attribute value (preheader, alt, title).
 * Less strict than escapeHtml in utils.ts — only the chars that break attributes.
 */
function escapeAttr(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;");
}

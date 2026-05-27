// src/lib/email/themes/vr-enterprise.ts
// VR Enterprise — industrial B2B quote request.
// Pure black + caution yellow. Monospace lead IDs. Heavy weight typography.

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
  buildWhatsAppUrl,
  formatPhoneForTel,
} from "../utils";

/* ============================================================
 * OWNER NOTIFICATION
 * ============================================================ */

export function buildVrEnterpriseOwnerEmail(
  site: SiteConfig,
  details: LeadDetails
): string {
  const b = site.brand;
  const quality = qualityBadgeText(details.quality, "es");
  const Y = b.accentColor; // yellow

  const preheader = `Nueva cotización de ${details.rawService !== "N/A" ? details.rawService : "equipo/servicio"} — ${details.rawName}`;
  const title = `Nueva cotización • ${site.businessName}`;

  const tel = formatPhoneForTel(details.rawPhone);
  const customerWhatsappUrl = buildWhatsAppUrl(
    details.rawPhone,
    `Hola ${details.rawName}, somos ${site.businessName}. Recibimos su solicitud de cotización (${details.leadId}) y queremos coordinar los detalles.`
  );

  const replyUrl = buildMailtoUrl(
    details.rawEmail,
    `Re: Cotización ${details.leadId} — ${site.businessName}`,
    `Hola ${details.rawName},\n\nGracias por contactar a ${site.businessName}. Recibimos su solicitud (${details.leadId}) para ${details.rawService !== "N/A" ? details.rawService : "el servicio indicado"}.\n\nPara preparar una cotización precisa, ¿podría confirmar:\n  • Ubicación del proyecto\n  • Fechas estimadas\n  • Alcance del trabajo / volumen\n\nQuedo atento.\n\n— ${site.businessName}`
  );
  const confirmAvailUrl = buildMailtoUrl(
    details.rawEmail,
    `${site.businessName} — Disponibilidad confirmada`,
    `Hola ${details.rawName},\n\nConfirmamos disponibilidad para su requerimiento.\n\n  Equipo / Servicio: ${details.rawService !== "N/A" ? details.rawService : ""}\n  Fechas:            [confirmar]\n  Cotización:        Se envía en correo separado.\n\nQuedo atento a su confirmación para coordinar.\n\n— ${site.businessName}`
  );
  const sendQuoteUrl = buildMailtoUrl(
    details.rawEmail,
    `${site.businessName} — Cotización formal`,
    `Hola ${details.rawName},\n\nAdjunto encontrará la cotización formal por ${details.rawService !== "N/A" ? details.rawService : "el servicio solicitado"}:\n\n  Concepto:     ${details.rawService !== "N/A" ? details.rawService : ""}\n  Subtotal:     $[monto]\n  Impuestos:    $[monto]\n  TOTAL:        $[monto]\n  Validez:      30 días\n\nForma de pago: [términos]\n\nQuedo atento a su confirmación.\n\n— ${site.businessName}`
  );

  const head = buildHead(title, preheader, b);

  return `${head}
<table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:${b.backgroundColor};font-family:'Inter',Helvetica,Arial,sans-serif;">
  <tr><td align="center" style="padding:24px 12px 40px 12px;">
    <table role="presentation" class="container" width="640" border="0" cellspacing="0" cellpadding="0" style="max-width:640px;width:100%;">

      <!-- Caution stripe -->
      <tr><td style="height:8px;background:repeating-linear-gradient(135deg, ${Y} 0 16px, ${b.primaryColor} 16px 32px);font-size:0;line-height:0;">&nbsp;</td></tr>

      <!-- Header -->
      <tr><td style="background-color:${b.primaryColor};padding:34px 24px;text-align:center;border-bottom:4px solid ${Y};">
        ${b.logoUrl ? `<img src="${b.logoUrl}" alt="${site.businessName}" style="max-width:180px;height:auto;display:block;margin:0 auto;">` : `<h1 style="color:${b.textColor};margin:0;font-size:24px;letter-spacing:0.12em;font-weight:800;">${site.businessName}</h1>`}
        <p style="color:${b.mutedTextColor};margin:14px 0 0 0;font-family:'Inter',Arial,sans-serif;font-size:11px;letter-spacing:0.18em;line-height:1.4;text-transform:uppercase;">
          ${b.tagline}
        </p>
      </td></tr>

      <!-- Body -->
      <tr><td style="background-color:${b.cardColor};padding:36px 32px;" class="px-m py-m">

        <!-- Eyebrow + pulse -->
        <div style="margin-bottom:10px;">
          ${renderPulseDot(Y, 11)}<span style="font-family:'Inter',Arial,sans-serif;font-size:11px;font-weight:800;color:${Y};letter-spacing:0.2em;text-transform:uppercase;vertical-align:middle;">Nueva Cotización</span>
        </div>

        <!-- Mono lead ID with brackets -->
        <p style="margin:0 0 18px 0;font-family:'SF Mono','Menlo','Consolas',monospace;font-size:13px;color:${b.mutedTextColor};letter-spacing:0.06em;">
          <span style="color:${Y};">[</span>${details.leadId}<span style="color:${Y};">]</span> &nbsp;${details.timestamp}
        </p>

        <!-- Quality badge -->
        <div style="margin:0 0 24px 0;">
          ${renderBadge({ emoji: quality.emoji, label: quality.label, bg: quality.bg, fg: quality.fg })}
        </div>

        <!-- Big name + service -->
        <h1 class="name-m" style="margin:0 0 4px 0;font-family:'Inter',Arial,sans-serif;color:${b.textColor};font-size:30px;line-height:1.15;font-weight:800;letter-spacing:-0.02em;">
          ${details.safeName}
        </h1>
        <p style="margin:0 0 28px 0;font-family:'Inter',Arial,sans-serif;color:${b.mutedTextColor};font-size:14px;line-height:1.5;">
          Solicita cotización de <strong style="color:${Y};font-weight:700;">${details.safeService}</strong>
        </p>

        <!-- Info grid -->
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin:0 0 24px 0;background-color:${b.primaryColor};border:1px solid ${b.borderColor};">
          <tr><td style="padding:6px 18px 14px 18px;">
            <p style="margin:14px 0 10px 0;font-family:'SF Mono','Menlo','Consolas',monospace;font-size:10px;font-weight:700;color:${Y};letter-spacing:0.2em;text-transform:uppercase;">// DETALLES</p>
            <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
              ${vrInfoRow(b, "EMAIL", `<a href="mailto:${details.rawEmail}" style="color:${b.textColor};text-decoration:underline;font-weight:500;">${details.safeEmail}</a>`)}
              ${details.safePhone !== "N/A" ? vrInfoRow(b, "TEL", tel ? `<a href="tel:${tel}" style="color:${b.textColor};text-decoration:underline;font-weight:500;">${details.safePhone}</a>` : details.safePhone) : ""}
              ${vrInfoRow(b, "ITEM", details.safeService)}
              ${vrInfoRow(b, "FUENTE", details.cleanSourcePath)}
            </table>
          </td></tr>
        </table>

        <!-- Message -->
        <div style="margin:0 0 30px 0;padding:22px 22px;background:${b.primaryColor};border:1px solid ${b.borderColor};border-left:4px solid ${Y};">
          <p style="margin:0 0 10px 0;font-family:'SF Mono','Menlo','Consolas',monospace;font-weight:700;color:${Y};font-size:10px;text-transform:uppercase;letter-spacing:0.2em;">// MENSAJE</p>
          <p style="white-space:pre-wrap;margin:0;font-family:'Inter',Arial,sans-serif;color:${b.textColor};font-size:15px;line-height:1.65;">${details.safeMessage}</p>
        </div>

        <!-- Triple CTA row -->
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin:0 0 24px 0;">
          <tr>
            ${tel ? `<td class="cta-cell" align="center" style="padding:0 4px;">
              ${buildButton({ href: `tel:${tel}`, label: "📞 LLAMAR", bg: Y, fg: "#050505", width: 150 })}
            </td>` : ""}
            ${customerWhatsappUrl ? `<td class="cta-cell" align="center" style="padding:0 4px;">
              ${buildButton({ href: customerWhatsappUrl, label: "💬 WHATSAPP", bg: "#25D366", fg: "#FFFFFF", width: 170 })}
            </td>` : ""}
            <td class="cta-cell" align="center" style="padding:0 4px;">
              ${buildButton({ href: replyUrl, label: "✉ RESPONDER", bg: b.primaryColor, fg: Y, width: 170 })}
            </td>
          </tr>
        </table>

        <!-- Quick reply templates -->
        <div style="margin-top:8px;padding-top:22px;border-top:1px solid ${b.borderColor};">
          <p style="margin:0 0 12px 0;font-family:'SF Mono','Menlo','Consolas',monospace;font-size:10px;font-weight:700;color:${Y};letter-spacing:0.2em;text-transform:uppercase;">// PLANTILLAS RÁPIDAS</p>
          <p style="margin:0;font-family:'Inter',Arial,sans-serif;font-size:14px;line-height:1.9;">
            <a href="${confirmAvailUrl}" style="color:${b.textColor};text-decoration:none;font-weight:600;border-bottom:1px solid ${Y};padding-bottom:2px;">→ Confirmar disponibilidad</a>
            <span style="display:inline-block;width:18px;"></span>
            <a href="${sendQuoteUrl}" style="color:${b.textColor};text-decoration:none;font-weight:600;border-bottom:1px solid ${Y};padding-bottom:2px;">→ Enviar cotización formal</a>
          </p>
        </div>

      </td></tr>

      <!-- Caution stripe -->
      <tr><td style="height:8px;background:repeating-linear-gradient(135deg, ${Y} 0 16px, ${b.primaryColor} 16px 32px);font-size:0;line-height:0;">&nbsp;</td></tr>

      <tr><td align="center" style="padding:26px 12px 0 12px;">${footer(b)}</td></tr>

    </table>
  </td></tr>
</table>
${buildClose()}`;
}

/* ============================================================
 * CUSTOMER CONFIRMATION (Spanish primary)
 * ============================================================ */

export function buildVrEnterpriseCustomerEmail(
  site: SiteConfig,
  details: LeadDetails
): string {
  const b = site.brand;
  const Y = b.accentColor;
  const preheader = `Hemos recibido tu solicitud — ${site.businessName} prepara tu cotización.`;
  const title = `Hemos recibido tu solicitud • ${site.businessName}`;
  const head = buildHead(title, preheader, b);

  const supportTel = formatPhoneForTel(site.supportPhone || "");
  const supportWa = buildWhatsAppUrl(
    site.whatsappNumber || "",
    `Hola, soy ${details.rawName}. Envié una solicitud (${details.leadId}) y quisiera dar seguimiento a mi cotización.`
  );

  return `${head}
<table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:${b.backgroundColor};font-family:'Inter',Helvetica,Arial,sans-serif;">
  <tr><td align="center" style="padding:24px 12px 40px 12px;">
    <table role="presentation" class="container" width="640" border="0" cellspacing="0" cellpadding="0" style="max-width:640px;width:100%;">

      <tr><td style="height:8px;background:repeating-linear-gradient(135deg, ${Y} 0 16px, ${b.primaryColor} 16px 32px);font-size:0;line-height:0;">&nbsp;</td></tr>

      <tr><td style="background-color:${b.primaryColor};padding:34px 24px;text-align:center;border-bottom:4px solid ${Y};">
        ${b.logoUrl ? `<img src="${b.logoUrl}" alt="${site.businessName}" style="max-width:180px;height:auto;display:block;margin:0 auto;">` : ""}
        <p style="color:${b.mutedTextColor};margin:14px 0 0 0;font-family:'Inter',Arial,sans-serif;font-size:11px;letter-spacing:0.18em;line-height:1.4;text-transform:uppercase;">
          ${b.tagline}
        </p>
      </td></tr>

      <tr><td style="background-color:${b.cardColor};padding:38px 32px;" class="px-m py-m">

        <div style="margin-bottom:18px;">
          ${renderBadge({ label: "Solicitud Recibida", bg: Y, fg: "#050505" })}
        </div>

        <h1 style="margin:0 0 12px 0;font-family:'Inter',Arial,sans-serif;color:${b.textColor};font-size:26px;line-height:1.2;font-weight:800;letter-spacing:-0.01em;">
          Hemos recibido tu solicitud, ${details.safeName}.
        </h1>
        <p style="margin:0 0 24px 0;font-family:'Inter',Arial,sans-serif;color:${b.mutedTextColor};font-size:15px;line-height:1.65;">
          Gracias por contactar a <strong style="color:${b.textColor};font-weight:700;">${site.businessName}</strong>. Nuestro equipo comercial está revisando los detalles y preparará una cotización a la brevedad. Generalmente respondemos en menos de 24 horas hábiles.
        </p>

        <!-- Reference -->
        <p style="margin:0 0 24px 0;padding:14px 18px;background-color:${b.primaryColor};border:1px solid ${b.borderColor};font-family:'SF Mono','Menlo','Consolas',monospace;font-size:13px;color:${b.mutedTextColor};">
          <span style="opacity:0.7;">REF&nbsp;</span><span style="color:${Y};">[</span><strong style="color:${b.textColor};font-weight:700;">${details.leadId}</strong><span style="color:${Y};">]</span>
        </p>

        <!-- Summary -->
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:${b.primaryColor};border:1px solid ${b.borderColor};margin-bottom:30px;">
          <tr><td style="padding:6px 20px 18px 20px;">
            <p style="margin:18px 0 8px 0;font-family:'SF Mono','Menlo','Consolas',monospace;color:${Y};font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.2em;">// RESUMEN DE TU SOLICITUD</p>
            <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
              ${vrInfoRow(b, "NOMBRE", details.safeName)}
              ${vrInfoRow(b, "EMAIL", details.safeEmail)}
              ${details.safePhone !== "N/A" ? vrInfoRow(b, "TEL", details.safePhone) : ""}
              ${details.safeService !== "N/A" ? vrInfoRow(b, "ITEM", details.safeService) : ""}
            </table>
            <p style="margin:14px 0 0 0;font-family:'Inter',Arial,sans-serif;color:${b.textColor};font-size:14px;line-height:1.65;font-style:italic;white-space:pre-wrap;">"${details.safeMessage}"</p>
          </td></tr>
        </table>

        <!-- Steps -->
        <p style="margin:0 0 16px 0;font-family:'SF Mono','Menlo','Consolas',monospace;font-size:10px;font-weight:700;color:${Y};text-transform:uppercase;letter-spacing:0.2em;">// PRÓXIMOS PASOS</p>
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin:0 0 30px 0;">
          ${vrStepRow(b, "01", "Revisamos tu requerimiento", "Validamos especificaciones y disponibilidad de equipo.")}
          ${vrStepRow(b, "02", "Preparamos tu cotización", "Costos, fechas y condiciones formales.")}
          ${vrStepRow(b, "03", "Te enviamos la propuesta", "Respuesta en menos de 24 horas hábiles.")}
        </table>

        ${supportTel || supportWa ? `
        <div style="margin:0 0 16px 0;padding:18px 20px;background:${b.primaryColor};border:1px solid ${b.borderColor};">
          <p style="margin:0 0 12px 0;font-family:'SF Mono','Menlo','Consolas',monospace;font-size:10px;font-weight:700;color:${Y};letter-spacing:0.2em;text-transform:uppercase;">// CONTACTO DIRECTO</p>
          <p style="margin:0 0 14px 0;font-family:'Inter',Arial,sans-serif;font-size:14px;color:${b.textColor};line-height:1.55;">
            ¿Necesitas adelantar el proceso? Contáctanos directamente.
          </p>
          <table role="presentation" border="0" cellspacing="0" cellpadding="0">
            <tr>
              ${supportTel ? `<td style="padding-right:8px;">${buildButton({ href: `tel:${supportTel}`, label: `📞 ${site.displayPhone || "LLAMAR"}`, bg: Y, fg: "#050505", width: 180 })}</td>` : ""}
              ${supportWa ? `<td>${buildButton({ href: supportWa, label: "💬 WHATSAPP", bg: "#25D366", fg: "#FFFFFF", width: 150 })}</td>` : ""}
            </tr>
          </table>
        </div>` : ""}

      </td></tr>

      <tr><td style="height:8px;background:repeating-linear-gradient(135deg, ${Y} 0 16px, ${b.primaryColor} 16px 32px);font-size:0;line-height:0;">&nbsp;</td></tr>

      <tr><td align="center" style="padding:26px 12px 0 12px;">${footer(b)}</td></tr>

    </table>
  </td></tr>
</table>
${buildClose()}`;
}

/* ============================================================
 * INTERNAL HELPERS
 * ============================================================ */

function vrInfoRow(
  b: SiteConfig["brand"],
  label: string,
  value: string
): string {
  return `<tr>
    <td class="info-l" style="padding:10px 0;font-family:'SF Mono','Menlo','Consolas',monospace;color:${b.mutedTextColor};font-size:11px;line-height:1.5;width:32%;border-bottom:1px solid ${b.borderColor};letter-spacing:0.1em;">
      ${label}
    </td>
    <td class="info-v" style="padding:10px 0;font-family:'Inter',Arial,sans-serif;color:${b.textColor};font-size:14px;line-height:1.5;font-weight:500;border-bottom:1px solid ${b.borderColor};">
      ${value}
    </td>
  </tr>`;
}

function vrStepRow(
  b: SiteConfig["brand"],
  num: string,
  title: string,
  desc: string
): string {
  return `<tr>
    <td width="56" valign="top" style="padding:0 0 18px 0;">
      <div style="display:inline-block;min-width:40px;padding:6px 8px;text-align:center;background:${b.accentColor};color:#050505;font-family:'SF Mono','Menlo','Consolas',monospace;font-weight:700;font-size:13px;letter-spacing:0.05em;">${num}</div>
    </td>
    <td valign="top" style="padding:0 0 18px 14px;">
      <p style="margin:0 0 4px 0;font-family:'Inter',Arial,sans-serif;font-size:15px;font-weight:700;color:${b.textColor};">${title}</p>
      <p style="margin:0;font-family:'Inter',Arial,sans-serif;font-size:13px;line-height:1.55;color:${b.mutedTextColor};">${desc}</p>
    </td>
  </tr>`;
}

function footer(b: SiteConfig["brand"]): string {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.abeevis.com";
  return `<div style="margin-top:24px;padding-top:18px;border-top:1px solid ${b.borderColor};text-align:center;">
    <p style="margin:0;color:${b.mutedTextColor};font-size:12px;line-height:1.6;font-family:Arial,sans-serif;">
      Powered by <strong style="color:${b.textColor};font-weight:600;">Abeevis</strong>
    </p>
    <p style="margin:2px 0 0 0;color:${b.mutedTextColor};font-size:12px;line-height:1.6;font-family:Arial,sans-serif;">
      Website form automation by Abeevis
    </p>
    <a href="${siteUrl}" target="_blank" style="display:inline-block;margin-top:10px;color:#eccd68;font-size:12px;line-height:1.6;font-weight:600;text-decoration:none;font-family:Arial,sans-serif;">www.abeevis.com</a>
  </div>`;
}

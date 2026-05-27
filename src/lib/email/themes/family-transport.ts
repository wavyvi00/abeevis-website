// src/lib/email/themes/family-transport.ts
// Family Transport USA — roadside urgent.
// Spanish primary + English subtitle. Big tel: link. Yellow caution stripe accent.
// Pulsing red beacon for new lead, optional URGENT badge for time-critical services.

import {
  buildButton,
  buildClose,
  buildHead,
  qualityBadgeText,
  renderBadge,
  renderPulseDot,
  urgencyBadgeText,
} from "../shared";
import type { LeadDetails, SiteConfig } from "../types";
import {
  buildMailtoUrl,
  buildWhatsAppUrl,
  formatPhoneForTel,
} from "../utils";

const YELLOW = "#FACC15";

/* ============================================================
 * OWNER NOTIFICATION
 * ============================================================ */

export function buildFamilyTransportOwnerEmail(
  site: SiteConfig,
  details: LeadDetails
): string {
  const b = site.brand;
  const quality = qualityBadgeText(details.quality, "es");
  const urgency = urgencyBadgeText(details.urgency, "es");

  const urgencyEmoji = urgency ? "🚨 " : "";
  const preheader = `${urgencyEmoji}Nueva solicitud de ${details.rawService !== "N/A" ? details.rawService : "servicio"} — ${details.rawName}`;
  const title = `Nueva solicitud • ${site.businessName}`;

  const tel = formatPhoneForTel(details.rawPhone);
  const customerWhatsappUrl = buildWhatsAppUrl(
    details.rawPhone,
    `Hola ${details.rawName}, recibimos su solicitud de ${details.rawService !== "N/A" ? details.rawService : "asistencia"} y le estamos contactando. ¿Cuál es su ubicación actual?`
  );

  const replyUrl = buildMailtoUrl(
    details.rawEmail,
    `Re: Solicitud de ${details.rawService !== "N/A" ? details.rawService : "servicio"} — ${site.businessName}`,
    `Hola ${details.rawName},\n\nGracias por contactar a ${site.businessName}. Recibimos su solicitud (${details.leadId}) y estamos listos para ayudarle.\n\n¿Podría confirmar su ubicación actual y datos del vehículo?\n\nSi es una emergencia, por favor llámenos al ${site.displayPhone || "[teléfono]"}.\n\nSaludos,\n${site.businessName}`
  );
  const onTheWayUrl = buildMailtoUrl(
    details.rawEmail,
    `${site.businessName} — Vamos en camino`,
    `Hola ${details.rawName},\n\nRecibimos su solicitud. Ya despachamos asistencia hacia su ubicación. Tiempo estimado de llegada: [XX minutos].\n\nManténgase seguro y nuestro operador le contactará al llegar.\n\n— ${site.businessName}`
  );
  const quoteUrl = buildMailtoUrl(
    details.rawEmail,
    `${site.businessName} — Cotización confirmada`,
    `Hola ${details.rawName},\n\nGracias por contactarnos. Basado en su solicitud (${details.rawService !== "N/A" ? details.rawService : "servicio"}), aquí está la cotización:\n\n  Servicio: ${details.rawService !== "N/A" ? details.rawService : ""}\n  Costo:    $[monto]\n  Tiempo:   [tiempo estimado]\n\nSi acepta, responda este correo y despachamos.\n\n— ${site.businessName}`
  );

  const head = buildHead(title, preheader, b);

  return `${head}
<table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:${b.backgroundColor};font-family:'Inter',Helvetica,Arial,sans-serif;">
  <tr><td align="center" style="padding:24px 12px 40px 12px;">
    <table role="presentation" class="container" width="640" border="0" cellspacing="0" cellpadding="0" style="max-width:640px;width:100%;">

      <!-- Yellow caution stripe -->
      <tr><td style="height:6px;background:repeating-linear-gradient(135deg, ${YELLOW} 0 14px, ${b.cardColor} 14px 28px);font-size:0;line-height:0;">&nbsp;</td></tr>

      <!-- Header -->
      <tr><td style="background-color:${b.primaryColor};padding:32px 24px;text-align:center;border-bottom:4px solid ${b.accentColor};">
        ${b.logoUrl ? `<img src="${b.logoUrl}" alt="${site.businessName}" style="max-width:120px;height:auto;display:block;margin:0 auto;">` : `<h1 style="color:${b.textColor};margin:0;font-size:22px;letter-spacing:0.1em;font-weight:700;">${site.businessName}</h1>`}
        <p style="color:${b.mutedTextColor};margin:14px 0 0 0;font-family:'Inter',Arial,sans-serif;font-size:12px;letter-spacing:0.06em;line-height:1.4;">
          ${b.tagline}<br><span style="opacity:0.6;font-size:11px;">Fast, direct and reliable roadside assistance.</span>
        </p>
      </td></tr>

      <!-- Body -->
      <tr><td style="background-color:${b.cardColor};padding:36px 32px;" class="px-m py-m">

        <!-- Eyebrow + NEW LEAD pulse -->
        <div style="margin-bottom:10px;">
          ${renderPulseDot(b.accentColor, 11)}<span style="font-family:'Inter',Arial,sans-serif;font-size:11px;font-weight:800;color:${b.accentColor};letter-spacing:0.18em;text-transform:uppercase;vertical-align:middle;">Nueva Solicitud&nbsp;<span style="opacity:0.5;font-weight:600;">/ New Lead</span></span>
        </div>

        <!-- Lead ID + timestamp -->
        <p style="margin:0 0 18px 0;font-family:'SF Mono','Menlo','Consolas',monospace;font-size:12px;color:${b.mutedTextColor};letter-spacing:0.04em;">
          ${details.leadId} &nbsp;•&nbsp; ${details.timestamp}
        </p>

        <!-- Badges row -->
        <div style="margin:0 0 24px 0;">
          ${urgency ? `<span style="margin-right:8px;">${renderBadge({ emoji: urgency.emoji, label: urgency.label, bg: urgency.bg, fg: urgency.fg, pulse: true })}</span>` : ""}
          ${renderBadge({ emoji: quality.emoji, label: quality.label, bg: quality.bg, fg: quality.fg })}
        </div>

        <!-- Customer name -->
        <h1 class="name-m" style="margin:0 0 4px 0;font-family:'Inter',Arial,sans-serif;color:${b.textColor};font-size:30px;line-height:1.15;font-weight:700;letter-spacing:-0.02em;">
          ${details.safeName}
        </h1>
        <p style="margin:0 0 24px 0;font-family:'Inter',Arial,sans-serif;color:${b.mutedTextColor};font-size:14px;line-height:1.4;">
          Solicita <strong style="color:${b.accentColor};font-weight:700;">${details.safeService}</strong>
          <span style="display:block;opacity:0.6;font-size:12px;margin-top:2px;">Requesting <span style="font-weight:600;">${details.safeService}</span></span>
        </p>

        ${tel ? `
        <!-- BIG PHONE LINK (the hero CTA for roadside) -->
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin:0 0 26px 0;background:linear-gradient(135deg, ${b.accentColor} 0%, #B91C2C 100%);background-color:${b.accentColor};border-radius:12px;">
          <tr><td style="padding:18px 22px;text-align:center;">
            <p style="margin:0 0 4px 0;font-family:'Inter',Arial,sans-serif;font-size:10px;font-weight:800;color:#FFFFFF;letter-spacing:0.18em;text-transform:uppercase;opacity:0.85;">Teléfono del cliente / Customer phone</p>
            <a class="phone-m" href="tel:${tel}" style="font-family:'Inter',Arial,sans-serif;color:#FFFFFF;text-decoration:none;font-size:30px;font-weight:800;letter-spacing:0.02em;line-height:1.2;">
              📞 ${details.safePhone}
            </a>
          </td></tr>
        </table>` : ""}

        <!-- Info grid -->
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin:0 0 24px 0;background-color:${b.secondaryColor};border:1px solid ${b.borderColor};border-radius:10px;">
          <tr><td style="padding:6px 18px 14px 18px;">
            <p style="margin:14px 0 10px 0;font-family:'Inter',Arial,sans-serif;font-size:10px;font-weight:800;color:${YELLOW};letter-spacing:0.15em;text-transform:uppercase;">Detalles / Details</p>
            <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
              ${ftInfoRow(b, "Email", `<a href="mailto:${details.rawEmail}" style="color:${b.textColor};text-decoration:underline;font-weight:500;">${details.safeEmail}</a>`)}
              ${ftInfoRow(b, "Servicio / Service", details.safeService)}
              ${ftInfoRow(b, "Fuente / Source", details.cleanSourcePath)}
              ${ftInfoRow(b, "Hora / Time", details.timestamp)}
            </table>
          </td></tr>
        </table>

        <!-- Message -->
        <div style="margin:0 0 30px 0;padding:22px 22px;background:${b.secondaryColor};border-left:4px solid ${b.accentColor};border-radius:0 10px 10px 0;">
          <p style="margin:0 0 10px 0;font-family:'Inter',Arial,sans-serif;font-weight:800;color:${b.mutedTextColor};font-size:10px;text-transform:uppercase;letter-spacing:0.15em;">Mensaje / Message</p>
          <p style="white-space:pre-wrap;margin:0;font-family:'Inter',Arial,sans-serif;color:${b.textColor};font-size:15px;line-height:1.65;">${details.safeMessage}</p>
        </div>

        <!-- Triple CTA row -->
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin:0 0 24px 0;">
          <tr>
            ${tel ? `<td class="cta-cell" align="center" style="padding:0 4px;">
              ${buildButton({ href: `tel:${tel}`, label: "📞 LLAMAR", bg: b.accentColor, fg: "#FFFFFF", width: 150 })}
            </td>` : ""}
            ${customerWhatsappUrl ? `<td class="cta-cell" align="center" style="padding:0 4px;">
              ${buildButton({ href: customerWhatsappUrl, label: "💬 WHATSAPP", bg: "#25D366", fg: "#FFFFFF", width: 170 })}
            </td>` : ""}
            <td class="cta-cell" align="center" style="padding:0 4px;">
              ${buildButton({ href: replyUrl, label: "✉ RESPONDER", bg: b.secondaryColor, fg: "#FFFFFF", width: 170 })}
            </td>
          </tr>
        </table>

        <!-- Quick reply templates -->
        <div style="margin-top:8px;padding-top:22px;border-top:1px solid ${b.borderColor};">
          <p style="margin:0 0 12px 0;font-family:'Inter',Arial,sans-serif;font-size:10px;font-weight:800;color:${b.mutedTextColor};letter-spacing:0.15em;text-transform:uppercase;">Respuestas rápidas / Quick replies</p>
          <p style="margin:0;font-family:'Inter',Arial,sans-serif;font-size:14px;line-height:1.9;">
            <a href="${onTheWayUrl}" style="color:${b.textColor};text-decoration:none;font-weight:600;border-bottom:1px solid ${YELLOW};padding-bottom:2px;">→ En camino / On the way</a>
            <span style="display:inline-block;width:18px;"></span>
            <a href="${quoteUrl}" style="color:${b.textColor};text-decoration:none;font-weight:600;border-bottom:1px solid ${YELLOW};padding-bottom:2px;">→ Enviar cotización / Send quote</a>
          </p>
        </div>

      </td></tr>

      <!-- Yellow caution stripe -->
      <tr><td style="height:6px;background:repeating-linear-gradient(135deg, ${YELLOW} 0 14px, ${b.cardColor} 14px 28px);font-size:0;line-height:0;">&nbsp;</td></tr>

      <!-- Footer -->
      <tr><td align="center" style="padding:26px 12px 0 12px;">
        ${footer(b)}
      </td></tr>

    </table>
  </td></tr>
</table>
${buildClose()}`;
}

/* ============================================================
 * CUSTOMER CONFIRMATION (Spanish primary, English subtitle)
 * ============================================================ */

export function buildFamilyTransportCustomerEmail(
  site: SiteConfig,
  details: LeadDetails
): string {
  const b = site.brand;
  const preheader = `Recibimos tu solicitud — ${site.businessName} te contactará pronto. / We received your request.`;
  const title = `Recibimos tu solicitud • ${site.businessName}`;
  const head = buildHead(title, preheader, b);

  const supportTel = formatPhoneForTel(site.supportPhone || "");
  const supportWa = buildWhatsAppUrl(
    site.whatsappNumber || "",
    `Hola, soy ${details.rawName}. Acabo de enviar una solicitud (${details.leadId}) y quisiera dar seguimiento.`
  );

  return `${head}
<table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:${b.backgroundColor};font-family:'Inter',Helvetica,Arial,sans-serif;">
  <tr><td align="center" style="padding:24px 12px 40px 12px;">
    <table role="presentation" class="container" width="640" border="0" cellspacing="0" cellpadding="0" style="max-width:640px;width:100%;">

      <!-- Yellow caution stripe -->
      <tr><td style="height:6px;background:repeating-linear-gradient(135deg, ${YELLOW} 0 14px, ${b.cardColor} 14px 28px);font-size:0;line-height:0;">&nbsp;</td></tr>

      <tr><td style="background-color:${b.primaryColor};padding:32px 24px;text-align:center;border-bottom:4px solid ${b.accentColor};">
        ${b.logoUrl ? `<img src="${b.logoUrl}" alt="${site.businessName}" style="max-width:120px;height:auto;display:block;margin:0 auto;">` : ""}
        <p style="color:${b.mutedTextColor};margin:14px 0 0 0;font-family:'Inter',Arial,sans-serif;font-size:12px;letter-spacing:0.06em;line-height:1.4;">
          ${b.tagline}<br><span style="opacity:0.6;font-size:11px;">Fast, direct and reliable roadside assistance.</span>
        </p>
      </td></tr>

      <tr><td style="background-color:${b.cardColor};padding:38px 32px;" class="px-m py-m">

        <div style="margin-bottom:18px;">
          ${renderBadge({ label: "Solicitud Recibida / Received", bg: b.accentColor, fg: "#FFFFFF" })}
        </div>

        <h1 style="margin:0 0 12px 0;font-family:'Inter',Arial,sans-serif;color:${b.textColor};font-size:26px;line-height:1.2;font-weight:700;letter-spacing:-0.01em;">
          Recibimos tu solicitud, ${details.safeName}.
        </h1>
        <p style="margin:0 0 24px 0;font-family:'Inter',Arial,sans-serif;color:${b.mutedTextColor};font-size:15px;line-height:1.65;">
          Gracias por contactar a <strong style="color:${b.textColor};font-weight:600;">${site.businessName}</strong>. Nuestro equipo está revisando los detalles y te contactará a la brevedad.
          <br><br>
          <span style="opacity:0.7;font-size:13px;">Thank you for contacting ${site.businessName}. Our team is reviewing your request and will reach out shortly.</span>
        </p>

        <!-- Reference -->
        <p style="margin:0 0 24px 0;padding:14px 18px;background-color:${b.secondaryColor};border:1px solid ${b.borderColor};border-radius:10px;font-family:'SF Mono','Menlo','Consolas',monospace;font-size:13px;color:${b.mutedTextColor};">
          <span style="opacity:0.7;">Referencia / Reference&nbsp;</span><strong style="color:${YELLOW};font-weight:700;">${details.leadId}</strong>
        </p>

        <!-- Summary -->
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:${b.secondaryColor};border:1px solid ${b.borderColor};border-radius:10px;margin-bottom:30px;">
          <tr><td style="padding:6px 20px 18px 20px;">
            <p style="margin:18px 0 8px 0;font-family:'Inter',Arial,sans-serif;color:${YELLOW};font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:0.15em;">Resumen de tu mensaje / Message summary</p>
            <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
              ${ftInfoRow(b, "Nombre / Name", details.safeName)}
              ${ftInfoRow(b, "Email", details.safeEmail)}
              ${details.safePhone !== "N/A" ? ftInfoRow(b, "Teléfono / Phone", details.safePhone) : ""}
              ${details.safeService !== "N/A" ? ftInfoRow(b, "Servicio / Service", details.safeService) : ""}
            </table>
            <p style="margin:14px 0 0 0;font-family:'Inter',Arial,sans-serif;color:${b.textColor};font-size:14px;line-height:1.65;font-style:italic;white-space:pre-wrap;">"${details.safeMessage}"</p>
          </td></tr>
        </table>

        <!-- Steps -->
        <p style="margin:0 0 16px 0;font-family:'Inter',Arial,sans-serif;font-size:11px;font-weight:800;color:${YELLOW};text-transform:uppercase;letter-spacing:0.15em;">Próximos pasos / Next steps</p>
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin:0 0 30px 0;">
          ${ftStepRow(b, "1", "Revisamos tu solicitud", "We review your request", "Confirmamos los detalles del servicio y ubicación.")}
          ${ftStepRow(b, "2", "Coordinamos la asistencia", "We coordinate assistance", "Te contactamos para confirmar tiempo de llegada y cotización.")}
          ${ftStepRow(b, "3", "Llegamos a ti", "We arrive on-site", "Nuestro operador te asiste de forma rápida y segura.")}
        </table>

        <!-- Emergency CTA -->
        ${supportTel || supportWa ? `
        <div style="margin:0 0 16px 0;padding:18px 20px;background:linear-gradient(135deg, ${b.accentColor}22 0%, ${b.secondaryColor} 100%);background-color:${b.secondaryColor};border:1px solid ${b.accentColor}55;border-radius:12px;">
          <p style="margin:0 0 12px 0;font-family:'Inter',Arial,sans-serif;font-size:11px;font-weight:800;color:${b.accentColor};letter-spacing:0.12em;text-transform:uppercase;">¿Emergencia? / Emergency?</p>
          <p style="margin:0 0 14px 0;font-family:'Inter',Arial,sans-serif;font-size:14px;color:${b.textColor};line-height:1.55;">
            Para asistencia inmediata, contáctanos directamente.<br>
            <span style="opacity:0.7;font-size:13px;">For immediate help, reach us directly.</span>
          </p>
          <table role="presentation" border="0" cellspacing="0" cellpadding="0">
            <tr>
              ${supportTel ? `<td style="padding-right:8px;">${buildButton({ href: `tel:${supportTel}`, label: `📞 ${site.displayPhone || "LLAMAR"}`, bg: b.accentColor, fg: "#FFFFFF", width: 180 })}</td>` : ""}
              ${supportWa ? `<td>${buildButton({ href: supportWa, label: "💬 WHATSAPP", bg: "#25D366", fg: "#FFFFFF", width: 150 })}</td>` : ""}
            </tr>
          </table>
        </div>` : ""}

      </td></tr>

      <tr><td style="height:6px;background:repeating-linear-gradient(135deg, ${YELLOW} 0 14px, ${b.cardColor} 14px 28px);font-size:0;line-height:0;">&nbsp;</td></tr>

      <tr><td align="center" style="padding:26px 12px 0 12px;">${footer(b)}</td></tr>

    </table>
  </td></tr>
</table>
${buildClose()}`;
}

/* ============================================================
 * INTERNAL HELPERS
 * ============================================================ */

function ftInfoRow(
  b: SiteConfig["brand"],
  label: string,
  value: string
): string {
  return `<tr>
    <td class="info-l" style="padding:10px 0;font-family:'Inter',Arial,sans-serif;color:${b.mutedTextColor};font-size:12px;line-height:1.5;width:38%;border-bottom:1px solid ${b.borderColor};letter-spacing:0.04em;">
      ${label}
    </td>
    <td class="info-v" style="padding:10px 0;font-family:'Inter',Arial,sans-serif;color:${b.textColor};font-size:14px;line-height:1.5;font-weight:500;border-bottom:1px solid ${b.borderColor};">
      ${value}
    </td>
  </tr>`;
}

function ftStepRow(
  b: SiteConfig["brand"],
  num: string,
  titleEs: string,
  titleEn: string,
  desc: string
): string {
  return `<tr>
    <td width="40" valign="top" style="padding:0 0 18px 0;">
      <div style="display:inline-block;width:30px;height:30px;line-height:30px;text-align:center;background:${b.accentColor};color:#FFFFFF;border-radius:50%;font-family:'Inter',Arial,sans-serif;font-weight:700;font-size:13px;">${num}</div>
    </td>
    <td valign="top" style="padding:0 0 18px 14px;">
      <p style="margin:0 0 2px 0;font-family:'Inter',Arial,sans-serif;font-size:15px;font-weight:700;color:${b.textColor};">${titleEs} <span style="opacity:0.5;font-size:12px;font-weight:500;">/ ${titleEn}</span></p>
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

import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = process.env.FROM_EMAIL || 'leads@notifications.abeevis.com';

interface BrandConfig {
  theme: "studio" | "roadside" | "industrial";
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  cardColor: string;
  textColor: string;
  mutedTextColor: string;
  borderColor: string;
  logoUrl?: string;
  logoStyle: "image" | "text" | "banner";
  logoText?: string;
  websiteUrl: string;
  tagline: string;
  eyebrow?: string;
  ctaLabel?: string;
}

interface SiteConfig {
  businessName: string;
  recipientEmail: string;
  allowedOrigins: string[];
  servicesLabel: string;
  brand: BrandConfig;
}

// Server-side config for approved sites
const SITES: Record<string, SiteConfig> = {
  "abeevis": {
    businessName: "Abeevis",
    recipientEmail: process.env.ABEEVIS_EMAIL || process.env.AGENCY_EMAIL || '',
    allowedOrigins: [
      "https://abeevis.com",
      "https://www.abeevis.com"
    ],
    servicesLabel: "Service Requested",
    brand: {
      theme: "studio",
      primaryColor: "#2B2B2B",
      secondaryColor: "#F8F5EF",
      accentColor: "#8A5A18",
      backgroundColor: "#F7F3EA",
      cardColor: "#FFFFFF",
      textColor: "#2B2B2B",
      mutedTextColor: "#6B665E",
      borderColor: "#E8DFD2",
      logoStyle: "text",
      logoText: "ABEEVIS",
      websiteUrl: "https://www.abeevis.com",
      tagline: "Digital clarity. Engineered creativity.",
      eyebrow: "ABEEVIS STUDIO",
      ctaLabel: "View Lead"
    }
  },
  "family-transport": {
    businessName: "Family Transport USA",
    recipientEmail: process.env.FAMILY_TRANSPORT_EMAIL || '',
    allowedOrigins: [
      "https://familytransportusa.com",
      "https://www.familytransportusa.com"
    ],
    servicesLabel: "Service Requested",
    brand: {
      theme: "roadside",
      primaryColor: "#090D12",
      secondaryColor: "#111827",
      accentColor: "#EF233C",
      backgroundColor: "#070A0F",
      cardColor: "#10151D",
      textColor: "#FFFFFF",
      mutedTextColor: "#CBD5E1",
      borderColor: "#252B36",
      logoStyle: "image",
      logoUrl: "https://www.abeevis.com/email-assets/family-transport-logo.png",
      websiteUrl: "https://www.familytransportusa.com",
      tagline: "Asistencia vial rápida, directa y confiable.",
      eyebrow: "SOLICITUD DE SERVICIO",
      ctaLabel: "Responder al cliente"
    }
  },
  "vr-enterprise": {
    businessName: "VR Enterprise",
    recipientEmail: process.env.VR_ENTERPRISE_EMAIL || '',
    allowedOrigins: [
      "https://vr-enterprise-sigma.vercel.app"
    ],
    servicesLabel: "Service / Equipment Requested",
    brand: {
      theme: "industrial",
      primaryColor: "#050505",
      secondaryColor: "#111111",
      accentColor: "#FACC15",
      backgroundColor: "#080808",
      cardColor: "#111111",
      textColor: "#FFFFFF",
      mutedTextColor: "#C7C7C7",
      borderColor: "#2A2A2A",
      logoStyle: "image",
      logoUrl: "https://www.abeevis.com/email-assets/vr-enterprise-logo.png",
      websiteUrl: "https://vr-enterprise-sigma.vercel.app",
      tagline: "Infraestructura • Energía • Logística • Tecnología",
      eyebrow: "NUEVA COTIZACIÓN",
      ctaLabel: "Responder solicitud"
    }
  }
};

const escapeHtml = (unsafe: string) => {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

const formatDate = (date: Date) => {
  return date.toLocaleString('en-US', { timeZone: 'America/New_York' });
};

const getEmailAssetUrl = (path: string) => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.abeevis.com";
  const baseUrl = siteUrl.replace(/\/$/, "");
  return `${baseUrl}${path.startsWith("/") ? path : "/" + path}`;
};

const buildThemeHeader = (brand: BrandConfig, businessName: string) => {
  if (brand.theme === 'studio') {
    return `
      <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td align="center" style="padding: 0 20px 12px 20px;">
            <img
              src="${getEmailAssetUrl('/email-assets/abeevis-email-header.png')}"
              width="240"
              alt="Abeevis Studio - Digital Clarity. Engineered Creativity."
              style="
                display: block;
                width: 100%;
                max-width: 240px;
                height: auto;
                border: 0;
                outline: none;
                text-decoration: none;
                margin: 0 auto;
              "
            />
          </td>
        </tr>
      </table>
    `;
  }

  let logoContent = '';
  if (brand.logoStyle === 'text') {
    logoContent = `<h1 style="color: ${brand.textColor}; margin: 0; font-size: 24px; letter-spacing: 0.1em; font-weight: 600;">${brand.logoText || businessName}</h1>`;
  } else if (brand.logoStyle === 'image' && brand.logoUrl) {
    const maxWidth = brand.theme === 'roadside' ? '120px' : (brand.theme === 'industrial' ? '180px' : '200px');
    logoContent = `<img src="${brand.logoUrl}" alt="${businessName}" style="max-width: ${maxWidth}; height: auto; display: block; margin: 0 auto;" />`;
  }

  let headerStyle = '';
  if (brand.theme === 'roadside') {
    headerStyle = `background-color: ${brand.primaryColor}; padding: 30px 40px; text-align: center; border-bottom: 4px solid ${brand.accentColor};`;
  } else if (brand.theme === 'industrial') {
    headerStyle = `background-color: ${brand.primaryColor}; padding: 30px 40px; text-align: center; border-bottom: 4px solid ${brand.accentColor};`;
  } else {
    headerStyle = `background-color: ${brand.cardColor}; padding: 40px 40px 20px; text-align: center; border-bottom: 1px solid ${brand.borderColor};`;
  }

  let taglineStyle = `color: ${brand.mutedTextColor}; margin: 15px 0 0 0; font-size: 13px; letter-spacing: 0.05em;`;

  return `
    <div style="${headerStyle}">
      ${logoContent}
      ${brand.tagline ? `<p style="${taglineStyle}">${brand.tagline}</p>` : ''}
    </div>
  `;
};

const buildPoweredByFooter = (brand: BrandConfig) => {
  const isAbeevis = brand.theme === 'studio';
  const footerColor = brand.mutedTextColor;
  const linkColor = isAbeevis ? brand.accentColor : '#eccd68ff';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.abeevis.com";
  
  const footerContent = `
    <table role="presentation" border="0" cellspacing="0" cellpadding="0" align="center">
      <tr>
        <td align="center" style="padding:0; font-family:Arial, Helvetica, sans-serif;">
          <p style="
            margin:0;
            color:${footerColor};
            font-size:12px;
            line-height:1.6;
            text-decoration:none;
            border:0;
          ">
            Powered by <strong style="color:${brand.textColor}; font-weight:600;">Abeevis</strong>
          </p>

          <p style="
            margin:2px 0 0 0;
            color:${footerColor};
            font-size:12px;
            line-height:1.6;
            text-decoration:none;
            border:0;
          ">
            Website form automation by Abeevis
          </p>

          <a
            href="${siteUrl}"
            target="_blank"
            style="
              display:inline-block;
              margin-top:10px;
              color:${linkColor};
              font-size:12px;
              line-height:1.6;
              font-weight:600;
              text-decoration:none !important;
              border:0 !important;
              outline:none !important;
            "
          >
            www.abeevis.com
          </a>
        </td>
      </tr>
    </table>
  `;

  if (isAbeevis) {
    return footerContent;
  }

  return `
    <div style="margin-top: 40px; padding-top: 24px; border-top: 1px solid ${brand.borderColor}; text-align: center;">
      ${footerContent}
    </div>
  `;
};

const buildEmailLayout = (brand: BrandConfig, businessName: string, content: string) => {
  if (brand.theme === 'studio') {
    return `
      <!doctype html>
      <html>
        <body style="margin:0; padding:0; background-color:${brand.backgroundColor};">
          <div style="display:none; max-height:0; overflow:hidden; opacity:0;">
            We received your request. Abeevis will review your details shortly.
          </div>

          <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:${brand.backgroundColor}; font-family: 'Inter', Helvetica, Arial, sans-serif; min-height: 100vh;">
            <tr>
              <td align="center" style="padding: 28px 12px 34px 12px;">
                <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width:680px; margin:0 auto;">
                  
                  <tr>
                    <td align="center">
                      ${buildThemeHeader(brand, businessName)}
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="
                        background-color:${brand.cardColor};
                        border:1px solid ${brand.borderColor};
                        border-radius:18px;
                        box-shadow:0 18px 50px rgba(43,43,43,0.06);
                      ">
                        <tr>
                          <td style="padding: 42px;">
                            ${content}
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <tr>
                    <td align="center" style="padding-top:24px;">
                      ${buildPoweredByFooter(brand)}
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `;
  }

  return `
    <div style="font-family: 'Inter', Helvetica, Arial, sans-serif; background-color: ${brand.backgroundColor}; padding: 40px 20px; min-height: 100vh;">
      <div style="max-width: 600px; margin: 0 auto; background-color: ${brand.cardColor}; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); border: 1px solid ${brand.borderColor};">
        
        <!-- Header -->
        ${buildThemeHeader(brand, businessName)}

        <!-- Body -->
        <div style="padding: 40px;">
          ${content}
          
          <!-- Footer -->
          ${buildPoweredByFooter(brand)}
        </div>
      </div>
    </div>
  `;
};

const buildInfoRow = (brand: BrandConfig, label: string, value: string) => {
  if (!value || !value.trim()) return "";

  if (brand.theme === 'studio') {
    return `
      <tr>
        <td style="
          padding:10px 0;
          color:${brand.mutedTextColor};
          font-size:13px;
          line-height:1.5;
          width:38%;
          border-bottom:1px solid ${brand.borderColor};
        ">
          ${escapeHtml(label)}
        </td>
        <td style="
          padding:10px 0;
          color:${brand.textColor};
          font-size:14px;
          line-height:1.5;
          font-weight:600;
          border-bottom:1px solid ${brand.borderColor};
        ">
          ${value}
        </td>
      </tr>
    `;
  }
  return `
    <tr>
      <td style="padding: 12px 15px; border-bottom: 1px solid ${brand.borderColor}; color: ${brand.mutedTextColor}; width: 140px; font-weight: 600; font-size: 14px;">${escapeHtml(label)}</td>
      <td style="padding: 12px 15px; border-bottom: 1px solid ${brand.borderColor}; color: ${brand.textColor}; font-size: 14px;">${value}</td>
    </tr>
  `;
};

const buildCtaButton = (brand: BrandConfig, href: string) => {
  let btnStyle = `display: inline-block; background-color: ${brand.accentColor}; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 15px;`;
  
  if (brand.theme === 'industrial') {
    btnStyle += ` color: #000000; border: 1px solid ${brand.accentColor};`;
  } else if (brand.theme === 'studio') {
    btnStyle = `display: inline-block; background-color: ${brand.textColor}; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px; color: #ffffff; letter-spacing: 0.02em;`;
  } else {
    btnStyle += ` color: #ffffff;`;
  }

  return `<a href="${href}" style="${btnStyle}">${brand.ctaLabel || 'Reply to Customer'}</a>`;
};

const buildMessageBox = (brand: BrandConfig, message: string) => {
  let boxStyle = `margin-top: 20px; padding: 24px; background: ${brand.secondaryColor}; border-left: 4px solid ${brand.accentColor}; border-radius: 0 8px 8px 0;`;
  
  if (brand.theme === 'studio') {
    boxStyle = `margin-top: 30px; padding: 28px; background: ${brand.backgroundColor}; border-radius: 8px; border: 1px solid ${brand.borderColor};`;
    return `
      <div style="${boxStyle}">
        <p style="margin: 0 0 12px 0; font-weight: 700; color: ${brand.accentColor}; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em;">Message</p>
        <p style="white-space: pre-wrap; margin: 0; color: ${brand.textColor}; font-size: 15px; line-height: 1.6;">${message}</p>
      </div>
    `;
  }

  return `
    <div style="${boxStyle}">
      <p style="margin: 0 0 10px 0; font-weight: 600; color: ${brand.mutedTextColor}; font-size: 14px;">Message:</p>
      <p style="white-space: pre-wrap; margin: 0; color: ${brand.textColor}; font-size: 15px; line-height: 1.6;">${message}</p>
    </div>
  `;
};

const buildLeadNotificationEmail = (siteConfig: SiteConfig, leadDetails: any) => {
  const { brand, businessName, servicesLabel } = siteConfig;
  const { safeName, safeEmail, safePhone, safeService, safeMessage, safeSourcePage, timestamp } = leadDetails;
  
  const isAbeevis = brand.theme === 'studio';
  const eyebrowText = brand.eyebrow && !isAbeevis ? `<p style="color: ${brand.accentColor}; font-size: 12px; font-weight: 700; letter-spacing: 0.1em; margin: 0 0 10px 0;">${brand.eyebrow}</p>` : '';
  const titleStyle = isAbeevis ? `color: ${brand.textColor}; margin: 0 0 8px 0; font-size: 24px; font-weight: 600; letter-spacing: -0.01em;` : `color: ${brand.textColor}; margin: 0 0 24px 0; font-size: 22px;`;
  const subtitleText = isAbeevis ? `<p style="color: ${brand.mutedTextColor}; font-size: 15px; margin: 0 0 32px 0;">A new lead has submitted a request on the website.</p>` : '';

  const tableStyle = isAbeevis 
    ? `width: 100%; border-collapse: collapse; margin-bottom: 10px; border-radius: 8px; overflow: hidden;`
    : `width: 100%; border-collapse: collapse; margin-bottom: 30px; background-color: ${brand.secondaryColor}; border-radius: 8px; overflow: hidden; border: 1px solid ${brand.borderColor};`;

  const content = `
    ${eyebrowText}
    <h2 style="${titleStyle}">New Website Lead</h2>
    ${subtitleText}
    
    <table style="${tableStyle}">
      ${buildInfoRow(brand, 'Name', safeName)}
      ${buildInfoRow(brand, 'Email', `<a href="mailto:${safeEmail}" style="color: ${isAbeevis ? brand.textColor : brand.accentColor}; text-decoration: ${isAbeevis ? 'underline' : 'none'}; font-weight: 500;">${safeEmail}</a>`)}
      ${buildInfoRow(brand, 'Phone', safePhone)}
      ${buildInfoRow(brand, servicesLabel, safeService)}
      ${buildInfoRow(brand, 'Source', safeSourcePage)}
      ${buildInfoRow(brand, 'Time', timestamp)}
    </table>

    ${buildMessageBox(brand, safeMessage)}

    <div style="margin-top: 40px; text-align: center;">
      ${buildCtaButton(brand, `mailto:${safeEmail}`)}
      <p style="margin-top: 16px; font-size: 13px; color: ${brand.mutedTextColor};">Replying to this email will reply directly to the customer.</p>
    </div>
  `;

  return buildEmailLayout(brand, businessName, content);
};

const buildSummaryCard = (brand: BrandConfig, fields: Array<{ label: string; value: string }>) => {
  const rows = fields
    .map((field) => buildInfoRow(brand, field.label, field.value))
    .join("");

  if (!rows.trim()) return "";

  return `
    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="
      background-color:#F9F4EA;
      border:1px solid ${brand.borderColor};
      border-radius:12px;
      margin:28px 0 30px 0;
    ">
      <tr>
        <td style="padding:22px 24px;">
          <p style="
            margin:0 0 10px 0;
            color:${brand.accentColor};
            font-size:11px;
            font-weight:700;
            text-transform:uppercase;
            letter-spacing:0.12em;
          ">
            Your Message Summary
          </p>

          <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
            ${rows}
          </table>
        </td>
      </tr>
    </table>
  `;
};

const buildCustomerConfirmationEmail = (siteConfig: SiteConfig, leadDetails: any) => {
  const { brand, businessName } = siteConfig;
  const { safeName, safeEmail, safePhone, safeMessage, safeService } = leadDetails;

  const summaryFields = [
    { label: "Name", value: safeName },
    { label: "Email", value: safeEmail },
    { label: "Phone", value: safePhone !== "N/A" ? safePhone : "" },
    { label: siteConfig.servicesLabel, value: safeService !== "N/A" ? safeService : "" },
    { label: "Message", value: safeMessage }
  ].filter(f => f.value);

  const content = `
    <h2 style="color: ${brand.textColor}; margin: 0 0 24px 0; font-size: 22px; font-weight: 600; letter-spacing: -0.01em;">We received your request</h2>
    
    <p style="color: ${brand.textColor}; font-size: 15px; line-height: 1.6; margin: 0 0 16px 0;">Hi ${safeName},</p>
    
    <p style="color: ${brand.mutedTextColor}; font-size: 15px; line-height: 1.6; margin: 0 0 32px 0;">Thank you for reaching out! We wanted to let you know that we have received your recent request. Our team is already reviewing your details.</p>
    
    ${brand.theme === 'studio' ? buildSummaryCard(brand, summaryFields) : `
      <div style="padding: 20px; background-color: ${brand.secondaryColor}; border-radius: 8px; border: 1px solid ${brand.borderColor}; margin-bottom: 30px;">
        <p style="margin: 0 0 10px 0; font-size: 13px; font-weight: 600; color: ${brand.mutedTextColor}; text-transform: uppercase; letter-spacing: 0.05em;">Your Message Summary</p>
        <p style="white-space: pre-wrap; margin: 0; color: ${brand.textColor}; font-size: 14px; font-style: italic;">"${safeMessage}"</p>
      </div>
    `}

    ${brand.theme === 'studio' ? `
      <div style="margin-bottom: 35px;">
        <p style="margin: 0 0 16px 0; font-size: 13px; font-weight: 700; color: ${brand.textColor}; text-transform: uppercase; letter-spacing: 0.05em;">What happens next?</p>
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin: 0;">
          <tr>
            <td width="24" valign="top" style="color: ${brand.accentColor}; font-weight: 600; font-size: 14px; padding-bottom: 12px;">1.</td>
            <td valign="top" style="color: ${brand.mutedTextColor}; font-size: 14px; line-height: 1.5; padding-bottom: 12px;">We review your request</td>
          </tr>
          <tr>
            <td width="24" valign="top" style="color: ${brand.accentColor}; font-weight: 600; font-size: 14px; padding-bottom: 12px;">2.</td>
            <td valign="top" style="color: ${brand.mutedTextColor}; font-size: 14px; line-height: 1.5; padding-bottom: 12px;">We prepare a solution based on your needs</td>
          </tr>
          <tr>
            <td width="24" valign="top" style="color: ${brand.accentColor}; font-weight: 600; font-size: 14px; padding-bottom: 12px;">3.</td>
            <td valign="top" style="color: ${brand.mutedTextColor}; font-size: 14px; line-height: 1.5; padding-bottom: 12px;">We contact you with the next step</td>
          </tr>
        </table>
      </div>
    ` : ''}

    <p style="color: ${brand.mutedTextColor}; font-size: 15px; line-height: 1.6; margin: 0;">
      Best regards,<br/>
      <strong style="color: ${brand.textColor};">${businessName}</strong>
    </p>
  `;

  return buildEmailLayout(brand, businessName, content);
};

// Simple in-memory rate limiting (Note: resets on serverless cold starts)
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_MAX = 5; // max 5 requests per window
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute window

function getCorsHeaders(origin: string | null, siteConfig?: SiteConfig) {
  let allowedOrigin = '';
  
  if (origin) {
    const isLocalhost = process.env.NODE_ENV !== 'production' && /^https?:\/\/localhost:(3000|5173|8080)$/.test(origin);
    const isAllowed = siteConfig?.allowedOrigins.includes(origin) || isLocalhost;
    
    if (isAllowed) {
      allowedOrigin = origin;
    }
  }

  return {
    'Access-Control-Allow-Origin': allowedOrigin || (process.env.NODE_ENV !== 'production' ? '*' : ''),
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

export async function OPTIONS(req: NextRequest) {
  // Try to determine the origin. For OPTIONS we might not have the siteId yet unless they put it in headers,
  // but generally browsers just send Origin.
  const origin = req.headers.get('origin');
  
  // To respond to CORS preflight without siteId, we have to allow known origins or fallback to a general logic
  const allAllowedOrigins = Object.values(SITES).flatMap(s => s.allowedOrigins);
  const isLocalhost = process.env.NODE_ENV !== 'production' && origin && /^https?:\/\/localhost:(3000|5173|8080)$/.test(origin);
  
  const isAllowedOrigin = origin && (allAllowedOrigins.includes(origin) || isLocalhost);
  
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': isAllowedOrigin ? origin : '',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    const origin = req.headers.get('origin');
    const ip = req.headers.get('x-forwarded-for') || 'unknown';

    // Rate Limiting check
    const now = Date.now();
    const rateData = rateLimitMap.get(ip) || { count: 0, lastReset: now };
    
    if (now - rateData.lastReset > RATE_LIMIT_WINDOW_MS) {
      rateData.count = 1;
      rateData.lastReset = now;
    } else {
      rateData.count++;
      if (rateData.count > RATE_LIMIT_MAX) {
        return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
      }
    }
    rateLimitMap.set(ip, rateData);

    // Parse Body
    const body = await req.json();
    const { siteId, name, email, phone, service, message, sourcePage, companyWebsite } = body;

    // Reject unknown siteIds
    if (!siteId || !SITES[siteId]) {
      return NextResponse.json({ error: "Invalid or missing siteId" }, { status: 400 });
    }

    const siteConfig = SITES[siteId];
    const corsHeaders = getCorsHeaders(origin, siteConfig);

    // CORS Validation
    if (origin && !corsHeaders['Access-Control-Allow-Origin']) {
      return NextResponse.json({ error: "Unauthorized origin" }, { status: 403, headers: corsHeaders });
    }

    // Honeypot Protection
    if (companyWebsite) {
      // Silently return success if honeypot is filled
      return NextResponse.json({ success: true, message: "Message received." }, { status: 200, headers: corsHeaders });
    }

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400, headers: corsHeaders });
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400, headers: corsHeaders });
    }

    if (message.length > 5000) {
      return NextResponse.json({ error: "Message is too long." }, { status: 400, headers: corsHeaders });
    }

    // Sanitize values (basic HTML escaping to prevent XSS in email body)
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = phone ? escapeHtml(phone) : "N/A";
    const safeService = service ? escapeHtml(service) : "N/A";
    const safeMessage = escapeHtml(message);
    const safeSourcePage = sourcePage ? escapeHtml(sourcePage) : "N/A";

    const timestamp = formatDate(new Date());
    const leadDetails = { safeName, safeEmail, safePhone, safeService, safeMessage, safeSourcePage, timestamp };

    // Construct Email to Client
    const bccList = process.env.AGENCY_EMAIL ? [process.env.AGENCY_EMAIL] : undefined;
    
    const clientEmailData = {
      from: `${siteConfig.businessName} Leads via Abeevis <${FROM_EMAIL}>`,
      to: [siteConfig.recipientEmail],
      bcc: bccList,
      replyTo: safeEmail,
      subject: `New Website Lead - ${siteConfig.businessName}`,
      html: buildLeadNotificationEmail(siteConfig, leadDetails)
    };

    const { error: resendError } = await resend.emails.send(clientEmailData);

    if (resendError) {
      console.error("Resend Error (Client):", resendError);
      return NextResponse.json({ error: "Failed to send notification email." }, { status: 500, headers: corsHeaders });
    }

    // Optional Customer Confirmation Email
    if (process.env.SEND_CUSTOMER_CONFIRMATION === 'true') {
      const customerEmailData = {
        from: `${siteConfig.businessName} via Abeevis <${FROM_EMAIL}>`,
        to: [safeEmail],
        replyTo: siteConfig.recipientEmail,
        subject: `We received your request - ${siteConfig.businessName}`,
        html: buildCustomerConfirmationEmail(siteConfig, leadDetails)
      };

      const { error: customerError } = await resend.emails.send(customerEmailData);
      if (customerError) {
         console.error("Resend Error (Customer):", customerError);
         // Do not fail the whole request if confirmation fails
      }
    }

    return NextResponse.json({ success: true, message: "Lead processed successfully" }, { status: 200, headers: corsHeaders });
  } catch (error) {
    console.error("API Contact Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

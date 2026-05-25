import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = process.env.FROM_EMAIL || 'leads@notifications.abeevis.com';

interface BrandConfig {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  logoUrl: string;
  websiteUrl: string;
  tagline?: string;
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
      primaryColor: "#0B0F19",
      secondaryColor: "#111827",
      accentColor: "#7C3AED",
      backgroundColor: "#F5F7FB",
      logoUrl: "https://www.abeevis.com/email-assets/abeevis-logo.png",
      websiteUrl: "https://www.abeevis.com",
      tagline: "Digital websites, automation, and business systems"
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
      primaryColor: "#C1121F",
      secondaryColor: "#111827",
      accentColor: "#1F2937",
      backgroundColor: "#F3F4F6",
      logoUrl: "https://www.abeevis.com/email-assets/family-transport-logo.png",
      websiteUrl: "https://www.familytransportusa.com",
      tagline: "Roadside assistance and transport services"
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
      primaryColor: "#111827",
      secondaryColor: "#1F2937",
      accentColor: "#F59E0B",
      backgroundColor: "#F4F4F5",
      logoUrl: "https://www.abeevis.com/email-assets/vr-enterprise-logo.png",
      websiteUrl: "https://vr-enterprise-sigma.vercel.app",
      tagline: "Equipment, services, and enterprise solutions"
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

const buildPoweredByFooter = () => `
  <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center;">
    <p style="margin: 0; font-size: 12px; color: #6b7280;">Powered by Abeevis</p>
    <p style="margin: 4px 0 0; font-size: 12px; color: #6b7280;">Website form automation by Abeevis</p>
    <a href="https://www.abeevis.com" style="color: #7C3AED; font-size: 12px; text-decoration: none;">https://www.abeevis.com</a>
  </div>
`;

const buildEmailLayout = (brand: BrandConfig, businessName: string, content: string) => `
  <div style="font-family: 'Inter', Helvetica, Arial, sans-serif; background-color: ${brand.backgroundColor}; padding: 40px 20px; min-height: 100vh;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); border: 1px solid #e5e7eb;">
      
      <!-- Header -->
      <div style="background-color: ${brand.primaryColor}; padding: 30px 40px; text-align: center;">
        ${brand.logoUrl ? 
          `<img src="${brand.logoUrl}" alt="${businessName}" style="max-width: 200px; height: auto; display: block; margin: 0 auto;" />` : 
          `<h1 style="color: #ffffff; margin: 0; font-size: 24px;">${businessName}</h1>`
        }
        ${brand.tagline ? `<p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 14px;">${brand.tagline}</p>` : ''}
      </div>

      <!-- Body -->
      <div style="padding: 40px;">
        ${content}
        
        <!-- Footer -->
        ${buildPoweredByFooter()}
      </div>
    </div>
  </div>
`;

const buildInfoRow = (label: string, value: string) => `
  <tr>
    <td style="padding: 12px 15px; border-bottom: 1px solid #f3f4f6; color: #4b5563; width: 140px; font-weight: 600; font-size: 14px;">${label}</td>
    <td style="padding: 12px 15px; border-bottom: 1px solid #f3f4f6; color: #111827; font-size: 14px;">${value}</td>
  </tr>
`;

const buildLeadNotificationEmail = (siteConfig: SiteConfig, leadDetails: any) => {
  const { brand, businessName, servicesLabel } = siteConfig;
  const { safeName, safeEmail, safePhone, safeService, safeMessage, safeSourcePage, timestamp } = leadDetails;
  
  const content = `
    <h2 style="color: #111827; margin: 0 0 24px 0; font-size: 20px;">New Website Lead</h2>
    
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px; background-color: #f9fafb; border-radius: 8px; overflow: hidden;">
      ${buildInfoRow('Name', safeName)}
      ${buildInfoRow('Email', `<a href="mailto:${safeEmail}" style="color: ${brand.accentColor}; text-decoration: none;">${safeEmail}</a>`)}
      ${buildInfoRow('Phone', safePhone)}
      ${buildInfoRow(servicesLabel, safeService)}
      ${buildInfoRow('Source Page', safeSourcePage)}
      ${buildInfoRow('Submitted', timestamp)}
    </table>

    <div style="margin-top: 20px; padding: 24px; background: #f9fafb; border-left: 4px solid ${brand.accentColor}; border-radius: 0 8px 8px 0;">
      <p style="margin: 0 0 10px 0; font-weight: 600; color: #374151; font-size: 14px;">Message:</p>
      <p style="white-space: pre-wrap; margin: 0; color: #111827; font-size: 15px; line-height: 1.6;">${safeMessage}</p>
    </div>

    <div style="margin-top: 35px; text-align: center;">
      <a href="mailto:${safeEmail}" style="display: inline-block; background-color: ${brand.accentColor}; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 15px;">Reply to Customer</a>
      <p style="margin-top: 15px; font-size: 13px; color: #6b7280;">Replying to this email should reply directly to the customer.</p>
    </div>
  `;

  return buildEmailLayout(brand, businessName, content);
};

const buildCustomerConfirmationEmail = (siteConfig: SiteConfig, leadDetails: any) => {
  const { brand, businessName } = siteConfig;
  const { safeName, safeMessage } = leadDetails;

  const content = `
    <h2 style="color: #111827; margin: 0 0 20px 0; font-size: 20px;">We received your request</h2>
    
    <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 15px 0;">Hi ${safeName},</p>
    
    <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 25px 0;">Thank you for reaching out! We wanted to let you know that we have received your recent request. Our team will review your message and contact you shortly.</p>
    
    <div style="padding: 20px; background-color: #f9fafb; border-radius: 8px; border: 1px solid #f3f4f6; margin-bottom: 30px;">
      <p style="margin: 0 0 10px 0; font-size: 13px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em;">Your Message Summary</p>
      <p style="white-space: pre-wrap; margin: 0; color: #374151; font-size: 14px; font-style: italic;">"${safeMessage}"</p>
    </div>

    <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0;">
      Best regards,<br/>
      <strong style="color: #111827;">${businessName}</strong>
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

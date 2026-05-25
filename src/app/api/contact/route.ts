import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = process.env.FROM_EMAIL || 'leads@notifications.abeevis.com';

interface SiteConfig {
  businessName: string;
  recipientEmail: string;
  allowedOrigins: string[];
  servicesLabel: string;
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
    servicesLabel: "Service Requested"
  },
  "family-transport": {
    businessName: "Family Transport USA",
    recipientEmail: process.env.FAMILY_TRANSPORT_EMAIL || '',
    allowedOrigins: [
      "https://familytransportusa.com",
      "https://www.familytransportusa.com"
    ],
    servicesLabel: "Service Requested"
  },
  "vr-enterprise": {
    businessName: "VR Enterprise",
    recipientEmail: process.env.VR_ENTERPRISE_EMAIL || '',
    allowedOrigins: [
      "https://vr-enterprise-sigma.vercel.app"
    ],
    servicesLabel: "Service / Equipment Requested"
  }
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
    const escapeHtml = (unsafe: string) => {
      return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    };

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = phone ? escapeHtml(phone) : "N/A";
    const safeService = service ? escapeHtml(service) : "N/A";
    const safeMessage = escapeHtml(message);
    const safeSourcePage = sourcePage ? escapeHtml(sourcePage) : "N/A";

    const timestamp = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' });

    // Construct Email to Client
    const bccList = process.env.AGENCY_EMAIL ? [process.env.AGENCY_EMAIL] : undefined;
    
    const clientEmailData = {
      from: `${siteConfig.businessName} Leads via Abeevis <${FROM_EMAIL}>`,
      to: [siteConfig.recipientEmail],
      bcc: bccList,
      replyTo: safeEmail,
      subject: `New Website Lead - ${siteConfig.businessName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <h2 style="color: #111;">New Lead from ${siteConfig.businessName}</h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Name:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${safeName}</td></tr>
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Email:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${safeEmail}</td></tr>
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Phone:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${safePhone}</td></tr>
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>${siteConfig.servicesLabel}:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${safeService}</td></tr>
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Source Page:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${safeSourcePage}</td></tr>
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Submitted:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${timestamp}</td></tr>
          </table>
          <div style="margin-top: 20px; padding: 15px; background: #f9f9f9; border-left: 4px solid #0056b3;">
            <p style="margin: 0;"><strong>Message:</strong></p>
            <p style="white-space: pre-wrap; margin-top: 10px;">${safeMessage}</p>
          </div>
          <p style="margin-top: 30px; font-size: 12px; color: #777; text-align: center;">
            This lead was sent through the Abeevis form hub.
          </p>
        </div>
      `
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
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
            <h2>Hi ${safeName},</h2>
            <p>We wanted to let you know that we have received your recent request. Our team will review your message and contact you shortly.</p>
            <p>Thank you,<br/><strong>${siteConfig.businessName}</strong></p>
          </div>
        `
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

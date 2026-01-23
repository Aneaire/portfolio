import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../convex/_generated/api";

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email, phoneNumber, message } =
      await request.json();

    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { error: "Please fill out all required fields." },
        { status: 400 },
      );
    }

    const zohoEmail = process.env.ZOHO_EMAIL;
    const zohoPassword = process.env.ZOHO_PASSWORD;
    const toEmail = process.env.TO_EMAIL;

    if (!zohoEmail || !zohoPassword || !toEmail) {
      console.error("SMTP configuration missing");
      return NextResponse.json(
        { error: "Email service misconfigured." },
        { status: 500 },
      );
    }

    const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

    await convex.mutation(api.messages.createMessage, {
      firstName,
      lastName,
      email,
      phoneNumber,
      message,
    });

    const transporter = nodemailer.createTransport({
      host: process.env.ZOHO_SMTP_HOST || "smtp.zoho.com",
      port: parseInt(process.env.ZOHO_SMTP_PORT || "465"),
      secure: true,
      auth: {
        user: zohoEmail,
        pass: zohoPassword,
      },
    });

    const htmlBody = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Contact Message</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { 
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: #1e293b; 
              line-height: 1.6; 
              padding: 40px 20px;
            }
            .wrapper {
              max-width: 680px;
              margin: 0 auto;
              background: white;
              border-radius: 24px;
              overflow: hidden;
              box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            }
            .header { 
              background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%);
              padding: 0;
              position: relative;
              overflow: hidden;
              height: 280px;
            }
            .header-bg {
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background-image: 
                radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.15) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
            }
            .header-pattern {
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
            }
            .header-content { 
              position: relative; 
              z-index: 1; 
              padding: 50px 40px;
              text-align: center;
            }
            .pulse-circle {
              width: 80px;
              height: 80px;
              background: rgba(255, 255, 255, 0.2);
              border-radius: 50%;
              margin: 0 auto 20px;
              display: flex;
              align-items: center;
              justify-content: center;
              backdrop-filter: blur(10px);
              border: 2px solid rgba(255, 255, 255, 0.3);
            }
            .pulse-circle svg {
              width: 40px;
              height: 40px;
              color: white;
            }
            .header h1 { 
              color: white; 
              font-size: 32px; 
              font-weight: 800; 
              margin-bottom: 8px;
              letter-spacing: -0.5px;
            }
            .header p { 
              color: rgba(255, 255, 255, 0.95); 
              font-size: 16px; 
              font-weight: 500;
            }
            .badge {
              display: inline-block;
              background: rgba(255, 255, 255, 0.25);
              backdrop-filter: blur(10px);
              color: white;
              padding: 6px 16px;
              border-radius: 20px;
              font-size: 13px;
              font-weight: 600;
              margin-bottom: 16px;
              border: 1px solid rgba(255, 255, 255, 0.3);
            }
            .content { 
              background: white;
              padding: 50px 40px;
            }
            .info-grid { 
              display: grid; 
              gap: 20px; 
              margin-bottom: 35px; 
            }
            .info-item { 
              background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
              padding: 24px; 
              border-radius: 16px;
              border: 1px solid #e2e8f0;
              display: flex;
              align-items: center;
              gap: 20px;
              transition: all 0.3s ease;
            }
            .info-icon { 
              width: 56px; 
              height: 56px; 
              background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
              border-radius: 14px;
              display: flex; 
              align-items: center; 
              justify-content: center;
              flex-shrink: 0;
              box-shadow: 0 4px 12px rgba(99, 102, 241, 0.25);
            }
            .info-icon svg { 
              width: 26px; 
              height: 26px; 
              color: white; 
            }
            .info-content {
              flex: 1;
            }
            .info-label { 
              font-size: 12px; 
              color: #64748b; 
              text-transform: uppercase; 
              letter-spacing: 0.8px; 
              margin-bottom: 6px; 
              font-weight: 600; 
            }
            .info-value { 
              color: #0f172a; 
              font-size: 17px; 
              font-weight: 600; 
              word-break: break-word; 
            }
            .info-value a { 
              color: #6366f1; 
              text-decoration: none; 
            }
            .message-section { 
              margin-top: 35px; 
              background: linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%);
              border-radius: 20px;
              padding: 30px;
              border: 2px solid #e9d5ff;
            }
            .message-label { 
              font-size: 13px; 
              color: #7c3aed; 
              text-transform: uppercase; 
              letter-spacing: 1px; 
              margin-bottom: 16px; 
              font-weight: 700;
              display: flex;
              align-items: center;
              gap: 8px;
            }
            .message-label svg {
              width: 18px;
              height: 18px;
            }
            .message-text { 
              color: #334155; 
              font-size: 16px; 
              line-height: 1.8; 
              font-weight: 500;
            }
            .cta-section {
              text-align: center;
              margin-top: 40px;
              padding-top: 35px;
              border-top: 2px dashed #e2e8f0;
            }
            .reply-btn {
              display: inline-block;
              background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
              color: white;
              text-decoration: none;
              padding: 16px 40px;
              border-radius: 12px;
              font-weight: 700;
              font-size: 15px;
              box-shadow: 0 8px 24px rgba(99, 102, 241, 0.4);
              transition: all 0.3s ease;
            }
            .footer { 
              background: #f8fafc;
              text-align: center; 
              padding: 30px 40px; 
              border-top: 1px solid #e2e8f0;
            }
            .footer p { 
              color: #64748b; 
              font-size: 14px; 
              margin-bottom: 8px;
            }
            .footer a { 
              color: #6366f1; 
              text-decoration: none; 
              font-weight: 600;
            }
            .timestamp {
              display: inline-flex;
              align-items: center;
              gap: 6px;
              background: #f1f5f9;
              padding: 8px 14px;
              border-radius: 8px;
              font-size: 13px;
              color: #64748b;
              margin-top: 12px;
            }
            .timestamp svg {
              width: 14px;
              height: 14px;
            }
          </style>
        </head>
        <body>
          <div class="wrapper">
            <div class="header">
              <div class="header-bg"></div>
              <div class="header-pattern"></div>
              <div class="header-content">
                <div class="badge">🔔 New Contact</div>
                <div class="pulse-circle">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <h1>New Message Received</h1>
                <p>Someone reached out through your portfolio</p>
              </div>
            </div>
            <div class="content">
              <div class="info-grid">
                <div class="info-item">
                  <div class="info-icon">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                  </div>
                  <div class="info-content">
                    <div class="info-label">Contact Name</div>
                    <div class="info-value">${firstName} ${lastName}</div>
                  </div>
                </div>
                <div class="info-item">
                  <div class="info-icon">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <div class="info-content">
                    <div class="info-label">Email Address</div>
                    <div class="info-value"><a href="mailto:${email}">${email}</a></div>
                  </div>
                </div>
                ${
                  phoneNumber
                    ? `
                <div class="info-item">
                  <div class="info-icon">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                  </div>
                  <div class="info-content">
                    <div class="info-label">Phone Number</div>
                    <div class="info-value">${phoneNumber}</div>
                  </div>
                </div>
                `
                    : ""
                }
              </div>
              <div class="message-section">
                <div class="message-label">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
                  </svg>
                  Message Content
                </div>
                <div class="message-text">${message.replace(/\n/g, "<br>")}</div>
              </div>
              <div class="cta-section">
                <a href="mailto:${email}" class="reply-btn">💬 Reply to ${firstName}</a>
                <div class="timestamp">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  ${new Date().toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit", hour12: true })}
                </div>
              </div>
            </div>
            <div class="footer">
              <p><strong>Portfolio Contact Form</strong></p>
              <p><a href="https://angelosantiago.dev">angelosantiago.dev</a></p>
            </div>
          </div>
        </body>
      </html>
    `;

    await transporter.sendMail({
      from: `"Portfolio Contact" <${zohoEmail}>`,
      to: toEmail,
      subject: `✨ New Message from ${firstName} ${lastName}`,
      html: htmlBody,
      replyTo: email,
    });

    const confirmationHtmlBody = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Message Received</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { 
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
              background: linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%);
              color: #1e293b; 
              line-height: 1.6; 
              padding: 40px 20px;
            }
            .wrapper {
              max-width: 680px;
              margin: 0 auto;
              background: white;
              border-radius: 24px;
              overflow: hidden;
              box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            }
            .header {
              background: linear-gradient(135deg, #10b981 0%, #059669 100%);
              padding: 45px 40px;
              text-align: center;
            }
            .header h1 { 
              color: white; 
              font-size: 32px; 
              font-weight: 800; 
              margin-bottom: 8px;
              letter-spacing: -0.5px;
            }
            .header p { 
              color: rgba(255, 255, 255, 0.95); 
              font-size: 16px; 
              font-weight: 500;
            }
            .content { 
              background: white;
              padding: 40px 35px;
            }
            .greeting { 
              font-size: 18px; 
              color: #0f172a; 
              margin-bottom: 14px; 
              font-weight: 700;
            }
            .intro-text {
              font-size: 15px;
              color: #475569;
              margin-bottom: 30px;
              line-height: 1.7;
            }
            .message-recap { 
              background: #f0fdf4;
              border: 1px solid #bbf7d0;
              border-radius: 12px;
              padding: 24px;
              margin: 30px 0;
            }
            .message-label {
              font-size: 12px;
              color: #15803d;
              text-transform: uppercase;
              letter-spacing: 1px;
              margin-bottom: 12px;
              font-weight: 700;
            }
            .message-text { 
              color: #334155; 
              font-size: 14px; 
              line-height: 1.7; 
              font-weight: 400;
            }
            .info-card { 
              background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
              padding: 28px;
              border-radius: 16px;
              border: 2px solid #bfdbfe;
              margin: 30px 0;
              display: flex;
              align-items: center;
              gap: 20px;
            }
            .info-icon {
              width: 60px;
              height: 60px;
              background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
              border-radius: 14px;
              display: flex;
              align-items: center;
              justify-content: center;
              flex-shrink: 0;
              box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
            }
            .info-icon svg {
              width: 30px;
              height: 30px;
              color: white;
            }
            .info-text {
              flex: 1;
            }
            .info-text p { 
              color: #64748b; 
              font-size: 14px; 
              margin-bottom: 6px;
              font-weight: 500;
            }
            .info-text strong { 
              color: #0f172a; 
              font-size: 18px; 
              font-weight: 700;
            }
            .divider { 
              height: 2px; 
              background: linear-gradient(90deg, transparent, #e2e8f0, transparent); 
              margin: 40px 0; 
            }
            .skills-section { 
              margin-top: 35px; 
              background: #f8fafc;
              padding: 30px;
              border-radius: 16px;
              border: 1px solid #e2e8f0;
            }
            .skills-title { 
              color: #0f172a; 
              font-size: 20px; 
              font-weight: 700; 
              margin-bottom: 8px; 
              text-align: center;
            }
            .skills-subtitle {
              color: #64748b;
              font-size: 13px;
              text-align: center;
              margin-bottom: 24px;
            }
            .skills-grid { 
              display: grid; 
              grid-template-columns: repeat(2, 1fr); 
              gap: 16px; 
              margin-bottom: 28px;
            }
            .skill-item { 
              background: white;
              padding: 14px 16px; 
              border-radius: 10px; 
              border: 1px solid #e2e8f0;
              text-align: center;
            }
            .skill-name { 
              color: #334155; 
              font-size: 13px; 
              font-weight: 500; 
            }
            .skills-cta { 
              text-align: center; 
            }
            .skills-cta a { 
              display: inline-block; 
              background: #10b981;
              color: white; 
              text-decoration: none; 
              padding: 12px 28px; 
              border-radius: 10px; 
              font-weight: 600; 
              font-size: 14px;
            }
            .footer-text {
              color: #475569;
              font-size: 15px;
              text-align: center;
              margin-top: 30px;
              line-height: 1.7;
            }
            .footer-text a {
              color: #10b981;
              text-decoration: none;
              font-weight: 600;
            }
            .footer { 
              background: #f8fafc;
              text-align: center; 
              padding: 35px 40px; 
              border-top: 1px solid #e2e8f0;
            }
            .footer p { 
              color: #64748b; 
              font-size: 14px; 
              line-height: 1.8;
            }
            .footer-name {
              color: #0f172a;
              font-size: 18px;
              font-weight: 800;
              margin-top: 8px;
            }
            .social-links {
              margin-top: 20px;
              display: flex;
              justify-content: center;
              gap: 16px;
            }
            .social-link {
              display: inline-flex;
              align-items: center;
              justify-content: center;
              width: 40px;
              height: 40px;
              background: #e2e8f0;
              border-radius: 10px;
              text-decoration: none;
              transition: all 0.3s ease;
            }
          </style>
        </head>
        <body>
          <div class="wrapper">
            <div class="header">
              <h1>Message Received!</h1>
              <p>I'll get back to you very soon</p>
            </div>
            <div class="content">
              <p class="greeting">Hi ${firstName}! 👋</p>
              <p class="intro-text">
                Thank you for reaching out through my portfolio. I've successfully received your message and I'm excited to connect with you. I'll review your message carefully and respond as soon as possible.
              </p>
              
              <div class="message-recap">
                <div class="message-label">Your Message</div>
                <div class="message-text">${message.replace(/\n/g, "<br>")}</div>
              </div>
              
              <div class="divider"></div>
              
              <div class="skills-section">
                <h3 class="skills-title">What I Bring to the Table</h3>
                <p class="skills-subtitle">Technologies & tools I work with daily</p>
                <div class="skills-grid">
                  <div class="skill-item"><span class="skill-name">🤖 AI Automation</span></div>
                  <div class="skill-item"><span class="skill-name">🔄 N8N / Zapier</span></div>
                  <div class="skill-item"><span class="skill-name">⚡ TypeScript</span></div>
                  <div class="skill-item"><span class="skill-name">⚛️ React / Next.js</span></div>
                  <div class="skill-item"><span class="skill-name">🚀 Node.js / Hono</span></div>
                  <div class="skill-item"><span class="skill-name">📱 React Native</span></div>
                  <div class="skill-item"><span class="skill-name">🗄️ PostgreSQL</span></div>
                  <div class="skill-item"><span class="skill-name">🧠 Claude AI</span></div>
                </div>
                <div class="skills-cta">
                  <a href="https://gelo-santiago-dev.vercel.app/skills">View Full Tech Stack →</a>
                </div>
              </div>
              
              <p class="footer-text">
                While you wait, feel free to explore my <a href="https://angelosantiago.dev">portfolio</a>, check out my <a href="https://angelosantiago.dev/projects">recent projects</a>, or connect with me on social media.
              </p>
            </div>
            <div class="footer">
              <p>Best regards,</p>
              <p class="footer-name">Angelo Santiago</p>
              <p style="margin-top: 12px; font-size: 13px;">Full-Stack Developer & AI Automation Specialist</p>
            </div>
          </div>
        </body>
      </html>
    `;

    await transporter.sendMail({
      from: `"Angelo Santiago" <${zohoEmail}>`,
      to: email,
      subject: "✅ Message Received - I'll be in touch soon!",
      html: confirmationHtmlBody,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email sending error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 },
    );
  }
}

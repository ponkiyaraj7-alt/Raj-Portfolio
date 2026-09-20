import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, email, phone, service, timeline, budget, message } = data;

    // Log the inquiry on server
    console.log(`[QUOTE INQUIRY RECEIVED] from ${name} (${email}) for ${service}`);

    // If Gmail App Password / SMTP is configured in .env.local, send direct email immediately
    const gmailUser = process.env.GMAIL_USER || process.env.SMTP_USER || "ponkiyaraj7@gmail.com";
    const gmailPass = process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASS;

    let emailSent = false;
    if (gmailPass) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: gmailUser,
          pass: gmailPass,
        },
      });

      const htmlContent = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
          <div style="background: #2d6a4f; padding: 24px; color: #ffffff;">
            <h2 style="margin: 0; font-size: 20px;">New Project Inquiry</h2>
            <p style="margin: 4px 0 0; opacity: 0.85; font-size: 14px;">Delivered directly from Raj Portfolio Quote System</p>
          </div>
          <div style="padding: 24px;">
            <h3 style="margin-top: 0; color: #1e293b; font-size: 16px; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px;">Client Information</h3>
            <p style="margin: 8px 0; font-size: 14px; color: #334155;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 8px 0; font-size: 14px; color: #334155;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #2d6a4f; text-decoration: none;">${email}</a></p>
            <p style="margin: 8px 0; font-size: 14px; color: #334155;"><strong>Phone:</strong> ${phone || "Not provided"}</p>

            <h3 style="margin-top: 20px; color: #1e293b; font-size: 16px; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px;">Project Requirements</h3>
            <p style="margin: 8px 0; font-size: 14px; color: #334155;"><strong>Service Category:</strong> ${service}</p>
            <p style="margin: 8px 0; font-size: 14px; color: #334155;"><strong>Timeline:</strong> ${timeline}</p>
            <p style="margin: 8px 0; font-size: 14px; color: #334155;"><strong>Budget:</strong> ${budget}</p>

            <h3 style="margin-top: 20px; color: #1e293b; font-size: 16px; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px;">Project Scope & Message</h3>
            <div style="background: #f8fafc; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0; font-size: 14px; line-height: 1.6; color: #1e293b; white-space: pre-wrap;">
              ${message}
            </div>

            <div style="margin-top: 24px; text-align: center;">
              <a href="mailto:${email}?subject=${encodeURIComponent(`Re: Project Inquiry (${service})`)}" style="display: inline-block; background: #2d6a4f; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">
                Reply Directly to ${name}
              </a>
            </div>
          </div>
          <div style="background: #f8fafc; padding: 12px 24px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; text-align: center;">
            Raj Ponkiya • Associate AI Developer & Automation Engineer
          </div>
        </div>
      `;

      await transporter.sendMail({
        from: `"${name} (Portfolio)" <${gmailUser}>`,
        to: "ponkiyaraj7@gmail.com",
        replyTo: email,
        subject: `New Project Inquiry: ${service} from ${name}`,
        html: htmlContent,
      });

      emailSent = true;
      console.log(`[DIRECT EMAIL SENT] Successfully sent email notification to ponkiyaraj7@gmail.com`);
    }

    return NextResponse.json({
      success: true,
      emailSent,
      message: "Inquiry registered successfully",
    });
  } catch (error: any) {
    console.error("[QUOTE API ERROR]", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}

import nodemailer from "nodemailer";

/**
 * Email sending via Gmail SMTP (App Password).
 * Env: SMTP_USER (Gmail address), SMTP_PASS (16-char App Password).
 * Returns false when not configured — callers must handle gracefully.
 */
function getTransport() {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!user || !pass) return null;
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT || "465", 10),
    secure: true,
    auth: { user, pass },
  });
}

export function isEmailConfigured(): boolean {
  return Boolean(process.env.SMTP_USER && process.env.SMTP_PASS);
}

/** Fire-and-forget admin password reset email. Never throws. */
export async function sendAdminResetEmail(to: string, resetUrl: string): Promise<boolean> {
  try {
    const transport = getTransport();
    if (!transport) {
      console.log("reset email skipped: SMTP_USER/SMTP_PASS not set");
      return false;
    }
    const from = process.env.SMTP_USER as string;
    await transport.sendMail({
      from: `USA Attorneys Admin <${from}>`,
      to,
      subject: "Reset your USA Attorneys admin password",
      text:
        `You requested a password reset for your USA Attorneys admin account.\n\n` +
        `Click the link below to set a new password (valid for 1 hour):\n${resetUrl}\n\n` +
        `If you didn't request this, just ignore this email.`,
      html:
        `<p>You requested a password reset for your <strong>USA Attorneys</strong> admin account.</p>` +
        `<p><a href="${resetUrl}" style="display:inline-block;background:#c9a227;color:#14305e;font-weight:700;padding:12px 24px;border-radius:8px;text-decoration:none;">Set a new password</a></p>` +
        `<p style="color:#666;font-size:13px;">This link expires in 1 hour. If you didn't request this, just ignore this email.</p>` +
        `<p style="color:#666;font-size:13px;">Or paste this URL into your browser:<br>${resetUrl}</p>`,
    });
    return true;
  } catch (e) {
    console.error("sendAdminResetEmail failed:", e);
    return false;
  }
}

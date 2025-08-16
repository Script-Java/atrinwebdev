// pages/api/contact.js
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL } = process.env;

  // Config sanity checks
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    return res.status(500).json({
      error: "SMTP not configured. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS in .env.local"
    });
  }

  // Prefer CONTACT_TO_EMAIL, but fall back to SMTP_USER to avoid "No recipients defined"
  const TO = (CONTACT_TO_EMAIL && CONTACT_TO_EMAIL.trim()) || SMTP_USER;

  try {
    const { name, email, message, phone, service } = req.body || {};
    if (!name || !email || !message || !phone || !service) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST || "smtp.zoho.com",               // smtp.zoho.com / .eu / .in
      port: Number(SMTP_PORT || 465),                   // 465 = SSL, 587 = STARTTLS
      secure: Number(SMTP_PORT || 465) === 465,         // true if 465
      auth: { user: SMTP_USER, pass: SMTP_PASS }
    });

    // Zoho requires `from` to be your authenticated mailbox/alias
    const mailOptions = {
      from: SMTP_USER,
      to: TO,                       // ← guaranteed non-empty
      replyTo: email,               // reply goes to the lead
      subject: `New Contact Form: ${name}`,
      text: `
Name: ${name}
Email: ${email}
Phone: ${phone}
Service: ${service}
Message: ${message}
      `.trim(),
      // cc: SMTP_USER,             // optional: keep a copy
      // bcc: "audit@yourdomain.com" // optional: audit mailbox
    };

    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: "Message sent successfully!" });
  } catch (err) {
    console.error("Error sending email:", err);
    // Surface a clearer hint for the common case
    if (String(err?.message || "").includes("No recipients defined")) {
      return res.status(500).json({
        error: "Email destination missing. Set CONTACT_TO_EMAIL in env, or ensure it’s non-empty."
      });
    }
    return res.status(500).json({ error: "Failed to send message." });
  }
}

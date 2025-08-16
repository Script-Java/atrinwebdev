// pages/api/leads.js — Next.js serverless function (Node runtime)
import nodemailer from 'nodemailer';

export const config = { runtime: 'nodejs' };

// simple in-memory rate limit (per IP): 1 submission / 30s
const HITS = new Map();
const WINDOW_MS = 30 * 1000;

const emailRe = /([a-z0-9._%+-]+)@([a-z0-9.-]+)\.([a-z]{2,})/i;
const phoneRe = /(?:\+?1[-.\s]?)?(?:\(?\d{3}\)?[-.\s]?)\d{3}[-.\s]?\d{4}\b/;

function normalizePhoneUS(s = '') {
  const digits = (s.match(/\d/g) || []).join('');
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith('1')) return `+${digits}`;
  return s.trim();
}
function escapeHtml(s = '') {
  return s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Use POST' });

  // Basic CORS for same-site (adjust if you post from another domain)
  res.setHeader('Content-Type', 'application/json');

  try {
    // Rate limit by IP
    const ip = (req.headers['x-forwarded-for'] || '').toString().split(',')[0]?.trim() || req.socket.remoteAddress || 'unknown';
    const now = Date.now();
    const last = HITS.get(ip) || 0;
    if (now - last < WINDOW_MS) return res.status(429).json({ ok: false, error: 'Too many requests, please wait a moment.' });
    HITS.set(ip, now);
    setTimeout(() => HITS.delete(ip), WINDOW_MS + 1000);

    const { name, email, phone, message, source = 'chat-bubble', meta = {}, company = '' } = req.body || {};

    // Honeypot (bots fill hidden "company"):
    if (company) return res.status(200).json({ ok: true }); // silently accept but do nothing

    // Validate required fields
    if (!name || !email || !emailRe.test(String(email))) {
      return res.status(400).json({ ok: false, error: 'Name and a valid email are required.' });
    }

    const clean = {
      name: String(name).trim(),
      email: String(email).trim().toLowerCase(),
      phone: phone ? normalizePhoneUS(String(phone)) : '',
      message: String(message || '').trim(),
      source,
      meta: {
        path: meta?.path || '',
        ua: meta?.ua || '',
        ip
      }
    };

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: Number(process.env.SMTP_PORT || 587) === 465, // true for 465, false otherwise
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    // Owner notification
    const ownerHtml = `
      <div style="font-family:Inter,Arial,sans-serif;line-height:1.6">
        <h2 style="margin:0 0 12px">New Lead from ${escapeHtml(clean.source)}</h2>
        <table style="border-collapse:collapse;width:100%">
          <tr><td style="padding:6px 0;width:140px;color:#666">Name</td><td><strong>${escapeHtml(clean.name)}</strong></td></tr>
          <tr><td style="padding:6px 0;color:#666">Email</td><td><a href="mailto:${clean.email}">${clean.email}</a></td></tr>
          <tr><td style="padding:6px 0;color:#666">Phone</td><td>${clean.phone ? `<a href="tel:${clean.phone}">${clean.phone}</a>` : '—'}</td></tr>
          <tr><td style="padding:6px 0;color:#666">Message</td><td>${escapeHtml(clean.message || '—')}</td></tr>
          <tr><td style="padding:6px 0;color:#666">Page</td><td>${escapeHtml(clean.meta.path || '—')}</td></tr>
          <tr><td style="padding:6px 0;color:#666">User Agent</td><td>${escapeHtml(clean.meta.ua || '—')}</td></tr>
          <tr><td style="padding:6px 0;color:#666">IP (forwarded)</td><td>${escapeHtml(clean.meta.ip || '—')}</td></tr>
        </table>
      </div>
    `;

    await transporter.sendMail({
      from: process.env.SALES_FROM_EMAIL,
      to: process.env.SALES_TO_EMAIL,
      subject: `New Website Lead: ${clean.name} (${clean.source})`,
      text: `Name: ${clean.name}\nEmail: ${clean.email}\nPhone: ${clean.phone || '-'}\nMessage: ${clean.message || '-'}\nPath: ${clean.meta.path || '-'}\nUA: ${clean.meta.ua || '-'}\nIP: ${clean.meta.ip || '-'}`,
      html: ownerHtml
    });

    // Optional auto-acknowledge to the lead
    if (String(process.env.SEND_ACK_TO_LEAD || 'true').toLowerCase() === 'true') {
      await transporter.sendMail({
        from: process.env.SALES_FROM_EMAIL,
        to: clean.email,
        subject: `Thanks ${clean.name} — we got your message`,
        text: `Hi ${clean.name},\n\nThanks for reaching out! A strategist will follow up shortly.\n\n— Atrinwebdev LLC`,
        html: `<p>Hi ${escapeHtml(clean.name)},</p><p>Thanks for reaching out! A strategist will follow up shortly.</p><p>— Atrinwebdev LLC</p>`
      });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('[leads] error:', err);
    return res.status(500).json({ ok: false, error: 'Server error sending email.' });
  }
}

import nodemailer from 'nodemailer'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Very small in-memory rate limit (per serverless instance).
// Helps reduce abuse on free tiers. Not perfect across multiple instances.
const RATE_WINDOW_MS = 60_000
const RATE_MAX = 5
const rateStore = new Map()

function getClientIp(req) {
  const xff = req.headers?.['x-forwarded-for']
  if (typeof xff === 'string' && xff) return xff.split(',')[0].trim()
  const realIp = req.headers?.['x-real-ip']
  if (typeof realIp === 'string' && realIp) return realIp
  return req.socket?.remoteAddress || 'unknown'
}

function isAllowedOrigin(req) {
  const allowed = (process.env.ALLOWED_ORIGINS || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)

  // If not configured, don't block (keeps it easy in dev), but you should set it in production.
  if (allowed.length === 0) return true

  const origin = req.headers?.origin
  if (!origin) return false
  return allowed.includes(origin)
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'Method not allowed' })
    return
  }

  try {
    if (!isAllowedOrigin(req)) {
      res.status(403).json({ ok: false, error: 'Forbidden' })
      return
    }

    const ip = getClientIp(req)
    const now = Date.now()
    const bucket = rateStore.get(ip) || []
    const recent = bucket.filter((t) => now - t < RATE_WINDOW_MS)
    recent.push(now)
    rateStore.set(ip, recent)
    if (recent.length > RATE_MAX) {
      res.status(429).json({ ok: false, error: 'Too many requests' })
      return
    }

    const { name, email, username, pageUrl } = req.body || {}

    // Honeypot (bot trap). UI sends this field empty.
    if (req.body?.company) {
      res.status(200).json({ ok: true })
      return
    }

    if (!name || !String(name).trim()) {
      res.status(400).json({ ok: false, error: 'Name required' })
      return
    }

    if (!email || !String(email).trim()) {
      res.status(400).json({ ok: false, error: 'Email required' })
      return
    }
    if (!EMAIL_RE.test(String(email))) {
      res.status(400).json({ ok: false, error: 'Invalid email' })
      return
    }

    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      res.status(500).json({ ok: false, error: 'Server email is not configured' })
      return
    }

    const to = process.env.SUBSCRIBE_TO_EMAIL || 'dheerajjangid961@gmail.com'

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: String(process.env.SMTP_SECURE || '').toLowerCase() === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    const subject = `New subscriber${username ? ` for ${username}` : ''}`

    const safeUsername = username ? String(username) : ''
    const safePageUrl = pageUrl ? String(pageUrl) : ''

    const text = [
      'New subscription received:',
      `Name: ${String(name)}`,
      `Email: ${String(email)}`,
      safeUsername ? `Profile: ${safeUsername}` : null,
      safePageUrl ? `Page: ${safePageUrl}` : null,
    ]
      .filter(Boolean)
      .join('\n')

    await transporter.sendMail({
      from: process.env.MAIL_FROM || process.env.SMTP_USER,
      to,
      replyTo: String(email),
      subject,
      text,
    })

    res.status(200).json({ ok: true })
  } catch (error) {
    // Avoid leaking secrets in error messages.
    console.error('Subscribe email failed:', error)
    res.status(500).json({ ok: false, error: 'Failed to send email' })
  }
}


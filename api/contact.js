// Serverless endpoint for Vercel / Node environments
// Delivers contact messages directly to darshak123321@gmail.com via Resend

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000 // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5
const ipRequestCounts = new Map()

function isRateLimited(ip) {
  const now = Date.now()
  const record = ipRequestCounts.get(ip)

  if (!record || now > record.resetTime) {
    ipRequestCounts.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS })
    return false
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return true
  }

  record.count += 1
  return false
}

function escapeHtml(str) {
  if (typeof str !== 'string') return ''
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).json({ success: false, error: 'Method not allowed' })
  }

  try {
    const clientIp =
      req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
      req.socket?.remoteAddress ||
      'unknown-ip'

    if (isRateLimited(clientIp)) {
      return res.status(429).json({
        success: false,
        error: 'Too many requests. Please wait a few minutes before trying again.',
      })
    }

    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {}
    const name = typeof body.name === 'string' ? body.name.trim() : ''
    const message = typeof body.message === 'string' ? body.message.trim() : ''

    // Validation
    if (!name || name.length < 1 || name.length > 100) {
      return res.status(400).json({
        success: false,
        error: 'Please enter a valid name (1–100 characters).',
      })
    }

    if (!message || message.length < 5 || message.length > 5000) {
      return res.status(400).json({
        success: false,
        error: 'Please enter a message between 5 and 5,000 characters.',
      })
    }

    const resendApiKey = process.env.RESEND_API_KEY
    if (!resendApiKey) {
      console.warn('[Contact API] RESEND_API_KEY environment variable is not configured.')
      return res.status(503).json({
        success: false,
        error:
          'Email delivery is currently unconfigured on the server. Please set RESEND_API_KEY in your environment variables.',
      })
    }

    const timestamp = new Date().toISOString()
    const formattedDate = new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'full',
      timeStyle: 'long',
    })

    const payload = {
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: ['darshak123321@gmail.com'],
      subject: 'New Portfolio Contact Message',
      text: `New Portfolio Message from ${name}\n\nTime: ${formattedDate} (${timestamp})\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #111; background-color: #ffffff; border: 1px solid #eaeaea; border-radius: 8px;">
          <h2 style="margin-top: 0; font-size: 20px; color: #000; border-bottom: 1px solid #eaeaea; padding-bottom: 12px;">
            New Portfolio Contact Message
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 6px 0; color: #666; width: 80px; font-weight: 500;">From:</td>
              <td style="padding: 6px 0; color: #111; font-weight: 600;">${escapeHtml(name)}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #666; font-weight: 500;">Time:</td>
              <td style="padding: 6px 0; color: #444; font-size: 13px;">${escapeHtml(formattedDate)}</td>
            </tr>
          </table>
          <div style="background-color: #f9f9fb; border-left: 3px solid #111; padding: 16px; border-radius: 4px;">
            <p style="margin: 0; white-space: pre-wrap; font-size: 15px; line-height: 1.6; color: #222;">
              ${escapeHtml(message)}
            </p>
          </div>
          <p style="margin-top: 24px; font-size: 12px; color: #888; border-top: 1px solid #f0f0f0; padding-top: 12px;">
            Delivered securely to darshak123321@gmail.com via Portfolio Contact Service
          </p>
        </div>
      `,
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const errText = await response.text()
      console.error('[Contact API] Resend API error response:', response.status, errText)
      return res.status(502).json({
        success: false,
        error: 'The email provider rejected the delivery request. Please check API key permissions.',
      })
    }

    const data = await response.json()
    return res.status(200).json({
      success: true,
      message: 'Message delivered successfully to darshak123321@gmail.com',
      id: data.id,
    })
  } catch (err) {
    console.error('[Contact API] Internal error:', err)
    return res.status(500).json({
      success: false,
      error: 'An internal error occurred while processing your message. Please try again.',
    })
  }
}

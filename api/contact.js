// Serverless endpoint for Vercel / Node environments
// Delivers contact messages directly to darshak123321@gmail.com via Resend

import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const RATE_LIMIT_WINDOW_SECONDS = 10 * 60 // 10 minutes
const RATE_LIMIT_WINDOW_MS = RATE_LIMIT_WINDOW_SECONDS * 1000
const MAX_REQUESTS_PER_WINDOW = 5

// In-memory fallback for local development or when Upstash Redis is not configured
const inMemoryCounts = new Map()

function isInMemoryRateLimited(ip) {
  const now = Date.now()
  const record = inMemoryCounts.get(ip)

  if (!record || now > record.resetTime) {
    inMemoryCounts.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS })
    return false
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return true
  }

  record.count += 1
  return false
}

// Upstash Redis distributed rate limiter
let upstashLimiter = null
let hasLoggedUpstashNotice = false

function getUpstashLimiter() {
  if (upstashLimiter) return upstashLimiter

  const rawUrl = process.env.UPSTASH_REDIS_REST_URL
  const rawToken = process.env.UPSTASH_REDIS_REST_TOKEN
  const url = typeof rawUrl === 'string' ? rawUrl.trim().replace(/^["'](.*)["']$/, '$1') : ''
  const token = typeof rawToken === 'string' ? rawToken.trim().replace(/^["'](.*)["']$/, '$1') : ''

  if (url && token) {
    try {
      const redis = new Redis({ url, token })
      upstashLimiter = new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(MAX_REQUESTS_PER_WINDOW, `${RATE_LIMIT_WINDOW_SECONDS} s`),
        analytics: false,
        prefix: 'portfolio:contact',
      })
      return upstashLimiter
    } catch (err) {
      console.warn('[Contact API] Failed to initialize Upstash Redis rate limiter:', err.message)
    }
  } else if (!hasLoggedUpstashNotice) {
    hasLoggedUpstashNotice = true
    console.warn(
      '[Contact API] UPSTASH_REDIS_REST_URL/TOKEN environment variables are not configured. Falling back to in-memory rate limiting. Note: Serverless instances do not share memory across lambdas; configure Upstash Redis for distributed rate limiting in production.'
    )
  }

  return null
}

async function checkRateLimit(ip) {
  const limiter = getUpstashLimiter()
  if (limiter) {
    try {
      const result = await limiter.limit(ip)
      return !result.success
    } catch (err) {
      console.warn('[Contact API] Upstash rate limit check failed, falling back to in-memory:', err.message)
      return isInMemoryRateLimited(ip)
    }
  }

  return isInMemoryRateLimited(ip)
}

function getClientIp(req) {
  // 1. Vercel edge sets 'x-real-ip' to the authentic client IP (cannot be spoofed by client)
  const xRealIp = req.headers['x-real-ip']
  if (typeof xRealIp === 'string' && xRealIp.trim()) {
    return xRealIp.trim()
  }

  // 2. Cloudflare connecting IP (if custom domain uses Cloudflare proxy)
  const cfConnectingIp = req.headers['cf-connecting-ip']
  if (typeof cfConnectingIp === 'string' && cfConnectingIp.trim()) {
    return cfConnectingIp.trim()
  }

  // 3. Vercel-specific forwarded-for
  const vercelForwarded = req.headers['x-vercel-forwarded-for']
  if (typeof vercelForwarded === 'string' && vercelForwarded.trim()) {
    const parts = vercelForwarded.split(',').map((p) => p.trim()).filter(Boolean)
    if (parts.length > 0) {
      return parts[parts.length - 1]
    }
  }

  // 4. Standard X-Forwarded-For: use the rightmost entry added by the nearest trusted proxy hop
  // (client can prepend arbitrary IPs to the left)
  const forwarded = req.headers['x-forwarded-for']
  if (typeof forwarded === 'string' && forwarded.trim()) {
    const parts = forwarded.split(',').map((p) => p.trim()).filter(Boolean)
    if (parts.length > 0) {
      return parts[parts.length - 1]
    }
  }

  // 5. Socket remote address for direct Node connections
  return req.socket?.remoteAddress || req.connection?.remoteAddress || '127.0.0.1'
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
    // Attempt to load .env in local Node environments if available
    if (typeof process.loadEnvFile === 'function') {
      try {
        process.loadEnvFile()
      } catch {
        // Fallback gracefully if .env file is not present on disk
      }
    }

    const clientIp = getClientIp(req)
    if (await checkRateLimit(clientIp)) {
      return res.status(429).json({
        success: false,
        error: 'Too many requests. Please wait a few minutes before trying again.',
      })
    }

    // Parse and validate JSON request body explicitly
    let body
    try {
      body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
      if (!body || typeof body !== 'object' || Array.isArray(body)) {
        return res.status(400).json({
          success: false,
          error: 'Invalid JSON request payload.',
        })
      }
    } catch {
      return res.status(400).json({
        success: false,
        error: 'Invalid JSON request payload.',
      })
    }

    const name = typeof body.name === 'string' ? body.name.trim() : ''
    const email = typeof body.email === 'string' ? body.email.trim() : ''
    const message = typeof body.message === 'string' ? body.message.trim() : ''

    // Validation
    if (!name || name.length < 1 || name.length > 100) {
      return res.status(400).json({
        success: false,
        error: 'Please enter a valid name (1–100 characters).',
      })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || email.length > 254 || !emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Please enter a valid email address.',
      })
    }

    if (!message || message.length < 5 || message.length > 5000) {
      return res.status(400).json({
        success: false,
        error: 'Please enter a message between 5 and 5,000 characters.',
      })
    }

    const rawApiKey = process.env.RESEND_API_KEY
    const resendApiKey =
      typeof rawApiKey === 'string'
        ? rawApiKey.trim().replace(/^["'](.*)["']$/, '$1')
        : ''

    if (!resendApiKey) {
      console.warn('[Contact API] RESEND_API_KEY environment variable is not configured.')
      return res.status(503).json({
        success: false,
        error:
          'Email service is not configured. Please set RESEND_API_KEY in your environment to enable real delivery to darshak123321@gmail.com.',
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
      reply_to: email,
      subject: `New Portfolio Message from ${name}`,
      text: `New Portfolio Message from ${name}\nEmail: ${email}\n\nTime: ${formattedDate} (${timestamp})\n\nMessage:\n${message}`,
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
              <td style="padding: 6px 0; color: #666; font-weight: 500;">Email:</td>
              <td style="padding: 6px 0; color: #111;"><a href="mailto:${escapeHtml(email)}" style="color: #0066cc; text-decoration: none;">${escapeHtml(email)}</a></td>
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
            Delivered securely to darshak123321@gmail.com via Portfolio Contact Service · Direct reply goes to ${escapeHtml(email)}
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
        error:
          'Email service rejected delivery request. Please verify RESEND_API_KEY permissions.',
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

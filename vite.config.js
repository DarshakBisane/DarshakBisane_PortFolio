import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'

function escapeHtml(str) {
  if (typeof str !== 'string') return ''
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function contactDevApiPlugin(apiKey) {
  return {
    name: 'contact-dev-api-plugin',
    configureServer(server) {
      server.middlewares.use('/api/contact', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405
          res.setHeader('Content-Type', 'application/json')
          return res.end(JSON.stringify({ success: false, error: 'Method not allowed' }))
        }

        let bodyRaw = ''
        req.on('data', (chunk) => {
          bodyRaw += chunk
        })

        req.on('end', async () => {
          try {
            const body = JSON.parse(bodyRaw || '{}')
            const name = typeof body.name === 'string' ? body.name.trim() : ''
            const message = typeof body.message === 'string' ? body.message.trim() : ''

            if (!name || name.length < 1 || name.length > 100) {
              res.statusCode = 400
              res.setHeader('Content-Type', 'application/json')
              return res.end(
                JSON.stringify({
                  success: false,
                  error: 'Please enter a valid name (1–100 characters).',
                })
              )
            }

            if (!message || message.length < 5 || message.length > 5000) {
              res.statusCode = 400
              res.setHeader('Content-Type', 'application/json')
              return res.end(
                JSON.stringify({
                  success: false,
                  error: 'Please enter a message between 5 and 5,000 characters.',
                })
              )
            }

            const resendApiKey = apiKey || process.env.RESEND_API_KEY
            if (!resendApiKey) {
              res.statusCode = 503
              res.setHeader('Content-Type', 'application/json')
              return res.end(
                JSON.stringify({
                  success: false,
                  error:
                    'Email service is not configured. Please set RESEND_API_KEY in your environment to enable real delivery to darshak123321@gmail.com.',
                })
              )
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

            const apiRes = await fetch('https://api.resend.com/emails', {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${resendApiKey}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(payload),
            })

            if (!apiRes.ok) {
              const _errText = await apiRes.text()
              console.error('[contactDevApiPlugin] Resend API error:', _errText)
              res.statusCode = 502
              res.setHeader('Content-Type', 'application/json')
              return res.end(
                JSON.stringify({
                  success: false,
                  error:
                    'Email service rejected delivery request. Please verify RESEND_API_KEY permissions.',
                })
              )
            }

            const data = await apiRes.json()
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            return res.end(
              JSON.stringify({
                success: true,
                message: 'Message delivered successfully to darshak123321@gmail.com',
                id: data.id,
              })
            )
          } catch (_err) {
            console.error('[contactDevApiPlugin] Internal server error:', _err)
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            return res.end(
              JSON.stringify({
                success: false,
                error: 'Internal server error while processing request.',
              })
            )
          }
        })
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react(), contactDevApiPlugin(env.RESEND_API_KEY)],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  }
})

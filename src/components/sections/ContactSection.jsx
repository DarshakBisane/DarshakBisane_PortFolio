import { Check, Copy, Mail, MapPin, Send } from 'lucide-react'
import { useState } from 'react'
import { GithubIcon, LinkedinIcon, TwitterIcon } from '../icons/SocialIcons'
import './sections.css'

export default function ContactSection() {
  const [copied, setCopied] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const email = 'darshak.bisane@gmail.com'

  const handleCopy = () => {
    navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) return
    setSubmitted(true)
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' })
    }, 1200)
  }

  return (
    <div className="section-wrapper animate-content">
      {/* Centered Editorial Heading */}
      <div className="editorial-section-header">
        <h2 className="editorial-heading">Contact</h2>
      </div>

      <div className="cards-grid-2">
        {/* Left Column: Direct Contact Info & Links */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Quick Contact Card */}
          <div className="liquid-glass-card">
            <h3 style={{ fontSize: '1.05rem', fontWeight: 500, color: 'var(--text-white)', marginBottom: '1rem' }}>
              Direct Reachout
            </h3>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                marginBottom: '1rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <Mail size={16} style={{ color: 'var(--text-white)' }} />
                <span style={{ fontSize: '0.88rem', fontFamily: 'var(--font-mono)', color: 'var(--text-white)' }}>
                  {email}
                </span>
              </div>

              <button
                type="button"
                onClick={handleCopy}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.35rem 0.65rem',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-mono)',
                  background: copied ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.06)',
                  color: 'var(--text-white)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
                aria-label="Copy email address"
              >
                {copied ? (
                  <>
                    <Check size={12} />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={12} />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-midgrey)', fontSize: '0.84rem' }}>
              <MapPin size={15} style={{ color: 'var(--text-lightgrey)' }} />
              <span>Available for Global Remote Opportunities &amp; Research</span>
            </div>
          </div>

          {/* Social Profiles */}
          <div className="liquid-glass-card">
            <h3 style={{ fontSize: '1.05rem', fontWeight: 500, color: 'var(--text-white)', marginBottom: '1rem' }}>
              Profiles &amp; Repositories
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.65rem 0.85rem',
                  borderRadius: '8px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  color: 'var(--text-white)',
                  textDecoration: 'none',
                  transition: 'all 0.15s ease',
                }}
                className="hover-card"
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <GithubIcon size={18} />
                  <span style={{ fontSize: '0.88rem', fontWeight: 400 }}>GitHub</span>
                </div>
                <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-midgrey)' }}>
                  @darshakbisane
                </span>
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.65rem 0.85rem',
                  borderRadius: '8px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  color: 'var(--text-white)',
                  textDecoration: 'none',
                  transition: 'all 0.15s ease',
                }}
                className="hover-card"
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <LinkedinIcon size={18} />
                  <span style={{ fontSize: '0.88rem', fontWeight: 400 }}>LinkedIn</span>
                </div>
                <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-midgrey)' }}>
                  /in/darshak-bisane
                </span>
              </a>

              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.65rem 0.85rem',
                  borderRadius: '8px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  color: 'var(--text-white)',
                  textDecoration: 'none',
                  transition: 'all 0.15s ease',
                }}
                className="hover-card"
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <TwitterIcon size={18} />
                  <span style={{ fontSize: '0.88rem', fontWeight: 400 }}>Twitter / X</span>
                </div>
                <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-midgrey)' }}>
                  @darshak_bisane
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Send Message Form */}
        <div className="liquid-glass-card">
          <h3 style={{ fontSize: '1.05rem', fontWeight: 500, color: 'var(--text-white)', marginBottom: '0.35rem' }}>
            Send a Direct Message
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-midgrey)', marginBottom: '1.25rem' }}>
            Inquiries, research discussions, or engineering roles.
          </p>

          {submitted ? (
            <div
              style={{
                padding: '1.5rem',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: 'var(--text-white)',
                textAlign: 'center',
              }}
            >
              <Check size={28} style={{ margin: '0 auto 0.5rem', color: 'var(--text-white)' }} />
              <h4 style={{ fontSize: '1rem', fontWeight: 500, marginBottom: '0.25rem' }}>Message Sent</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-lightgrey)' }}>
                Thank you for reaching out. I will get back to you promptly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label
                  htmlFor="contact-name"
                  style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-lightgrey)', marginBottom: '0.35rem' }}
                >
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  placeholder="e.g. Alex Turing"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    borderRadius: '8px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#ffffff',
                    fontSize: '0.9rem',
                    outline: 'none',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-lightgrey)', marginBottom: '0.35rem' }}
                >
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  placeholder="alex@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    borderRadius: '8px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#ffffff',
                    fontSize: '0.9rem',
                    outline: 'none',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="contact-msg"
                  style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-lightgrey)', marginBottom: '0.35rem' }}
                >
                  Message
                </label>
                <textarea
                  id="contact-msg"
                  rows={4}
                  required
                  placeholder="Hello Darshak, I came across your portfolio..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    borderRadius: '8px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#ffffff',
                    fontSize: '0.9rem',
                    outline: 'none',
                    fontFamily: 'inherit',
                    resize: 'vertical',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <button
                type="submit"
                className="btn-glass-primary"
                style={{ marginTop: '0.25rem', width: '100%', cursor: 'pointer' }}
              >
                <Send size={15} />
                <span>Send Message</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

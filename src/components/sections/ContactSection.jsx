import { AlertCircle, Check, Loader2, Send } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { GithubIcon, LeetcodeIcon, LinkedinIcon } from '../icons/SocialIcons'
import './sections.css'

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', message: '' })
  const [status, setStatus] = useState('idle') // 'idle' | 'sending' | 'error' | 'success'
  const [errorMessage, setErrorMessage] = useState('')
  const [animationPhase, setAnimationPhase] = useState('idle') // 'idle' | 'collapsing' | 'launching' | 'completed'

  const collapseTimerRef = useRef(null)
  const completionTimerRef = useRef(null)

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (collapseTimerRef.current) clearTimeout(collapseTimerRef.current)
      if (completionTimerRef.current) clearTimeout(completionTimerRef.current)
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const trimmedName = formData.name.trim()
    const trimmedMessage = formData.message.trim()

    if (!trimmedName || !trimmedMessage) {
      setErrorMessage('Please fill in both your name and message.')
      setStatus('error')
      return
    }

    if (trimmedMessage.length < 5) {
      setErrorMessage('Please enter a message with at least 5 characters.')
      setStatus('error')
      return
    }

    setStatus('sending')
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: trimmedName,
          message: trimmedMessage,
        }),
      })

      const data = await response.json().catch(() => null)

      if (response.ok && data?.success) {
        // Backend confirmed email delivery acceptance
        setStatus('success')

        // Check if user prefers reduced motion
        const prefersReducedMotion =
          typeof window !== 'undefined' &&
          window.matchMedia('(prefers-reduced-motion: reduce)').matches

        if (prefersReducedMotion) {
          setAnimationPhase('completed')
          return
        }

        // Phase 1: Form collapses (0 - 0.45s)
        setAnimationPhase('collapsing')

        // Phase 2: Rocket appears and launches across the right edge (0.45s - 2.25s)
        collapseTimerRef.current = setTimeout(() => {
          setAnimationPhase('launching')
        }, 450)

        // Phase 3: Completion card appears (2.35s - 2.7s total)
        completionTimerRef.current = setTimeout(() => {
          setAnimationPhase('completed')
          setFormData({ name: '', message: '' })
        }, 2350)
      } else {
        // Delivery failed or service unconfigured
        setStatus('error')
        setErrorMessage(
          data?.error ||
            'Failed to send message. Please try again or connect directly via LinkedIn or GitHub.'
        )
      }
    } catch {
      setStatus('error')
      setErrorMessage(
        'Network error while reaching the email server. Please check your connection and retry.'
      )
    }
  }

  const handleResetForm = () => {
    setAnimationPhase('idle')
    setStatus('idle')
    setErrorMessage('')
    setFormData({ name: '', message: '' })
  }

  return (
    <div className="section-wrapper animate-content" style={{ width: '100%' }}>
      {/* Centered Editorial Heading */}
      <div className="editorial-section-header">
        <h2 className="editorial-heading">Contact</h2>
        <p className="editorial-subheading">
          Send a direct message or connect through my verified profiles
        </p>
      </div>

      {/* Centered Liquid Glass Contact Stage */}
      <div className="contact-center-container">
        <div className="contact-stage-frame">
          {/* Phase 3: Completion Confirmation */}
          {animationPhase === 'completed' ? (
            <div
              className="liquid-glass-card contact-success-card"
              role="status"
              aria-live="polite"
            >
              <div className="contact-success-icon-frame">
                <Check size={22} className="contact-success-check" />
              </div>

              <h3 className="contact-success-title">Message sent successfully.</h3>

              <p className="contact-success-desc">
                Your message has been delivered to Darshak Bisane. Thank you for reaching out.
              </p>

              <button
                type="button"
                className="contact-new-message-btn"
                onClick={handleResetForm}
              >
                <span>Send Another Message</span>
              </button>
            </div>
          ) : (
            /* Interactive Form (or Collapsing Form in Phase 1) */
            <div
              className={`liquid-glass-card contact-glass-form-card ${
                animationPhase === 'collapsing' ? 'contact-form-collapsing' : ''
              }`}
            >
              <form onSubmit={handleSubmit} className="contact-form-body" noValidate={false}>
                {/* Field 1: Name */}
                <div className="contact-form-field">
                  <label htmlFor="contact-name" className="contact-field-label">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    disabled={status === 'sending' || animationPhase !== 'idle'}
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    className="contact-input"
                    autoComplete="name"
                  />
                </div>

                {/* Field 2: Message */}
                <div className="contact-form-field">
                  <label htmlFor="contact-message" className="contact-field-label">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    required
                    disabled={status === 'sending' || animationPhase !== 'idle'}
                    placeholder="Write your message..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, message: e.target.value }))
                    }
                    className="contact-textarea"
                  />
                </div>

                {/* Error Banner (if submission failed) */}
                {status === 'error' && errorMessage && (
                  <div className="contact-error-banner" role="alert">
                    <AlertCircle size={15} className="contact-error-icon" />
                    <span className="contact-error-text">{errorMessage}</span>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === 'sending' || animationPhase !== 'idle'}
                  className={`contact-submit-btn ${status === 'sending' ? 'is-loading' : ''}`}
                  aria-label={status === 'sending' ? 'Sending message...' : 'Send Message'}
                >
                  {status === 'sending' ? (
                    <>
                      <Loader2 size={16} className="contact-spinner" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send size={15} className="contact-send-icon" />
                    </>
                  )}
                </button>
              </form>
            </div>
          )}

          {/* Phase 2: Rocket Launch Animation */}
          {animationPhase === 'launching' && (
            <div className="rocket-launch-stage" aria-hidden="true">
              <div className="rocket-flight-unit">
                {/* Smoke Trail & Flame */}
                <div className="rocket-exhaust-tail">
                  <span className="smoke-puff p-1" />
                  <span className="smoke-puff p-2" />
                  <span className="smoke-puff p-3" />
                  <span className="smoke-puff p-4" />
                  <span className="rocket-flame-core" />
                </div>

                {/* Aerodynamic Monochrome Rocket */}
                <svg
                  width="54"
                  height="26"
                  viewBox="0 0 54 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="rocket-svg-vehicle"
                >
                  {/* Thruster Nozzle */}
                  <path d="M4 10.5L9 11.5V14.5L4 15.5V10.5Z" fill="#a1a1aa" />
                  <line x1="9" y1="11.5" x2="9" y2="14.5" stroke="#71717a" strokeWidth="1.2" />

                  {/* Fuselage Hull */}
                  <path
                    d="M9 13C13 8 27 7 48 13C27 19 13 18 9 13Z"
                    fill="#ffffff"
                    stroke="#52525b"
                    strokeWidth="1"
                  />

                  {/* Upper Fin */}
                  <path
                    d="M15 9L9 4L19 8L15 9Z"
                    fill="#e4e4e7"
                    stroke="#71717a"
                    strokeWidth="0.75"
                  />

                  {/* Lower Fin */}
                  <path
                    d="M15 17L9 22L19 18L15 17Z"
                    fill="#e4e4e7"
                    stroke="#71717a"
                    strokeWidth="0.75"
                  />

                  {/* Cockpit Porthole */}
                  <circle cx="33" cy="13" r="2.6" fill="#09090b" stroke="#e4e4e7" strokeWidth="1" />
                  <circle cx="33.8" cy="12.2" r="0.8" fill="#ffffff" />

                  {/* Panel Line */}
                  <path
                    d="M22 10.5C24 12 24 14 22 15.5"
                    stroke="#71717a"
                    strokeWidth="0.75"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          )}
        </div>

        {/* Exactly Three Social Icons Directly Below Form */}
        <div className="contact-social-row" aria-label="Personal social profiles">
          {/* 1. GitHub */}
          <a
            href="https://github.com/DarshakBisane"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-social-icon-btn"
            aria-label="GitHub Profile"
            title="GitHub"
          >
            <GithubIcon size={21} />
          </a>

          {/* 2. LinkedIn */}
          <a
            href="https://www.linkedin.com/in/darshak-bisane-181a71339"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-social-icon-btn"
            aria-label="LinkedIn Profile"
            title="LinkedIn"
          >
            <LinkedinIcon size={21} />
          </a>

          {/* 3. LeetCode */}
          <a
            href="https://leetcode.com/u/Darshak_Bisane/"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-social-icon-btn"
            aria-label="LeetCode Profile"
            title="LeetCode"
          >
            <LeetcodeIcon size={21} />
          </a>
        </div>
      </div>
    </div>
  )
}

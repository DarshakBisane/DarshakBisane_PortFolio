import { AlertCircle, Loader2, Send } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import formSuccessData from '../icons/form success.json'
import { GithubIcon, LeetcodeIcon, LinkedinIcon } from '../icons/SocialIcons'
import './sections.css'

let lottiePromise = null
function preloadLottie() {
  if (!lottiePromise) {
    lottiePromise = import('lottie-web/build/player/lottie_light')
  }
  return lottiePromise
}

function SuccessAnimation({ onComplete }) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      onComplete?.()
      return
    }

    let anim = null
    let isCancelled = false

    preloadLottie().then((module) => {
      if (isCancelled || !containerRef.current) return
      const lottie = module.default || module

      anim = lottie.loadAnimation({
        container: containerRef.current,
        renderer: 'svg',
        loop: false,
        autoplay: true,
        animationData: formSuccessData,
      })

      const handleComplete = () => {
        onComplete?.()
      }

      anim.addEventListener('complete', handleComplete)
    })

    return () => {
      isCancelled = true
      if (anim) {
        anim.destroy()
      }
    }
  }, [onComplete])

  return (
    <div
      ref={containerRef}
      className="contact-lottie-container"
      aria-hidden="true"
    />
  )
}

export default function ContactSection() {
  // State machine: 'idle' | 'submitting' | 'form-exiting' | 'success-animation' | 'success-message' | 'success-exiting' | 'form-entering'
  const [formState, setFormState] = useState('idle')
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [errorMessage, setErrorMessage] = useState('')

  const transitionTimerRef = useRef(null)
  const nameInputRef = useRef(null)
  const successHeadingRef = useRef(null)

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current)
    }
  }, [])

  // Accessibility focus management
  useEffect(() => {
    if (formState === 'success-message') {
      successHeadingRef.current?.focus()
    } else if (formState === 'form-entering') {
      nameInputRef.current?.focus()
    }
  }, [formState])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (formState !== 'idle') return

    const trimmedName = formData.name.trim()
    const trimmedEmail = formData.email.trim()
    const trimmedMessage = formData.message.trim()

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      setErrorMessage('Please fill in your name, email, and message.')
      return
    }

    if (trimmedName.length > 100) {
      setErrorMessage('Please enter a valid name (1–100 characters).')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(trimmedEmail) || trimmedEmail.length > 254) {
      setErrorMessage('Please enter a valid email address.')
      return
    }

    if (trimmedMessage.length < 5 || trimmedMessage.length > 5000) {
      setErrorMessage('Please enter a message between 5 and 5,000 characters.')
      return
    }

    setFormState('submitting')
    setErrorMessage('')
    preloadLottie()

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          message: trimmedMessage,
        }),
      })

      const data = await response.json().catch(() => null)

      if (response.ok && data?.success) {
        // Step 2: Form scales out
        setFormState('form-exiting')

        const prefersReducedMotion =
          typeof window !== 'undefined' &&
          window.matchMedia('(prefers-reduced-motion: reduce)').matches

        const exitDuration = prefersReducedMotion ? 50 : 600

        transitionTimerRef.current = setTimeout(() => {
          // Step 3: Play Lottie success animation
          setFormState('success-animation')
        }, exitDuration)
      } else {
        // Delivery failed or service unconfigured
        setFormState('idle')
        setErrorMessage(
          data?.error ||
          'Failed to send message. Please try again or connect directly via LinkedIn or GitHub.'
        )
      }
    } catch {
      setFormState('idle')
      setErrorMessage(
        'Network error while reaching the email server. Please check your connection and retry.'
      )
    }
  }

  const handleAnimationComplete = useCallback(() => {
    // Step 4: Display the success message
    setFormState('success-message')
  }, [])

  const handleResetForm = () => {
    if (formState !== 'success-message') return

    // Step 5: Reactivate the form
    setFormState('success-exiting')

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const exitDuration = prefersReducedMotion ? 50 : 350

    transitionTimerRef.current = setTimeout(() => {
      // Clear inputs
      setFormData({ name: '', email: '', message: '' })
      setErrorMessage('')
      setFormState('form-entering')

      const enterDuration = prefersReducedMotion ? 50 : 450
      transitionTimerRef.current = setTimeout(() => {
        setFormState('idle')
      }, enterDuration)
    }, exitDuration)
  }

  const isFormRendered =
    formState === 'idle' ||
    formState === 'submitting' ||
    formState === 'form-exiting' ||
    formState === 'form-entering'

  const isSuccessRendered =
    formState === 'success-message' || formState === 'success-exiting'

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
          {/* Step 3: JSON Animation Playing */}
          {formState === 'success-animation' && (
            <div className="contact-lottie-stage" aria-label="Sending confirmation animation">
              <SuccessAnimation onComplete={handleAnimationComplete} />
            </div>
          )}

          {/* Step 4: Success Message Card */}
          {isSuccessRendered && (
            <div
              className={`liquid-glass-card contact-success-card ${formState === 'success-exiting'
                  ? 'contact-success-card-exiting'
                  : 'contact-success-card-entering'
                }`}
              role="status"
              aria-live="polite"
            >
              <h3
                className="contact-success-title"
                tabIndex={-1}
                ref={successHeadingRef}
                style={{ outline: 'none' }}
              >
                Message Sent Successfully
              </h3>

              <p className="contact-success-desc">
                Thank you for reaching out. Your message has been sent successfully.
              </p>

              <button
                type="button"
                className="contact-new-message-btn"
                onClick={handleResetForm}
                disabled={formState === 'success-exiting'}
              >
                <span>Send Another Message</span>
              </button>
            </div>
          )}

          {/* Steps 1, 2, 5: Interactive Form */}
          {isFormRendered && (
            <div
              className={`liquid-glass-card contact-glass-form-card ${formState === 'form-exiting'
                  ? 'contact-form-exiting'
                  : formState === 'form-entering'
                    ? 'contact-form-entering'
                    : ''
                }`}
              aria-hidden={formState === 'form-exiting'}
            >
              <form onSubmit={handleSubmit} className="contact-form-body" noValidate={false}>
                {/* Field 1: Name */}
                <div className="contact-form-field">
                  <label htmlFor="contact-name" className="contact-field-label">
                    Name
                  </label>
                  <input
                    ref={nameInputRef}
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    disabled={formState !== 'idle' && formState !== 'form-entering'}
                    placeholder="Your name"
                    value={formData.name}
                    onFocus={preloadLottie}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    className="contact-input"
                    autoComplete="name"
                  />
                </div>

                {/* Field 2: Email */}
                <div className="contact-form-field">
                  <label htmlFor="contact-email" className="contact-field-label">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    disabled={formState !== 'idle' && formState !== 'form-entering'}
                    placeholder="you@example.com"
                    value={formData.email}
                    onFocus={preloadLottie}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    className="contact-input"
                    autoComplete="email"
                  />
                </div>

                {/* Field 3: Message */}
                <div className="contact-form-field">
                  <label htmlFor="contact-message" className="contact-field-label">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    maxLength={5000}
                    required
                    disabled={formState !== 'idle' && formState !== 'form-entering'}
                    placeholder="Write your message..."
                    value={formData.message}
                    onFocus={preloadLottie}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, message: e.target.value }))
                    }
                    className="contact-textarea"
                  />
                </div>

                {/* Error Banner (if submission failed) */}
                {errorMessage && (
                  <div className="contact-error-banner" role="alert">
                    <AlertCircle size={15} className="contact-error-icon" />
                    <span className="contact-error-text">{errorMessage}</span>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={formState !== 'idle'}
                  className={`contact-submit-btn ${formState === 'submitting' ? 'is-loading' : ''}`}
                  aria-label={formState === 'submitting' ? 'Sending message...' : 'Send Message'}
                >
                  {formState === 'submitting' ? (
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

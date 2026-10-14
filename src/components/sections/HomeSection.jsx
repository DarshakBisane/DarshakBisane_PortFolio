import { ArrowDown } from 'lucide-react'
import { useEffect, useRef } from 'react'
import './HomeSection.css'

export default function HomeSection({ onNavigate }) {
  const darshakRef = useRef(null)
  const bisaneRef = useRef(null)
  const roleLabelRef = useRef(null)
  const supportingRef = useRef(null)
  const indicatorRef = useRef(null)
  const rafRef = useRef(null)

  useEffect(() => {
    const updateTransforms = () => {
      const scrollY = window.scrollY
      const vh = window.innerHeight || 800
      const vw = window.innerWidth || 1200

      // Normalized progress over the first viewport scroll transition (0 to 1)
      const progress = Math.min(Math.max(scrollY / vh, 0), 1)

      // Calculate travel distances from actual rendered word widths so both words completely clear viewport edges
      const darshakWidth = darshakRef.current ? darshakRef.current.offsetWidth : vw * 0.4
      const bisaneWidth = bisaneRef.current ? bisaneRef.current.offsetWidth : vw * 0.4
      const travelDistanceDarshak = vw / 2 + darshakWidth + 120
      const travelDistanceBisane = vw / 2 + bisaneWidth + 120

      if (darshakRef.current) {
        // Darshak moves progressively toward the right edge (+X)
        darshakRef.current.style.transform = `translate3d(${-progress * travelDistanceDarshak}px, 0, 0)`
        darshakRef.current.style.opacity = `${Math.max(1 - progress * 1.25, 0)}`
      }

      if (bisaneRef.current) {
        // Bisane moves progressively toward the left edge (-X)
        bisaneRef.current.style.transform = `translate3d(${progress * travelDistanceBisane}px, 0, 0)`
        bisaneRef.current.style.opacity = `${Math.max(1 - progress * 1.25, 0)}`
      }

      if (roleLabelRef.current) {
        roleLabelRef.current.style.opacity = `${Math.max(1 - progress * 2.2, 0)}`
        roleLabelRef.current.style.transform = `translate3d(0, ${-progress * 25}px, 0)`
      }

      if (supportingRef.current) {
        supportingRef.current.style.opacity = `${Math.max(1 - progress * 2.0, 0)}`
        supportingRef.current.style.transform = `translate3d(0, ${-progress * 30}px, 0)`
      }

      if (indicatorRef.current) {
        indicatorRef.current.style.opacity = `${Math.max(1 - progress * 3.0, 0)}`
      }
    }

    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(updateTransforms)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    updateTransforms()

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div className="home-hero-viewport">
      {/* Connected Typographic Composition: Role Label immediately above Name */}
      <div className="home-title-cluster">
        <div ref={roleLabelRef} className="home-role-label">
          AI/ML Engineer
        </div>

        {/* Center: Oversized Darshak Bisane on ONE single horizontal line initially */}
        <div className="home-name-container">
          <h1 className="home-hero-name" aria-label="Darshak Bisane">
            <span ref={darshakRef} className="split-word word-darshak">
              Darshak
            </span>
            <span className="split-word-space">&nbsp;</span>
            <span ref={bisaneRef} className="split-word word-bisane">
              Bisane
            </span>
          </h1>
        </div>
      </div>

      {/* Below Name: Concise Description & Actions */}
      <div ref={supportingRef} className="home-supporting-group">
        <p className="home-hero-desc">
          Building intelligent systems and thoughtful software through machine learning, AI, and engineering.
        </p>

        <div className="home-hero-actions">
          <button
            type="button"
            className="hero-text-link"
            onClick={() => onNavigate('projects')}
            id="hero-explore-projects"
          >
            <span>Explore Projects</span>
            <span className="link-arrow">→</span>
          </button>

          <span className="hero-action-divider" aria-hidden="true">•</span>

          <button
            type="button"
            className="hero-text-link"
            onClick={() => onNavigate('contact')}
            id="hero-get-in-touch"
          >
            <span>Get in Touch</span>
            <span className="link-arrow">→</span>
          </button>
        </div>
      </div>

      {/* Bottom: Anchored SCROLL TO EXPLORE Indicator (Always visible within 100dvh) */}
      <button
        ref={indicatorRef}
        type="button"
        className="home-scroll-hint"
        onClick={() => onNavigate('about')}
        aria-label="Scroll down to About section"
      >
        <span className="scroll-hint-label">Scroll to explore</span>
        <ArrowDown size={14} className="scroll-hint-icon" />
      </button>
    </div>
  )
}

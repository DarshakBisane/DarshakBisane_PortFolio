import { useEffect, useRef } from 'react'
import mePhoto from '../../assets/Me.jpeg'
import './sections.css'

export default function AboutSection() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const profileRef = useRef(null)
  const p1WrapperRef = useRef(null)
  const p2WrapperRef = useRef(null)
  const rafRef = useRef(null)

  useEffect(() => {
    const updateAboutAnimation = () => {
      if (!sectionRef.current) return

      const rect = sectionRef.current.getBoundingClientRect()
      const vh = window.innerHeight || 800
      const vw = window.innerWidth || 1200

      // Normalized progress when scrolling down from About toward Education (0 to 1)
      // When About is centered/in view, rect.top is ~0. As user scrolls down to Education, rect.top goes from 0 to -vh.
      const progress = Math.min(Math.max(-rect.top / vh, 0), 1)

      // Calculate travel distances dynamically so both paragraphs completely exit opposite edges
      const p1Width = p1WrapperRef.current ? p1WrapperRef.current.offsetWidth : vw
      const p2Width = p2WrapperRef.current ? p2WrapperRef.current.offsetWidth : vw
      const travelDistanceP1 = vw / 2 + p1Width / 2 + 100
      const travelDistanceP2 = vw / 2 + p2Width / 2 + 100

      if (p1WrapperRef.current) {
        // Paragraph 1 moves progressively toward the LEFT edge (-X)
        p1WrapperRef.current.style.transform = `translate3d(${-progress * travelDistanceP1}px, 0, 0)`
        p1WrapperRef.current.style.opacity = `${Math.max(1 - progress * 1.3, 0)}`
      }

      if (p2WrapperRef.current) {
        // Paragraph 2 moves progressively toward the RIGHT edge (+X)
        p2WrapperRef.current.style.transform = `translate3d(${progress * travelDistanceP2}px, 0, 0)`
        p2WrapperRef.current.style.opacity = `${Math.max(1 - progress * 1.3, 0)}`
      }

      if (headingRef.current) {
        headingRef.current.style.transform = `translate3d(0, ${-progress * 45}px, 0)`
        headingRef.current.style.opacity = `${Math.max(1 - progress * 1.6, 0)}`
      }

      if (profileRef.current) {
        profileRef.current.style.transform = `translate3d(0, ${-progress * 45}px, 0)`
        profileRef.current.style.opacity = `${Math.max(1 - progress * 1.6, 0)}`
      }
    }

    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(updateAboutAnimation)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    updateAboutAnimation()

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div ref={sectionRef} className="section-wrapper animate-content" style={{ width: '100%', overflow: 'hidden' }}>
      {/* 1. Centered Editorial Heading */}
      <div ref={headingRef} className="editorial-section-header" style={{ willChange: 'transform, opacity', marginBottom: '1.25rem' }}>
        <h2 className="editorial-heading">About Me</h2>
      </div>

      {/* 2 & 3. Profile Image (Me.jpeg) & Name (Darshak Bisane) */}
      <div ref={profileRef} className="about-profile-cluster" style={{ willChange: 'transform, opacity' }}>
        <div className="about-profile-image-frame">
          <img
            src={mePhoto}
            alt="Darshak Bisane"
            className="about-profile-image"
            loading="eager"
          />
        </div>
        <h3 className="about-profile-name">Darshak K. Bisane</h3>
      </div>

      {/* 4 & 5. Exactly Two Full-Width Editorial Paragraphs that exit in opposite directions */}
      <div className="about-editorial-container">
        {/* Paragraph 1: Exits Left (-X) on scroll to Education */}
        <div ref={p1WrapperRef} className="about-paragraph-wrapper">
          <p className="about-paragraph">
            I&apos;m <strong>Darshak Bisane</strong>, a Computer Engineering student exploring the intersection of Machine Learning, AI, and Backend Engineering. I&apos;m learning to turn ML concepts into practical applications using <strong>Python</strong>, <strong>FastAPI</strong>, databases, and modern AI tools.
          </p>
        </div>

        {/* Paragraph 2: Exits Right (+X) on scroll to Education */}
        <div ref={p2WrapperRef} className="about-paragraph-wrapper">
          <p className="about-paragraph">
            I enjoy understanding how systems work behind the scenes, solving complex problems, and building projects beyond simple models or demos. My goal is to become an <strong>ML Engineer</strong> capable of building, deploying, and maintaining reliable AI systems for real-world use.
          </p>
        </div>
      </div>
    </div>
  )
}

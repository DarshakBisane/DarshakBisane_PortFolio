import { useCallback, useEffect, useRef, useState } from 'react'
import Navbar from './components/Navbar'
import CursorRingField from './components/originkit/cursor-ring-field'
import AboutSection from './components/sections/AboutSection'
import AchievementsSection from './components/sections/AchievementsSection'
import ContactSection from './components/sections/ContactSection'
import EducationSection from './components/sections/EducationSection'
import ExperienceSection from './components/sections/ExperienceSection'
import HomeSection from './components/sections/HomeSection'
import ProjectsSection from './components/sections/ProjectsSection'
import SkillsSection from './components/sections/SkillsSection'
import './App.css'

export default function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [isEducationLocked, setIsEducationLocked] = useState(false)
  const isEducationLockedRef = useRef(false)
  const isNavigatingRef = useRef(false)
  const isTransitioningRef = useRef(false)
  const navTimeoutRef = useRef(null)
  const animFrameRef = useRef(null)

  // Keep ref synchronized with state
  useEffect(() => {
    isEducationLockedRef.current = isEducationLocked
  }, [isEducationLocked])

  // Smoothly scroll to a section when clicked in Navbar
  const handleNavigate = useCallback((sectionId) => {
    // Release lock immediately on navigation
    setIsEducationLocked(false)
    isEducationLockedRef.current = false

    // Clean up any in-flight transitions
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    const eduEl = document.getElementById('education')
    const skillsEl = document.getElementById('skills')
    const aboutEl = document.getElementById('about')
    if (eduEl) { eduEl.style.transform = ''; eduEl.style.opacity = '' }
    if (skillsEl) { skillsEl.style.transform = ''; skillsEl.style.opacity = '' }
    if (aboutEl) { aboutEl.style.transform = ''; aboutEl.style.opacity = '' }
    isTransitioningRef.current = false

    const target = document.getElementById(sectionId)
    if (target) {
      isNavigatingRef.current = true
      setActiveSection(sectionId)

      // Smooth scroll through viewport
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })

      // Update URL hash cleanly
      if (window.location.hash !== `#${sectionId}`) {
        window.history.pushState(null, '', `#${sectionId}`)
      }

      // Re-enable observer updates after smooth scroll finishes
      clearTimeout(navTimeoutRef.current)
      navTimeoutRef.current = setTimeout(() => {
        isNavigatingRef.current = false
        // If arriving at Education, activate lock once fully settled
        if (sectionId === 'education') {
          setIsEducationLocked(true)
          isEducationLockedRef.current = true
        }
      }, 950)
    }
  }, [])

  // Smooth Horizontal Navigation: Education -> Skills (exits LEFT, Skills enters from RIGHT)
  const handleEducationNext = useCallback(() => {
    if (isNavigatingRef.current || isTransitioningRef.current) return

    const eduEl = document.getElementById('education')
    const skillsEl = document.getElementById('skills')
    if (!eduEl || !skillsEl) return

    isNavigatingRef.current = true
    isTransitioningRef.current = true
    setIsEducationLocked(false)
    isEducationLockedRef.current = false

    const eduTop = eduEl.offsetTop
    const skillsTop = skillsEl.offsetTop
    const deltaY = skillsTop - eduTop
    const vw = window.innerWidth || 1200
    const duration = 750
    let startTimestamp = null

    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3)

    const step = (now) => {
      if (!startTimestamp) startTimestamp = now
      const elapsed = now - startTimestamp
      const progress = Math.min(elapsed / duration, 1)
      const eased = easeOutCubic(progress)

      // Education slides LEFT: from 0 to -vw, compensating vertical scroll
      eduEl.style.transform = `translate3d(${-eased * vw}px, ${eased * deltaY}px, 0)`
      eduEl.style.opacity = `${Math.max(1 - eased * 1.15, 0)}`

      // Skills enters from RIGHT: from +vw to 0, compensating vertical scroll
      skillsEl.style.transform = `translate3d(${(1 - eased) * vw}px, ${-(1 - eased) * deltaY}px, 0)`
      skillsEl.style.opacity = `${Math.min(eased * 1.4, 1)}`

      // Coordinate viewport scroll
      window.scrollTo({ top: eduTop + eased * deltaY, behavior: 'instant' })

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(step)
      } else {
        // Complete transition: clean up inline styles & restore normal navigation
        eduEl.style.transform = ''
        eduEl.style.opacity = ''
        skillsEl.style.transform = ''
        skillsEl.style.opacity = ''
        window.scrollTo({ top: skillsTop, behavior: 'instant' })
        setActiveSection('skills')
        if (window.location.hash !== '#skills') {
          window.history.pushState(null, '', '#skills')
        }
        isNavigatingRef.current = false
        isTransitioningRef.current = false
      }
    }

    animFrameRef.current = requestAnimationFrame(step)
  }, [])

  // Smooth Horizontal Navigation: Education -> About (exits RIGHT, About enters from LEFT)
  const handleEducationPrev = useCallback(() => {
    if (isNavigatingRef.current || isTransitioningRef.current) return

    const eduEl = document.getElementById('education')
    const aboutEl = document.getElementById('about')
    if (!eduEl || !aboutEl) return

    isNavigatingRef.current = true
    isTransitioningRef.current = true
    setIsEducationLocked(false)
    isEducationLockedRef.current = false

    const eduTop = eduEl.offsetTop
    const aboutTop = aboutEl.offsetTop
    const deltaY = eduTop - aboutTop
    const vw = window.innerWidth || 1200
    const duration = 750
    let startTimestamp = null

    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3)

    const step = (now) => {
      if (!startTimestamp) startTimestamp = now
      const elapsed = now - startTimestamp
      const progress = Math.min(elapsed / duration, 1)
      const eased = easeOutCubic(progress)

      // Education slides RIGHT: from 0 to +vw
      eduEl.style.transform = `translate3d(${eased * vw}px, ${-eased * deltaY}px, 0)`
      eduEl.style.opacity = `${Math.max(1 - eased * 1.15, 0)}`

      // About enters from LEFT: from -vw to 0
      aboutEl.style.transform = `translate3d(${-(1 - eased) * vw}px, ${(1 - eased) * deltaY}px, 0)`
      aboutEl.style.opacity = `${Math.min(eased * 1.4, 1)}`

      // Coordinate viewport scroll
      window.scrollTo({ top: eduTop - eased * deltaY, behavior: 'instant' })

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(step)
      } else {
        // Complete transition: clean up inline styles & restore normal navigation
        eduEl.style.transform = ''
        eduEl.style.opacity = ''
        aboutEl.style.transform = ''
        aboutEl.style.opacity = ''
        window.scrollTo({ top: aboutTop, behavior: 'instant' })
        setActiveSection('about')
        if (window.location.hash !== '#about') {
          window.history.pushState(null, '', '#about')
        }
        isNavigatingRef.current = false
        isTransitioningRef.current = false
      }
    }

    animFrameRef.current = requestAnimationFrame(step)
  }, [])

  // Education Navigation Lock: intercept mouse-wheel and trackpad gestures while Education is locked
  useEffect(() => {
    let touchStartY = 0

    const handleWheel = (e) => {
      if (!isEducationLockedRef.current) return

      // Intercept mouse-wheel and trackpad gestures to keep Education stationary
      e.preventDefault()
      e.stopPropagation()

      const eduEl = document.getElementById('education')
      if (eduEl && Math.abs(window.scrollY - eduEl.offsetTop) > 2) {
        window.scrollTo({ top: eduEl.offsetTop, behavior: 'instant' })
      }
    }

    const handleTouchStart = (e) => {
      if (e.touches && e.touches[0]) {
        touchStartY = e.touches[0].clientY
      }
    }

    const handleTouchMove = (e) => {
      if (!isEducationLockedRef.current) return

      if (e.touches && e.touches[0]) {
        const deltaY = e.touches[0].clientY - touchStartY
        if (Math.abs(deltaY) > 5) {
          e.preventDefault()
          e.stopPropagation()

          const eduEl = document.getElementById('education')
          if (eduEl && Math.abs(window.scrollY - eduEl.offsetTop) > 2) {
            window.scrollTo({ top: eduEl.offsetTop, behavior: 'instant' })
          }
        }
      }
    }

    const handleKeyDown = (e) => {
      if (!isEducationLockedRef.current) return

      if (['PageDown', 'PageUp', 'ArrowDown', 'ArrowUp', 'Space'].includes(e.code)) {
        e.preventDefault()
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: false })
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  // Monitor scroll alignment to engage lock only when Education is fully active
  useEffect(() => {
    const handleScrollLockCheck = () => {
      if (isNavigatingRef.current || isTransitioningRef.current) return

      const eduEl = document.getElementById('education')
      if (!eduEl) return

      const scrollY = window.scrollY
      const eduTop = eduEl.offsetTop

      // Only engage lock when Education is centered/fully active within 15px
      if (Math.abs(scrollY - eduTop) <= 15) {
        if (!isEducationLockedRef.current) {
          setIsEducationLocked(true)
          isEducationLockedRef.current = true
          setActiveSection('education')
        }
      } else if (Math.abs(scrollY - eduTop) > 60) {
        if (isEducationLockedRef.current) {
          setIsEducationLocked(false)
          isEducationLockedRef.current = false
        }
      }
    }

    window.addEventListener('scroll', handleScrollLockCheck, { passive: true })
    window.addEventListener('resize', handleScrollLockCheck, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScrollLockCheck)
      window.removeEventListener('resize', handleScrollLockCheck)
    }
  }, [])

  // Observe active section on scroll for vertical sections using IntersectionObserver
  useEffect(() => {
    const sectionElements = document.querySelectorAll('.portfolio-section')
    if (!sectionElements || sectionElements.length === 0) return

    // Check on initial load if hash exists
    if (window.location.hash) {
      const hashId = window.location.hash.replace('#', '').toLowerCase()
      const initialTarget = document.getElementById(hashId)
      if (initialTarget) {
        setTimeout(() => {
          initialTarget.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 100)
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (isNavigatingRef.current || isTransitioningRef.current) return

        // Find the visible section with the greatest intersection ratio
        const visibleEntries = entries.filter((e) => e.isIntersecting)
        if (visibleEntries.length > 0) {
          visibleEntries.sort((a, b) => b.intersectionRatio - a.intersectionRatio)
          const topEntry = visibleEntries[0]
          if (topEntry.intersectionRatio > 0.35) {
            setActiveSection(topEntry.target.id)
            if (topEntry.target.id !== 'education' && isEducationLockedRef.current) {
              setIsEducationLocked(false)
              isEducationLockedRef.current = false
            }
          }
        }
      },
      {
        root: null,
        rootMargin: '-15% 0px -15% 0px',
        threshold: [0.15, 0.35, 0.55, 0.75],
      }
    )

    sectionElements.forEach((el) => observer.observe(el))

    return () => {
      observer.disconnect()
      clearTimeout(navTimeoutRef.current)
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    }
  }, [])

  return (
    <div className="portfolio-app-shell">
      {/* 
        ========================================================================
        PERMANENT ORIGINKIT CURSOR RING FIELD BACKGROUND
        Strictly preserved component with exact #000000 background.
        Mounted once in the root shell; never remounted on scroll or transitions.
        ========================================================================
      */}
      <div className="background-layer" aria-hidden="true">
        <CursorRingField background="#000000" />
      </div>

      {/* 
        ========================================================================
        TRANSPARENT FIXED NAVBAR
        Stationary header with personal wordmark and underline active indicator.
        ========================================================================
      */}
      <Navbar activeSection={activeSection} onSelectSection={handleNavigate} />

      {/* 
        ========================================================================
        CONTINUOUS SCROLL-DRIVEN PRESENTATION
        Sections stacked vertically; user scrolls to physically transition
        between viewports continuously.
        Special: Education section locks mouse-wheel/trackpad scroll; users
        transition via the side Previous and Next Section buttons.
        ========================================================================
      */}
      <main className="portfolio-content" role="main">
        <section id="home" className="portfolio-section" aria-label="Home">
          <HomeSection onNavigate={handleNavigate} />
        </section>

        <section id="about" className="portfolio-section" aria-label="About">
          <AboutSection onNavigate={handleNavigate} />
        </section>

        <section id="education" className="portfolio-section" aria-label="Education">
          <EducationSection
            onNavigateNext={handleEducationNext}
            onNavigatePrev={handleEducationPrev}
          />
        </section>

        <section id="skills" className="portfolio-section" aria-label="Skills">
          <SkillsSection />
        </section>

        <section id="projects" className="portfolio-section" aria-label="Projects">
          <ProjectsSection />
        </section>

        <section id="experience" className="portfolio-section" aria-label="Experience">
          <ExperienceSection />
        </section>

        <section id="achievements" className="portfolio-section" aria-label="Achievements">
          <AchievementsSection />
        </section>

        <section id="contact" className="portfolio-section" aria-label="Contact">
          <ContactSection />
        </section>
      </main>
    </div>
  )
}

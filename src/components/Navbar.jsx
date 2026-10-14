import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import './Navbar.css'

export const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar({ activeSection, onSelectSection }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) {
        setMobileOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleNavClick = (id) => {
    onSelectSection(id)
    setMobileOpen(false)
  }

  return (
    <header className="site-navbar" role="banner">
      <div className="navbar-inner">
        {/* Left: Personal Wordmark */}
        <button
          type="button"
          className="navbar-brand"
          onClick={() => handleNavClick('home')}
          aria-label="Darshak Bisane - Back to Home"
        >
          <span className="brand-wordmark">DARSHAK BISANE</span>
        </button>

        {/* Right: Desktop Navigation Links */}
        <nav className="navbar-nav-desktop" aria-label="Main Navigation">
          <ul className="nav-links-list">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id
              return (
                <li key={item.id} className="nav-link-item">
                  <button
                    type="button"
                    className={`nav-text-btn ${isActive ? 'is-active' : ''}`}
                    onClick={() => handleNavClick(item.id)}
                    aria-current={isActive ? 'page' : undefined}
                    id={`nav-${item.id}`}
                  >
                    <span className="nav-text-label">{item.label}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Mobile Hamburger Button */}
        <div className="navbar-mobile-toggle">
          <button
            type="button"
            className="mobile-menu-btn"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileOpen && (
        <div className="mobile-nav-drawer" role="dialog" aria-modal="true">
          <div className="mobile-nav-links">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id
              return (
                <button
                  key={item.id}
                  type="button"
                  className={`mobile-nav-btn ${isActive ? 'is-active' : ''}`}
                  onClick={() => handleNavClick(item.id)}
                  id={`mobile-nav-${item.id}`}
                >
                  <span className="mobile-nav-label">{item.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      )}
    </header>
  )
}

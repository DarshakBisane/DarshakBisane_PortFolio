import {
  Award,
  Building2,
  Calendar,
  ExternalLink,
  FileText,
  MapPin,
  X,
  ZoomIn,
  ZoomOut,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import certificateImg from '../../assets/Internship1.webp'
import './sections.css'

// Single verified experience entry as required
const EXPERIENCES_DATA = [
  {
    id: 'veedev-web-development-intern',
    role: 'Web Development Intern',
    company: 'Veedev Enterprises, Tumsar',
    employmentType: 'Internship',
    duration: 'Jan 2024 – May 2024 · 5 months',
    location: 'Tumsar, Maharashtra, India',
    linkedinUrl:
      'https://www.linkedin.com/in/darshak-bisane-181a71339/details/experience/',
    description: {
      overview:
        'During my internship at Veedev Enterprises, Tumsar, I developed a College Management Website using HTML, CSS, JavaScript, and PHP. I learned how to structure and style web pages, add JavaScript functionality, use PHP for server-side development, and work with a local database to store application data.',
      project: 'College Management Website',
      technologies: ['HTML5', 'CSS', 'JavaScript', 'PHP', 'Database Management'],
      databaseNote:
        'Local database was used to store application data and student records during development.',
    },
  },
]

export default function ExperienceSection() {
  const [selectedDescription, setSelectedDescription] = useState(null)
  const [showCertificate, setShowCertificate] = useState(false)
  const [isZoomed, setIsZoomed] = useState(false)

  const handleCloseCertificate = () => {
    setShowCertificate(false)
    setIsZoomed(false)
  }

  // Manage modal accessibility and Escape key listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedDescription(null)
        setShowCertificate(false)
        setIsZoomed(false)
      }
    }

    if (selectedDescription || showCertificate) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedDescription, showCertificate])

  return (
    <div className="section-wrapper animate-content" style={{ width: '100%' }}>
      {/* Editorial Section Header */}
      <div className="editorial-section-header">
        <h2 className="editorial-heading">Experience</h2>
        <p className="editorial-subheading">
          Professional internships and technical development experience
        </p>
      </div>

      {/* Grid Container: Fixed-width cards centered, 3-column capable */}
      <div className="experience-grid-container">
        <div className="experience-grid">
          {EXPERIENCES_DATA.map((exp) => (
            <div key={exp.id} className="liquid-glass-card experience-card">
              <div className="experience-card-content">
                {/* 1. Understated company / work icon & employment badge */}
                <div className="experience-card-header">
                  <div className="experience-icon-frame" aria-hidden="true">
                    <Building2 size={18} className="experience-icon" />
                  </div>
                  <span className="experience-badge">{exp.employmentType}</span>
                </div>

                {/* 2. Role */}
                <h3 className="experience-role">{exp.role}</h3>

                {/* 3. Company */}
                <div className="experience-company">{exp.company}</div>

                {/* 4. Duration */}
                <div className="experience-meta-item">
                  <Calendar size={13} className="experience-meta-icon" />
                  <span className="experience-meta-text">{exp.duration}</span>
                </div>

                {/* 5. Location */}
                <div className="experience-meta-item">
                  <MapPin size={13} className="experience-meta-icon" />
                  <span className="experience-meta-text">{exp.location}</span>
                </div>
              </div>

              {/* 6. Two Compact Action Buttons */}
              <div className="experience-card-actions">
                <button
                  type="button"
                  className="experience-action-btn primary"
                  onClick={() => setSelectedDescription(exp)}
                  aria-haspopup="dialog"
                >
                  <FileText size={14} />
                  <span>View Description</span>
                </button>

                <button
                  type="button"
                  className="experience-action-btn secondary"
                  onClick={() => setShowCertificate(true)}
                  aria-haspopup="dialog"
                >
                  <Award size={14} />
                  <span>View Certificate</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Description Modal */}
      {selectedDescription && (
        <div
          className="project-modal-backdrop"
          onClick={() => setSelectedDescription(null)}
          role="presentation"
        >
          <div
            className="project-modal-dialog experience-description-dialog"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="exp-modal-title"
          >
            {/* Modal Header */}
            <div className="project-modal-header">
              <div>
                <span className="project-modal-kicker">Internship Details</span>
                <h3 id="exp-modal-title" className="project-modal-title">
                  {selectedDescription.role}
                </h3>
                <div className="experience-modal-company-line">
                  <span className="experience-modal-company">{selectedDescription.company}</span>
                  <span className="experience-meta-separator">•</span>
                  <span className="experience-modal-period">{selectedDescription.duration}</span>
                </div>
              </div>

              <button
                type="button"
                className="project-modal-close"
                onClick={() => setSelectedDescription(null)}
                aria-label="Close description dialog"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="project-modal-body">
              {/* Overview */}
              <div className="project-modal-section">
                <h4 className="project-section-title">Overview</h4>
                <p className="project-overview-text">
                  {selectedDescription.description.overview}
                </p>
              </div>

              {/* Project */}
              <div className="project-modal-section">
                <h4 className="project-section-title">Project</h4>
                <div className="experience-project-card">
                  <span className="experience-project-title">
                    {selectedDescription.description.project}
                  </span>
                  <span className="experience-project-tag">Internship Capstone</span>
                </div>
              </div>

              {/* Technologies and Skills Learned */}
              <div className="project-modal-section">
                <h4 className="project-section-title">Technologies & Skills Learned</h4>
                <div className="project-modal-tags">
                  {selectedDescription.description.technologies.map((tech) => (
                    <span key={tech} className="glass-chip experience-skill-chip">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Database Context */}
              <div className="project-modal-section">
                <h4 className="project-section-title">Database Implementation</h4>
                <p className="experience-database-note">
                  {selectedDescription.description.databaseNote}
                </p>
              </div>

              {/* LinkedIn Verification Link */}
              <div className="experience-verification-container">
                <a
                  href={selectedDescription.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="experience-linkedin-link"
                >
                  <span>View Position on LinkedIn</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Certificate Viewer Modal */}
      {showCertificate && (
        <div
          className="project-modal-backdrop certificate-viewer-backdrop"
          onClick={handleCloseCertificate}
          role="presentation"
        >
          <div
            className="certificate-modal-dialog"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cert-modal-title"
          >
            {/* Modal Header */}
            <div className="certificate-modal-header">
              <div>
                <span className="project-modal-kicker">Verified Credential</span>
                <h3 id="cert-modal-title" className="certificate-modal-title">
                  Certificate of Internship
                </h3>
                <p className="certificate-modal-subtitle">
                  Veedev Software Pvt. Ltd. · Tumsar, Maharashtra
                </p>
              </div>

              <div className="certificate-controls">
                <button
                  type="button"
                  className={`certificate-zoom-btn ${isZoomed ? 'active' : ''}`}
                  onClick={() => setIsZoomed((prev) => !prev)}
                  aria-label={isZoomed ? 'Fit to screen' : 'Zoom in certificate'}
                >
                  {isZoomed ? <ZoomOut size={15} /> : <ZoomIn size={15} />}
                  <span>{isZoomed ? 'Fit' : 'Zoom'}</span>
                </button>

                <button
                  type="button"
                  className="project-modal-close"
                  onClick={handleCloseCertificate}
                  aria-label="Close certificate viewer"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Rotated Certificate Viewport */}
            <div className={`certificate-stage-wrapper ${isZoomed ? 'zoomed-stage' : ''}`}>
              <div className="certificate-aspect-frame">
                <img
                  src={certificateImg}
                  alt="Veedev Enterprises Web Development Internship Certificate - Darshak K. Bisane"
                  className={`certificate-rotated-img ${isZoomed ? 'zoomed' : ''}`}
                  onClick={() => setIsZoomed((prev) => !prev)}
                  loading="lazy"
                  decoding="async"
                  width={905}
                  height={1280}
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="certificate-modal-footer">
              <span className="certificate-footer-note">
                Completed Industrial Training in Website Design & Development using PHP · Issue Date: 15-07-2024
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

import {
  Award,
  Bot,
  Calendar,
  ExternalLink,
  FileText,
  Trophy,
  Users,
  X,
  ZoomIn,
  ZoomOut,
} from 'lucide-react'
import { useState } from 'react'
import Modal from '../Modal'
import kdkCertImg from '../../assets/KDK hackathon.webp'
import priyadarshiniCertImg from '../../assets/Priyadarshini Hackathon.webp'
import './sections.css'

const ACHIEVEMENTS_DATA = [
  {
    id: 'vibe-with-ai-buildathon',
    title: 'VIBE with AI — Buildathon',
    category: 'Hackathon / AI-Powered Web Development',
    badge: 'Top 15 Finalist',
    institution: 'K.D.K. College of Engineering, Nagpur',
    organizer: 'Coding Club, Department of Computer Science & Engineering',
    date: '5 September 2026',
    challenge: 'AI-Powered Web Development Challenge',
    certificateType: 'Certificate of Participation',
    shortDescription:
      'Advanced to the final stage of the VIBE with AI Buildathon, competing among the top 15 students at K.D.K. College of Engineering, Nagpur. The challenge focused on AI-powered web development and building innovative solutions.',
    tags: ['AI-Powered Web Dev', 'Hackathon Finalist', 'Top 15', 'Full-Stack AI'],
    icon: Trophy,
    hasCertificate: true,
    certificate: {
      image: kdkCertImg,
      title: 'VIBE with AI — Buildathon Certificate',
      issuer: 'K.D.K. College of Engineering, Nagpur',
      rotate: false,
      aspectRatio: '1280 / 904',
      footerNote:
        'Awarded to Darshak K. Bisane for AI-Powered Web Development Challenge · 5 September 2026',
    },
    modal: {
      overview:
        'Advanced to the final stage of the VIBE with AI Buildathon, competing among the top 15 students at K.D.K. College of Engineering, Nagpur. The challenge focused on AI-powered web development and building innovative solutions.',
      challenge:
        'AI-Powered Web Development Challenge — focused on creating intelligent, AI-augmented web systems and practical real-time implementations.',
      achievement:
        'Reached the final stage and competed among the top 15 students in the KDK College Hackathon.',
      detailsList: [
        { label: 'Date', value: '5 September 2026' },
        { label: 'Host Institution', value: 'K.D.K. College of Engineering, Nagpur' },
        {
          label: 'Organizer',
          value: 'Coding Club, Department of Computer Science & Engineering',
        },
        {
          label: 'Certificate Type',
          value: 'Certificate of Participation (Final Stage / Top 15 Contenders)',
        },
      ],
      skills: [
        'AI-Augmented Development',
        'Web Architecture',
        'Rapid Prototyping',
        'Competitive Hackathon',
      ],
    },
  },
  {
    id: 'training-placement-coordinator',
    title: 'Training & Placement Coordinator',
    category: 'Student Leadership / Career Development',
    badge: 'Currently Serving',
    institution: 'S. B. Jain Institute of Technology, Management and Research, Nagpur',
    date: 'Currently Serving',
    focus: 'Placement coordination and interview-process support',
    shortDescription:
      'Working as a Training & Placement Coordinator at S. B. Jain Institute of Technology, Management and Research, Nagpur. Contributing to placement-related coordination and supporting interview-process activities while developing communication, teamwork, and professional coordination skills.',
    tags: ['Placement Coordination', 'Interview Support', 'Student Leadership', 'Operations'],
    icon: Users,
    hasCertificate: false,
    modal: {
      overview: 'Currently serving as a Training & Placement Coordinator at my college.',
      responsibilities: [
        'Participate in placement-related coordination activities.',
        'Support communication and coordination associated with placement drives and interviews.',
        'Assist with interview-process activities as assigned.',
        'Collaborate with students and relevant college representatives when required.',
      ],
      skills: [
        'Communication',
        'Teamwork',
        'Coordination',
        'Professional interaction',
        'Organizational skills',
      ],
      note: 'These descriptions represent the role accurately without implying independent management of placements, official recruitment decisions, or unconfirmed authority.',
    },
  },
  {
    id: 'technova-ai-agent-challenge',
    title: 'TECHNOVA ’26 — AI Agent Challenge',
    category: 'AI Hackathon / Innovation',
    badge: 'Round 3 Top 5 Contender',
    institution: 'Priyadarshini College of Engineering, Nagpur',
    venue: 'Priyadarshini Campus, Hingna Road, Nagpur, Maharashtra',
    date: '1 October 2026',
    organizer: 'TECHALFA (Technology & Innovation)',
    sponsors: 'WIDE SFTECH and Data Council Nagpur',
    challengeTheme: 'BUILD • AUTOMATE • INNOVATE',
    certificateType: 'Certificate of Participation',
    shortDescription:
      'Advanced through three rounds of the TECHNOVA ’26 AI Agent Challenge and competed among the top five contenders for the final stage. The challenge emphasized AI agents, automation, and innovation.',
    tags: ['AI Agents', 'Automation', 'Round 3 Finalist', 'Innovation'],
    icon: Bot,
    hasCertificate: true,
    certificate: {
      image: priyadarshiniCertImg,
      title: 'TECHNOVA ’26 — AI Agent Challenge Certificate',
      issuer: 'Priyadarshini College of Engineering, Nagpur',
      rotate: true,
      aspectRatio: '1600 / 1198',
      footerNote:
        'Issued to Darshak Bisane · AI Agent Challenge · Signatories: Ragini Tiwari (TechAlfa) & Ashish Jirapure (HOD, IIoT) · 1 October 2026',
    },
    modal: {
      overview:
        'TECHNOVA ’26 provided a platform for coding, artificial intelligence, entrepreneurship, and innovation.',
      challenge: 'AI Agent Challenge — BUILD • AUTOMATE • INNOVATE.',
      achievement:
        'Reached the third round and competed among the top five contenders for the final stage.',
      detailsList: [
        { label: 'Date', value: '1 October 2026' },
        { label: 'Host Institution', value: 'Priyadarshini College of Engineering, Nagpur' },
        {
          label: 'Venue',
          value: 'Priyadarshini Campus, Hingna Road, Nagpur, Maharashtra',
        },
        { label: 'Organizer', value: 'TECHALFA (Technology & Innovation)' },
        { label: 'Sponsors', value: 'WIDE SFTECH and Data Council Nagpur' },
        {
          label: 'Signatories',
          value:
            'Ragini Tiwari — Founder, TechAlfa | Ashish Jirapure — HOD, Industrial IoT',
        },
      ],
      websiteUrl: 'https://www.pcenagpur.edu.in/',
      skills: [
        'AI Agent Workflows',
        'Process Automation',
        'Problem Solving',
        'Hackathon Pitching',
      ],
    },
  },
]

export default function AchievementsSection() {
  const [selectedDetails, setSelectedDetails] = useState(null)
  const [activeCertificate, setActiveCertificate] = useState(null)
  const [isCertZoomed, setIsCertZoomed] = useState(false)

  const handleCloseCertificate = () => {
    setActiveCertificate(null)
    setIsCertZoomed(false)
  }

  return (
    <div className="section-wrapper animate-content" style={{ width: '100%' }}>
      {/* Centered Editorial Heading */}
      <div className="editorial-section-header">
        <h2 className="editorial-heading">Achievements</h2>
        <p className="editorial-subheading">
          Hackathon recognitions, competitive innovation challenges & institutional leadership
        </p>
      </div>

      {/* Responsive 3-Column Grid on Desktop */}
      <div className="achievements-grid">
        {ACHIEVEMENTS_DATA.map((item) => {
          const Icon = item.icon
          return (
            <div key={item.id} className="liquid-glass-card achievement-card">
              <div className="achievement-card-body">
                {/* Header: Icon & Category Badge */}
                <div className="achievement-card-header">
                  <div className="achievement-icon-frame" aria-hidden="true">
                    <Icon size={18} className="achievement-icon" />
                  </div>
                  <span className="achievement-status-badge">{item.badge}</span>
                </div>

                {/* Event/Role Title */}
                <h3 className="achievement-card-title">{item.title}</h3>

                {/* Institution */}
                <div className="achievement-institution">{item.institution}</div>

                {/* Date line */}
                <div className="achievement-meta-line">
                  <Calendar size={13} className="achievement-meta-icon" />
                  <span>{item.date}</span>
                </div>

                {/* Concise Description */}
                <p className="achievement-card-desc">{item.shortDescription}</p>

                {/* Relevant Tags */}
                <div className="achievement-card-tags">
                  {item.tags.map((tag) => (
                    <span key={tag} className="glass-chip achievement-tag-chip">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="achievement-card-actions">
                <button
                  type="button"
                  className="achievement-btn primary"
                  onClick={() => setSelectedDetails(item)}
                  aria-haspopup="dialog"
                >
                  <FileText size={14} />
                  <span>View Details</span>
                </button>

                {item.hasCertificate && (
                  <button
                    type="button"
                    className="achievement-btn secondary"
                    onClick={() => setActiveCertificate(item.certificate)}
                    aria-haspopup="dialog"
                  >
                    <Award size={14} />
                    <span>View Certificate</span>
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Details Modal — Standardized Full-Screen Pure Black Modal */}
      <Modal
        isOpen={!!selectedDetails}
        onClose={() => setSelectedDetails(null)}
        titleId="ach-modal-title"
        className="project-modal-dialog achievement-modal-dialog"
      >
        {selectedDetails && (
          <>
            {/* Header */}
            <div className="project-modal-header">
              <div>
                <span className="project-modal-kicker">{selectedDetails.category}</span>
                <h3 id="ach-modal-title" className="project-modal-title">
                  {selectedDetails.title}
                </h3>
                <div className="experience-modal-company-line">
                  <span className="experience-modal-company">{selectedDetails.institution}</span>
                  <span className="experience-meta-separator">•</span>
                  <span className="experience-modal-period">{selectedDetails.date}</span>
                </div>
              </div>

              <button
                type="button"
                className="project-modal-close"
                onClick={() => setSelectedDetails(null)}
                aria-label="Close details dialog"
              >
                <X size={20} color="#ffffff" strokeWidth={2.2} />
              </button>
            </div>

            {/* Body */}
            <div className="project-modal-body achievement-modal-body">
              {/* Card 2: Training & Placement Coordinator specific sections */}
              {selectedDetails.id === 'training-placement-coordinator' ? (
                <>
                  <div className="project-modal-section">
                    <h4 className="project-section-title">Role Overview</h4>
                    <p className="project-overview-text">{selectedDetails.modal.overview}</p>
                  </div>

                  <div className="project-modal-section">
                    <h4 className="project-section-title">Responsibilities</h4>
                    <ul className="achievement-bullets-list">
                      {selectedDetails.modal.responsibilities.map((resp, idx) => (
                        <li key={idx} className="achievement-bullet-item">
                          {resp}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="project-modal-section">
                    <h4 className="project-section-title">Skills Developed</h4>
                    <div className="project-modal-tags">
                      {selectedDetails.modal.skills.map((skill) => (
                        <span key={skill} className="glass-chip">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="project-modal-section">
                    <div className="achievement-accurate-note">
                      {selectedDetails.modal.note}
                    </div>
                  </div>
                </>
              ) : selectedDetails.id === 'technova-ai-agent-challenge' ? (
                /* Card 3: TECHNOVA ’26 specific sections */
                <>
                  <div className="project-modal-section">
                    <h4 className="project-section-title">Event Overview</h4>
                    <p className="project-overview-text">{selectedDetails.modal.overview}</p>
                  </div>

                  <div className="project-modal-section">
                    <h4 className="project-section-title">Challenge</h4>
                    <div className="achievement-highlight-card">
                      <span className="achievement-highlight-title">
                        {selectedDetails.modal.challenge}
                      </span>
                    </div>
                  </div>

                  <div className="project-modal-section">
                    <h4 className="project-section-title">Achievement</h4>
                    <div className="achievement-highlight-card finalist">
                      <span className="achievement-highlight-title">
                        {selectedDetails.modal.achievement}
                      </span>
                    </div>
                  </div>

                  <div className="project-modal-section">
                    <h4 className="project-section-title">Event Details</h4>
                    <div className="achievement-details-grid">
                      {selectedDetails.modal.detailsList.map((item) => (
                        <div key={item.label} className="achievement-detail-cell">
                          <span className="achievement-cell-label">{item.label}</span>
                          <span className="achievement-cell-value">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="project-modal-section">
                    <h4 className="project-section-title">Key Competencies</h4>
                    <div className="project-modal-tags">
                      {selectedDetails.modal.skills.map((skill) => (
                        <span key={skill} className="glass-chip">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {selectedDetails.modal.websiteUrl && (
                    <div className="achievement-link-container">
                      <a
                        href={selectedDetails.modal.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="experience-linkedin-link"
                      >
                        <span>Visit Official College Website (pcenagpur.edu.in)</span>
                        <ExternalLink size={13} />
                      </a>
                    </div>
                  )}
                </>
              ) : (
                /* Card 1: VIBE with AI Buildathon sections */
                <>
                  <div className="project-modal-section">
                    <h4 className="project-section-title">Event Overview</h4>
                    <p className="project-overview-text">{selectedDetails.modal.overview}</p>
                  </div>

                  <div className="project-modal-section">
                    <h4 className="project-section-title">Challenge</h4>
                    <div className="achievement-highlight-card">
                      <span className="achievement-highlight-title">
                        {selectedDetails.modal.challenge}
                      </span>
                    </div>
                  </div>

                  <div className="project-modal-section">
                    <h4 className="project-section-title">Achievement</h4>
                    <div className="achievement-highlight-card finalist">
                      <span className="achievement-highlight-title">
                        {selectedDetails.modal.achievement}
                      </span>
                    </div>
                  </div>

                  <div className="project-modal-section">
                    <h4 className="project-section-title">Event Details</h4>
                    <div className="achievement-details-grid">
                      {selectedDetails.modal.detailsList.map((item) => (
                        <div key={item.label} className="achievement-detail-cell">
                          <span className="achievement-cell-label">{item.label}</span>
                          <span className="achievement-cell-value">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="project-modal-section">
                    <h4 className="project-section-title">Key Competencies</h4>
                    <div className="project-modal-tags">
                      {selectedDetails.modal.skills.map((skill) => (
                        <span key={skill} className="glass-chip">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </Modal>

      {/* Certificate Viewer Modal — Standardized Full-Screen Pure Black Modal */}
      <Modal
        isOpen={!!activeCertificate}
        onClose={handleCloseCertificate}
        titleId="ach-cert-modal-title"
        backdropClassName="certificate-viewer-backdrop"
        className="certificate-modal-dialog"
        closeOnBackdropClick={true}
      >
        {activeCertificate && (
          <>
            {/* Header */}
            <div className="certificate-modal-header">
              <div>
                <span className="project-modal-kicker">Verified Certificate</span>
                <h3 id="ach-cert-modal-title" className="certificate-modal-title">
                  {activeCertificate.title}
                </h3>
                <p className="certificate-modal-subtitle">{activeCertificate.issuer}</p>
              </div>

              <div className="certificate-controls">
                <button
                  type="button"
                  className={`certificate-zoom-btn ${isCertZoomed ? 'active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsCertZoomed((prev) => !prev)
                  }}
                  aria-label={isCertZoomed ? 'Fit to screen' : 'Zoom in certificate'}
                >
                  {isCertZoomed ? <ZoomOut size={16} /> : <ZoomIn size={16} />}
                  <span>{isCertZoomed ? 'Fit' : 'Zoom'}</span>
                </button>

                <button
                  type="button"
                  className="certificate-modal-close"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleCloseCertificate()
                  }}
                  aria-label="Close certificate viewer"
                >
                  <X size={20} color="#ffffff" strokeWidth={2.2} />
                </button>
              </div>
            </div>

            {/* Viewport Frame */}
            <div className={`certificate-stage-wrapper ${isCertZoomed ? 'zoomed-stage' : ''}`}>
              <div
                className={`certificate-aspect-frame ${
                  activeCertificate.rotate ? 'is-rotated-cert' : 'is-standard-cert'
                }`}
                style={{ aspectRatio: activeCertificate.aspectRatio }}
              >
                <img
                  src={activeCertificate.image}
                  alt={activeCertificate.title}
                  className={`certificate-display-img ${
                    activeCertificate.rotate ? 'rotated-cert-img' : 'standard-cert-img'
                  } ${isCertZoomed ? 'zoomed' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsCertZoomed((prev) => !prev)
                  }}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="certificate-modal-footer">
              <span className="certificate-footer-note">{activeCertificate.footerNote}</span>
            </div>
          </>
        )}
      </Modal>
    </div>
  )
}

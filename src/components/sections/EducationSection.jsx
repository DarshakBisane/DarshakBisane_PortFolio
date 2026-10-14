import { MapPin } from 'lucide-react'
import './EducationRoad.css'
import './sections.css'

export default function EducationSection({ onNavigateNext, onNavigatePrev }) {
  const milestones = [
    {
      step: '01',
      badge: 'Secondary Education',
      title: '10th Class',
      institution: 'Adarsh Vidyalaya and Jr. College, Sihora',
      result: 'Passed with 84.00%',
      location: 'Sihora',
      branch: null,
      status: null,
    },
    {
      step: '02',
      badge: 'Technical Diploma',
      title: 'Diploma — Computer Technology',
      institution: 'Government Polytechnic Sakoli',
      result: 'Passed with 84.91%',
      branch: 'Computer Technology',
      location: 'Sakoli',
      status: null,
    },
    {
      step: '03',
      badge: 'Undergraduate Degree',
      title: 'B.Tech — CSE (AI/ML)',
      institution: 'S. B. Jain Institute of Technology, Management and Research, Nagpur',
      result: 'Current CGPA: 8.3',
      branch: 'CSE (AI/ML)',
      location: 'Nagpur',
      status: 'Currently Pursuing',
    },
  ]

  return (
    <div className="section-wrapper animate-content" style={{ width: '100%' }}>
      {/* Centered Editorial Heading */}
      <div className="editorial-section-header" style={{ marginBottom: '1.5rem' }}>
        <h2 className="editorial-heading">Education</h2>
      </div>

      {/* Connected Horizontal Road / Timeline */}
      <div className="education-road-container">
        {/* Continuous Road Line & Dashed Centerline */}
        <div className="road-line" aria-hidden="true" />
        <div className="road-dashed-centerline" aria-hidden="true" />

        {/* 3 Chronological Milestones along the Road */}
        <div className="road-milestones-grid">
          {milestones.map((item, idx) => (
            <div key={idx} className="road-milestone-column">
              {/* Node Marker sitting on the Road */}
              <div className={`road-node-marker ${item.status ? 'active-node' : ''}`}>
                <span className="node-step-index">{item.step}</span>
              </div>

              {/* Milestone Details Card */}
              <div className="road-milestone-card">
                <div>
                  <div className="milestone-badge">{item.badge}</div>
                  <h3 className="milestone-title">{item.title}</h3>
                  <p className="milestone-institution">{item.institution}</p>
                </div>

                <div className="milestone-meta-row">
                  {item.branch && (
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-midgrey)' }}>
                      Branch: <span style={{ color: '#ffffff' }}>{item.branch}</span>
                    </div>
                  )}

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <div className="milestone-score-badge">
                      <span>{item.result}</span>
                    </div>
                    {item.status && (
                      <span
                        className="glass-chip"
                        style={{
                          color: '#ffffff',
                          borderColor: 'rgba(255, 255, 255, 0.2)',
                          background: 'rgba(255, 255, 255, 0.08)',
                        }}
                      >
                        {item.status}
                      </span>
                    )}
                  </div>

                  <div className="milestone-location-row">
                    <MapPin size={13} style={{ color: 'var(--text-lightgrey)' }} />
                    <span>{item.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Side-Positioned Navigation Controls: Previous Section (Left) & Next Section (Right) */}
        <div className="education-side-nav-bar">
          {/* Left: Previous Section Return Control (Navigates to About Me) */}
          <button
            type="button"
            className="btn-edu-side btn-edu-prev"
            onClick={onNavigatePrev}
            aria-label="Previous Section: About Me"
            id="education-prev-btn"
          >
            <span className="edu-arrow edu-arrow-prev" aria-hidden="true">←</span>
            <span>Previous Section</span>
          </button>

          {/* Right: Next Section Advance Control (Navigates to Skills) */}
          <button
            type="button"
            className="btn-edu-side btn-edu-next"
            onClick={onNavigateNext}
            aria-label="Next Section: Skills"
            id="education-next-btn"
          >
            <span>Next Section</span>
            <span className="edu-arrow edu-arrow-next" aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </div>
  )
}

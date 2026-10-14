import { Calendar } from 'lucide-react'
import './sections.css'

export default function ExperienceSection() {
  const experiences = [
    {
      role: 'Machine Learning Research Intern',
      company: 'Center for Artificial Intelligence & Data Science',
      location: 'Research Lab',
      period: 'May 2024 — Present',
      points: [
        'Researched parameter-efficient fine-tuning (PEFT/LoRA) techniques on domain-specific LLMs for technical document analysis.',
        'Profiled inference latency and memory footprints, executing post-training quantization to enable deployment on resource-constrained GPUs.',
        'Collaborated on empirical benchmarking against standard evaluation suites, preparing data visualizations and performance reports.',
      ],
      skills: ['PyTorch', 'Hugging Face Transformers', 'PEFT', 'CUDA', 'Python'],
    },
    {
      role: 'Software Engineering Intern',
      company: 'Tech Solutions & Cloud Labs',
      location: 'Hybrid',
      period: 'Jan 2024 — April 2024',
      points: [
        'Engineered high-throughput asynchronous REST microservices with FastAPI and Redis caching, processing over 5,000 requests/sec with low latency.',
        'Containerized multi-service architectures using Docker and Docker Compose, establishing automated CI/CD validation pipelines with GitHub Actions.',
        'Refactored database queries in PostgreSQL, introducing composite indexing and query optimization that cut p95 response times by 40%.',
      ],
      skills: ['FastAPI', 'PostgreSQL', 'Redis', 'Docker', 'GitHub Actions'],
    },
    {
      role: 'Undergraduate Teaching Assistant',
      company: 'Department of Computer Science & Engineering',
      location: 'On Campus',
      period: 'Aug 2023 — Dec 2023',
      points: [
        'Conducted weekly laboratory sessions and office hours for 120+ sophomore students taking Data Structures & Algorithms.',
        'Created automated grading scripts and test suites for algorithmic problem sets covering trees, graphs, and dynamic programming.',
      ],
      skills: ['C++', 'Data Structures', 'Algorithms', 'Code Review'],
    },
  ]

  return (
    <div className="section-wrapper animate-content">
      {/* Centered Editorial Heading */}
      <div className="editorial-section-header">
        <h2 className="editorial-heading">Experience</h2>
      </div>

      <div className="timeline-container">
        {experiences.map((exp, idx) => (
          <div key={idx} className="liquid-glass-card">
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '0.5rem',
                marginBottom: '0.75rem',
              }}
            >
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 500, color: 'var(--text-white)' }}>
                  {exp.role}
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.2rem' }}>
                  <span style={{ fontSize: '0.88rem', color: 'var(--text-lightgrey)' }}>{exp.company}</span>
                  <span style={{ color: 'var(--text-darkgrey)', fontSize: '0.8rem' }}>•</span>
                  <span style={{ color: 'var(--text-midgrey)', fontSize: '0.84rem' }}>{exp.location}</span>
                </div>
              </div>

              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: '0.78rem',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--text-midgrey)',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  padding: '0.25rem 0.6rem',
                  borderRadius: '6px',
                }}
              >
                <Calendar size={12} />
                <span>{exp.period}</span>
              </div>
            </div>

            <ul className="timeline-bullets">
              {exp.points.map((pt, pIdx) => (
                <li key={pIdx} className="timeline-bullet-item">
                  {pt}
                </li>
              ))}
            </ul>

            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginTop: '1rem' }}>
              {exp.skills.map((s, sIdx) => (
                <span key={sIdx} className="glass-chip">
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

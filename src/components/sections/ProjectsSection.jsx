import { ArrowUpRight, ChevronDown, ChevronUp, ExternalLink, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { GithubIcon } from '../icons/SocialIcons'
import {
  LaxmanRekhaPreview,
  NoIssuePreview,
  PcpPreview,
  ResumePreview,
  StudentPreview,
  X509Preview,
} from './ProjectPreviews'
import './sections.css'

const PROJECTS_DATA = [
  {
    id: 'noissue-ai',
    title: 'NoIssue AI',
    category: 'AI & Support Engineering',
    isFeatured: true,
    shortDescription:
      'AI-powered support ticket intelligence system focused on analyzing incoming issues, retrieving contextual documentation via RAG, identifying root causes, and recommending actionable resolutions.',
    tags: ['Next.js', 'TypeScript', 'Google Gemini', 'Redis', 'PostgreSQL', 'Tailwind CSS'],
    github: 'https://github.com/DarshakBisane/NoIssue-AI',
    demo: 'https://no-issue-ai.vercel.app',
    previewComponent: NoIssuePreview,
    modal: {
      overview:
        'NoIssue AI is an intelligent support ticket analysis platform engineered to accelerate triage, diagnose software bugs, and reduce mean-time-to-resolution (MTTR) by combining generative AI with contextual knowledge retrieval.',
      problem:
        'Technical support and triage teams frequently deal with ambiguous user bug reports, spending significant time manually cross-referencing internal technical docs, searching prior resolution logs, and classifying severity.',
      howItWorks:
        'Incoming tickets are parsed through a multi-stage pipeline. The system queries internal documentation chunks via contextual vector retrieval (RAG). Google Gemini analyzes the ticket context and documentation to uncover underlying technical root causes and generates targeted, verified resolution steps for engineers.',
      features: [
        'Automated ticket ingestion and multi-factor issue severity triage.',
        'Context-aware Retrieval-Augmented Generation (RAG) over knowledge bases.',
        'Automated root-cause diagnostic breakdown with prompt-injection defenses.',
        'Suggested resolution drafting with confidence indicators.',
        'Upstash Redis integration for high-speed response caching and API rate limiting.',
        'Neon PostgreSQL database storing ticket histories, user sessions, and resolution metrics.',
      ],
      techStack: [
        'Next.js 14 (App Router)',
        'TypeScript',
        'Google Gemini API',
        'Upstash Redis',
        'Neon PostgreSQL',
        'Tailwind CSS',
        'Vercel Deployment',
      ],
      role: 'Designed and built the full-stack architecture, engineered the RAG retrieval and Gemini prompt workflows for root-cause extraction, implemented database schemas, and deployed to Vercel.',
    },
  },
  {
    id: 'pcp-visual-solver',
    title: 'Interactive PCP Visual Solver',
    category: 'Theory of Computation & Algorithms',
    isFeatured: true,
    shortDescription:
      'Interactive visual solver and educational simulator for Emil Post’s Correspondence Problem (PCP), demonstrating step-by-step tile concatenation comparisons and bounded search space exploration.',
    tags: ['React', 'TypeScript', 'Vite', 'Algorithms', 'Formal Languages'],
    github: 'https://github.com/DarshakBisane/PCP-tae',
    demo: 'https://pcp-tae-mu.vercel.app',
    previewComponent: PcpPreview,
    modal: {
      overview:
        'A browser-based interactive simulation tool for the Post Correspondence Problem (PCP)—a famous undecidable decision problem introduced by mathematician Emil Post in 1946.',
      problem:
        'Because PCP is mathematically undecidable in the general case, students and computer scientists often struggle to visualize how candidate tile sequences expand exponentially and how string prefix alignment operates in practice.',
      howItWorks:
        'Users configure a finite set of domino-like tiles consisting of top strings (List A) and bottom strings (List B). A generator-based breadth-first search systematically evaluates candidate index sequences up to a configurable depth, dynamically testing whether concatenated strings produce an exact match or share a valid prefix.',
      features: [
        'Custom tile pair editor allowing dynamic addition, removal, and editing of string pairs.',
        'Generator-based candidate sequence generator exploring sequences in breadth-first order.',
        'Search space estimation formula calculating total candidates: sum(N^k) up to maximum depth.',
        'Real-time visual comparison showing top concatenation vs. bottom concatenation.',
        'Dynamic prefix compatibility indicators: Exact Match, Compatible Prefix, or Complete Mismatch.',
        'Step-by-step interactive playback and detailed solution trace exploration.',
      ],
      techStack: [
        'React 19',
        'TypeScript',
        'Vite',
        'Tailwind CSS',
        'Lucide React',
        'Custom Search Generator Algorithms',
      ],
      role: 'Implemented the mathematical PCP solver algorithm in TypeScript, developed the breadth-first search sequence evaluator, designed the interactive tile UI, and deployed the production application on Vercel.',
    },
  },
  {
    id: 'x509-certificate',
    title: 'X.509 Certificate Management System',
    category: 'Cybersecurity & Cryptography',
    isFeatured: true,
    shortDescription:
      'Flask-based Public Key Infrastructure (PKI) system for issuing, validating, revoking, and auditing X.509 digital certificates through an administrative browser interface with role-based access control.',
    tags: ['Python', 'Flask', 'Cryptography', 'PKI', 'SQLite', 'Security'],
    github: 'https://github.com/DarshakBisane/X.509-Certificate',
    demo: null, // No deployed public demo; runs locally via Flask
    previewComponent: X509Preview,
    modal: {
      overview:
        'A security-focused web application implementing core Public Key Infrastructure (PKI) operations, enabling Certificate Authorities (CAs) and users to manage digital certificate lifecycles from initial request to revocation.',
      problem:
        'Managing digital certificates, private keys, Certificate Signing Requests (CSRs), and revocation lists is often complicated and error-prone when performed manually through command-line OpenSSL commands.',
      howItWorks:
        'Powered by Python and the pyca/cryptography library, the application allows users to generate asymmetric keypairs, create standardized CSRs, and submit them to a simulated Certificate Authority. Authorized CAs can digitally sign certificates, publish Certificate Revocation Lists (CRLs), and audit all actions in tamper-evident logs.',
      features: [
        'Full X.509 v3 digital certificate creation with configurable extensions and validity windows.',
        'PKCS#10 Certificate Signing Request (CSR) generation and parser.',
        'Certificate verification engine validating cryptographic signatures and issuer trust chains.',
        'Certificate revocation mechanism with automated Certificate Revocation List (CRL) generation.',
        'Role-Based Access Control (RBAC) separating regular user actions from Root/Intermediate CA controls.',
        'Comprehensive append-only security audit log recording all PKI lifecycle events.',
      ],
      techStack: [
        'Python 3',
        'Flask',
        'pyca/cryptography',
        'SQLite',
        'HTML5',
        'CSS3',
        'JavaScript',
      ],
      role: 'Architected the PKI workflow, implemented cryptographic certificate generation and verification routines using Python’s cryptography library, built the RBAC authentication system, and authored documentation.',
    },
  },
  {
    id: 'laxmanrekha-ai',
    title: 'LaxmanRekha AI',
    category: 'Responsible AI & Fintech Security',
    isFeatured: false,
    shortDescription:
      'AI trust and verification layer for banking decisions that validates customer evidence, checks cross-document consistency, and computes a deterministic trust score (0–100) before final banking actions.',
    tags: ['Python', 'FastAPI', 'React 19', 'TypeScript', 'Gemini API', 'PostgreSQL', 'Docker'],
    github: 'https://github.com/DarshakBisane/LaxmanRekha-AI',
    demo: 'https://laxman-rekha-ai.vercel.app/dashboard',
    previewComponent: LaxmanRekhaPreview,
    modal: {
      overview:
        'An AI Trust & Verification Layer positioned between automated banking models (e.g., loan underwriting or credit checks) and final banking decisions to guarantee that supporting evidence is authentic and compliant with credit policy.',
      problem:
        'Predictive AI in fintech processes applications in milliseconds, but cannot independently verify whether customer-submitted instruments (salary slips, bank statements, identity cards) are forged, inconsistent, or manipulated.',
      howItWorks:
        'Extracts textual and tabular evidence from uploaded documents using PyMuPDF and OCR. Compares identity fields across multiple instruments using fuzzy string normalization. Evaluates document integrity heuristics (metadata streams, font layers) and calculates a mathematical, deterministic Trust Score (0–100) to route low-risk cases or enforce mandatory human review.',
      features: [
        'Deterministic mathematical Trust Score: 30% Identity + 20% Integrity + 15% Consistency + 10% OCR + 15% Source + 10% Transaction.',
        'Cross-document consistency engine matching names, dates, and amounts across disparate PDFs.',
        'Document integrity heuristics inspecting font encoding, metadata streams, and compression artifacts.',
        'Policy knowledge RAG providing semantic vector search over underwriting guidelines.',
        'Google Gemini synthesis with prompt-injection defense for human-readable audit explanations.',
        'Append-only tamper-evident audit trail for certified human reviewer sign-off.',
      ],
      techStack: [
        'Python 3.12',
        'FastAPI',
        'React 19',
        'TypeScript',
        'PostgreSQL (Neon)',
        'Upstash Redis',
        'PyMuPDF',
        'Google Gemini 2.5/1.5',
        'Docker',
      ],
      role: 'Developed the backend verification heuristics, structured the deterministic trust scoring formula, created FastAPI API endpoints, and integrated the React dashboard interface.',
    },
  },
  {
    id: 'ai-resume-analyzer',
    title: 'AI Resume Analyzer',
    category: 'AI & Career Technology',
    isFeatured: false,
    shortDescription:
      'Intelligent resume analysis platform designed to parse candidate resumes, extract key technical competencies, evaluate ATS readability, and provide actionable feedback to improve job application success.',
    tags: ['React', 'JavaScript', 'CSS3', 'NLP', 'Vercel'],
    github: 'https://github.com/DarshakBisane/AI-Resume_Analyzer',
    demo: 'https://ai-resume-analyzer-seven-taupe.vercel.app',
    previewComponent: ResumePreview,
    modal: {
      overview:
        'A career technology web application designed to help job applicants optimize their resumes for automated Applicant Tracking Systems (ATS) and hiring managers by identifying profile gaps and structural weaknesses.',
      problem:
        'Over 75% of online job applications are screened out by automated ATS software before reaching human recruiters, often due to missing keywords, unstructured formatting, or weak impact metrics.',
      howItWorks:
        'The application parses uploaded resumes, extracts structured entities (technical skills, work history, education, certifications), evaluates keyword alignment against target software engineering roles, and generates a structured feedback dashboard with an ATS compatibility score.',
      features: [
        'Automated resume parsing and structured section extraction.',
        'Keyword density and technical competency benchmark scoring.',
        'Readability and formatting evaluation with ATS recommendations.',
        'Detailed category breakdowns for skills, experience, and educational credentials.',
        'Interactive, responsive React user interface deployed to Vercel.',
      ],
      techStack: [
        'React',
        'JavaScript (ES6+)',
        'Modern Vanilla CSS',
        'FontAwesome Icons',
        'Vercel Deployment',
      ],
      role: 'Designed and built the React frontend application, implemented client-side parsing and scoring algorithms, created the evaluation dashboard, and deployed to production.',
    },
  },
  {
    id: 'student-platform',
    title: 'Student Performance & Management Platform',
    category: 'Backend Engineering & Databases',
    isFeatured: false,
    shortDescription:
      'Modular academic management backend API built with FastAPI and SQLAlchemy for tracking student records, course enrollments, and academic performance metrics with strict schema validation.',
    tags: ['Python', 'FastAPI', 'SQLAlchemy', 'Pydantic', 'PostgreSQL'],
    github: 'https://github.com/DarshakBisane/Student-Performance-and-Management-Platform',
    demo: null, // Local backend API
    previewComponent: StudentPreview,
    modal: {
      overview:
        'A high-performance RESTful API service built with FastAPI and SQLAlchemy to handle institutional student records, course enrollments, grade calculations, and academic performance tracking.',
      problem:
        'Educational platforms require robust, type-safe backend systems to store longitudinal student performance metrics, manage relational entities, and prevent data inconsistency.',
      howItWorks:
        'Provides RESTful API endpoints utilizing Pydantic models for strict request validation and response serialization. Relational data tables are managed through SQLAlchemy ORM, supporting foreign key relationships between students, courses, enrollments, and grade records.',
      features: [
        'Asynchronous REST API endpoints built with modern FastAPI.',
        'Relational data modeling with SQLAlchemy ORM and PostgreSQL / SQLite.',
        'Strict request payload and query validation via Pydantic schemas.',
        'Performance tracking calculations across student coursework histories.',
        'Auto-generated OpenAPI (Swagger UI) documentation for easy client integration.',
      ],
      techStack: [
        'Python 3',
        'FastAPI',
        'SQLAlchemy 2.0',
        'Pydantic',
        'Uvicorn',
      ],
      role: 'Designed the relational database schema, authored Pydantic data schemas and validation logic, implemented the REST API endpoints, and structured the modular project repository.',
    },
  },
]

export default function ProjectsSection() {
  const [showMore, setShowMore] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)

  // Listen for Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedProject(null)
      }
    }

    if (selectedProject) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedProject])

  const visibleProjects = showMore
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter((p) => p.isFeatured)

  return (
    <div className="section-wrapper animate-content" style={{ width: '100%' }}>
      {/* Section Header with Aligned More Projects Action */}
      <div className="projects-header-container">
        <div className="projects-header-center">
          <h2 className="editorial-heading">Projects</h2>
          <p className="editorial-subheading">
            Selected engineering projects & technical architectures from my GitHub
          </p>
        </div>

        <div className="projects-header-action">
          <button
            type="button"
            className="projects-toggle-btn"
            onClick={() => setShowMore((prev) => !prev)}
            aria-expanded={showMore}
            aria-controls="projects-grid"
          >
            <span>{showMore ? 'Show Less' : 'More Projects'}</span>
            {showMore ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
          </button>
        </div>
      </div>

      {/* Projects Grid: 3 Featured Initially, 6 when Expanded */}
      <div id="projects-grid" className="projects-grid">
        {visibleProjects.map((project) => {
          const Preview = project.previewComponent
          return (
            <div key={project.id} className="liquid-glass-card project-card">
              {/* Technical Preview Illustration */}
              <div className="project-card-preview-frame">
                <Preview />
              </div>

              {/* Card Main Content */}
              <div className="project-card-body">
                <div className="project-card-header">
                  <span className="project-category-badge">{project.category}</span>
                </div>

                <h3 className="project-card-title">{project.title}</h3>

                <p className="project-card-desc">{project.shortDescription}</p>

                {/* Tech Chips */}
                <div className="project-card-tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="glass-chip">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Action Bar */}
              <div className="project-card-footer">
                <div className="project-card-links-left">
                  {/* Live Demo or Subtle Unavailable Chip */}
                  {project.demo ? (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="project-action-link"
                      title={`Open live demo for ${project.title}`}
                    >
                      <ExternalLink size={13} />
                      <span>Live Demo</span>
                    </a>
                  ) : (
                    <span className="project-demo-unavailable" title="No public deployment available">
                      <span>Not deployed yet</span>
                    </span>
                  )}

                  {/* GitHub Source Link */}
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="project-action-link github"
                    title={`View ${project.title} on GitHub`}
                  >
                    <GithubIcon size={14} />
                    <span>GitHub</span>
                  </a>
                </div>

                {/* View Details Button */}
                <button
                  type="button"
                  className="project-details-btn"
                  onClick={() => setSelectedProject(project)}
                  aria-label={`View full details for ${project.title}`}
                >
                  <span>View Details</span>
                  <ArrowUpRight size={14} />
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Detailed Project Modal */}
      {selectedProject && (
        <div
          className="project-modal-backdrop"
          onClick={() => setSelectedProject(null)}
          role="presentation"
        >
          <div
            className="project-modal-dialog"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-project-title"
          >
            {/* Modal Header */}
            <div className="project-modal-header">
              <div>
                <span className="project-category-badge">{selectedProject.category}</span>
                <h3 id="modal-project-title" className="project-modal-title">
                  {selectedProject.title}
                </h3>
              </div>
              <button
                type="button"
                className="project-modal-close"
                onClick={() => setSelectedProject(null)}
                aria-label="Close details dialog"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="project-modal-body">
              {/* Overview */}
              <div className="project-modal-section">
                <h4 className="project-modal-section-title">Project Overview</h4>
                <p className="project-modal-text">{selectedProject.modal.overview}</p>
              </div>

              {/* Problem Statement */}
              <div className="project-modal-section">
                <h4 className="project-modal-section-title">Problem It Addresses</h4>
                <p className="project-modal-text">{selectedProject.modal.problem}</p>
              </div>

              {/* How It Works */}
              <div className="project-modal-section">
                <h4 className="project-modal-section-title">How It Works</h4>
                <p className="project-modal-text">{selectedProject.modal.howItWorks}</p>
              </div>

              {/* Key Implemented Features */}
              <div className="project-modal-section">
                <h4 className="project-modal-section-title">Key Implemented Features</h4>
                <ul className="project-modal-bullets">
                  {selectedProject.modal.features.map((feature, fIdx) => (
                    <li key={fIdx} className="project-modal-bullet-item">
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technology Stack */}
              <div className="project-modal-section">
                <h4 className="project-modal-section-title">Technology Stack</h4>
                <div className="project-modal-tags">
                  {selectedProject.modal.techStack.map((tech) => (
                    <span key={tech} className="glass-chip accent">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Role & Contribution */}
              <div className="project-modal-section">
                <h4 className="project-modal-section-title">Implementation & Contribution</h4>
                <p className="project-modal-text">{selectedProject.modal.role}</p>
              </div>
            </div>

            {/* Modal Footer with Actions */}
            <div className="project-modal-footer">
              <div className="project-modal-links">
                {selectedProject.demo ? (
                  <a
                    href={selectedProject.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-glass-primary"
                  >
                    <ExternalLink size={14} />
                    <span>Open Live Demo</span>
                  </a>
                ) : (
                  <span className="project-demo-unavailable-modal">
                    Not deployed yet (Local server / backend project)
                  </span>
                )}

                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-glass-secondary"
                >
                  <GithubIcon size={15} />
                  <span>View Repository</span>
                </a>
              </div>

              <button
                type="button"
                className="btn-glass-secondary"
                onClick={() => setSelectedProject(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

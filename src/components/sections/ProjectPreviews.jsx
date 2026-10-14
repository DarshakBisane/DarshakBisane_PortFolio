export function NoIssuePreview() {
  return (
    <div className="project-preview-container" aria-hidden="true">
      <svg viewBox="0 0 340 130" fill="none" className="project-preview-svg">
        {/* Abstract Ticket Card Frame */}
        <rect x="20" y="16" width="300" height="98" rx="8" fill="rgba(255, 255, 255, 0.02)" stroke="rgba(255, 255, 255, 0.09)" strokeWidth="1" />
        
        {/* Ticket Header & Status Tag */}
        <text x="36" y="38" fill="var(--text-white)" fontSize="11" fontFamily="var(--font-mono)" fontWeight="600" letterSpacing="0.05em">
          TICKET #1042 — API Latency Spike
        </text>
        <rect x="236" y="27" width="70" height="16" rx="4" fill="rgba(255, 255, 255, 0.06)" stroke="rgba(255, 255, 255, 0.15)" />
        <text x="271" y="38" fill="var(--text-lightgrey)" fontSize="8.5" fontFamily="var(--font-mono)" textAnchor="middle">
          AI TRIAGED
        </text>
        
        {/* Pipeline Nodes & Diagnostic Flow */}
        <line x1="36" y1="52" x2="304" y2="52" stroke="rgba(255, 255, 255, 0.05)" strokeDasharray="3 3" />
        
        {/* Step 1: Ingestion */}
        <rect x="36" y="62" width="72" height="40" rx="5" fill="rgba(255, 255, 255, 0.03)" stroke="rgba(255, 255, 255, 0.08)" />
        <text x="72" y="77" fill="var(--text-midgrey)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">RAG Context</text>
        <text x="72" y="91" fill="var(--text-white)" fontSize="9" fontFamily="var(--font-mono)" fontWeight="500" textAnchor="middle">4 Docs Match</text>
        
        {/* Arrow 1 */}
        <path d="M114 82 L124 82 M121 78 L125 82 L121 86" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1.2" strokeLinecap="round" />
        
        {/* Step 2: Root Cause Diagnosis */}
        <rect x="132" y="62" width="86" height="40" rx="5" fill="rgba(255, 255, 255, 0.04)" stroke="rgba(255, 255, 255, 0.12)" />
        <text x="175" y="77" fill="var(--text-midgrey)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">Gemini Analysis</text>
        <text x="175" y="91" fill="var(--text-white)" fontSize="9" fontFamily="var(--font-mono)" fontWeight="500" textAnchor="middle">Redis Pool Lock</text>
        
        {/* Arrow 2 */}
        <path d="M224 82 L234 82 M231 78 L235 82 L231 86" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1.2" strokeLinecap="round" />
        
        {/* Step 3: Suggested Resolution */}
        <rect x="242" y="62" width="62" height="40" rx="5" fill="rgba(255, 255, 255, 0.05)" stroke="rgba(255, 255, 255, 0.18)" />
        <text x="273" y="77" fill="var(--text-midgrey)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">Resolution</text>
        <text x="273" y="91" fill="var(--text-white)" fontSize="9" fontFamily="var(--font-mono)" fontWeight="600" textAnchor="middle">Ready</text>
      </svg>
    </div>
  )
}

export function PcpPreview() {
  return (
    <div className="project-preview-container" aria-hidden="true">
      <svg viewBox="0 0 340 130" fill="none" className="project-preview-svg">
        <rect x="20" y="16" width="300" height="98" rx="8" fill="rgba(255, 255, 255, 0.02)" stroke="rgba(255, 255, 255, 0.09)" strokeWidth="1" />
        
        {/* Header Label */}
        <text x="36" y="38" fill="var(--text-white)" fontSize="11" fontFamily="var(--font-mono)" fontWeight="600">
          PCP SEQUENCE EVALUATION
        </text>
        <text x="290" y="38" fill="var(--text-midgrey)" fontSize="9" fontFamily="var(--font-mono)" textAnchor="end">
          DEPTH: 3
        </text>
        
        {/* Domino / Tile String Blocks */}
        {/* Tile 1 */}
        <g transform="translate(36, 52)">
          <rect width="65" height="24" rx="4" fill="rgba(255, 255, 255, 0.05)" stroke="rgba(255, 255, 255, 0.12)" />
          <text x="32" y="16" fill="var(--text-white)" fontSize="10" fontFamily="var(--font-mono)" textAnchor="middle">Top: 101</text>
          
          <rect y="28" width="65" height="24" rx="4" fill="rgba(255, 255, 255, 0.03)" stroke="rgba(255, 255, 255, 0.08)" />
          <text x="32" y="44" fill="var(--text-lightgrey)" fontSize="10" fontFamily="var(--font-mono)" textAnchor="middle">Btm: 10</text>
        </g>
        
        {/* Tile 2 */}
        <g transform="translate(108, 52)">
          <rect width="60" height="24" rx="4" fill="rgba(255, 255, 255, 0.05)" stroke="rgba(255, 255, 255, 0.12)" />
          <text x="30" y="16" fill="var(--text-white)" fontSize="10" fontFamily="var(--font-mono)" textAnchor="middle">Top: 0</text>
          
          <rect y="28" width="60" height="24" rx="4" fill="rgba(255, 255, 255, 0.03)" stroke="rgba(255, 255, 255, 0.08)" />
          <text x="30" y="44" fill="var(--text-lightgrey)" fontSize="10" fontFamily="var(--font-mono)" textAnchor="middle">Btm: 010</text>
        </g>
        
        {/* Concatenation Comparison Result */}
        <g transform="translate(182, 52)">
          <rect width="122" height="52" rx="6" fill="rgba(255, 255, 255, 0.04)" stroke="rgba(255, 255, 255, 0.16)" />
          <text x="12" y="20" fill="var(--text-midgrey)" fontSize="8.5" fontFamily="var(--font-mono)">STR_A: 1010</text>
          <text x="12" y="34" fill="var(--text-midgrey)" fontSize="8.5" fontFamily="var(--font-mono)">STR_B: 10010</text>
          <text x="110" y="45" fill="var(--text-white)" fontSize="8" fontFamily="var(--font-mono)" fontWeight="600" textAnchor="end">PREFIX MISMATCH</text>
        </g>
      </svg>
    </div>
  )
}

export function X509Preview() {
  return (
    <div className="project-preview-container" aria-hidden="true">
      <svg viewBox="0 0 340 130" fill="none" className="project-preview-svg">
        <rect x="20" y="16" width="300" height="98" rx="8" fill="rgba(255, 255, 255, 0.02)" stroke="rgba(255, 255, 255, 0.09)" strokeWidth="1" />
        
        {/* Header with Security Shield Icon */}
        <path d="M40 28 L46 25 L52 28 C52 35 46 39 46 39 C46 39 40 35 40 28 Z" stroke="var(--text-white)" strokeWidth="1.2" fill="none" />
        <text x="60" y="36" fill="var(--text-white)" fontSize="11" fontFamily="var(--font-mono)" fontWeight="600">
          X.509 v3 CERTIFICATE
        </text>
        <rect x="236" y="27" width="70" height="16" rx="4" fill="rgba(255, 255, 255, 0.06)" stroke="rgba(255, 255, 255, 0.15)" />
        <text x="271" y="38" fill="var(--text-white)" fontSize="8.5" fontFamily="var(--font-mono)" textAnchor="middle">
          CA SIGNED
        </text>
        
        <line x1="36" y1="48" x2="304" y2="48" stroke="rgba(255, 255, 255, 0.05)" />
        
        {/* Certificate Fields Breakdown */}
        <g transform="translate(36, 56)">
          <text x="0" y="12" fill="var(--text-midgrey)" fontSize="8.5" fontFamily="var(--font-mono)">ISSUER: CN=Root CA, O=PKI Security Lab</text>
          <text x="0" y="26" fill="var(--text-midgrey)" fontSize="8.5" fontFamily="var(--font-mono)">SUBJECT: CN=internal.secure.local</text>
          <text x="0" y="40" fill="var(--text-midgrey)" fontSize="8.5" fontFamily="var(--font-mono)">ALGORITHM: sha256WithRSAEncryption</text>
          <text x="0" y="52" fill="var(--text-lightgrey)" fontSize="8" fontFamily="var(--font-mono)">STATUS: VALID • CRL SYNCED • AUDIT LOGGED</text>
        </g>
      </svg>
    </div>
  )
}

export function LaxmanRekhaPreview() {
  return (
    <div className="project-preview-container" aria-hidden="true">
      <svg viewBox="0 0 340 130" fill="none" className="project-preview-svg">
        <rect x="20" y="16" width="300" height="98" rx="8" fill="rgba(255, 255, 255, 0.02)" stroke="rgba(255, 255, 255, 0.09)" strokeWidth="1" />
        
        <text x="36" y="38" fill="var(--text-white)" fontSize="11" fontFamily="var(--font-mono)" fontWeight="600">
          AI TRUST VERIFICATION LAYER
        </text>
        <rect x="226" y="27" width="80" height="16" rx="4" fill="rgba(255, 255, 255, 0.06)" stroke="rgba(255, 255, 255, 0.15)" />
        <text x="266" y="38" fill="var(--text-white)" fontSize="8.5" fontFamily="var(--font-mono)" textAnchor="middle">
          LOW RISK (88%)
        </text>
        
        <line x1="36" y1="48" x2="304" y2="48" stroke="rgba(255, 255, 255, 0.05)" />
        
        {/* Verification Checkmarks */}
        <g transform="translate(36, 62)">
          <circle cx="6" cy="6" r="5" stroke="var(--text-white)" strokeWidth="1.2" fill="none" />
          <path d="M4 6 L5.5 8 L8.5 4" stroke="var(--text-white)" strokeWidth="1" />
          <text x="18" y="10" fill="var(--text-lightgrey)" fontSize="8.5" fontFamily="var(--font-mono)">Identity Consistency: Pass</text>
          
          <circle cx="6" cy="24" r="5" stroke="var(--text-white)" strokeWidth="1.2" fill="none" />
          <path d="M4 24 L5.5 26 L8.5 22" stroke="var(--text-white)" strokeWidth="1" />
          <text x="18" y="28" fill="var(--text-lightgrey)" fontSize="8.5" fontFamily="var(--font-mono)">Cross-Document OCR: Pass</text>
          
          <circle cx="6" cy="42" r="5" stroke="var(--text-white)" strokeWidth="1.2" fill="none" />
          <path d="M4 42 L5.5 44 L8.5 40" stroke="var(--text-white)" strokeWidth="1" />
          <text x="18" y="46" fill="var(--text-lightgrey)" fontSize="8.5" fontFamily="var(--font-mono)">Policy Guidance RAG: Compliant</text>
        </g>
        
        {/* Trust Score Gauge Card */}
        <g transform="translate(216, 56)">
          <rect width="90" height="46" rx="6" fill="rgba(255, 255, 255, 0.04)" stroke="rgba(255, 255, 255, 0.14)" />
          <text x="45" y="20" fill="var(--text-midgrey)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">TRUST SCORE</text>
          <text x="45" y="38" fill="var(--text-white)" fontSize="16" fontFamily="var(--font-mono)" fontWeight="700" textAnchor="middle">88/100</text>
        </g>
      </svg>
    </div>
  )
}

export function ResumePreview() {
  return (
    <div className="project-preview-container" aria-hidden="true">
      <svg viewBox="0 0 340 130" fill="none" className="project-preview-svg">
        <rect x="20" y="16" width="300" height="98" rx="8" fill="rgba(255, 255, 255, 0.02)" stroke="rgba(255, 255, 255, 0.09)" strokeWidth="1" />
        
        <text x="36" y="38" fill="var(--text-white)" fontSize="11" fontFamily="var(--font-mono)" fontWeight="600">
          RESUME EVALUATION BENCHMARK
        </text>
        <rect x="236" y="27" width="70" height="16" rx="4" fill="rgba(255, 255, 255, 0.06)" stroke="rgba(255, 255, 255, 0.15)" />
        <text x="271" y="38" fill="var(--text-white)" fontSize="8.5" fontFamily="var(--font-mono)" textAnchor="middle">
          ATS: 92/100
        </text>
        
        <line x1="36" y1="48" x2="304" y2="48" stroke="rgba(255, 255, 255, 0.05)" />
        
        {/* Resume Wireframe & Skill Chips */}
        <g transform="translate(36, 60)">
          <rect width="130" height="4" rx="2" fill="rgba(255, 255, 255, 0.2)" />
          <rect y="10" width="100" height="3" rx="1.5" fill="rgba(255, 255, 255, 0.1)" />
          <rect y="18" width="120" height="3" rx="1.5" fill="rgba(255, 255, 255, 0.1)" />
          <rect y="26" width="90" height="3" rx="1.5" fill="rgba(255, 255, 255, 0.1)" />
          <rect y="34" width="115" height="3" rx="1.5" fill="rgba(255, 255, 255, 0.1)" />
        </g>
        
        <g transform="translate(186, 56)">
          <rect width="118" height="20" rx="4" fill="rgba(255, 255, 255, 0.04)" stroke="rgba(255, 255, 255, 0.09)" />
          <text x="59" y="14" fill="var(--text-lightgrey)" fontSize="8.5" fontFamily="var(--font-mono)" textAnchor="middle">Keywords: 94% Match</text>
          
          <rect y="26" width="118" height="20" rx="4" fill="rgba(255, 255, 255, 0.04)" stroke="rgba(255, 255, 255, 0.09)" />
          <text x="59" y="40" fill="var(--text-lightgrey)" fontSize="8.5" fontFamily="var(--font-mono)" textAnchor="middle">Impact Scoring: High</text>
        </g>
      </svg>
    </div>
  )
}

export function StudentPreview() {
  return (
    <div className="project-preview-container" aria-hidden="true">
      <svg viewBox="0 0 340 130" fill="none" className="project-preview-svg">
        <rect x="20" y="16" width="300" height="98" rx="8" fill="rgba(255, 255, 255, 0.02)" stroke="rgba(255, 255, 255, 0.09)" strokeWidth="1" />
        
        {/* Terminal Header */}
        <circle cx="36" cy="34" r="3" fill="rgba(255, 255, 255, 0.2)" />
        <circle cx="46" cy="34" r="3" fill="rgba(255, 255, 255, 0.2)" />
        <circle cx="56" cy="34" r="3" fill="rgba(255, 255, 255, 0.2)" />
        <text x="70" y="37" fill="var(--text-white)" fontSize="10.5" fontFamily="var(--font-mono)" fontWeight="600">
          FASTAPI ENDPOINT MONITOR
        </text>
        <text x="290" y="37" fill="var(--text-white)" fontSize="9" fontFamily="var(--font-mono)" textAnchor="end">
          200 OK
        </text>
        
        <line x1="20" y1="48" x2="320" y2="48" stroke="rgba(255, 255, 255, 0.05)" />
        
        {/* Terminal JSON Payload Output */}
        <g transform="translate(36, 56)">
          <text x="0" y="12" fill="var(--text-midgrey)" fontSize="8.5" fontFamily="var(--font-mono)">GET /api/v1/students/42/performance</text>
          <text x="0" y="26" fill="var(--text-lightgrey)" fontSize="8.5" fontFamily="var(--font-mono)">&#123; gpa: 3.88, courses_completed: 24, status: &quot;active&quot; &#125;</text>
          <text x="0" y="40" fill="var(--text-midgrey)" fontSize="8" fontFamily="var(--font-mono)">SQLAlchemy ORM • Pydantic Schema Validated</text>
          <text x="0" y="52" fill="var(--text-midgrey)" fontSize="8" fontFamily="var(--font-mono)">Response: 14ms • Schema: Strict</text>
        </g>
      </svg>
    </div>
  )
}

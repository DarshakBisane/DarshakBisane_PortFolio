import { Brain, Code, Cpu, Database, Server, Terminal } from 'lucide-react'
import './sections.css'

export default function SkillsSection() {
  const skillCategories = [
    {
      title: 'Programming Languages',
      icon: Code,
      skills: [
        { name: 'Python', level: 'Primary', exp: 'Research, model engineering & production APIs' },
        { name: 'C++', level: 'Proficient', exp: 'Algorithms, low-level optimization & SIMD' },
        { name: 'TypeScript', level: 'Proficient', exp: 'Modern typed frontend & full-stack development' },
        { name: 'JavaScript', level: 'Proficient', exp: 'ES6+, DOM architecture & asynchronous runtimes' },
        { name: 'SQL', level: 'Proficient', exp: 'Complex queries, schema design & query indexing' },
        { name: 'Bash / Shell', level: 'Comfortable', exp: 'Automation scripts, Linux workflows & CLI tools' },
      ],
    },
    {
      title: 'Machine Learning & AI',
      icon: Brain,
      skills: [
        { name: 'PyTorch', level: 'Primary', exp: 'Model development, autograd & fine-tuning' },
        { name: 'TensorFlow / Keras', level: 'Proficient', exp: 'Model pipelines & legacy architectures' },
        { name: 'Hugging Face', level: 'Advanced', exp: 'Transformers, PEFT, LoRA & tokenization' },
        { name: 'Scikit-Learn', level: 'Advanced', exp: 'Supervised/unsupervised algorithms & feature pipelines' },
        { name: 'OpenCV', level: 'Proficient', exp: 'Computer vision preprocessing & spatial filtering' },
        { name: 'LangChain & RAG', level: 'Proficient', exp: 'Vector search indexing & agentic workflows' },
      ],
    },
    {
      title: 'Backend & Systems',
      icon: Server,
      skills: [
        { name: 'FastAPI', level: 'Advanced', exp: 'High-throughput asynchronous ML API services' },
        { name: 'React.js', level: 'Proficient', exp: 'Component architecture, state & modern hooks' },
        { name: 'Node.js / Express', level: 'Proficient', exp: 'REST APIs, middleware & microservices' },
        { name: 'Next.js', level: 'Proficient', exp: 'SSR/SSG, App Router & modern web architecture' },
        { name: 'Flask', level: 'Proficient', exp: 'Microservices & rapid algorithmic prototyping' },
      ],
    },
    {
      title: 'Data & DevOps Tools',
      icon: Database,
      skills: [
        { name: 'PostgreSQL', level: 'Proficient', exp: 'Relational data modeling & ACID transactions' },
        { name: 'Redis', level: 'Proficient', exp: 'In-memory caching, message queuing & rate limiting' },
        { name: 'Docker', level: 'Proficient', exp: 'Containerization & multi-stage build workflows' },
        { name: 'Git & GitHub', level: 'Advanced', exp: 'Version control, CI/CD actions & pull requests' },
        { name: 'Linux / Unix', level: 'Advanced', exp: 'Environment config, server administration & profiling' },
      ],
    },
  ]

  return (
    <div className="section-wrapper animate-content">
      {/* Centered Editorial Heading */}
      <div className="editorial-section-header">
        <h2 className="editorial-heading">Skills</h2>
      </div>

      <div className="cards-grid-2">
        {skillCategories.map((cat, idx) => {
          const Icon = cat.icon
          return (
            <div key={idx} className="liquid-glass-card">
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  marginBottom: '1.25rem',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                  paddingBottom: '0.75rem',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: 'var(--text-white)',
                  }}
                >
                  <Icon size={16} />
                </div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 500, color: 'var(--text-white)' }}>
                  {cat.title}
                </h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {cat.skills.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.2rem',
                      padding: '0.5rem 0.65rem',
                      borderRadius: '6px',
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '0.88rem', fontWeight: 500, color: 'var(--text-white)' }}>
                        {skill.name}
                      </span>
                      <span
                        style={{
                          fontSize: '0.7rem',
                          fontFamily: 'var(--font-mono)',
                          color: skill.level === 'Primary' || skill.level === 'Advanced' ? '#ffffff' : 'var(--text-midgrey)',
                          background: skill.level === 'Primary' || skill.level === 'Advanced' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.04)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          padding: '0.15rem 0.45rem',
                          borderRadius: '4px',
                        }}
                      >
                        {skill.level}
                      </span>
                    </div>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-midgrey)' }}>
                      {skill.exp}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

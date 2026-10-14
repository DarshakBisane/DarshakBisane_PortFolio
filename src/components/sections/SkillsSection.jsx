import { Brain, Code, Database, Globe, Terminal } from 'lucide-react'
import {
  CppIcon,
  CssIcon,
  DockerIcon,
  FastApiIcon,
  GithubIcon,
  GitIcon,
  HtmlIcon,
  JavaIcon,
  JavaScriptIcon,
  KubernetesIcon,
  LlmIcon,
  MachineLearningIcon,
  MatplotlibIcon,
  NeonIcon,
  NlpIcon,
  NumpyIcon,
  PandasIcon,
  PostgresIcon,
  PydanticIcon,
  PythonIcon,
  RagIcon,
  RedisIcon,
  RenderIcon,
  ScikitLearnIcon,
  SqlIcon,
  VercelIcon,
} from '../icons/TechIcons'
import './sections.css'

export default function SkillsSection() {
  const topCategories = [
    {
      id: 'prog',
      title: 'Programming Languages',
      icon: Code,
      className: 'card-prog',
      skills: [
        { name: 'Java', icon: JavaIcon },
        { name: 'Python', icon: PythonIcon },
        { name: 'JavaScript', icon: JavaScriptIcon },
        { name: 'C++', icon: CppIcon },
        { name: 'SQL', icon: SqlIcon },
      ],
    },
    {
      id: 'db',
      title: 'Databases & Data Handling',
      icon: Database,
      className: 'card-db',
      skills: [
        { name: 'PostgreSQL', icon: PostgresIcon },
        { name: 'Neon', icon: NeonIcon },
        { name: 'NumPy', icon: NumpyIcon },
        { name: 'pandas', icon: PandasIcon },
      ],
    },
    {
      id: 'web',
      title: 'Web Technologies',
      icon: Globe,
      className: 'card-web',
      skills: [
        { name: 'HTML', icon: HtmlIcon },
        { name: 'CSS', icon: CssIcon },
      ],
    },
  ]

  const bottomCategories = [
    {
      id: 'ml',
      title: 'Machine Learning, AI & Data Science',
      icon: Brain,
      className: 'card-ml',
      skills: [
        { name: 'Machine Learning', icon: MachineLearningIcon },
        { name: 'scikit-learn', icon: ScikitLearnIcon },
        { name: 'Matplotlib', icon: MatplotlibIcon },
        { name: 'FastAPI', icon: FastApiIcon },
        { name: 'Pydantic', icon: PydanticIcon },
        { name: 'RAG', icon: RagIcon, learning: true },
        { name: 'NLP', icon: NlpIcon, learning: true },
        { name: 'LLMs', icon: LlmIcon, learning: true },
      ],
    },
    {
      id: 'tools',
      title: 'Tools, Platforms & Deployment',
      icon: Terminal,
      className: 'card-tools',
      skills: [
        { name: 'Git', icon: GitIcon },
        { name: 'GitHub', icon: GithubIcon },
        { name: 'Vercel', icon: VercelIcon },
        { name: 'Render', icon: RenderIcon },
        { name: 'Redis', icon: RedisIcon },
        { name: 'Docker', icon: DockerIcon },
        { name: 'Kubernetes', icon: KubernetesIcon, learning: true },
      ],
    },
  ]

  const renderCategoryCard = (category) => {
    const CategoryIcon = category.icon
    return (
      <div key={category.id} className={`skills-category-card ${category.className}`}>
        <div className="skills-category-header">
          <div className="skills-category-icon-frame" aria-hidden="true">
            <CategoryIcon size={14} />
          </div>
          <h3 className="skills-category-title">{category.title}</h3>
        </div>

        <div className={`skills-items-grid ${category.skills.length > 5 ? 'expanded-grid' : ''}`}>
          {category.skills.map((skill) => {
            const SkillIcon = skill.icon
            return (
              <div key={skill.name} className="skill-item" title={skill.name}>
                <div className="skill-item-main">
                  <span className="skill-icon-wrapper" aria-hidden="true">
                    <SkillIcon size={16} />
                  </span>
                  <span className="skill-name">{skill.name}</span>
                </div>
                {skill.learning && (
                  <span className="skill-badge-learning">Learning</span>
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="section-wrapper animate-content" style={{ width: '100%' }}>
      {/* Centered Editorial Heading */}
      <div className="editorial-section-header" style={{ marginBottom: '1.5rem' }}>
        <h2 className="editorial-heading">Skills</h2>
      </div>

      <div className="skills-inventory-container">
        {/* Top Row: Programming Languages, Databases & Data Handling, Web Technologies */}
        <div className="skills-grid-top">
          {topCategories.map(renderCategoryCard)}
        </div>

        {/* Bottom Row: Machine Learning, AI & Data Science, Tools, Platforms & Deployment */}
        <div className="skills-grid-bottom">
          {bottomCategories.map(renderCategoryCard)}
        </div>
      </div>
    </div>
  )
}

import { Award, CheckCircle, Flame, Trophy } from 'lucide-react'
import './sections.css'

export default function AchievementsSection() {
  const honors = [
    {
      title: 'National Smart India Hackathon Winner (1st Place)',
      issuer: 'Ministry of Education & AICTE',
      year: '2023',
      description:
        'Led a 6-member engineering team to design and deploy an automated aerial search-and-rescue object detection model operating on lightweight edge hardware, selected #1 out of 450+ competing institutions.',
      icon: Trophy,
      tag: 'Grand Champion',
    },
    {
      title: 'Kaggle Competitions: Expert Ranking & Silver Medalist',
      issuer: 'Kaggle / Google',
      year: '2024',
      description:
        'Ranked in top 5% among global participants in computer vision and tabular feature engineering challenges. Authored popular open-source notebooks with 800+ community upvotes.',
      icon: Award,
      tag: 'Top 5% Global',
    },
    {
      title: 'Deep Learning Specialization (5-Course Series)',
      issuer: 'DeepLearning.AI & Coursera (Andrew Ng)',
      year: '2023',
      description:
        'Comprehensive study of deep neural networks, backpropagation calculus, hyperparameter tuning, convolutional vision architectures, sequence models, and attention mechanisms.',
      icon: CheckCircle,
      tag: 'Certified',
    },
    {
      title: 'Competitive Programming: 600+ Algorithmic Challenges',
      issuer: 'LeetCode & Codeforces',
      year: 'Active',
      description:
        'Consistent problem solving focusing on graph theory, dynamic programming, segment trees, and bit manipulation. Top 8% ranking in global competitive contests.',
      icon: Flame,
      tag: 'Knight Rating',
    },
  ]

  return (
    <div className="section-wrapper animate-content">
      {/* Centered Editorial Heading */}
      <div className="editorial-section-header">
        <h2 className="editorial-heading">Achievements</h2>
      </div>

      <div className="cards-grid-2">
        {honors.map((item, idx) => {
          const Icon = item.icon
          return (
            <div key={idx} className="liquid-glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '34px',
                      height: '34px',
                      borderRadius: '8px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: 'var(--text-white)',
                    }}
                  >
                    <Icon size={16} />
                  </div>
                  <span
                    style={{
                      fontSize: '0.72rem',
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--text-white)',
                      background: 'rgba(255, 255, 255, 0.06)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '4px',
                      padding: '0.2rem 0.55rem',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {item.tag}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.1rem', fontWeight: 500, color: 'var(--text-white)', marginBottom: '0.35rem', lineHeight: 1.35 }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: 'var(--text-midgrey)', marginBottom: '0.75rem' }}>
                  {item.issuer} • {item.year}
                </p>

                <p style={{ fontSize: '0.88rem', color: 'var(--text-lightgrey)', lineHeight: 1.6 }}>
                  {item.description}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

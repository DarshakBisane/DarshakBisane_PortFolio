import { ExternalLink } from 'lucide-react'
import { useState } from 'react'
import { GithubIcon } from '../icons/SocialIcons'
import './sections.css'

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState('All')

  const projects = [
    {
      title: 'NeuroTrack-X: Multi-Object Detection & Edge Tracking',
      category: 'Computer Vision',
      description:
        'End-to-end edge computer vision pipeline integrating customized YOLOv8 with DeepSORT and TensorRT acceleration. Achieves 62 FPS on edge hardware with 91.4% MOTA tracking accuracy.',
      tags: ['PyTorch', 'YOLOv8', 'DeepSORT', 'TensorRT', 'OpenCV', 'CUDA'],
      github: 'https://github.com',
      demo: 'https://github.com',
      metrics: '62 FPS @ 1080p | 91.4% MOTA',
    },
    {
      title: 'AgenticRAG: Autonomous Multi-Agent Reasoning Engine',
      category: 'Machine Learning',
      description:
        'Hierarchical multi-agent reasoning system that combines hybrid vector-lexical search (Dense + BM25) with dynamic tool execution, self-reflection, and hallucination guardrails.',
      tags: ['LangChain', 'FastAPI', 'Qdrant', 'Llama-3', 'Python', 'Docker'],
      github: 'https://github.com',
      demo: 'https://github.com',
      metrics: 'Sub-220ms Retrieval | 94% Precision',
    },
    {
      title: 'FastTensor: SIMD & CUDA Accelerated Inference Runtime',
      category: 'Systems & Backend',
      description:
        'Lightweight, dependency-free tensor algebra runtime written in modern C++20 with custom AVX-512 vectorization and CUDA kernels for ultra-low latency forward passes.',
      tags: ['C++20', 'CUDA', 'SIMD / AVX-512', 'ONNX Runtime', 'CMake'],
      github: 'https://github.com',
      demo: 'https://github.com',
      metrics: '2.8x Speedup over Baseline C++',
    },
    {
      title: 'QuantEdge: Automated Model Quantization Pipeline',
      category: 'Machine Learning',
      description:
        'Post-training 4-bit and 8-bit quantization toolkit for open-source LLMs and Vision Transformers. Integrates activation-aware weight pruning with minimal perplexity degradation.',
      tags: ['PyTorch', 'bitsandbytes', 'Hugging Face', 'Weights & Biases'],
      github: 'https://github.com',
      demo: 'https://github.com',
      metrics: '65% VRAM Reduction | <0.8% Perplexity Loss',
    },
  ]

  const categories = ['All', 'Machine Learning', 'Computer Vision', 'Systems & Backend']

  const filteredProjects =
    activeFilter === 'All'
      ? projects
      : projects.filter((p) => p.category === activeFilter)

  return (
    <div className="section-wrapper animate-content">
      {/* Centered Editorial Heading */}
      <div className="editorial-section-header">
        <h2 className="editorial-heading">Projects</h2>

        {/* Filter Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '1rem', justifyContent: 'center' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveFilter(cat)}
              style={{
                padding: '0.35rem 0.8rem',
                borderRadius: '6px',
                fontSize: '0.8rem',
                fontFamily: 'var(--font-mono)',
                color: activeFilter === cat ? '#ffffff' : 'var(--text-midgrey)',
                background: activeFilter === cat ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                border: activeFilter === cat ? '1px solid rgba(255, 255, 255, 0.25)' : '1px solid rgba(255, 255, 255, 0.06)',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="cards-grid-2">
        {filteredProjects.map((project, idx) => (
          <div key={idx} className="liquid-glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
                <span
                  style={{
                    fontSize: '0.72rem',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--text-midgrey)',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}
                >
                  {project.category}
                </span>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`View ${project.title} on GitHub`}
                    style={{
                      color: 'var(--text-midgrey)',
                      padding: '0.3rem',
                      borderRadius: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      transition: 'color 0.2s ease',
                    }}
                    className="hover-bright"
                  >
                    <GithubIcon size={16} />
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`View demo for ${project.title}`}
                    style={{
                      color: 'var(--text-midgrey)',
                      padding: '0.3rem',
                      borderRadius: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      transition: 'color 0.2s ease',
                    }}
                    className="hover-bright"
                  >
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>

              <h3 style={{ fontSize: '1.15rem', fontWeight: 500, color: 'var(--text-white)', marginBottom: '0.65rem', lineHeight: 1.35 }}>
                {project.title}
              </h3>

              <p style={{ fontSize: '0.88rem', color: 'var(--text-lightgrey)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                {project.description}
              </p>
            </div>

            <div>
              {/* Performance Metric Badge */}
              <div
                style={{
                  fontSize: '0.74rem',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--text-white)',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '6px',
                  padding: '0.3rem 0.6rem',
                  marginBottom: '0.85rem',
                  display: 'inline-block',
                }}
              >
                ⚡ {project.metrics}
              </div>

              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                {project.tags.map((t, tIdx) => (
                  <span key={tIdx} className="glass-chip">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

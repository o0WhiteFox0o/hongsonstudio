import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import projectsData from '../data/projects.json'

gsap.registerPlugin(ScrollTrigger)

const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'interactive', label: 'Interactive' },
  { id: '3d', label: '3D' },
  { id: 'software', label: 'Software' },
  { id: 'vr-ar', label: 'VR / AR' },
  { id: 'simulation', label: 'Simulation' },
  { id: 'education', label: 'Education' },
  { id: 'creative', label: 'Creative' },
]

function ProjectVisual({ project }) {
  const isVideo = project.media?.thumbnail && project.media.thumbnail.endsWith('.mp4')

  if (isVideo) {
    return (
      <video
        src={project.media.thumbnail}
        className="project-card__media"
        loop
        muted
        autoPlay
        playsInline
      />
    )
  }

  if (project.media?.thumbnail) {
    return (
      <img
        src={project.media.thumbnail}
        alt={project.title}
        className="project-card__media"
        loading="lazy"
      />
    )
  }

  // Generative technical visual fallback
  return (
    <div className="project-card__media project-card__canvas-fallback" style={{
      background: 'radial-gradient(ellipse at top left, rgba(236, 34, 39, 0.18), transparent 70%), linear-gradient(145deg, #161622 0%, #0d0d14 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background cyber grid */}
      <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.18 }}>
        <defs>
          <pattern id={`grid-${project.id}`} width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M 32 0 L 0 0 0 32" fill="none" stroke="currentColor" strokeWidth="0.75" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#grid-${project.id})`} />
      </svg>
      {/* Abstract geometric icon representation */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        width: '64px',
        height: '64px',
        borderRadius: 'var(--radius-lg)',
        background: 'rgba(236, 34, 39, 0.1)',
        border: '1px solid rgba(236, 34, 39, 0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 0 30px rgba(236, 34, 39, 0.2)'
      }}>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="var(--color-accent)" strokeWidth="1.5">
          <circle cx="16" cy="16" r="10" strokeDasharray="3 3" />
          <path d="M16 8v16M8 16h16" />
        </svg>
      </div>
    </div>
  )
}

function ProjectCard({ project, onClick, cardRef }) {
  return (
    <div className="project-card" onClick={() => onClick(project)} ref={cardRef}>
      <ProjectVisual project={project} />
      <div className="project-card__overlay" />
      <div className="project-card__content">
        <div className="project-card__client">{project.client} — {project.year}</div>
        <h3 className="project-card__title">{project.title}</h3>
        <div className="project-card__tags">
          {project.technology.slice(0, 3).map((tech) => (
            <span key={tech} className="tag">{tech}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

function ProjectDetail({ project, onClose }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  if (!project) return null

  return (
    <div className={`project-detail ${project ? 'project-detail--open' : ''}`}>
      <button className="project-detail__close" onClick={onClose} aria-label="Close">×</button>
      <div className="project-detail__content">
        <div className="text-label" style={{ marginBottom: 'var(--space-4)' }}>
          {project.client} — {project.year}
        </div>
        <h2 className="text-heading" style={{ marginBottom: 'var(--space-6)' }}>
          {project.title}
        </h2>

        {/* Media */}
        {project.media?.video ? (
          <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginBottom: 'var(--space-10)', aspectRatio: '16/9' }}>
            <video
              src={project.media.video}
              autoPlay
              loop
              muted
              playsInline
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        ) : project.media?.thumbnail ? (
          <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginBottom: 'var(--space-10)' }}>
            <img src={project.media.thumbnail} alt={project.title} style={{ width: '100%' }} />
          </div>
        ) : (
          <div style={{
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            marginBottom: 'var(--space-10)',
            aspectRatio: '16/7',
            background: 'radial-gradient(ellipse at 30% 20%, rgba(236, 34, 39, 0.25), transparent 70%), linear-gradient(135deg, #181824 0%, #0a0a0f 100%)',
            border: '1px solid var(--color-border)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'var(--space-3)',
            position: 'relative'
          }}>
            <svg width="48" height="48" viewBox="0 0 32 32" fill="none" stroke="var(--color-accent)" strokeWidth="1.5">
              <circle cx="16" cy="16" r="12" strokeDasharray="4 4" />
              <path d="M16 10v12M10 16h12" />
            </svg>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              {project.category.join(' · ')}
            </span>
          </div>
        )}

        {/* Problem & Solution */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-10)', marginBottom: 'var(--space-10)' }}>
          <div>
            <h3 className="text-label" style={{ marginBottom: 'var(--space-3)' }}>Problem</h3>
            <p className="text-body">{project.problem}</p>
          </div>
          <div>
            <h3 className="text-label" style={{ marginBottom: 'var(--space-3)' }}>Solution</h3>
            <p className="text-body">{project.solution}</p>
          </div>
        </div>

        {/* Outcome */}
        <div style={{
          padding: 'var(--space-8)',
          background: 'var(--color-accent-dim)',
          borderRadius: 'var(--radius-lg)',
          borderLeft: '3px solid var(--color-accent)',
          marginBottom: 'var(--space-10)',
        }}>
          <h3 className="text-label" style={{ marginBottom: 'var(--space-3)', color: 'var(--color-accent)' }}>Outcome</h3>
          <p className="text-body" style={{ color: 'var(--color-text-primary)' }}>{project.outcome}</p>
        </div>

        {/* Meta Grid */}
        <div className="project-detail__meta">
          <div className="project-detail__meta-item">
            <h4>Technology</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)', marginTop: 'var(--space-2)' }}>
              {project.technology.map((t) => (
                <span key={t} className="tag tag--accent">{t}</span>
              ))}
            </div>
          </div>
          <div className="project-detail__meta-item">
            <h4>Role</h4>
            <p>{project.role}</p>
          </div>
          <div className="project-detail__meta-item">
            <h4>Deliverables</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {project.deliverables.map((d) => (
                <li key={d} style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-1)' }}>
                  › {d}
                </li>
              ))}
            </ul>
          </div>
          <div className="project-detail__meta-item">
            <h4>Category</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)', marginTop: 'var(--space-2)' }}>
              {project.category.map((c) => (
                <span key={c} className="tag">{c}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedProject, setSelectedProject] = useState(null)
  const sectionRef = useRef(null)
  const cardRefs = useRef([])

  const filteredProjects = activeFilter === 'all'
    ? projectsData
    : projectsData.filter((p) => p.category.includes(activeFilter))

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.projects-header', {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    // Animate cards on filter change
    cardRefs.current.forEach((card, i) => {
      if (!card) return
      gsap.fromTo(card, { opacity: 0, y: 30 }, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        delay: i * 0.08,
        ease: 'power2.out',
      })
    })
  }, [activeFilter])

  return (
    <section id="projects" className="section" ref={sectionRef} style={{ background: 'var(--color-bg-secondary)' }}>
      <div className="container">
        <div className="section-header projects-header">
          <div className="section-header__label">Selected Work</div>
          <h2 className="section-header__title text-heading">Projects</h2>
          <p className="section-header__description">
            Projects are our proof of capability. Each one represents a unique challenge solved through the intersection of creative vision and technical expertise.
          </p>
        </div>

        <div className="filter-bar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              className={`filter-btn ${activeFilter === cat.id ? 'filter-btn--active' : ''}`}
              onClick={() => setActiveFilter(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid grid--2" style={{ gap: 'var(--space-8)' }}>
          {filteredProjects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={setSelectedProject}
              cardRef={el => cardRefs.current[i] = el}
            />
          ))}
        </div>
      </div>

      {selectedProject && (
        <ProjectDetail project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </section>
  )
}

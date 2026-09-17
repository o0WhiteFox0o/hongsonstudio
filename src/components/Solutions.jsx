import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import solutionsData from '../data/solutions.json'

gsap.registerPlugin(ScrollTrigger)

export default function Solutions() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.solutions-header', {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      })

      // Animate progression stages
      gsap.from('.solution-stage', {
        opacity: 0,
        scale: 0.9,
        stagger: 0.1,
        duration: 0.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.solution-flow',
          start: 'top 85%',
        },
      })

      gsap.from('.solution-arrow', {
        opacity: 0,
        x: -10,
        stagger: 0.1,
        duration: 0.3,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.solution-flow',
          start: 'top 85%',
        },
      })

      // Animate solution cards
      gsap.from('.solution-card', {
        opacity: 0,
        y: 40,
        stagger: 0.12,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.solutions-grid',
          start: 'top 85%',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="solutions" className="section" ref={sectionRef}>
      <div className="container">
        <div className="section-header solutions-header">
          <div className="section-header__label">Beyond Projects</div>
          <h2 className="section-header__title text-heading">{solutionsData.headline}</h2>
          <p className="section-header__description">{solutionsData.subheadline}</p>
        </div>

        {/* Progression Flow */}
        <div className="solution-flow">
          {solutionsData.progression.map((stage, i) => (
            <div key={stage.stage} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
              {i > 0 && <span className="solution-arrow">→</span>}
              <div className={`solution-stage ${i >= 2 ? 'solution-stage--active' : ''}`}>
                {stage.stage}
              </div>
            </div>
          ))}
        </div>

        {/* Description text */}
        <div style={{
          textAlign: 'center',
          maxWidth: '600px',
          margin: '0 auto var(--space-16)',
          color: 'var(--color-text-secondary)',
          fontSize: 'var(--text-sm)',
          lineHeight: 1.7,
        }}>
          We don&apos;t just deliver projects — we build reusable systems, technical frameworks, and digital products that create compounding value over time.
        </div>

        {/* Solution Cards */}
        <div className="grid grid--2 solutions-grid">
          {solutionsData.solutions.map((sol) => (
            <div key={sol.id} className="card solution-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
                <span className="tag tag--accent">{sol.stage}</span>
              </div>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-xl)',
                fontWeight: 600,
                marginBottom: 'var(--space-4)',
              }}>
                {sol.title}
              </h3>
              <p style={{
                color: 'var(--color-text-secondary)',
                fontSize: 'var(--text-sm)',
                lineHeight: 1.7,
                marginBottom: 'var(--space-6)',
              }}>
                {sol.description}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
                {sol.capabilities.map((cap) => (
                  <span key={cap} className="tag">{cap}</span>
                ))}
              </div>

              <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: 'var(--space-4)' }}>
                <div className="text-label" style={{ marginBottom: 'var(--space-2)', fontSize: '0.65rem' }}>Target Audience</div>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)' }}>
                  {sol.targetAudience.join(' · ')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

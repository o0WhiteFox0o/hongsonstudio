import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import studioData from '../data/studio.json'

gsap.registerPlugin(ScrollTrigger)

export default function Studio() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.studio-header', {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      })

      gsap.from('.studio-identity', {
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.studio-identity',
          start: 'top 85%',
        },
      })

      gsap.from('.studio-value-item', {
        opacity: 0,
        x: -30,
        stagger: 0.1,
        duration: 0.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.studio-values',
          start: 'top 85%',
        },
      })

      gsap.from('.studio-info-item', {
        opacity: 0,
        y: 20,
        stagger: 0.08,
        duration: 0.4,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.studio-info',
          start: 'top 90%',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="studio" className="section" ref={sectionRef}>
      <div className="container">
        <div className="section-header studio-header">
          <div className="section-header__label">About Us</div>
          <h2 className="section-header__title text-heading">Studio</h2>
        </div>

        {/* Identity statement */}
        <div className="studio-identity" style={{
          maxWidth: '800px',
          marginBottom: 'var(--space-16)',
        }}>
          <p style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.25rem, 3vw, 2rem)',
            fontWeight: 500,
            lineHeight: 1.4,
            marginBottom: 'var(--space-8)',
          }}>
            {studioData.identity}
          </p>

          {studioData.philosophy.map((text, i) => (
            <p key={i} style={{
              color: 'var(--color-text-secondary)',
              fontSize: 'var(--text-base)',
              lineHeight: 1.8,
              marginBottom: 'var(--space-4)',
            }}>
              {text}
            </p>
          ))}
        </div>

        {/* Values */}
        <div className="studio-values" style={{ marginBottom: 'var(--space-16)' }}>
          {studioData.values.map((value) => (
            <div key={value.title} className="studio-value studio-value-item">
              <h3 className="studio-value__title">{value.title}</h3>
              <p className="studio-value__description">{value.description}</p>
            </div>
          ))}
        </div>

        {/* Company Info */}
        <div className="studio-info" style={{
          padding: 'var(--space-10)',
          background: 'var(--color-bg-secondary)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--color-border)',
        }}>
          <h3 style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: 'var(--color-text-tertiary)',
            marginBottom: 'var(--space-8)',
          }}>
            Corporate Information
          </h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 'var(--space-8)',
          }}>
            {[
              { label: 'Company', value: studioData.legalName },
              { label: 'Tax ID', value: studioData.taxId },
              { label: 'Legal Representative', value: studioData.legalRepresentative },
              { label: 'Established', value: studioData.established },
              { label: 'Website', value: studioData.website },
            ].map((info) => (
              <div key={info.label} className="studio-info-item">
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: 'var(--color-text-muted)',
                  marginBottom: 'var(--space-2)',
                }}>
                  {info.label}
                </div>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-text-primary)',
                }}>
                  {info.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

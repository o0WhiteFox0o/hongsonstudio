import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import servicesData from '../data/services.json'

gsap.registerPlugin(ScrollTrigger)

const SERVICE_ICONS = {
  creative: (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 20L16 12L20 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  '3d': (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 6L26 12V20L16 26L6 20V12L16 6Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M16 14V26" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6 12L16 18L26 12" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  software: (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="8" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 14L10 16L12 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 14L22 16L20 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17 13L15 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  interactive: (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="16" cy="16" r="9" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
      <circle cx="16" cy="7" r="2" fill="currentColor" />
      <circle cx="24" cy="20" r="2" fill="currentColor" />
      <circle cx="8" cy="20" r="2" fill="currentColor" />
    </svg>
  ),
  vr: (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="11" width="22" height="12" rx="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="17" r="3" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="20" cy="17" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M15 17H17" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  product: (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="6" width="16" height="20" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 22H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="16" cy="14" r="4" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  simulation: (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 24L12 16L16 20L22 10L26 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="16" r="2" fill="currentColor" />
      <circle cx="22" cy="10" r="2" fill="currentColor" />
    </svg>
  ),
  education: (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 8L6 14L16 20L26 14L16 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M10 17V22L16 25L22 22V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M26 14V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
}

export default function WhatWeDo() {
  const sectionRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section header animation
      gsap.from('.whatwedo-header', {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      })

      // Cards stagger animation
      cardsRef.current.forEach((card, i) => {
        if (!card) return
        gsap.from(card, {
          opacity: 0,
          y: 50,
          duration: 0.6,
          delay: i * 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
          },
        })
      })

      // Intersection diagram animation
      gsap.from('.intersection__diagram > *', {
        opacity: 0,
        y: 20,
        stagger: 0.15,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.intersection',
          start: 'top 85%',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="what-we-do" className="section" ref={sectionRef}>
      <div className="container">
        <div className="section-header whatwedo-header">
          <div className="section-header__label">{servicesData.headline}</div>
          <h2 className="section-header__title text-heading">{servicesData.headline}</h2>
          <p className="section-header__description">{servicesData.subheadline}</p>
        </div>

        <div className="intersection">
          <div className="intersection__diagram">
            <span>Creative</span>
            <span className="intersection__plus">+</span>
            <span>Technology</span>
            <span className="intersection__plus">+</span>
            <span>Experience</span>
          </div>
        </div>

        <div className="capability-grid">
          {servicesData.categories.map((cat, i) => (
            <div
              key={cat.id}
              className="capability-item"
              ref={el => cardsRef.current[i] = el}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect()
                e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
                e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
              }}
            >
              <div style={{ color: 'var(--color-accent)', marginBottom: 'var(--space-4)' }}>
                {SERVICE_ICONS[cat.icon] || SERVICE_ICONS.creative}
              </div>
              <h3 className="capability-item__title">{cat.title}</h3>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-4)', lineHeight: 1.6 }}>
                {cat.description}
              </p>
              <ul className="capability-item__list">
                {cat.services.slice(0, 4).map((svc) => (
                  <li key={svc}>{svc}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

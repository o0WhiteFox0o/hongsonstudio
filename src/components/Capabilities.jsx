import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const CAPABILITIES = [
  {
    category: 'Software Engineering',
    items: ['React / Next.js', 'Node.js / Python', 'REST & GraphQL APIs', 'Database Architecture', 'Cloud Infrastructure (AWS)', 'CI/CD Pipelines'],
  },
  {
    category: '3D & Real-time',
    items: ['Unity / Unreal Engine', 'Three.js / WebGL', 'Blender / Maya', 'Real-time Rendering', 'Photogrammetry', 'Procedural Generation'],
  },
  {
    category: 'Interactive Technology',
    items: ['TouchDesigner', 'Projection Mapping', 'Motion Capture', 'Sensor Integration', 'Custom Hardware', 'Gesture Recognition'],
  },
  {
    category: 'VR / AR / XR',
    items: ['Meta Quest Development', 'WebXR', 'ARKit / ARCore', 'Mixed Reality', 'Spatial Computing', '360° Video'],
  },
  {
    category: 'Creative Production',
    items: ['Art Direction', 'Motion Graphics', 'Visual Effects', 'Video Production', 'Sound Design', 'Brand Identity'],
  },
  {
    category: 'Data & Systems',
    items: ['Analytics Platforms', 'CMS Development', 'LMS Integration', 'Digital Twin Systems', 'Simulation Engines', 'AI / ML Integration'],
  },
]

export default function Capabilities() {
  const sectionRef = useRef(null)
  const itemRefs = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.capabilities-header', {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      })

      itemRefs.current.forEach((item, i) => {
        if (!item) return
        gsap.from(item, {
          opacity: 0,
          y: 30,
          duration: 0.5,
          delay: i * 0.06,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 92%',
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="capabilities"
      className="section"
      ref={sectionRef}
      style={{ background: 'var(--color-bg-secondary)' }}
    >
      <div className="container">
        <div className="section-header capabilities-header">
          <div className="section-header__label">Technical Stack</div>
          <h2 className="section-header__title text-heading">Capabilities</h2>
          <p className="section-header__description">
            Our technical capabilities span the full stack of creative technology — from low-level graphics programming to cloud-scale software systems.
          </p>
        </div>

        <div className="capability-grid">
          {CAPABILITIES.map((cap, i) => (
            <div
              key={cap.category}
              className="capability-item"
              ref={el => itemRefs.current[i] = el}
            >
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--color-accent)',
                marginBottom: 'var(--space-2)',
              }}>
                {String(i + 1).padStart(2, '0')}
              </div>
              <h3 className="capability-item__title">{cap.category}</h3>
              <ul className="capability-item__list">
                {cap.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Tech philosophy statement */}
        <div style={{
          marginTop: 'var(--space-16)',
          padding: 'var(--space-10)',
          borderTop: '1px solid var(--color-border)',
          borderBottom: '1px solid var(--color-border)',
          textAlign: 'center',
        }}>
          <p style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
            fontWeight: 400,
            color: 'var(--color-text-secondary)',
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: 1.7,
          }}>
            &ldquo;We don&apos;t just use tools — we understand the systems behind them. That understanding lets us build solutions that others can&apos;t.&rdquo;
          </p>
        </div>
      </div>
    </section>
  )
}

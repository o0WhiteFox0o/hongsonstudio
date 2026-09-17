import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    projectType: '',
    message: '',
  })

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-header', {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      })

      gsap.from('.contact-form', {
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.contact-form',
          start: 'top 85%',
        },
      })

      gsap.from('.contact-info', {
        opacity: 0,
        y: 30,
        duration: 0.7,
        delay: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.contact-info',
          start: 'top 85%',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real implementation, this would submit to a backend
    console.log('Form submitted:', formData)
    alert('Thank you! We will get back to you soon.')
    setFormData({ name: '', email: '', organization: '', projectType: '', message: '' })
  }

  return (
    <section id="contact" className="section contact" ref={sectionRef}>
      <div className="container">
        <div className="section-header contact-header">
          <div className="section-header__label">Get in Touch</div>
          <h2 className="section-header__title text-heading">Start a Project</h2>
          <p className="section-header__description">
            Have a project in mind? Tell us about your challenge and let&apos;s explore how we can work together.
          </p>
        </div>

        <div className="contact__grid">
          <form className="contact__form contact-form" onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)' }}>
              <div className="contact__input-group">
                <label className="contact__label" htmlFor="contact-name">Name</label>
                <input
                  id="contact-name"
                  className="contact__input"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                />
              </div>
              <div className="contact__input-group">
                <label className="contact__label" htmlFor="contact-email">Email</label>
                <input
                  id="contact-email"
                  className="contact__input"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)' }}>
              <div className="contact__input-group">
                <label className="contact__label" htmlFor="contact-org">Organization</label>
                <input
                  id="contact-org"
                  className="contact__input"
                  type="text"
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  placeholder="Your organization"
                />
              </div>
              <div className="contact__input-group">
                <label className="contact__label" htmlFor="contact-type">Project Type</label>
                <select
                  id="contact-type"
                  className="contact__input"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  style={{ cursor: 'pointer' }}
                >
                  <option value="">Select type...</option>
                  <option value="interactive">Interactive Experience</option>
                  <option value="vr-ar">VR / AR</option>
                  <option value="3d">3D Production</option>
                  <option value="software">Software Development</option>
                  <option value="simulation">Simulation</option>
                  <option value="education">Educational Technology</option>
                  <option value="creative">Creative Production</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="contact__input-group">
              <label className="contact__label" htmlFor="contact-message">Tell us about your project</label>
              <textarea
                id="contact-message"
                className="contact__textarea"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Describe your project, challenge, or idea..."
                rows={5}
                required
              />
            </div>

            <button type="submit" className="btn btn--primary" style={{ alignSelf: 'flex-start' }}>
              Send Message
              <span className="btn__arrow">→</span>
            </button>
          </form>

          <div className="contact-info" style={{ paddingLeft: 'var(--space-10)' }}>
            <div style={{ marginBottom: 'var(--space-10)' }}>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-xl)',
                fontWeight: 600,
                marginBottom: 'var(--space-4)',
              }}>
                What happens next?
              </h3>
              <ol style={{ listStyle: 'none', counterReset: 'step', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                {[
                  'We review your project details',
                  'Schedule a discovery call',
                  'Prepare a technical proposal',
                  'Begin collaboration',
                ].map((step, i) => (
                  <li key={i} style={{
                    display: 'flex',
                    gap: 'var(--space-4)',
                    alignItems: 'flex-start',
                    color: 'var(--color-text-secondary)',
                    fontSize: 'var(--text-sm)',
                    lineHeight: 1.6,
                  }}>
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.7rem',
                      color: 'var(--color-accent)',
                      minWidth: '20px',
                    }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            <div style={{
              padding: 'var(--space-6)',
              background: 'var(--color-bg-tertiary)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-border)',
            }}>
              <div className="text-label" style={{ marginBottom: 'var(--space-3)' }}>Email</div>
              <a
                href="mailto:hello@hongsonstudio.com"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-base)',
                  color: 'var(--color-text-primary)',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => e.target.style.color = 'var(--color-accent)'}
                onMouseLeave={(e) => e.target.style.color = 'var(--color-text-primary)'}
              >
                hello@hongsonstudio.com
              </a>
              <div className="text-label" style={{ marginTop: 'var(--space-6)', marginBottom: 'var(--space-3)' }}>Website</div>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-base)' }}>
                hongsonstudio.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

import studioData from '../data/studio.json'

const NAV_LINKS = [
  { label: 'What We Do', href: '#what-we-do' },
  { label: 'Projects', href: '#projects' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Studio', href: '#studio' },
  { label: 'Contact', href: '#contact' },
]

export default function Footer() {
  const scrollToSection = (e, href) => {
    e.preventDefault()
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          {/* Brand */}
          <div className="footer__brand">
            <img
              src="/SSH-logo.svg"
              alt="Hồng Sơn Studio"
              style={{ height: '32px', marginBottom: 'var(--space-4)' }}
            />
            <p style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'var(--text-base)', color: 'var(--color-text-primary)', marginBottom: 'var(--space-2)' }}>
              {studioData.name}
            </p>
            <p>{studioData.tagline}</p>
            <p style={{ marginTop: 'var(--space-4)' }}>
              {studioData.statement}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <div className="footer__heading">Navigation</div>
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="footer__link"
                onClick={(e) => scrollToSection(e, link.href)}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Services */}
          <div>
            <div className="footer__heading">Services</div>
            {['Creative Production', '3D & Technical Art', 'Software Development', 'Interactive Experiences', 'VR / AR', 'Simulation'].map((svc) => (
              <a
                key={svc}
                href="#what-we-do"
                className="footer__link"
                onClick={(e) => scrollToSection(e, '#what-we-do')}
              >
                {svc}
              </a>
            ))}
          </div>

          {/* Contact */}
          <div>
            <div className="footer__heading">Contact</div>
            <a href="mailto:hello@hongsonstudio.com" className="footer__link">
              hello@hongsonstudio.com
            </a>
            <a href="https://hongsonstudio.com" className="footer__link" target="_blank" rel="noopener noreferrer">
              hongsonstudio.com
            </a>
          </div>
        </div>

        <div className="footer__bottom">
          <p>© {new Date().getFullYear()} {studioData.name}. All rights reserved.</p>
          <p className="footer__legal">
            {studioData.legalName} · Tax ID: {studioData.taxId}
          </p>
        </div>
      </div>
    </footer>
  )
}

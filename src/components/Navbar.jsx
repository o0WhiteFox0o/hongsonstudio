import { useState, useEffect, useRef } from 'react'

const NAV_LINKS = [
  { label: 'What We Do', href: '#what-we-do' },
  { label: 'Projects', href: '#projects' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Studio', href: '#studio' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const lastScrollY = useRef(0)
  const navRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      if (currentY <= 0) {
        setIsScrolled(false)
        setIsVisible(true)
      } else if (currentY > lastScrollY.current && currentY > 80) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
        setIsScrolled(true)
      }
      lastScrollY.current = currentY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (navRef.current) {
      navRef.current.style.transform = isVisible ? 'translateY(0)' : 'translateY(-120%)'
      navRef.current.style.opacity = isVisible ? '1' : '0'
    }
  }, [isVisible])

  const handleLinkClick = (e, href) => {
    e.preventDefault()
    setIsMobileOpen(false)
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <nav
        ref={navRef}
        className={`navbar ${isScrolled ? 'navbar--floating' : ''}`}
      >
        <div className="navbar__inner">
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
            <img src="/SSH-logo.svg" alt="Hồng Sơn Studio" className="navbar__logo" />
          </a>

          <div className="navbar__links">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="navbar__link"
                onClick={(e) => handleLinkClick(e, link.href)}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="navbar__actions">
            <a
              href="#contact"
              className="btn btn--primary hide-mobile"
              style={{ padding: '0.5rem 1.25rem', fontSize: '0.75rem' }}
              onClick={(e) => handleLinkClick(e, '#contact')}
            >
              Start a Project
            </a>
            <button
              className="navbar__menu-btn"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label="Toggle menu"
            >
              <span className="navbar__menu-line" style={{
                transform: isMobileOpen ? 'rotate(45deg) translateY(6.5px)' : 'none'
              }} />
              <span className="navbar__menu-line" style={{
                opacity: isMobileOpen ? 0 : 1
              }} />
              <span className="navbar__menu-line" style={{
                transform: isMobileOpen ? 'rotate(-45deg) translateY(-6.5px)' : 'none'
              }} />
            </button>
          </div>
        </div>
      </nav>

      <div className={`mobile-menu ${isMobileOpen ? 'mobile-menu--open' : ''}`}>
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="mobile-menu__link"
            onClick={(e) => handleLinkClick(e, link.href)}
          >
            {link.label}
          </a>
        ))}
        <a
          href="#contact"
          className="btn btn--primary"
          onClick={(e) => handleLinkClick(e, '#contact')}
          style={{ marginTop: '1rem' }}
        >
          Start a Project
        </a>
      </div>
    </>
  )
}

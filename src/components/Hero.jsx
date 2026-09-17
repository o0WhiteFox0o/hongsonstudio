import { useRef, useEffect, useCallback } from 'react'

export default function Hero() {
  const canvasRef = useRef(null)
  const animRef = useRef(null)
  const mouseRef = useRef({ x: 0.5, y: 0.5 })

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const w = canvas.width
    const h = canvas.height
    const time = Date.now() * 0.001
    const mx = mouseRef.current.x
    const my = mouseRef.current.y

    ctx.clearRect(0, 0, w, h)

    // Draw grid
    const gridSize = 60
    const cols = Math.ceil(w / gridSize) + 1
    const rows = Math.ceil(h / gridSize) + 1

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = i * gridSize
        const y = j * gridSize
        const dx = (x / w - mx) * 2
        const dy = (y / h - my) * 2
        const dist = Math.sqrt(dx * dx + dy * dy)
        const pulse = Math.sin(time * 0.8 + dist * 2) * 0.5 + 0.5
        const alpha = 0.02 + pulse * 0.04 * (1 / (dist + 1))

        ctx.beginPath()
        ctx.arc(x, y, 1.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(236, 34, 39, ${alpha})`
        ctx.fill()
      }
    }

    // Draw subtle grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.015)'
    ctx.lineWidth = 0.5
    for (let i = 0; i < cols; i++) {
      ctx.beginPath()
      ctx.moveTo(i * gridSize, 0)
      ctx.lineTo(i * gridSize, h)
      ctx.stroke()
    }
    for (let j = 0; j < rows; j++) {
      ctx.beginPath()
      ctx.moveTo(0, j * gridSize)
      ctx.lineTo(w, j * gridSize)
      ctx.stroke()
    }

    // Floating particles
    for (let p = 0; p < 20; p++) {
      const px = (Math.sin(time * 0.3 + p * 1.7) * 0.4 + 0.5) * w
      const py = (Math.cos(time * 0.2 + p * 2.3) * 0.4 + 0.5) * h
      const pDist = Math.sqrt(Math.pow(px / w - mx, 2) + Math.pow(py / h - my, 2))
      const pAlpha = 0.1 + (1 / (pDist + 1)) * 0.15

      ctx.beginPath()
      ctx.arc(px, py, 2 + Math.sin(time + p) * 1, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(236, 34, 39, ${pAlpha})`
      ctx.fill()

      // Connection lines between nearby particles
      for (let q = p + 1; q < 20; q++) {
        const qx = (Math.sin(time * 0.3 + q * 1.7) * 0.4 + 0.5) * w
        const qy = (Math.cos(time * 0.2 + q * 2.3) * 0.4 + 0.5) * h
        const d = Math.sqrt((px - qx) ** 2 + (py - qy) ** 2)
        if (d < 200) {
          ctx.beginPath()
          ctx.moveTo(px, py)
          ctx.lineTo(qx, qy)
          ctx.strokeStyle = `rgba(236, 34, 39, ${0.03 * (1 - d / 200)})`
          ctx.lineWidth = 0.5
          ctx.stroke()
        }
      }
    }

    animRef.current = requestAnimationFrame(draw)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const handleMouse = (e) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      }
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', handleMouse)
    animRef.current = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouse)
      cancelAnimationFrame(animRef.current)
    }
  }, [draw])

  const scrollToSection = (e, href) => {
    e.preventDefault()
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="hero" id="home">
      <canvas ref={canvasRef} className="hero__canvas" />

      <div className="container">
        <div className="hero__content">
          <div className="hero__label">
            Creative Technology Studio
          </div>

          <h1 className="hero__title">
            HỒNG SƠN<br />STUDIO
          </h1>

          <p className="hero__statement">
            We turn ideas, information and technology into digital experiences.
          </p>

          <div className="hero__ctas">
            <a
              href="#projects"
              className="btn btn--primary"
              onClick={(e) => scrollToSection(e, '#projects')}
            >
              Explore Our Work
              <span className="btn__arrow">→</span>
            </a>
            <a
              href="#contact"
              className="btn btn--secondary"
              onClick={(e) => scrollToSection(e, '#contact')}
            >
              Start a Project
            </a>
          </div>
        </div>
      </div>

      <div className="hero__scroll-indicator">
        <span>Scroll</span>
        <div className="hero__scroll-line" />
      </div>
    </section>
  )
}

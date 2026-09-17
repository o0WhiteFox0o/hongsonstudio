import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import WhatWeDo from './components/WhatWeDo'
import Projects from './components/Projects'
import Solutions from './components/Solutions'
import Capabilities from './components/Capabilities'
import Studio from './components/Studio'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [loadProgress, setLoadProgress] = useState(0)

  useEffect(() => {
    // Simulate loading progress
    const intervals = [
      setTimeout(() => setLoadProgress(30), 200),
      setTimeout(() => setLoadProgress(60), 500),
      setTimeout(() => setLoadProgress(90), 800),
      setTimeout(() => {
        setLoadProgress(100)
        setTimeout(() => setIsLoading(false), 300)
      }, 1100),
    ]
    return () => intervals.forEach(clearTimeout)
  }, [])

  return (
    <>
      {isLoading && (
        <div className="loading">
          <img src="/SSH-logo.svg" alt="Loading" className="loading__logo" />
          <div className="loading__bar">
            <div className="loading__bar-fill" style={{ width: `${loadProgress}%` }} />
          </div>
        </div>
      )}
      <main style={{ opacity: isLoading ? 0 : 1, transition: 'opacity 0.5s ease' }}>
        <Navbar />
        <Hero />
        <WhatWeDo />
        <Projects />
        <Solutions />
        <Capabilities />
        <Studio />
        <Contact />
        <Footer />
      </main>
    </>
  )
}

export default App

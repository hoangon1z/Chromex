import { useState, useCallback } from 'react'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import About from './components/About/About'
import Services from './components/Services/Services'
import Portfolio from './components/Portfolio/Portfolio'
import Process from './components/Process/Process'
import Testimonials from './components/Testimonials/Testimonials'
import Team from './components/Team/Team'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'
import Preloader from './components/common/Preloader'

export default function App() {
  const [loading, setLoading] = useState(true)

  const handlePreloaderComplete = useCallback(() => {
    setLoading(false)
  }, [])

  return (
    <>
      {loading && <Preloader onComplete={handlePreloaderComplete} />}
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <Process />
        <Testimonials />
        <Team />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

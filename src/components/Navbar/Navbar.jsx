import { useState, useEffect } from 'react'
import './Navbar.css'

const navLinks = [
  { label: 'Giới thiệu', href: '#about' },
  { label: 'Dịch vụ', href: '#services' },
  { label: 'Dự án', href: '#portfolio' },
  { label: 'Quy trình', href: '#process' },
  { label: 'Đánh giá', href: '#testimonials' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e, href) => {
    e.preventDefault()
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
      <div className="navbar__inner">
        <a className="navbar__logo" href="#" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <img className="navbar__logo-icon" src="/chromex-logo.png" width="36" height="36" alt="" />
          <span>CHROMEX</span>
        </a>

        <div className="navbar__links">
          {navLinks.map((link) => (
            <a
              key={link.href}
              className="navbar__link"
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
          <a
            className="navbar__cta"
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
          >
            Liên hệ
          </a>
        </div>

        <div
          className={`navbar__menu-btn ${mobileOpen ? 'active' : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div className={`navbar__mobile-overlay ${mobileOpen ? 'active' : ''}`}>
        {navLinks.map((link) => (
          <a
            key={link.href}
            className="navbar__link"
            href={link.href}
            onClick={(e) => handleNavClick(e, link.href)}
          >
            {link.label}
          </a>
        ))}
        <a
          className="navbar__cta"
          href="#contact"
          onClick={(e) => handleNavClick(e, '#contact')}
          style={{ marginTop: '1rem' }}
        >
          Liên hệ ngay
        </a>
      </div>
    </nav>
  )
}

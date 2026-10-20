import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Footer.css'

gsap.registerPlugin(ScrollTrigger)

export default function Footer() {
  const footerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Divider draw
      gsap.from('.footer__top', {
        opacity: 0, y: 30, duration: 0.8,
        scrollTrigger: { trigger: footerRef.current, start: 'top 90%' }
      })
    }, footerRef)
    return () => ctx.revert()
  }, [])

  const handleNavClick = (e, href) => {
    e.preventDefault()
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="footer" ref={footerRef}>
      <div className="container">
        <div className="footer__top">
          {/* Brand */}
          <div className="footer__brand">
            <div className="footer__brand-logo">
              <span>CHROMEX</span>
            </div>
            <p className="footer__brand-text">
              Kiến tạo trải nghiệm số đẳng cấp. Thiết kế website chuyên nghiệp, 
              UI/UX tối ưu và giải pháp số toàn diện cho doanh nghiệp.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer__heading">Dịch vụ</h4>
            <div className="footer__links">
              <a href="#services" className="footer__link" onClick={(e) => handleNavClick(e, '#services')}>Thiết kế Website</a>
              <a href="#services" className="footer__link" onClick={(e) => handleNavClick(e, '#services')}>Thiết kế UI/UX</a>
              <a href="#services" className="footer__link" onClick={(e) => handleNavClick(e, '#services')}>Landing Page</a>
              <a href="#services" className="footer__link" onClick={(e) => handleNavClick(e, '#services')}>Phát triển Web App</a>
              <a href="#services" className="footer__link" onClick={(e) => handleNavClick(e, '#services')}>E-commerce</a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="footer__heading">CHROMEX</h4>
            <div className="footer__links">
              <a href="#about" className="footer__link" onClick={(e) => handleNavClick(e, '#about')}>Giới thiệu</a>
              <a href="#portfolio" className="footer__link" onClick={(e) => handleNavClick(e, '#portfolio')}>Dự án</a>
              <a href="#process" className="footer__link" onClick={(e) => handleNavClick(e, '#process')}>Quy trình</a>
              <a href="#team" className="footer__link" onClick={(e) => handleNavClick(e, '#team')}>Đội ngũ</a>
              <a href="#contact" className="footer__link" onClick={(e) => handleNavClick(e, '#contact')}>Liên hệ</a>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="footer__heading">Nhận tin mới</h4>
            <p className="footer__newsletter-text">
              Đăng ký nhận thông tin về xu hướng thiết kế và ưu đãi đặc biệt.
            </p>
            <form className="footer__newsletter-form" onSubmit={(e) => { e.preventDefault(); alert('Đăng ký thành công!') }}>
              <input
                className="footer__newsletter-input"
                type="email"
                placeholder="Email của bạn"
                required
              />
              <button className="footer__newsletter-btn" type="submit">
                Gửi
              </button>
            </form>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            © 2024 CHROMEX. All rights reserved.
          </p>
          <div className="footer__bottom-links">
            <a href="#" className="footer__bottom-link">Chính sách</a>
            <a href="#" className="footer__bottom-link">Điều khoản</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

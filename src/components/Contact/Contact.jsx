import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Contact.css'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef(null)
  const submittingRef = useRef(false)
  const [status, setStatus] = useState({ type: 'idle', message: '' })

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact__label', {
        x: -40, opacity: 0, duration: 0.8,
        scrollTrigger: { trigger: '.contact__header', start: 'top 80%' }
      })
      gsap.from('.contact__title', {
        y: 40, opacity: 0, duration: 0.8, delay: 0.1,
        scrollTrigger: { trigger: '.contact__header', start: 'top 80%' }
      })
      gsap.from('.form-group', {
        x: -40, opacity: 0, stagger: 0.1, duration: 0.6,
        scrollTrigger: { trigger: '.contact__form', start: 'top 85%' }
      })
      gsap.from('.contact__info', {
        x: 60, opacity: 0, duration: 0.8,
        scrollTrigger: { trigger: '.contact__grid', start: 'top 80%' }
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (submittingRef.current) return
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))
    submittingRef.current = true
    setStatus({ type: 'sending', message: 'Đang gửi yêu cầu của bạn…' })
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        signal: AbortSignal.timeout(20000),
      })
      const result = await response.json()
      if (!response.ok || !result.success) throw new Error(result.message || 'Chưa gửi được yêu cầu. Vui lòng thử lại.')
      setStatus({ type: 'success', message: result.message })
      form.reset()
    } catch (error) {
      setStatus({ type: 'error', message: error.name === 'TimeoutError'
        ? 'Kết nối quá lâu. Vui lòng thử lại hoặc liên hệ qua điện thoại.'
        : error instanceof TypeError ? 'Không thể kết nối. Vui lòng kiểm tra mạng và thử lại.' : error.message })
    } finally {
      submittingRef.current = false
    }
  }

  return (
    <section className="section section--light contact" id="contact" ref={sectionRef}>
      <div className="container">
        <div className="contact__grid">
          <div className="contact__form-wrapper">
            <div className="contact__header">
              <div className="section-label contact__label">
                <span className="label">Liên hệ</span>
              </div>
              <h2 className="heading-lg contact__title">
                Bắt đầu dự án<br />cùng chúng tôi
              </h2>
              <p className="body-lg">
                Hãy cho chúng tôi biết về dự án của bạn. Chúng tôi sẽ phản hồi trong vòng 24 giờ.
              </p>
            </div>

            <form className="contact__form" onSubmit={handleSubmit} aria-busy={status.type === 'sending'}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Họ và tên</label>
                  <input type="text" id="name" name="name" maxLength={100} placeholder="Nguyễn Văn A" required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" name="email" maxLength={254} placeholder="email@example.com" required />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Số điện thoại</label>
                  <input type="tel" id="phone" name="phone" maxLength={30} placeholder="0934937386" />
                </div>
                <div className="form-group">
                  <label htmlFor="service">Dịch vụ quan tâm</label>
                  <select id="service" name="service" required>
                    <option value="">Chọn dịch vụ</option>
                    <option value="website">Thiết kế Website</option>
                    <option value="uiux">Thiết kế UI/UX</option>
                    <option value="landing">Landing Page</option>
                    <option value="webapp">Phát triển Web App</option>
                    <option value="ecommerce">E-commerce</option>
                    <option value="seo">SEO & Marketing</option>
                    <option value="branding">Branding & Logo</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message">Nội dung chi tiết</label>
                <textarea id="message" name="message" maxLength={2500} placeholder="Mô tả ngắn về dự án của bạn..." required></textarea>
              </div>

              <p className={`contact__status contact__status--${status.type}`} role={status.type === 'error' ? 'alert' : 'status'} aria-live="polite">
                {status.message}
              </p>
              <button type="submit" className="btn btn--primary contact__form-submit" disabled={status.type === 'sending'}>
                {status.type === 'sending' ? 'Đang gửi…' : 'Gửi yêu cầu'}
                <svg className="btn-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8H13M13 8L8.5 3.5M13 8L8.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </form>
          </div>

          <div className="contact__info">
            <div>
              <h3 className="contact__info-title">Thông tin liên hệ</h3>
              <p className="contact__info-text">
                Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn
              </p>
            </div>

            <div className="contact__info-items">
              <div className="contact__info-item">
                <div className="contact__info-icon">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M3 6L9 10L15 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <rect x="2" y="3" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </div>
                <div>
                  <p className="contact__info-label">Email</p>
                  <p className="contact__info-value"><a href="mailto:rxgnoah1510@gmail.com">rxgnoah1510@gmail.com</a></p>
                </div>
              </div>

              <div className="contact__info-item">
                <div className="contact__info-icon">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M7 3H4C3.45 3 3 3.45 3 4C3 10.07 7.93 15 14 15C14.55 15 15 14.55 15 14V11L12.5 9.5L10.5 11.5C9 10.67 7.33 9 6.5 7.5L8.5 5.5L7 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <p className="contact__info-label">Điện thoại</p>
                  <p className="contact__info-value"><a href="tel:+84934937386">0934937386</a></p>
                </div>
              </div>

              <div className="contact__info-item">
                <div className="contact__info-icon">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M9 9.5C10.1 9.5 11 8.6 11 7.5C11 6.4 10.1 5.5 9 5.5C7.9 5.5 7 6.4 7 7.5C7 8.6 7.9 9.5 9 9.5Z" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M9 16C9 16 15 11.5 15 7.5C15 4.18 12.31 1.5 9 1.5C5.69 1.5 3 4.18 3 7.5C3 11.5 9 16 9 16Z" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </div>
                <div>
                  <p className="contact__info-label">Địa chỉ</p>
                  <p className="contact__info-value">TP. Hồ Chí Minh, Việt Nam</p>
                </div>
              </div>
            </div>

            <div className="contact__socials">
              <a href="#" className="contact__social-link" aria-label="Facebook">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M10 2.67H11.33V0.467C11.11 0.44 10.33 0.367 9.41 0.367C7.51 0.367 6.2 1.547 6.2 3.7V5.67H4V8.13H6.2V14.367H8.73V8.13H10.85L11.17 5.67H8.73V3.94C8.73 3.22 8.93 2.67 10 2.67Z" />
                </svg>
              </a>
              <a href="#" className="contact__social-link" aria-label="Instagram">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 1.44C10.13 1.44 10.4 1.45 11.24 1.49C12.01 1.52 12.43 1.65 12.71 1.76C13.08 1.9 13.35 2.07 13.63 2.35C13.91 2.63 14.08 2.9 14.22 3.27C14.33 3.55 14.46 3.97 14.49 4.74C14.53 5.58 14.54 5.85 14.54 7.98C14.54 10.11 14.53 10.38 14.49 11.22C14.46 11.99 14.33 12.41 14.22 12.69C14.08 13.06 13.91 13.33 13.63 13.61C13.35 13.89 13.08 14.06 12.71 14.2C12.43 14.31 12.01 14.44 11.24 14.47C10.4 14.51 10.13 14.52 8 14.52C5.87 14.52 5.6 14.51 4.76 14.47C3.99 14.44 3.57 14.31 3.29 14.2C2.92 14.06 2.65 13.89 2.37 13.61C2.09 13.33 1.92 13.06 1.78 12.69C1.67 12.41 1.54 11.99 1.51 11.22C1.47 10.38 1.46 10.11 1.46 7.98C1.46 5.85 1.47 5.58 1.51 4.74C1.54 3.97 1.67 3.55 1.78 3.27C1.92 2.9 2.09 2.63 2.37 2.35C2.65 2.07 2.92 1.9 3.29 1.76C3.57 1.65 3.99 1.52 4.76 1.49C5.6 1.45 5.87 1.44 8 1.44ZM8 0C5.83 0 5.54 0.01 4.69 0.05C3.85 0.09 3.27 0.22 2.76 0.42C2.24 0.62 1.79 0.9 1.35 1.35C0.9 1.79 0.62 2.24 0.42 2.76C0.22 3.27 0.09 3.85 0.05 4.69C0.01 5.54 0 5.83 0 8C0 10.17 0.01 10.46 0.05 11.31C0.09 12.15 0.22 12.73 0.42 13.24C0.62 13.76 0.9 14.21 1.35 14.65C1.79 15.1 2.24 15.38 2.76 15.58C3.27 15.78 3.85 15.91 4.69 15.95C5.54 15.99 5.83 16 8 16C10.17 16 10.46 15.99 11.31 15.95C12.15 15.91 12.73 15.78 13.24 15.58C13.76 15.38 14.21 15.1 14.65 14.65C15.1 14.21 15.38 13.76 15.58 13.24C15.78 12.73 15.91 12.15 15.95 11.31C15.99 10.46 16 10.17 16 8C16 5.83 15.99 5.54 15.95 4.69C15.91 3.85 15.78 3.27 15.58 2.76C15.38 2.24 15.1 1.79 14.65 1.35C14.21 0.9 13.76 0.62 13.24 0.42C12.73 0.22 12.15 0.09 11.31 0.05C10.46 0.01 10.17 0 8 0ZM8 3.89C5.73 3.89 3.89 5.73 3.89 8C3.89 10.27 5.73 12.11 8 12.11C10.27 12.11 12.11 10.27 12.11 8C12.11 5.73 10.27 3.89 8 3.89ZM8 10.67C6.53 10.67 5.33 9.47 5.33 8C5.33 6.53 6.53 5.33 8 5.33C9.47 5.33 10.67 6.53 10.67 8C10.67 9.47 9.47 10.67 8 10.67ZM12.27 2.77C11.73 2.77 11.29 3.21 11.29 3.75C11.29 4.29 11.73 4.73 12.27 4.73C12.81 4.73 13.25 4.29 13.25 3.75C13.25 3.21 12.81 2.77 12.27 2.77Z" />
                </svg>
              </a>
              <a href="#" className="contact__social-link" aria-label="Zalo">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 0C3.58 0 0 3.36 0 7.5C0 9.54 0.93 11.36 2.42 12.62L2 14.5L4.12 13.24C5.28 13.72 6.6 14 8 14C12.42 14 16 10.64 16 6.5C16 3.36 12.42 0 8 0ZM4.5 9.5L3 5H4L4.75 7.5L6 5H7L4.5 9.5ZM10.5 9.5C10.5 9.5 9 9.5 8.5 9.5V5H9.5V8.5H11V9.5H10.5ZM13 9.5C11.9 9.5 11 8.6 11 7.5V7C11 5.9 11.9 5 13 5C14.1 5 15 5.9 15 7V7.5C15 8.6 14.1 9.5 13 9.5ZM13 6C12.45 6 12 6.45 12 7V7.5C12 8.05 12.45 8.5 13 8.5C13.55 8.5 14 8.05 14 7.5V7C14 6.45 13.55 6 13 6Z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

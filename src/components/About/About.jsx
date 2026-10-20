import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './About.css'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const sectionRef = useRef(null)
  const imageRef = useRef(null)
  const statsRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content reveal
      gsap.from('.about__label', {
        x: -40, opacity: 0, duration: 0.8,
        scrollTrigger: { trigger: '.about__content', start: 'top 80%' }
      })
      gsap.from('.about__title', {
        y: 40, opacity: 0, duration: 0.8, delay: 0.1,
        scrollTrigger: { trigger: '.about__content', start: 'top 80%' }
      })
      gsap.from('.about__description', {
        y: 30, opacity: 0, duration: 0.8, delay: 0.2,
        scrollTrigger: { trigger: '.about__content', start: 'top 80%' }
      })

      // Image parallax
      gsap.from(imageRef.current, {
        scale: 1.15, duration: 1.5, ease: 'power2.out',
        scrollTrigger: { trigger: imageRef.current, start: 'top 85%' }
      })

      // Stats counter
      const statNumbers = statsRef.current.querySelectorAll('.about__stat-number')
      statNumbers.forEach((el) => {
        const target = parseInt(el.dataset.target)
        const obj = { value: 0 }
        gsap.to(obj, {
          value: target,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 90%' },
          onUpdate: () => {
            el.querySelector('.counter-value').textContent = Math.round(obj.value)
          }
        })
      })

      // Stats stagger
      gsap.from('.about__stat', {
        y: 30, opacity: 0, stagger: 0.15, duration: 0.6,
        scrollTrigger: { trigger: statsRef.current, start: 'top 85%' }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="section section--light about" id="about" ref={sectionRef}>
      <div className="container">
        <div className="about__grid">
          <div className="about__content">
            <div className="section-label about__label">
              <span className="label">Về chúng tôi</span>
            </div>
            
            <h2 className="heading-lg about__title">
              Chúng tôi là<br />
              <span className="chrome-text">CHROMEX</span>
            </h2>
            
            <p className="body-lg about__description">
              Với đam mê thiết kế và công nghệ, chúng tôi kiến tạo những trải nghiệm số 
              đẳng cấp giúp doanh nghiệp nổi bật trong thế giới kỹ thuật số. Mỗi dự án 
              là một tác phẩm nghệ thuật — được chăm chút từ pixel đầu tiên đến dòng code cuối cùng.
            </p>

            <div className="about__stats" ref={statsRef}>
              <div className="about__stat">
                <div className="about__stat-number" data-target="50">
                  <span className="counter-value">0</span><span>+</span>
                </div>
                <p className="about__stat-label">Dự án hoàn thành</p>
              </div>
              <div className="about__stat">
                <div className="about__stat-number" data-target="30">
                  <span className="counter-value">0</span><span>+</span>
                </div>
                <p className="about__stat-label">Khách hàng</p>
              </div>
              <div className="about__stat">
                <div className="about__stat-number" data-target="3">
                  <span className="counter-value">0</span><span>+</span>
                </div>
                <p className="about__stat-label">Năm kinh nghiệm</p>
              </div>
            </div>
          </div>

          <div className="about__image-wrapper">
            <img src="/images/about-workspace.jpg" alt="CHROMEX Studio" ref={imageRef} />
            <div className="about__image-badge">
              <div className="about__image-badge-dot"></div>
              <span className="about__image-badge-text">Đang nhận dự án mới</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

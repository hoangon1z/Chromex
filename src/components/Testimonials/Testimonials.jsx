import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { testimonials } from '../../data/siteData'
import './Testimonials.css'

gsap.registerPlugin(ScrollTrigger)

export default function Testimonials() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const [current, setCurrent] = useState(0)
  const isMobile = typeof window !== 'undefined' ? window.innerWidth <= 768 : false
  const maxSlide = isMobile ? testimonials.length - 1 : Math.ceil(testimonials.length / 2) - 1

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.testimonials__label', {
        y: 30, opacity: 0, duration: 0.8,
        scrollTrigger: { trigger: '.testimonials__header', start: 'top 80%' }
      })
      gsap.from('.testimonials__title', {
        y: 40, opacity: 0, duration: 0.8, delay: 0.1,
        scrollTrigger: { trigger: '.testimonials__header', start: 'top 80%' }
      })
      gsap.from('.testimonial-card', {
        y: 50, opacity: 0, stagger: 0.15, duration: 0.8,
        scrollTrigger: { trigger: '.testimonials__wrapper', start: 'top 80%' }
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const goTo = (index) => {
    setCurrent(index)
    const cardWidth = isMobile ? 100 : 50
    gsap.to(trackRef.current, {
      x: `-${index * cardWidth}%`,
      duration: 0.6,
      ease: 'power2.inOut'
    })
  }

  const prev = () => goTo(Math.max(0, current - 1))
  const next = () => goTo(Math.min(maxSlide, current + 1))

  return (
    <section className="section section--light testimonials" id="testimonials" ref={sectionRef}>
      <div className="container">
        <div className="testimonials__header">
          <div className="section-label testimonials__label" style={{ justifyContent: 'center' }}>
            <span className="label">Đánh giá</span>
          </div>
          <h2 className="heading-lg testimonials__title">
            Khách hàng<br />nói gì về chúng tôi
          </h2>
        </div>

        <div className="testimonials__wrapper">
          <div className="testimonials__track" ref={trackRef}>
            {testimonials.map((t) => (
              <div className="testimonial-card" key={t.id}>
                <div className="testimonial-card__quote">"</div>
                <div className="testimonial-card__stars">
                  {[...Array(t.rating)].map((_, i) => (
                    <span className="testimonial-card__star" key={i}>★</span>
                  ))}
                </div>
                <p className="testimonial-card__content">{t.content}</p>
                <div className="testimonial-card__author">
                  <div className="testimonial-card__avatar">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="testimonial-card__name">{t.name}</div>
                    <div className="testimonial-card__role">{t.role} · {t.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="testimonials__nav">
          <button className="testimonials__nav-btn" onClick={prev} aria-label="Previous">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M12 3L6 9L12 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div className="testimonials__dots">
            {[...Array(maxSlide + 1)].map((_, i) => (
              <div
                key={i}
                className={`testimonials__dot ${i === current ? 'active' : ''}`}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
          <button className="testimonials__nav-btn" onClick={next} aria-label="Next">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M6 3L12 9L6 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}

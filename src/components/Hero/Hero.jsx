import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import './Hero.css'

export default function Hero() {
  const heroRef = useRef(null)
  const titleRef = useRef(null)
  const taglineRef = useRef(null)
  const subtextRef = useRef(null)
  const ctaRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

      tl.from(titleRef.current, {
        clipPath: 'inset(0 100% 0 0)',
        duration: 1.4,
        ease: 'power4.inOut'
      })
      .from(taglineRef.current, {
        y: 60,
        opacity: 0,
        duration: 1
      }, '-=0.6')
      .from(subtextRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8
      }, '-=0.5')
      .from(ctaRef.current.children, {
        y: 30,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8
      }, '-=0.4')
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="hero" ref={heroRef} id="hero">
      <div className="hero__bg-pattern"></div>
      <div className="hero__glow hero__glow--1"></div>
      <div className="hero__glow hero__glow--2"></div>

      <div className="hero__content">
        <h1 className="hero__title" ref={titleRef}>
          <span className="hero__title-text">CHROMEX</span>
        </h1>

        <p className="hero__tagline" ref={taglineRef}>
          Kiến tạo trải nghiệm số đẳng cấp
        </p>

        <p className="hero__subtext" ref={subtextRef}>
          Thiết kế Website <span>·</span> UI/UX <span>·</span> Giải pháp số toàn diện
        </p>

        <div className="hero__cta" ref={ctaRef}>
          <a href="#services" className="btn btn--light" onClick={(e) => {
            e.preventDefault()
            document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })
          }}>
            Khám phá dịch vụ
            <svg className="btn-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8H13M13 8L8.5 3.5M13 8L8.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a href="#contact" className="btn btn--dark" onClick={(e) => {
            e.preventDefault()
            document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
          }}>
            Liên hệ ngay
          </a>
        </div>
      </div>

      <div className="hero__scroll-indicator">
        <span className="hero__scroll-text">Cuộn</span>
        <div className="hero__scroll-line"></div>
      </div>
    </section>
  )
}

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { services } from '../../data/siteData'
import './Services.css'

gsap.registerPlugin(ScrollTrigger)

const ServiceIcon = ({ type }) => {
  const icons = {
    monitor: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="6" width="40" height="28" rx="3"/><path d="M16 42h16"/><path d="M24 34v8"/><path d="M12 18l6 4-6 4"/><path d="M26 26h8"/>
      </svg>
    ),
    layers: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M24 4L4 16l20 12 20-12L24 4z"/><path d="M4 28l20 12 20-12"/><path d="M4 22l20 12 20-12"/>
      </svg>
    ),
    rocket: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M24 42V26"/><path d="M36 30c0-12-4-22-12-26C16 8 12 18 12 30"/><path d="M12 30c-4 2-6 6-6 10h36c0-4-2-8-6-10"/><circle cx="24" cy="20" r="3"/>
      </svg>
    ),
    code: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 16l-8 8 8 8"/><path d="M34 16l8 8-8 8"/><path d="M28 8L20 40"/>
      </svg>
    ),
    cart: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 6h4l6 24h20l6-18H14"/><circle cx="18" cy="38" r="3"/><circle cx="34" cy="38" r="3"/>
      </svg>
    ),
    chart: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 42h36"/><rect x="10" y="22" width="6" height="16" rx="1"/><rect x="21" y="14" width="6" height="24" rx="1"/><rect x="32" y="8" width="6" height="30" rx="1"/>
      </svg>
    ),
    diamond: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M24 4L4 24l20 20 20-20L24 4z"/><path d="M10 18l14 26 14-26"/><path d="M4 24h40"/>
      </svg>
    )
  }
  return <div className="service-card__icon">{icons[type]}</div>
}

export default function Services() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal
      gsap.from('.services__label', {
        x: -40, opacity: 0, duration: 0.8,
        scrollTrigger: { trigger: '.services__header', start: 'top 80%' }
      })
      gsap.from('.services__title', {
        y: 40, opacity: 0, duration: 0.8, delay: 0.1,
        scrollTrigger: { trigger: '.services__header', start: 'top 80%' }
      })

      // Horizontal scroll
      const track = trackRef.current
      const cards = track.querySelectorAll('.service-card')
      const totalWidth = track.scrollWidth - window.innerWidth + 100

      gsap.to(track, {
        x: -totalWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${totalWidth}`,
          onUpdate: (self) => {
            setProgress(Math.round(self.progress * 100))
          }
        }
      })

      // Cards stagger fade in
      cards.forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          y: 40,
          duration: 0.6,
          scrollTrigger: {
            trigger: card,
            containerAnimation: gsap.getById?.('services-scroll'),
            start: 'left 80%',
            toggleActions: 'play none none none'
          }
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="section section--dark services" id="services" ref={sectionRef}>
      <div className="container services__header">
        <div className="section-label services__label">
          <span className="label label--accent">Dịch vụ</span>
        </div>
        <h2 className="heading-lg services__title">
          Giải pháp số<br />toàn diện
        </h2>
        <p className="body-lg services__subtitle" style={{ color: 'var(--text-muted)' }}>
          Chúng tôi cung cấp đầy đủ dịch vụ từ thiết kế đến phát triển
        </p>
      </div>

      <div className="services__scroll-wrapper">
        <div className="services__scroll-track" ref={trackRef}>
          {services.map((service) => (
            <div className="service-card" key={service.id}>
              <div className="service-card__number">{service.number}</div>
              <div>
                <ServiceIcon type={service.icon} />
                <h3 className="service-card__title">{service.title}</h3>
                <p className="service-card__description">{service.description}</p>
              </div>
              <div className="service-card__features">
                {service.features.map((f, i) => (
                  <span className="service-card__feature" key={i}>{f}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="services__progress container">
        <div className="services__progress-bar">
          <div className="services__progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
        <span className="services__progress-text">{progress}%</span>
      </div>
    </section>
  )
}

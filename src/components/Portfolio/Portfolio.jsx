import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '../../data/siteData'
import './Portfolio.css'

gsap.registerPlugin(ScrollTrigger)

export default function Portfolio() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header
      gsap.from('.portfolio__label', {
        x: -40, opacity: 0, duration: 0.8,
        scrollTrigger: { trigger: '.portfolio__header', start: 'top 80%' }
      })
      gsap.from('.portfolio__title', {
        y: 40, opacity: 0, duration: 0.8, delay: 0.1,
        scrollTrigger: { trigger: '.portfolio__header', start: 'top 80%' }
      })

      // Project cards
      const cards = document.querySelectorAll('.project-card')
      cards.forEach((card, i) => {
        const img = card.querySelector('.project-card__image-wrapper')
        const info = card.querySelector('.project-card__info')
        const isEven = i % 2 !== 0

        gsap.from(img, {
          x: isEven ? 60 : -60,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 80%'
          }
        })

        gsap.from(info.children, {
          y: 40,
          opacity: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 75%'
          }
        })

        // Parallax on image
        gsap.to(img.querySelector('.project-card__image'), {
          yPercent: -8,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="section section--light portfolio" id="portfolio" ref={sectionRef}>
      <div className="container">
        <div className="portfolio__header">
          <div className="portfolio__header-text">
            <div className="section-label portfolio__label">
              <span className="label">Dự án nổi bật</span>
            </div>
            <h2 className="heading-lg portfolio__title">
              Tác phẩm<br />của chúng tôi
            </h2>
          </div>
          <p className="body-lg" style={{ maxWidth: '400px' }}>
            Mỗi dự án là một hành trình sáng tạo, nơi ý tưởng trở thành hiện thực.
          </p>
        </div>

        <div className="portfolio__list">
          {projects.map((project) => (
            <article className="project-card" key={project.id}>
              <div className="project-card__image-wrapper">
                <img
                  className="project-card__image"
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                />
                <div className="project-card__overlay">
                  <span className="project-card__view-btn">
                    Xem chi tiết
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M1 7H13M13 7L7.5 1.5M13 7L7.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </div>
              </div>
              <div className="project-card__info">
                <div className="project-card__meta">
                  <span className="project-card__category">{project.category}</span>
                  <span className="project-card__year">— {project.year}</span>
                </div>
                <h3 className="project-card__title">{project.title}</h3>
                <p className="project-card__description">{project.description}</p>
                <div className="project-card__tags">
                  {project.tags.map((tag, i) => (
                    <span className="project-card__tag" key={i}>{tag}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

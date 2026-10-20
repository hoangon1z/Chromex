import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { processSteps } from '../../data/siteData'
import './Process.css'

gsap.registerPlugin(ScrollTrigger)

export default function Process() {
  const sectionRef = useRef(null)
  const lineRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header
      gsap.from('.process__label', {
        y: 30, opacity: 0, duration: 0.8,
        scrollTrigger: { trigger: '.process__header', start: 'top 80%' }
      })
      gsap.from('.process__title', {
        y: 40, opacity: 0, duration: 0.8, delay: 0.1,
        scrollTrigger: { trigger: '.process__header', start: 'top 80%' }
      })

      // Timeline line drawing
      gsap.to(lineRef.current, {
        height: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: '.process__timeline',
          start: 'top center',
          end: 'bottom center',
          scrub: true
        }
      })

      // Steps stagger
      const steps = document.querySelectorAll('.process__step')
      steps.forEach((step, i) => {
        const isOdd = i % 2 === 0
        const content = step.querySelector('.process__step-content')
        const dot = step.querySelector('.process__step-dot')

        gsap.from(content, {
          x: isOdd ? -60 : 60,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: step,
            start: 'top 80%'
          }
        })

        gsap.from(dot, {
          scale: 0,
          duration: 0.5,
          ease: 'back.out(2)',
          scrollTrigger: {
            trigger: step,
            start: 'top 80%'
          }
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="section section--dark process" id="process" ref={sectionRef}>
      <div className="container">
        <div className="process__header">
          <div className="section-label process__label" style={{ justifyContent: 'center' }}>
            <span className="label label--accent">Quy trình</span>
          </div>
          <h2 className="heading-lg process__title">
            Hành trình cùng<br />
            <span className="chrome-text">CHROMEX</span>
          </h2>
          <p className="body-lg process__subtitle">
            5 bước đơn giản để biến ý tưởng thành website hoàn hảo
          </p>
        </div>

        <div className="process__timeline">
          <div className="process__line">
            <div className="process__line-progress" ref={lineRef}></div>
          </div>

          {processSteps.map((step, i) => (
            <div className="process__step" key={step.id}>
              {i % 2 === 0 ? (
                <>
                  <div className="process__step-content">
                    <div className="process__step-number">Bước {step.number}</div>
                    <h3 className="process__step-title">{step.title}</h3>
                    <p className="process__step-description">{step.description}</p>
                    <span className="process__step-duration">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1"/>
                        <path d="M6 3V6L8 7.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
                      </svg>
                      {step.duration}
                    </span>
                  </div>
                  <div className="process__step-dot">
                    <span className="process__step-dot-number">{step.number}</span>
                  </div>
                  <div className="process__step-empty"></div>
                </>
              ) : (
                <>
                  <div className="process__step-empty"></div>
                  <div className="process__step-dot">
                    <span className="process__step-dot-number">{step.number}</span>
                  </div>
                  <div className="process__step-content">
                    <div className="process__step-number">Bước {step.number}</div>
                    <h3 className="process__step-title">{step.title}</h3>
                    <p className="process__step-description">{step.description}</p>
                    <span className="process__step-duration">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1"/>
                        <path d="M6 3V6L8 7.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
                      </svg>
                      {step.duration}
                    </span>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

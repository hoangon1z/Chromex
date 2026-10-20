import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { team } from '../../data/siteData'
import './Team.css'

gsap.registerPlugin(ScrollTrigger)

export default function Team() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.team__label', {
        y: 30, opacity: 0, duration: 0.8,
        scrollTrigger: { trigger: '.team__header', start: 'top 80%' }
      })
      gsap.from('.team__title', {
        y: 40, opacity: 0, duration: 0.8, delay: 0.1,
        scrollTrigger: { trigger: '.team__header', start: 'top 80%' }
      })
      gsap.from('.team-card', {
        y: 60, opacity: 0, stagger: 0.15, duration: 0.8,
        scrollTrigger: { trigger: '.team__grid', start: 'top 80%' }
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section className="section section--dark team" id="team" ref={sectionRef}>
      <div className="container">
        <div className="team__header">
          <div className="section-label team__label" style={{ justifyContent: 'center' }}>
            <span className="label label--accent">Đội ngũ</span>
          </div>
          <h2 className="heading-lg team__title">
            Những người<br />đứng sau <span className="chrome-text">CHROMEX</span>
          </h2>
        </div>

        <div className="team__grid">
          {team.map((member) => (
            <div className="team-card" key={member.id}>
              <div className="team-card__visual">
                <span className="team-card__initials">
                  {member.name.charAt(0)}
                </span>
              </div>
              <div className="team-card__info">
                <h3 className="team-card__name">{member.name}</h3>
                <p className="team-card__role">{member.role}</p>
                <p className="team-card__bio">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

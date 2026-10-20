import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import './Preloader.css'

export default function Preloader({ onComplete }) {
  const preloaderRef = useRef(null)
  const barRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(preloaderRef.current, {
          yPercent: -100,
          duration: 0.8,
          ease: 'power4.inOut',
          onComplete
        })
      }
    })

    tl.to(barRef.current, {
      width: '100%',
      duration: 1.5,
      ease: 'power2.inOut'
    })
    .to('.preloader__logo', {
      scale: 0.95,
      opacity: 0.5,
      duration: 0.3,
      yoyo: true,
      repeat: 1
    }, 0)
  }, [onComplete])

  return (
    <div className="preloader" ref={preloaderRef}>
      <div className="preloader__logo">CHROMEX</div>
      <div className="preloader__bar">
        <div className="preloader__bar-fill" ref={barRef}></div>
      </div>
    </div>
  )
}

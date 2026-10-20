import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Custom hook for basic GSAP scroll reveal animation
 */
export function useScrollReveal(options = {}) {
  const ref = useRef(null)
  
  useEffect(() => {
    const el = ref.current
    if (!el) return

    const {
      y = 60,
      x = 0,
      opacity = 0,
      duration = 1,
      delay = 0,
      ease = 'power3.out',
      start = 'top 85%',
      stagger = 0,
      scale = 1
    } = options

    const children = stagger ? el.children : [el]

    gsap.fromTo(children, 
      { y, x, opacity, scale },
      {
        y: 0,
        x: 0,
        opacity: 1,
        scale: 1,
        duration,
        delay,
        ease,
        stagger: stagger || 0,
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: 'play none none none'
        }
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === el) trigger.kill()
      })
    }
  }, [])

  return ref
}

/**
 * Custom hook for parallax effect
 */
export function useParallax(speed = 0.3) {
  const ref = useRef(null)
  
  useEffect(() => {
    const el = ref.current
    if (!el) return

    gsap.to(el, {
      yPercent: -speed * 100,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === el) trigger.kill()
      })
    }
  }, [speed])

  return ref
}

/**
 * Custom hook for counter animation
 */
export function useCounter(targetValue, duration = 2) {
  const ref = useRef(null)
  
  useEffect(() => {
    const el = ref.current
    if (!el) return

    const obj = { value: 0 }
    
    gsap.to(obj, {
      value: targetValue,
      duration,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      onUpdate: () => {
        el.textContent = Math.round(obj.value)
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === el) trigger.kill()
      })
    }
  }, [targetValue, duration])

  return ref
}

import { useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'

export function useSkillsScrollAnimation() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const section = sectionRef.current
      if (!section) return

      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(section.querySelectorAll('.skills__reveal, .skills__reveal-group'), {
          clearProps: 'all',
          opacity: 1,
          y: 0,
        })
      })

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('.skills__reveal', {
          y: 20,
          opacity: 0,
          duration: 0.55,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: '.skills__header',
            start: 'top 85%',
            toggleActions: 'play none none none',
            once: true,
          },
        })

        ScrollTrigger.batch('.skills__reveal-group', {
          interval: 0.08,
          batchMax: 2,
          onEnter: (groups) => {
            gsap.from(groups, {
              y: 24,
              opacity: 0,
              duration: 0.55,
              stagger: 0.08,
              ease: 'power3.out',
              overwrite: true,
            })
          },
          start: 'top 92%',
          once: true,
        })
      })

      return () => mm.revert()
    },
    { scope: sectionRef },
  )

  return sectionRef
}
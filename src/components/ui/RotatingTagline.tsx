import { gsap, useGSAP } from '@/lib/gsap'
import { useReducedMotion } from 'motion/react'
import { useRef } from 'react'
import './RotatingTagline.css'

type RotatingTaglineProps = {
  words: readonly string[]
  className?: string
  interval?: number
}

export function RotatingTagline({
  words,
  className = '',
  interval = 2.8,
}: RotatingTaglineProps) {
  const containerRef = useRef<HTMLParagraphElement>(null)
  const wordRef = useRef<HTMLSpanElement>(null)
  const indexRef = useRef(0)
  const reducedMotion = useReducedMotion()

  useGSAP(
    () => {
      if (reducedMotion || words.length <= 1) return

      const wordEl = wordRef.current
      if (!wordEl) return

      const cycle = () => {
        gsap.to(wordEl, {
          yPercent: -100,
          opacity: 0,
          duration: 0.45,
          ease: 'power3.in',
          onComplete: () => {
            indexRef.current = (indexRef.current + 1) % words.length
            wordEl.textContent = words[indexRef.current]
            gsap.set(wordEl, { yPercent: 100 })
            gsap.to(wordEl, {
              yPercent: 0,
              opacity: 1,
              duration: 0.55,
              ease: 'power3.out',
              onComplete: () => {
                gsap.delayedCall(interval, cycle)
              },
            })
          },
        })
      }

      gsap.delayedCall(interval, cycle)

      return () => {
        gsap.killTweensOf(wordEl)
      }
    },
    { scope: containerRef, dependencies: [words, interval, reducedMotion] },
  )

  const displayWord = words[0] ?? ''

  return (
    <p ref={containerRef} className={`rotating-tagline ${className}`.trim()}>
      <span className="rotating-tagline__prefix">Building</span>
      <span className="rotating-tagline__window" aria-live="polite">
        <span ref={wordRef} className="rotating-tagline__word">
          {displayWord}
        </span>
      </span>
    </p>
  )
}
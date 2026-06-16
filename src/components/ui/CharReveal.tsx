import { gsap, useGSAP } from '@/lib/gsap'
import { useReducedMotion } from 'motion/react'
import { useRef } from 'react'
import './CharReveal.css'

type CharRevealProps = {
  text: string
  className?: string
  id?: string
  as?: 'h1' | 'p' | 'span'
  delay?: number
}

export function CharReveal({
  text,
  className = '',
  id,
  as: Tag = 'span',
  delay = 0.05,
}: CharRevealProps) {
  const containerRef = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()

  useGSAP(
    () => {
      if (reducedMotion) return

      const container = containerRef.current
      if (!container) return

      const chars = container.querySelectorAll<HTMLElement>('.char-reveal__char')
      if (chars.length === 0) return

      gsap.fromTo(
        chars,
        { yPercent: 110, autoAlpha: 0 },
        {
          yPercent: 0,
          autoAlpha: 1,
          duration: 0.5,
          ease: 'power3.out',
          stagger: 0.02,
          delay,
          overwrite: 'auto',
        },
      )
    },
    { scope: containerRef, dependencies: [text, reducedMotion] },
  )

  if (reducedMotion) {
    return (
      <Tag id={id} className={`char-reveal char-reveal--static ${className}`.trim()}>
        {text}
      </Tag>
    )
  }

  const chars = text.split('').map((char, index) => (
    <span key={`${char}-${index}`} className="char-reveal__char-wrap" aria-hidden={char === ' '}>
      <span className="char-reveal__char">{char === ' ' ? '\u00A0' : char}</span>
    </span>
  ))

  return (
    <Tag id={id} ref={containerRef as never} className={`char-reveal ${className}`.trim()}>
      <span className="sr-only">{text}</span>
      <span className="char-reveal__visual" aria-hidden="true">
        {chars}
      </span>
    </Tag>
  )
}
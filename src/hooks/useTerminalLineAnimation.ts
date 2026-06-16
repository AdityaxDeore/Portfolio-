import { gsap, useGSAP } from '@/lib/gsap'
import { useRef, type RefObject } from 'react'

type UseTerminalLineAnimationOptions = {
  sessionId: number
  lineCount: number
  scopeRef: RefObject<HTMLElement | null>
}

export function useTerminalLineAnimation({
  sessionId,
  lineCount,
  scopeRef,
}: UseTerminalLineAnimationOptions) {
  const previousLineCountRef = useRef(0)
  const sessionReplacedRef = useRef(false)

  const markSessionReplaced = () => {
    sessionReplacedRef.current = true
    previousLineCountRef.current = 0
  }

  const animateLinesOut = () => {
    const root = scopeRef.current
    if (!root) return Promise.resolve()

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const lines = root.querySelectorAll('.portfolio-terminal__block')
    if (!lines.length || reduced) return Promise.resolve()

    return new Promise<void>((resolve) => {
      gsap.to(lines, {
        opacity: 0,
        y: -7,
        duration: 0.22,
        stagger: 0.024,
        ease: 'power2.in',
        onComplete: resolve,
      })
    })
  }

  useGSAP(
    () => {
      const root = scopeRef.current
      if (!root) return

      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const allLines = root.querySelectorAll('.portfolio-terminal__block')
      if (!allLines.length) return

      if (reduced) {
        gsap.set(allLines, { opacity: 1, y: 0, clearProps: 'filter' })
        previousLineCountRef.current = allLines.length
        sessionReplacedRef.current = false
        return
      }

      const startIndex = sessionReplacedRef.current ? 0 : previousLineCountRef.current
      const targets = Array.from(allLines).slice(startIndex) as HTMLElement[]

      sessionReplacedRef.current = false
      previousLineCountRef.current = allLines.length

      if (!targets.length) return

      gsap.fromTo(
        targets,
        { opacity: 0, y: 13, filter: 'blur(3px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.48,
          stagger: 0.042,
          ease: 'power3.out',
          clearProps: 'filter',
        },
      )
    },
    { scope: scopeRef, dependencies: [sessionId, lineCount], revertOnUpdate: false },
  )

  return { animateLinesOut, markSessionReplaced }
}
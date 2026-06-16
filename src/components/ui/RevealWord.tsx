import { type MotionValue, motion, useTransform } from 'motion/react'
import { type ReactNode } from 'react'
import './RevealWord.css'

type RevealWordProps = {
  children: ReactNode
  progress: MotionValue<number>
  range: [number, number]
  reducedMotion: boolean
}

export function RevealWord({ children, progress, range, reducedMotion }: RevealWordProps) {
  const opacity = useTransform(progress, range, [0, 1])

  if (reducedMotion) {
    return <span className="reveal-word reveal-word--static">{children}</span>
  }

  return (
    <span className="reveal-word">
      <span className="reveal-word__ghost" aria-hidden="true">
        {children}
      </span>
      <motion.span className="reveal-word__active" style={{ opacity }}>
        {children}
      </motion.span>
    </span>
  )
}
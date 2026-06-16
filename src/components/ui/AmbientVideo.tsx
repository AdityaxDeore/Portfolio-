import { ScrollTrigger, useGSAP } from '@/lib/gsap'
import { useReducedMotion } from 'motion/react'
import { useRef, type CSSProperties } from 'react'
import './AmbientVideo.css'

type AmbientVideoProps = {
  src: string
  className?: string
  opacity?: number
}

export function AmbientVideo({ src, className = '', opacity = 0.14 }: AmbientVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const reducedMotion = useReducedMotion()

  useGSAP(
    () => {
      if (reducedMotion) return

      const container = containerRef.current
      const video = videoRef.current
      if (!container || !video) return

      ScrollTrigger.create({
        trigger: container,
        start: 'top 90%',
        end: 'bottom 10%',
        onEnter: () => {
          void video.play().catch(() => {})
        },
        onEnterBack: () => {
          void video.play().catch(() => {})
        },
        onLeave: () => {
          video.pause()
        },
        onLeaveBack: () => {
          video.pause()
        },
      })
    },
    { scope: containerRef, dependencies: [reducedMotion] },
  )

  if (reducedMotion) {
    return (
      <div
        className={`ambient-video ambient-video--static ${className}`.trim()}
        aria-hidden="true"
      />
    )
  }

  return (
    <div
      ref={containerRef}
      className={`ambient-video ${className}`.trim()}
      style={{ '--ambient-opacity': opacity } as CSSProperties}
      aria-hidden="true"
    >
      <video
        ref={videoRef}
        className="ambient-video__media"
        src={src}
        muted
        loop
        playsInline
        preload="metadata"
        tabIndex={-1}
      />
      <div className="ambient-video__veil" />
      <div className="ambient-video__vignette" />
    </div>
  )
}
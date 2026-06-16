import { useEffect, useId, useState } from 'react'
import Particles, { ParticlesProvider } from '@tsparticles/react'
import type { Engine, ISourceOptions } from '@tsparticles/engine'
import { loadSlim } from '@tsparticles/slim'

type SparklesProps = {
  className?: string
  size?: number
  minSize?: number | null
  density?: number
  speed?: number
  minSpeed?: number | null
  opacity?: number
  opacitySpeed?: number
  minOpacity?: number | null
  color?: string
  background?: string
  options?: ISourceOptions
}

async function initSlim(engine: Engine) {
  await loadSlim(engine)
}

export function Sparkles({
  className,
  size = 1,
  minSize = null,
  density = 800,
  speed = 1,
  minSpeed = null,
  opacity = 1,
  opacitySpeed = 3,
  minOpacity = null,
  color = '#FFFFFF',
  background = 'transparent',
  options = {},
}: SparklesProps) {
  const [reduceMotion, setReduceMotion] = useState(false)
  const id = useId()

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduceMotion(media.matches)

    const onChange = () => setReduceMotion(media.matches)
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  if (reduceMotion) return null

  const defaultOptions: ISourceOptions = {
    background: {
      color: {
        value: background,
      },
    },
    fullScreen: {
      enable: false,
      zIndex: 1,
    },
    fpsLimit: 30,
    particles: {
      color: {
        value: color,
      },
      move: {
        enable: true,
        direction: 'none',
        speed: {
          min: minSpeed || speed / 10,
          max: speed,
        },
        straight: false,
      },
      number: {
        value: density,
      },
      opacity: {
        value: {
          min: minOpacity || opacity / 10,
          max: opacity,
        },
        animation: {
          enable: opacitySpeed > 0,
          sync: false,
          speed: opacitySpeed,
        },
      },
      size: {
        value: {
          min: minSize || size / 2.5,
          max: size,
        },
      },
    },
    detectRetina: false,
  }

  return (
    <ParticlesProvider init={initSlim}>
      <Particles
        id={id}
        options={{ ...defaultOptions, ...options }}
        className={className}
      />
    </ParticlesProvider>
  )
}
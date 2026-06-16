import { useEffect, useState } from 'react'

export type Breakpoint = 'mobile-sm' | 'mobile' | 'tablet' | 'desktop' | 'wide'

function getBreakpoint(width: number): Breakpoint {
  if (width < 480) return 'mobile-sm'
  if (width < 768) return 'mobile'
  if (width < 1024) return 'tablet'
  if (width < 1440) return 'desktop'
  return 'wide'
}

export function useBreakpoint(): Breakpoint {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>(() =>
    typeof window !== 'undefined' ? getBreakpoint(window.innerWidth) : 'desktop',
  )

  useEffect(() => {
    const onResize = () => setBreakpoint(getBreakpoint(window.innerWidth))
    onResize()
    window.addEventListener('resize', onResize, { passive: true })
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return breakpoint
}
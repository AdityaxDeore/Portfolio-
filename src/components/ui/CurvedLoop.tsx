import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent,
} from 'react'

type CurvedLoopProps = {
  text?: string
  speed?: number
  className?: string
  curveHeight?: number
  direction?: 'left' | 'right'
  interactive?: boolean
  paused?: boolean
  fontSize?: number
  fontFamily?: string
  fontWeight?: CSSProperties['fontWeight']
  height?: number
  gap?: number
  easing?: number
  onDirectionChange?: (direction: 'left' | 'right') => void
}

const MAX_DPR = 1.5

export function CurvedLoop({
  text = '',
  speed = 1,
  className = '',
  curveHeight = 50,
  direction = 'left',
  interactive = true,
  paused = false,
  fontSize = 48,
  fontFamily = "'Cormorant Garamond', Georgia, serif",
  fontWeight = 500,
  height = 200,
  gap = 0.5,
  easing = 0.05,
  onDirectionChange,
}: CurvedLoopProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const offsetRef = useRef(0)
  const targetOffsetRef = useRef(0)
  const isDraggingRef = useRef(false)
  const lastPointerXRef = useRef(0)
  const velocityRef = useRef(0)
  const directionRef = useRef(direction)
  const lastTimeRef = useRef(0)

  const [isReady, setIsReady] = useState(false)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [textWidth, setTextWidth] = useState(0)

  const processedText = useMemo(() => {
    const trimmed = text.trim()
    if (!trimmed) return ''
    return `${trimmed}${' '.repeat(Math.ceil((fontSize * gap) / 10))}`
  }, [text, fontSize, gap])

  useEffect(() => {
    directionRef.current = direction
  }, [direction])

  useEffect(() => {
    const updateDimensions = () => {
      if (!canvasRef.current?.parentElement) return

      const rect = canvasRef.current.parentElement.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR)

      setDimensions({
        width: rect.width * dpr,
        height: height * dpr,
      })
    }

    updateDimensions()

    const resizeObserver = new ResizeObserver(updateDimensions)
    if (canvasRef.current?.parentElement) {
      resizeObserver.observe(canvasRef.current.parentElement)
    }

    return () => resizeObserver.disconnect()
  }, [height])

  useEffect(() => {
    const measureText = async () => {
      const canvas = canvasRef.current
      if (!canvas || !processedText) return

      const ctx = canvas.getContext('2d', { alpha: true })
      if (!ctx) return

      try {
        await document.fonts.ready
      } catch {
        // Font loading is best-effort; canvas falls back to system fonts.
      }

      ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`
      const metrics = ctx.measureText(processedText)

      setTextWidth(metrics.width)
      setIsReady(true)
    }

    measureText()
  }, [processedText, fontSize, fontFamily, fontWeight])

  const drawCurvedText = useCallback(
    (ctx: CanvasRenderingContext2D, offset: number) => {
      const { width, height: canvasHeight } = dimensions
      if (!width || !canvasHeight || !textWidth || !processedText || !canvasRef.current) return

      ctx.clearRect(0, 0, width, canvasHeight)

      ctx.save()
      ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`
      ctx.fillStyle = getComputedStyle(canvasRef.current).color
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      const repeatCount = Math.ceil(width / textWidth) + 2

      let normalizedOffset = offset % textWidth
      if (normalizedOffset > 0) normalizedOffset -= textWidth

      for (let i = 0; i < repeatCount; i++) {
        const baseX = normalizedOffset + i * textWidth

        let charX = baseX
        for (let j = 0; j < processedText.length; j++) {
          const char = processedText[j]
          const charMetrics = ctx.measureText(char)
          const charWidth = charMetrics.width

          if (charX + charWidth < 0 || charX > width) {
            charX += charWidth
            continue
          }

          const normalizedX = charX / width
          const curveY = canvasHeight / 2 - curveHeight * Math.sin(normalizedX * Math.PI)

          const angleT = Math.max(0, Math.min(1, normalizedX))
          const derivative =
            (-curveHeight * Math.PI * Math.cos(angleT * Math.PI)) / width
          const angle = Math.atan(derivative)

          ctx.save()
          ctx.translate(charX + charWidth / 2, curveY)
          ctx.rotate(angle)
          ctx.fillText(char, 0, 0)
          ctx.restore()

          charX += charWidth
        }
      }

      ctx.restore()
    },
    [dimensions, textWidth, processedText, fontSize, fontFamily, fontWeight, curveHeight],
  )

  useEffect(() => {
    if (!isReady || !canvasRef.current || !dimensions.width || !textWidth) return

    const ctx = canvasRef.current.getContext('2d', { alpha: true })
    if (!ctx) return

    if (paused) {
      drawCurvedText(ctx, 0)
      return
    }

    let animationFrameId = 0

    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastTimeRef.current
      lastTimeRef.current = currentTime

      if (!isDraggingRef.current) {
        if (Math.abs(velocityRef.current) > 0.1) {
          targetOffsetRef.current += velocityRef.current
          velocityRef.current *= 0.95
        } else {
          const frameMultiplier = deltaTime > 0 ? deltaTime / 16.67 : 1
          const delta = directionRef.current === 'right' ? speed : -speed
          targetOffsetRef.current += delta * frameMultiplier
        }
      }

      offsetRef.current += (targetOffsetRef.current - offsetRef.current) * easing

      if (offsetRef.current > textWidth) {
        offsetRef.current -= textWidth
        targetOffsetRef.current -= textWidth
      } else if (offsetRef.current < -textWidth) {
        offsetRef.current += textWidth
        targetOffsetRef.current += textWidth
      }

      drawCurvedText(ctx, offsetRef.current)
      animationFrameId = requestAnimationFrame(animate)
    }

    lastTimeRef.current = performance.now()
    animationFrameId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [isReady, drawCurvedText, speed, textWidth, easing, dimensions.width, paused])

  const handlePointerDown = useCallback(
    (event: PointerEvent<HTMLCanvasElement>) => {
      if (!interactive || paused) return

      isDraggingRef.current = true
      lastPointerXRef.current = event.clientX
      velocityRef.current = 0
      event.currentTarget.setPointerCapture(event.pointerId)
      event.preventDefault()
    },
    [interactive, paused],
  )

  const handlePointerMove = useCallback(
    (event: PointerEvent<HTMLCanvasElement>) => {
      if (!interactive || paused || !isDraggingRef.current) return

      const dx = event.clientX - lastPointerXRef.current
      lastPointerXRef.current = event.clientX
      velocityRef.current = dx * 0.5
      targetOffsetRef.current += dx
      offsetRef.current += dx
    },
    [interactive, paused],
  )

  const handlePointerUp = useCallback(
    (event: PointerEvent<HTMLCanvasElement>) => {
      if (!interactive || paused) return

      isDraggingRef.current = false

      if (Math.abs(velocityRef.current) > 1) {
        const newDirection = velocityRef.current > 0 ? 'right' : 'left'
        if (newDirection !== directionRef.current) {
          directionRef.current = newDirection
          onDirectionChange?.(newDirection)
        }
      }

      event.currentTarget.releasePointerCapture(event.pointerId)
    },
    [interactive, paused, onDirectionChange],
  )

  const canvasStyle: CSSProperties = {
    height: `${height}px`,
    cursor: interactive && !paused ? 'grab' : 'default',
    touchAction: interactive && !paused ? 'none' : 'auto',
  }

  return (
    <div className={`curved-loop ${className}`.trim()}>
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        className="curved-loop__canvas"
        style={canvasStyle}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onPointerCancel={handlePointerUp}
        aria-hidden="true"
      />
      {!isReady && <div className="curved-loop__loading" aria-hidden="true" />}
    </div>
  )
}
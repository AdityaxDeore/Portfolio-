import { useEffect, useRef } from 'react'

export function OrangeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let width = 0
    let height = 0

    // Particle class
    class Particle {
      x: number
      y: number
      vx: number
      vy: number
      radius: number
      baseRadius: number
      color: string

      constructor(w: number, h: number) {
        this.x = Math.random() * w
        this.y = Math.random() * h
        this.vx = (Math.random() - 0.5) * 0.4
        this.vy = (Math.random() - 0.5) * 0.4
        this.baseRadius = Math.random() * 2 + 1.5
        this.radius = this.baseRadius
        this.color = `rgba(249, 115, 22, ${Math.random() * 0.4 + 0.3})` // Orange tint
      }

      update(mouseX: number, mouseY: number) {
        this.x += this.vx
        this.y += this.vy

        // Wrap around borders
        if (this.x < 0) this.x = width
        if (this.x > width) this.x = 0
        if (this.y < 0) this.y = height
        if (this.y > height) this.y = 0

        // Mouse interaction
        const dx = mouseX - this.x
        const dy = mouseY - this.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 100) {
          const force = (100 - dist) / 100
          this.x -= (dx / dist) * force * 2
          this.y -= (dy / dist) * force * 2
          this.radius = this.baseRadius + force * 2
        } else {
          if (this.radius > this.baseRadius) {
            this.radius -= 0.1
          }
        }
      }

      draw(c: CanvasRenderingContext2D) {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        c.fillStyle = this.color
        c.fill()
      }
    }

    const particles: Particle[] = []
    const particleCount = 65

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      // Set resolution higher for crisp rendering on retina displays
      const dpr = window.devicePixelRatio || 1
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.scale(dpr, dpr)

      // Re-initialize particles to fit new size
      particles.length = 0
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(width, height))
      }
    }

    // Mouse coordinates relative to canvas
    const mouse = { x: -1000, y: -1000 }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }

    const handleMouseLeave = () => {
      mouse.x = -1000
      mouse.y = -1000
    }

    resize()
    window.addEventListener('resize', resize)
    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseleave', handleMouseLeave)

    // Morphing Blob points
    const numPoints = 8
    const points: { x: number; y: number; ox: number; oy: number; angle: number; speed: number; range: number }[] = []
    const center = { x: 0, y: 0 }
    const radius = 120

    for (let i = 0; i < numPoints; i++) {
      const angle = (i / numPoints) * Math.PI * 2
      points.push({
        x: 0,
        y: 0,
        ox: Math.cos(angle) * radius,
        oy: Math.sin(angle) * radius,
        angle: Math.random() * Math.PI * 2,
        speed: 0.015 + Math.random() * 0.01,
        range: 15 + Math.random() * 15,
      })
    }

    let time = 0

    // Render loop
    const render = () => {
      time += 0.005
      ctx.clearRect(0, 0, width, height)

      // Draw background glow
      const bgGrad = ctx.createRadialGradient(
        width / 2,
        height / 2,
        10,
        width / 2,
        height / 2,
        Math.max(width, height) / 1.5
      )
      bgGrad.addColorStop(0, 'rgba(251, 91, 3, 0.12)') // deep orange center glow
      bgGrad.addColorStop(1, 'rgba(0, 0, 0, 0)')
      ctx.fillStyle = bgGrad
      ctx.fillRect(0, 0, width, height)

      // Draw connected particles
      particles.forEach((p) => {
        p.update(mouse.x, mouse.y)
        p.draw(ctx)
      })

      // Draw connections
      ctx.strokeStyle = 'rgba(249, 115, 22, 0.08)'
      ctx.lineWidth = 0.8
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 85) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      // Draw beautiful central orange liquid blob
      center.x = width / 2
      center.y = height / 2

      // Mouse influence on blob center
      if (mouse.x > 0 && mouse.y > 0) {
        center.x += (mouse.x - width / 2) * 0.08
        center.y += (mouse.y - height / 2) * 0.08
      }

      points.forEach((p) => {
        p.angle += p.speed
        const offset = Math.sin(p.angle) * p.range
        const r = radius + offset
        p.x = center.x + Math.cos((points.indexOf(p) / numPoints) * Math.PI * 2) * r
        p.y = center.y + Math.sin((points.indexOf(p) / numPoints) * Math.PI * 2) * r
      })

      ctx.beginPath()
      ctx.moveTo(points[0].x, points[0].y)
      for (let i = 0; i < numPoints; i++) {
        const next = points[(i + 1) % numPoints]
        const xc = (points[i].x + next.x) / 2
        const yc = (points[i].y + next.y) / 2
        ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc)
      }
      ctx.closePath()

      // Blob gradient styling
      const blobGrad = ctx.createLinearGradient(
        center.x - radius,
        center.y - radius,
        center.x + radius,
        center.y + radius
      )
      blobGrad.addColorStop(0, '#ea580c') // orange-600
      blobGrad.addColorStop(0.5, '#f97316') // orange-500
      blobGrad.addColorStop(1, '#fdba74') // orange-300
      ctx.fillStyle = blobGrad
      ctx.shadowBlur = 40
      ctx.shadowColor = 'rgba(249, 115, 22, 0.4)'
      ctx.fill()

      // Reset shadow for subsequent drawings
      ctx.shadowBlur = 0

      // Add a glassy specular highlight inside the blob
      ctx.beginPath()
      ctx.arc(center.x - radius * 0.35, center.y - radius * 0.35, radius * 0.25, 0, Math.PI * 2)
      const specGrad = ctx.createLinearGradient(
        center.x - radius * 0.6,
        center.y - radius * 0.6,
        center.x - radius * 0.1,
        center.y - radius * 0.1
      )
      specGrad.addColorStop(0, 'rgba(255, 255, 255, 0.4)')
      specGrad.addColorStop(1, 'rgba(255, 255, 255, 0)')
      ctx.fillStyle = specGrad
      ctx.fill()

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div className="orange-canvas-container">
      <canvas ref={canvasRef} className="orange-canvas-element" />
    </div>
  )
}

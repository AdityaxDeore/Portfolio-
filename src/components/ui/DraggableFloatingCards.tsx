import { useCallback, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import './DraggableFloatingCards.css'

export type CornerAnchor = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

export type FloatingCard = {
  id: string
  label: string
  image: string
  anchor: CornerAnchor
  x: number
  y: number
  rotate: number
  z: number
}

type DragState = {
  id: string
  startX: number
  startY: number
  originX: number
  originY: number
}

type CardPosition = { x: number; y: number }

type DraggableFloatingCardsProps = {
  cards: readonly FloatingCard[]
  children: ReactNode
  className?: string
}

const ANCHOR_POSITION: Record<CornerAnchor, CSSProperties> = {
  'top-left': { top: '5%', left: '2%' },
  'top-right': { top: '5%', right: '2%' },
  'bottom-left': { bottom: '6%', left: '2%' },
  'bottom-right': { bottom: '6%', right: '2%' },
}

const MAX_DRAG_OFFSET = 48

export function DraggableFloatingCards({ cards, children, className }: DraggableFloatingCardsProps) {
  const [positions, setPositions] = useState<Record<string, CardPosition>>(() =>
    Object.fromEntries(cards.map((card) => [card.id, { x: card.x, y: card.y }]))
  )
  const dragRef = useRef<DragState | null>(null)
  const areaRef = useRef<HTMLDivElement>(null)

  const handlePointerDown = useCallback(
    (id: string, event: React.PointerEvent<HTMLDivElement>) => {
      event.preventDefault()
      const current = positions[id] ?? { x: 0, y: 0 }
      dragRef.current = {
        id,
        startX: event.clientX,
        startY: event.clientY,
        originX: current.x,
        originY: current.y,
      }
      event.currentTarget.setPointerCapture(event.pointerId)
    },
    [positions]
  )

  const handlePointerMove = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current
    if (!drag) return

    const dx = event.clientX - drag.startX
    const dy = event.clientY - drag.startY

    setPositions((prev) => ({
      ...prev,
      [drag.id]: {
        x: Math.max(-MAX_DRAG_OFFSET, Math.min(MAX_DRAG_OFFSET, drag.originX + dx)),
        y: Math.max(-MAX_DRAG_OFFSET, Math.min(MAX_DRAG_OFFSET, drag.originY + dy)),
      },
    }))
  }, [])

  const handlePointerUp = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    if (dragRef.current) {
      event.currentTarget.releasePointerCapture(event.pointerId)
      dragRef.current = null
    }
  }, [])

  return (
    <div
      ref={areaRef}
      className={`draggable-hero${className ? ` ${className}` : ''}`}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      <div className="draggable-hero__cards" aria-hidden="true">
        {cards.map((card) => {
          const offset = positions[card.id] ?? { x: card.x, y: card.y }
          return (
            <div
              key={card.id}
              className={`draggable-hero__card-anchor draggable-hero__card-anchor--${card.anchor}`}
              style={{
                zIndex: card.z,
                ...ANCHOR_POSITION[card.anchor],
              }}
            >
              <div className={`draggable-hero__card-motion draggable-hero__card-motion--${card.anchor}`}>
                <div
                  className="draggable-hero__card"
                  style={{
                    transform: `translate(${offset.x}px, ${offset.y}px) rotate(${card.rotate}deg)`,
                  }}
                  onPointerDown={(e) => handlePointerDown(card.id, e)}
                >
                  <img src={card.image} alt="" className="draggable-hero__card-image" draggable={false} />
                  <span className="draggable-hero__card-label">{card.label}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="draggable-hero__center">{children}</div>
    </div>
  )
}

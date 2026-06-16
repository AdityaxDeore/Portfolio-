import { useReducedMotion } from 'motion/react'
import './TerminalTitlebar.css'

type WindowState = 'normal' | 'minimized' | 'expanded'

type TerminalTitlebarProps = {
  title: string
  windowState?: WindowState
  onClose?: () => void
  onMinimize?: () => void
  onMaximize?: () => void
}

export function TerminalTitlebar({
  title,
  windowState = 'normal',
  onClose,
  onMinimize,
  onMaximize,
}: TerminalTitlebarProps) {
  const reducedMotion = useReducedMotion()

  return (
    <div
      className={`terminal-titlebar${windowState === 'minimized' ? ' terminal-titlebar--minimized' : ''}${windowState === 'expanded' ? ' terminal-titlebar--expanded' : ''}`}
      data-window-state={windowState}
    >
      <div className="terminal-titlebar__controls" aria-hidden="true">
        <button
          type="button"
          className="terminal-titlebar__btn terminal-titlebar__btn--close"
          aria-label="Close terminal session"
          onClick={(event) => {
            event.stopPropagation()
            onClose?.()
          }}
        >
          <span className="terminal-titlebar__glyph" aria-hidden="true">
            ×
          </span>
        </button>
        <button
          type="button"
          className="terminal-titlebar__btn terminal-titlebar__btn--minimize"
          aria-label={windowState === 'minimized' ? 'Restore terminal' : 'Minimize terminal'}
          onClick={(event) => {
            event.stopPropagation()
            onMinimize?.()
          }}
        >
          <span className="terminal-titlebar__glyph" aria-hidden="true">
            −
          </span>
        </button>
        <button
          type="button"
          className="terminal-titlebar__btn terminal-titlebar__btn--maximize"
          aria-label={windowState === 'expanded' ? 'Restore terminal size' : 'Expand terminal'}
          onClick={(event) => {
            event.stopPropagation()
            onMaximize?.()
          }}
        >
          <span className="terminal-titlebar__glyph" aria-hidden="true">
            {windowState === 'expanded' && !reducedMotion ? '⤢' : '+'}
          </span>
        </button>
      </div>

      <p className="terminal-titlebar__title">{title}</p>
      <div className="terminal-titlebar__spacer" aria-hidden="true" />
    </div>
  )
}
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
          <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg" className="terminal-titlebar__svg">
            <path d="M1.5 1.5L4.5 4.5M4.5 1.5L1.5 4.5" stroke="#4c0002" strokeWidth="1.1" strokeLinecap="round"/>
          </svg>
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
          <svg width="6" height="1" viewBox="0 0 6 1" fill="none" xmlns="http://www.w3.org/2000/svg" className="terminal-titlebar__svg">
            <path d="M0.5 0.5H5.5" stroke="#5c3e00" strokeWidth="1.1" strokeLinecap="round"/>
          </svg>
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
          <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg" className="terminal-titlebar__svg">
            <path d="M1.5 4.5H4.5V1.5" stroke="#004c00" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M4.5 4.5L1.5 1.5" stroke="#004c00" strokeWidth="1.1" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      <p className="terminal-titlebar__title">{title}</p>
      <div className="terminal-titlebar__spacer" aria-hidden="true" />
    </div>
  )
}

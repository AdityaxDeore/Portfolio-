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
}: TerminalTitlebarProps) {
  return (
    <div
      className={`terminal-titlebar${windowState === 'minimized' ? ' terminal-titlebar--minimized' : ''}${windowState === 'expanded' ? ' terminal-titlebar--expanded' : ''}`}
      data-window-state={windowState}
    >
      <div className="terminal-titlebar__status">
        <span className="terminal-titlebar__dot" />
        <p className="terminal-titlebar__title">{title}</p>
      </div>
      <div className="terminal-titlebar__spacer" aria-hidden="true" />
    </div>
  )
}
import { colorizeTerminalLine } from '@/lib/colorizeTerminalLine'
import { getCommandSuggestions } from '@/data/terminal'
import {
  inferLineRole,
  type TerminalPresentation,
} from '@/lib/inferTerminalPresentation'
import { TerminalTitlebar } from '@/components/ui/TerminalTitlebar'
import { MessageLoading } from '@/components/ui/message-loading'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from 'react'
import './PortfolioTerminal.css'

export type TerminalLineEntry = {
  key: string
  kind: 'output' | 'input' | 'tool'
  text: string
  node?: ReactNode
  presentation?: TerminalPresentation
}

type TerminalBlock = {
  key: string
  lines: TerminalLineEntry[]
  presentation?: TerminalPresentation
  isWelcome?: boolean
}

type WindowState = 'normal' | 'minimized' | 'expanded'

type PortfolioTerminalProps = {
  lines: TerminalLineEntry[]
  title?: string
  prompt?: string
  hints?: string
  status?: string
  onSubmit: (value: string) => void
  onClose?: () => void
  quickActions?: ReactNode
  className?: string
  isLoading?: boolean
}

const MAX_HISTORY = 40
const BLOCK_EASE = [0.22, 1, 0.36, 1] as const

function groupLinesIntoBlocks(lines: TerminalLineEntry[]): TerminalBlock[] {
  const blocks: TerminalBlock[] = []
  let current: TerminalLineEntry[] = []
  let presentation: TerminalPresentation | undefined
  let blockKey = 'welcome'
  let isWelcome = true

  const flush = () => {
    if (!current.length) return
    blocks.push({
      key: blockKey,
      lines: current,
      presentation,
      isWelcome,
    })
    current = []
    presentation = undefined
    isWelcome = false
  }

  for (const line of lines) {
    if (line.kind === 'input') {
      flush()
      blockKey = line.key
      current = [line]
      continue
    }

    if (line.kind === 'tool') {
      current.push(line)
      presentation = line.presentation
      continue
    }

    current.push(line)
  }

  flush()
  return blocks
}

function getIdentityInitial(text: string): string {
  return text
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
}

export function PortfolioTerminal({
  lines,
  title = 'portfolio-shell',
  prompt = '>',
  hints = 'Type `help` · Tab to complete · ↑↓ history',
  status = 'portfolio session',
  onSubmit,
  onClose,
  quickActions,
  className = '',
  isLoading = false,
}: PortfolioTerminalProps) {
  const reducedMotion = useReducedMotion()
  const shellRef = useRef<HTMLDivElement>(null)
  const transcriptRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [suggestionIndex, setSuggestionIndex] = useState(0)
  const [windowState, setWindowState] = useState<WindowState>('normal')

  const suggestions = useMemo(() => getCommandSuggestions(input), [input])
  const showSuggestions = input.length > 0 && suggestions.length > 0
  const blocks = useMemo(() => groupLinesIntoBlocks(lines), [lines])

  const focusInput = useCallback(() => {
    if (windowState === 'minimized') {
      setWindowState('normal')
    }
    inputRef.current?.focus()
  }, [windowState])

  useEffect(() => {
    const transcript = transcriptRef.current
    if (!transcript || windowState === 'minimized') return
    transcript.scrollTo({ top: transcript.scrollHeight, behavior: reducedMotion ? 'auto' : 'smooth' })
  }, [lines, reducedMotion, windowState])

  useEffect(() => {
    setSuggestionIndex(0)
  }, [input, suggestions.length])

  const submit = useCallback(
    (raw: string) => {
      const trimmed = raw.trim()
      if (!trimmed) return

      setHistory((prev) => {
        const next = prev.filter((entry) => entry !== trimmed)
        return [trimmed, ...next].slice(0, MAX_HISTORY)
      })
      setHistoryIndex(-1)
      setInput('')
      if (windowState === 'minimized') {
        setWindowState('normal')
      }
      onSubmit(trimmed)
    },
    [onSubmit, windowState],
  )

  const applySuggestion = useCallback((value: string) => {
    setInput(value)
    setSuggestionIndex(0)
    requestAnimationFrame(() => {
      const el = inputRef.current
      if (!el) return
      el.focus()
      el.setSelectionRange(value.length, value.length)
    })
  }, [])

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        event.preventDefault()
        if (showSuggestions && suggestions[suggestionIndex]) {
          applySuggestion(suggestions[suggestionIndex])
          return
        }
        submit(input)
        return
      }

      if (event.key === 'Tab') {
        event.preventDefault()
        if (!suggestions.length) return
        applySuggestion(suggestions[suggestionIndex])
        return
      }

      if (event.key === 'ArrowDown') {
        if (showSuggestions) {
          event.preventDefault()
          setSuggestionIndex((index) => (index + 1) % suggestions.length)
          return
        }
        if (!history.length) return
        event.preventDefault()
        const nextIndex = historyIndex < 0 ? 0 : Math.min(historyIndex + 1, history.length - 1)
        setHistoryIndex(nextIndex)
        setInput(history[nextIndex] ?? '')
        return
      }

      if (event.key === 'ArrowUp') {
        if (showSuggestions) {
          event.preventDefault()
          setSuggestionIndex((index) => (index - 1 + suggestions.length) % suggestions.length)
          return
        }
        if (!history.length) return
        event.preventDefault()
        const nextIndex = historyIndex < 0 ? 0 : Math.max(historyIndex - 1, 0)
        setHistoryIndex(nextIndex)
        setInput(history[nextIndex] ?? '')
        return
      }

      if (event.key === 'Escape') {
        event.preventDefault()
        setInput('')
        setHistoryIndex(-1)
        return
      }
    },
    [
      applySuggestion,
      history,
      historyIndex,
      input,
      showSuggestions,
      submit,
      suggestionIndex,
      suggestions,
    ],
  )

  const renderLine = (line: TerminalLineEntry, presentation: TerminalPresentation = 'default') => {
    if (line.kind === 'input') {
      return (
        <div className="portfolio-terminal__input-line">
          <span className="portfolio-terminal__prompt">{prompt}</span>
          <span className="portfolio-terminal__typed">{line.text}</span>
        </div>
      )
    }

    if (line.kind === 'tool') {
      return (
        <div className="portfolio-terminal__tool-line">
          {colorizeTerminalLine(line.text, 'tool')}
        </div>
      )
    }

    const role = inferLineRole(line.text, presentation)

    return (
      <div
        className={`portfolio-terminal__output-line portfolio-terminal__output-line--${role}`}
        data-role={role}
      >
        {line.node ?? colorizeTerminalLine(line.text)}
      </div>
    )
  }

  const renderBlockBody = (block: TerminalBlock) => {
    const presentation = block.presentation ?? 'default'
    const outputLines = block.lines.filter((line) => line.kind === 'output')

    if (presentation === 'identity' && outputLines.length > 0) {
      const [nameLine, ...rest] = outputLines
      return (
        <div className="portfolio-terminal__identity-card">
          <div className="portfolio-terminal__identity-badge" aria-hidden="true">
            {getIdentityInitial(nameLine.text)}
          </div>
          <div className="portfolio-terminal__identity-body">
            <p className="portfolio-terminal__identity-name">{colorizeTerminalLine(nameLine.text)}</p>
            {rest.map((line) => (
              <div
                key={line.key}
                className={`portfolio-terminal__output-line portfolio-terminal__output-line--${inferLineRole(line.text, presentation)}`}
              >
                {line.node ?? colorizeTerminalLine(line.text)}
              </div>
            ))}
          </div>
        </div>
      )
    }

    return block.lines
      .filter((line) => line.kind === 'output')
      .map((line) => (
        <div key={line.key} className="portfolio-terminal__line portfolio-terminal__line--output">
          {renderLine(line, presentation)}
        </div>
      ))
  }

  return (
    <div
      ref={shellRef}
      className={`portfolio-terminal portfolio-terminal--${windowState} ${className}`.trim()}
      onClick={focusInput}
      role="region"
      aria-label="Interactive terminal"
    >
      <TerminalTitlebar
        title={title}
        windowState={windowState}
        onClose={() => onClose?.()}
        onMinimize={() => setWindowState((state) => (state === 'minimized' ? 'normal' : 'minimized'))}
        onMaximize={() =>
          setWindowState((state) => (state === 'expanded' ? 'normal' : 'expanded'))
        }
      />

      <div className="portfolio-terminal__body">
        <div ref={transcriptRef} className="portfolio-terminal__transcript">
          {blocks.map((block, blockIndex) => (
            <motion.section
              key={block.key}
              className={`portfolio-terminal__block${block.isWelcome ? ' portfolio-terminal__block--welcome' : ''}${block.presentation ? ` portfolio-terminal__block--${block.presentation}` : ''}`}
              data-presentation={block.presentation ?? 'default'}
              initial={reducedMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.42,
                delay: block.isWelcome ? blockIndex * 0.04 : 0,
                ease: BLOCK_EASE,
              }}
            >
              {block.lines
                .filter((line) => line.kind !== 'output')
                .map((line) => (
                  <div
                    key={line.key}
                    className={`portfolio-terminal__line portfolio-terminal__line--${line.kind}`}
                  >
                    {renderLine(line, block.presentation)}
                  </div>
                ))}

              {block.presentation === 'identity' ? (
                renderBlockBody(block)
              ) : (
                <div className="portfolio-terminal__block-content">
                  {renderBlockBody(block)}
                </div>
              )}

              {!block.isWelcome ? <div className="portfolio-terminal__block-divider" aria-hidden="true" /> : null}
            </motion.section>
          ))}
          {isLoading && (
            <div className="portfolio-terminal__loading-line" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem' }}>
              <span className="portfolio-terminal__prompt">{prompt}</span>
              <MessageLoading />
            </div>
          )}
        </div>

        <div className="portfolio-terminal__chrome">
          {quickActions ? (
            <div className="portfolio-terminal__quick-actions" role="toolbar" aria-label="Quick actions">
              {quickActions}
            </div>
          ) : null}

          <AnimatePresence>
            {showSuggestions ? (
              <motion.ul
                className="portfolio-terminal__suggestions"
                aria-label="Command suggestions"
                initial={reducedMotion ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reducedMotion ? undefined : { opacity: 0, y: 4 }}
                transition={{ duration: 0.18, ease: BLOCK_EASE }}
              >
                {suggestions.slice(0, 6).map((suggestion, index) => (
                  <li key={suggestion}>
                    <button
                      type="button"
                      className={`portfolio-terminal__suggestion${index === suggestionIndex ? ' portfolio-terminal__suggestion--active' : ''}`}
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={() => applySuggestion(suggestion)}
                    >
                      {suggestion}
                    </button>
                  </li>
                ))}
              </motion.ul>
            ) : null}
          </AnimatePresence>

          <p className="portfolio-terminal__hints">{hints}</p>

          <div className="portfolio-terminal__input-row portfolio-terminal__input-row--live">
            <span className="portfolio-terminal__prompt" aria-hidden="true">
              {prompt}
            </span>
            <span className="portfolio-terminal__typed portfolio-terminal__typed--live">
              {input}
              <span className="portfolio-terminal__cursor" aria-hidden="true" />
            </span>
          </div>

          <div className="portfolio-terminal__status" aria-live="polite">
            <span className="portfolio-terminal__status-model">portfolio</span>
            <span className="portfolio-terminal__status-sep">·</span>
            <span>{status}</span>
            <span className="portfolio-terminal__status-sep">·</span>
            <span className="portfolio-terminal__status-dim">{lines.length} lines</span>
          </div>
        </div>
      </div>

      <input
        ref={inputRef}
        className="portfolio-terminal__hidden-input"
        value={input}
        onChange={(event) => {
          setHistoryIndex(-1)
          setInput(event.target.value)
        }}
        onKeyDown={handleKeyDown}
        aria-label="Terminal command input"
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
      />
    </div>
  )
}
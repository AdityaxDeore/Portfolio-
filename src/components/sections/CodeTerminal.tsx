import {
  terminalSection,
  terminalWelcome,
  TERMINAL_APP_NAME,
  TERMINAL_CWD,
} from '@/data/terminal'
import { colorizeTerminalLine } from '@/lib/colorizeTerminalLine'
import { useTerminalLineAnimation } from '@/hooks/useTerminalLineAnimation'
import { runTerminalCommand } from '@/lib/runTerminalCommand'
import { PortfolioTerminal, type TerminalLineEntry } from '@/components/ui/PortfolioTerminal'
import { motion, useReducedMotion } from 'motion/react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './CodeTerminal.css'

const EASE_OUT = [0.22, 1, 0.36, 1] as const

function createWelcomeLines(): TerminalLineEntry[] {
  return terminalWelcome.map((text, index) => ({
    key: `welcome-${index}`,
    kind: 'output',
    text,
    node: colorizeTerminalLine(text),
  }))
}

type HandleInputOptions = {
  replace?: boolean
}

export function CodeTerminal() {
  const navigate = useNavigate()
  const reducedMotion = useReducedMotion()
  const lineKeyRef = useRef(0)
  const quickActionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const terminalWrapRef = useRef<HTMLDivElement>(null)

  const [terminalLines, setTerminalLines] = useState<TerminalLineEntry[]>(createWelcomeLines)
  const [sessionId, setSessionId] = useState(0)
  const [isBlanking, setIsBlanking] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { markSessionReplaced } = useTerminalLineAnimation({
    sessionId,
    lineCount: terminalLines.length,
    scopeRef: terminalWrapRef,
  })

  useEffect(() => {
    if (!terminalWrapRef.current) return
    let timeoutId: ReturnType<typeof setTimeout>

    const observer = new ResizeObserver(() => {
      // Debounce the refresh slightly to batch rapid height changes (e.g., from typing)
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        import('@/lib/gsap').then(({ ScrollTrigger }) => {
          ScrollTrigger.refresh()
        })
      }, 50)
    })

    observer.observe(terminalWrapRef.current)

    return () => {
      clearTimeout(timeoutId)
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    return () => {
      if (quickActionTimerRef.current) {
        clearTimeout(quickActionTimerRef.current)
      }
    }
  }, [])

  const nextKey = useCallback((prefix: string) => {
    lineKeyRef.current += 1
    return `${prefix}-${lineKeyRef.current}`
  }, [])

  const buildCommandLines = useCallback(
    (raw: string) => {
      const result = runTerminalCommand(raw)
      const inputLine: TerminalLineEntry = {
        key: nextKey('in'),
        kind: 'input',
        text: raw.trim(),
      }

      const toolLine: TerminalLineEntry | null = result.tool
        ? {
            key: nextKey('tool'),
            kind: 'tool',
            text: result.tool,
            presentation: result.presentation,
          }
        : null

      const outputLines: TerminalLineEntry[] = result.lines.map((line) => ({
        key: nextKey('out'),
        kind: 'output',
        text: line,
        node: colorizeTerminalLine(line),
      }))

      return { result, inputLine, toolLine, outputLines }
    },
    [nextKey],
  )

  const handleInput = useCallback(
    (raw: string, options?: HandleInputOptions) => {
      const trimmed = raw.trim()
      if (!trimmed) return

      const { result, inputLine, toolLine, outputLines } = buildCommandLines(trimmed)
      const responseLines = toolLine ? [inputLine, toolLine, ...outputLines] : [inputLine, ...outputLines]

      if (result.clear) {
        markSessionReplaced()
        setSessionId((id) => id + 1)
        setTerminalLines([...createWelcomeLines(), ...responseLines])
        setIsBlanking(false)
        return
      }

      if (options?.replace) {
        markSessionReplaced()
        setSessionId((id) => id + 1)
        setTerminalLines(responseLines)
      } else {
        setTerminalLines((prev) => [...prev, ...responseLines])
      }

      setIsBlanking(false)
      setIsLoading(false)

      if (result.navigateTo) {
        navigate(result.navigateTo)
      }
    },
    [buildCommandLines, markSessionReplaced, navigate],
  )

  return (
    <section id="terminal" className="code-terminal" aria-labelledby="terminal-title">
      <div className="container">
        <motion.header
          className="code-terminal__header"
          initial={reducedMotion ? false : { opacity: 0, y: 18 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.65, ease: EASE_OUT }}
        >
          <p className="code-terminal__label">{terminalSection.label}</p>
          <h2 id="terminal-title" className="code-terminal__title">
            {terminalSection.title}
          </h2>
          <p className="code-terminal__subtitle">{terminalSection.subtitle}</p>
        </motion.header>

        <motion.div
          ref={terminalWrapRef}
          className={`code-terminal__terminal-wrap${isBlanking ? ' code-terminal__terminal-wrap--blank' : ''}`}
          initial={reducedMotion ? false : { opacity: 0, y: 28, scale: 0.985 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.75, delay: 0.14, ease: EASE_OUT }}
        >
            <PortfolioTerminal
            title={`${TERMINAL_APP_NAME} — ${TERMINAL_CWD}`}
            lines={terminalLines}
            status={TERMINAL_CWD}
            hints="Type `help` · Tab to complete · ↑↓ history · Esc to clear"
            onSubmit={handleInput}
            onClose={() => {
              markSessionReplaced()
              setSessionId((id) => id + 1)
              setTerminalLines(createWelcomeLines())
              setIsBlanking(false)
              setIsLoading(false)
            }}
            isLoading={isLoading}
          />
        </motion.div>
      </div>
    </section>
  )
}
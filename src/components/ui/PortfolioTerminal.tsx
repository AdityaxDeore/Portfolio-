import { colorizeTerminalLine } from '@/lib/colorizeTerminalLine'
import { skillCategories } from '@/data/skills'
import { projects } from '@/data/projects'
import { experienceItems } from '@/data/experience'
import { aboutProfile } from '@/data/about'
import { contactLinks } from '@/data/contact'
import { resumePdfUrl } from '@/data/resume'
import {
  type TerminalPresentation,
} from '@/lib/inferTerminalPresentation'
import { TerminalTitlebar } from '@/components/ui/TerminalTitlebar'
import { MessageLoading } from '@/components/ui/message-loading'
import { motion, useReducedMotion } from 'motion/react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
  type MouseEvent,
} from 'react'
import './PortfolioTerminal.css'

gsap.registerPlugin(useGSAP)

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
  className?: string
  isLoading?: boolean
}

const MAX_HISTORY = 40

const ASCII_ADITYA = [
  ' █████  ██████  ██ ████████ ██    ██  █████ ',
  '██   ██ ██   ██ ██    ██     ██  ██  ██   ██',
  '███████ ██   ██ ██    ██      ████   ███████',
  '██   ██ ██   ██ ██    ██       ██    ██   ██',
  '██   ██ ██████  ██    ██       ██    ██   ██',
]

const SYSTEM_REPORT = [
  'OS: AdityaOS v2.0.26',
  'Kernel: 5.15.0-neural',
  'Uptime: 1024ms',
  'Shell: gsap-cli 3.12.5',
  'Terminal: Portfolio-UX',
  'CPU: AGI-Core (16) @ 5.0GHz',
  'MEM: 64GB / 128GB',
]

function AnimatedBanner({ onComplete }: { onComplete?: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const tl = gsap.timeline({ onComplete })
    
    tl.from('.banner-line', {
      opacity: 0,
      x: -20,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power3.out',
    })

    tl.from('.system-report-line', {
      opacity: 0,
      y: 10,
      stagger: 0.05,
      duration: 0.5,
      ease: 'power2.out',
    }, '-=0.4')
  }, { scope: containerRef })

  return (
    <div ref={containerRef} style={{ display: 'flex', gap: '3rem', alignItems: 'flex-start', marginBottom: '2.5rem' }}>
      <div className="portfolio-terminal__banner">
        {ASCII_ADITYA.map((line, i) => (
          <div key={i} className="banner-line" style={{ textShadow: '0 0 10px rgba(74, 222, 128, 0.4)' }}>{line}</div>
        ))}
      </div>
      <div style={{ marginTop: '0.8rem' }}>
        {SYSTEM_REPORT.map((line, i) => (
          <div key={i} className="system-report-line" style={{ fontSize: '0.65rem', color: 'var(--terminal-muted)', marginBottom: '2px' }}>
            <span style={{ color: 'var(--terminal-accent)', opacity: 0.7 }}>❯</span> {line}
          </div>
        ))}
      </div>
    </div>
  )
}

function SystemMonitor() {
  const [cpu, setCpu] = useState(32)
  const [mem, setMem] = useState(58)
  const [net, setNet] = useState(8)

  useEffect(() => {
    const interval = setInterval(() => {
      setCpu(prev => Math.max(10, Math.min(95, prev + (Math.random() * 10 - 5))))
      setMem(prev => Math.max(40, Math.min(80, prev + (Math.random() * 4 - 2))))
      setNet(prev => Math.max(2, Math.min(40, prev + (Math.random() * 10 - 5))))
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="sidebar-monitor">
      {[
        { label: 'CPU NODE', val: cpu },
        { label: 'MEM BUFFER', val: mem },
        { label: 'NET STREAM', val: net }
      ].map(m => (
        <div key={m.label} className="monitor-item">
          <div className="monitor-label">
            <span>{m.label}</span>
            <span style={{ color: 'var(--terminal-accent)' }}>{Math.round(m.val)}%</span>
          </div>
          <div className="monitor-bar">
            <motion.div 
              className="monitor-fill" 
              animate={{ width: `${m.val}%` }}
              transition={{ type: 'spring', stiffness: 40, damping: 12 }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

function MatrixBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const characters = '01ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜｦﾝ'
    const fontSize = 12
    const columns = Math.floor(canvas.width / fontSize)
    const drops: number[] = new Array(columns).fill(1)

    const draw = () => {
      ctx.fillStyle = 'rgba(10, 10, 10, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = '#4ADE8018'
      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length))
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.98) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    const interval = setInterval(draw, 45)
    return () => {
      clearInterval(interval)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="portfolio-terminal__matrix" />
}

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

export function PortfolioTerminal({
  lines,
  title = 'aditya @src\\components\\ui\\PortfolioTerminal.tsx ~',
  onSubmit,
  onClose,
  className = '',
  isLoading = false,
}: PortfolioTerminalProps) {
  const reducedMotion = useReducedMotion()
  const transcriptRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [windowState, setWindowState] = useState<WindowState>('normal')
  const [isBooting, setIsBooting] = useState(true)
  const [bootStep, setBootStep] = useState(0)

  const blocks = useMemo(() => groupLinesIntoBlocks(lines), [lines])

  const bootSequence = [
    { text: '>> INITIALIZING ADITYA-OS KERNEL...', type: 'info' },
    { text: '[ LOADING NEURAL NETWORKS ]', type: 'info' },
    { text: '[✓] VRAM OPTIMIZED', type: 'success' },
    { text: '[✓] CORE SYNCED', type: 'success' },
    { text: '>> DEPLOYING INTERFACE...', type: 'info' },
  ]

  useGSAP(() => {
    if (isBooting) {
      if (bootStep < bootSequence.length) {
        const timer = setTimeout(() => {
          setBootStep(prev => prev + 1)
        }, 300 + Math.random() * 400)
        return () => clearTimeout(timer)
      } else {
        const timer = setTimeout(() => {
          setIsBooting(false)
        }, 600)
        return () => clearTimeout(timer)
      }
    }
  }, { dependencies: [isBooting, bootStep] })

  // Stagger blocks entrance with GSAP
  useGSAP(() => {
    if (!isBooting && transcriptRef.current) {
      const newBlocks = transcriptRef.current.querySelectorAll('.terminal-block:not(.animated)')
      if (newBlocks.length > 0) {
        gsap.from(newBlocks, {
          opacity: 0,
          y: 20,
          stagger: 0.1,
          duration: 0.5,
          ease: 'power3.out',
          onComplete: () => {
            newBlocks.forEach(b => b.classList.add('animated'))
          }
        })
      }
    }
  }, { dependencies: [isBooting, blocks.length] })

  const focusInput = useCallback(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    const transcript = transcriptRef.current
    if (!transcript) return
    // Adding a slight delay to allow GSAP animations to compute layout before scrolling
    setTimeout(() => {
      transcript.scrollTo({ top: transcript.scrollHeight, behavior: reducedMotion ? 'auto' : 'smooth' })
    }, 50)
  }, [lines, reducedMotion, isBooting])

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
      onSubmit(trimmed)
    },
    [onSubmit],
  )

  const handleSidebarClick = useCallback((event: MouseEvent, cmd: string) => {
    event.preventDefault()
    event.stopPropagation()
    submit(cmd)
  }, [submit])

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        event.preventDefault()
        submit(input)
        return
      }

      if (event.key === 'ArrowDown') {
        if (!history.length) return
        event.preventDefault()
        const nextIndex = historyIndex < 0 ? 0 : Math.min(historyIndex + 1, history.length - 1)
        setHistoryIndex(nextIndex)
        setInput(history[nextIndex] ?? '')
        return
      }

      if (event.key === 'ArrowUp') {
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
    [history, historyIndex, input, submit],
  )

  const renderIdentity = () => (
    <div className="terminal-identity-card">
      <div className="terminal-identity-avatar">
        {aboutProfile.shortName.charAt(0)}
      </div>
      <div className="terminal-identity-info">
        <h3>{aboutProfile.name}</h3>
        <p>{aboutProfile.role}</p>
        <div className="meta">
          <span className="t-accent">»</span> {aboutProfile.location} | {aboutProfile.education}
        </div>
      </div>
    </div>
  )

  const renderContact = () => (
    <div className="terminal-contact-grid">
      {contactLinks.map(link => (
        <a key={link.id} href={link.href} target={link.external ? "_blank" : undefined} rel={link.external ? "noopener noreferrer" : undefined} className="terminal-contact-btn">
          <span className="label">{link.label}</span>
          <span className="desc">{link.description}</span>
        </a>
      ))}
    </div>
  )

  const renderResume = () => (
    <div className="terminal-resume-card">
      <div>
        <div className="portfolio-terminal__output-header" style={{ marginTop: 0 }}>Resume & Documents</div>
        <div style={{ fontSize: '0.8rem', color: 'var(--terminal-muted)', marginBottom: '0.5rem' }}>
          Verified AI/ML Engineer profile ready for deployment.
        </div>
      </div>
      <a href={resumePdfUrl} download="Aditya_Deore_Resume.pdf" className="terminal-resume-btn">
        <span>↓</span> DOWNLOAD
      </a>
    </div>
  )

  const renderSkills = () => (
    <div className="portfolio-terminal__skills">
      {skillCategories.map(category => (
        <div key={category.id} className="portfolio-terminal__skill-category">
          <div className="portfolio-terminal__output-header">{category.title}</div>
          {category.skills.map((skill, idx) => (
            <div key={skill.name} className="terminal-progress">
              <span className="terminal-progress__label">{skill.name}</span>
              <div className="terminal-progress__bar-container">
                <motion.div 
                  className="terminal-progress__bar-fill"
                  initial={{ width: 0 }}
                  animate={{ width: `${85 - idx * 5}%` }}
                  transition={{ duration: 1.2, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
              <span style={{ color: 'var(--terminal-muted)', fontSize: '0.7rem', width: '30px' }}>{85 - idx * 5}%</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  )

  const renderProjects = () => (
    <div className="portfolio-terminal__projects">
      {projects.map(project => (
        <div key={project.id} className="project-ascii-card">
          <div className="project-ascii-card__title">[{project.id.toUpperCase()}] :: {project.title}</div>
          <div className="portfolio-terminal__line" style={{ display: 'flex', gap: '2rem' }}>
            <div style={{ flex: 1 }}>
              <div className="portfolio-terminal__line">Role: <span className="t-hl">{project.caseStudy.role}</span></div>
              <div className="portfolio-terminal__line">Tags: <span className="t-accent">{project.tags.join(' | ')}</span></div>
              <div className="portfolio-terminal__line" style={{ marginTop: '0.5rem', opacity: 0.9 }}>{project.caseStudy.summary}</div>
            </div>
            <div className="portfolio-terminal__line" style={{ fontSize: '0.65rem', color: 'var(--terminal-accent)', opacity: 0.6 }}>
              {`
    INTERFACE ---> [PROCESS] ---+---> [MEMORY]
                 |           |
                 v           v
              [NEURAL]    [DATA]
              `}
            </div>
          </div>
        </div>
      ))}
    </div>
  )

  const renderExperience = () => (
    <div className="terminal-timeline">
      {experienceItems.map(item => (
        <div key={item.id} className="terminal-timeline__item">
          <div className="portfolio-terminal__output-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span>{item.role} @ {item.company}</span>
            <span style={{ fontSize: '0.65rem', color: 'var(--terminal-muted)', fontWeight: 'normal' }}>{item.period}</span>
          </div>
          <div className="portfolio-terminal__line" style={{ color: 'var(--terminal-muted)', marginBottom: '0.5rem' }}>{item.location}</div>
          <div className="portfolio-terminal__line" style={{ opacity: 0.9 }}>{item.summary}</div>
          {item.highlights.map(h => (
            <div key={h} className="portfolio-terminal__line" style={{ fontSize: '0.8rem', opacity: 0.8 }}>
              <span className="t-accent">↳</span> {h}
            </div>
          ))}
        </div>
      ))}
    </div>
  )

  const DynamicPrompt = () => (
    <div className="portfolio-terminal__prompt-container">
      <span className="prompt-path">~/aditya-deore</span>
      <span className="prompt-branch" style={{ textShadow: '0 0 5px rgba(248, 113, 113, 0.4)' }}>(master)</span>
      <span className="prompt-symbol">➜</span>
    </div>
  )

  // Map presentations to rich renderers
  const CUSTOM_RENDERERS: Record<string, () => ReactNode> = {
    identity: renderIdentity,
    contact: renderContact,
    resume: renderResume,
    skills: renderSkills,
    projects: renderProjects,
    timeline: renderExperience,
  }

  return (
    <div className={`portfolio-terminal ${className}`} onClick={focusInput}>
      <MatrixBackground />
      <div className="portfolio-terminal__grid" />
      <div className="portfolio-terminal__neural" />
      <div className="portfolio-terminal__scanline" />
      
      <TerminalTitlebar
        title={title}
        windowState={windowState}
        onClose={onClose}
        onMinimize={() => setWindowState(s => s === 'minimized' ? 'normal' : 'minimized')}
        onMaximize={() => setWindowState(s => s === 'expanded' ? 'normal' : 'expanded')}
      />

      <div className="portfolio-terminal__body">
        {/* Sidebar */}
        <aside className="portfolio-terminal__sidebar">
          <div className="portfolio-terminal__sidebar-header">
            <h1 className="portfolio-terminal__sidebar-name glitch-text" data-text="ADITYA DEORE">ADITYA DEORE</h1>
            <p className="portfolio-terminal__sidebar-tagline">AI/ML Engineer | PCCOE Pune</p>
          </div>

          <nav className="portfolio-terminal__sidebar-nav" style={{ flex: 1 }}>
            <section>
              <h2 className="portfolio-terminal__sidebar-section-title">COMMANDS</h2>
              <div className="portfolio-terminal__sidebar-links">
                {['whoami', 'skills', 'projects', 'experience', 'contact', 'resume'].map(cmd => (
                  <button 
                    key={cmd} 
                    type="button"
                    className="portfolio-terminal__sidebar-link" 
                    onClick={(e) => handleSidebarClick(e, cmd)}
                  >
                    {cmd}
                  </button>
                ))}
              </div>
            </section>

            <section>
              <h2 className="portfolio-terminal__sidebar-section-title">SYSTEM</h2>
              <div className="portfolio-terminal__sidebar-links">
                <a href="https://github.com/adityadeore" target="_blank" rel="noopener noreferrer" className="portfolio-terminal__sidebar-link" onClick={(e) => e.stopPropagation()}>github</a>
                <a href="https://linkedin.com/in/adityadeore" target="_blank" rel="noopener noreferrer" className="portfolio-terminal__sidebar-link" onClick={(e) => e.stopPropagation()}>linkedin</a>
                <a href="mailto:contact@adityadeore.com" className="portfolio-terminal__sidebar-link" onClick={(e) => e.stopPropagation()}>email</a>
              </div>
            </section>
          </nav>

          <SystemMonitor />
        </aside>

        {/* Main Workspace */}
        <main className="portfolio-terminal__main">
          <div ref={transcriptRef} className="portfolio-terminal__transcript">
            {isBooting ? (
              <div className="boot-sequence" style={{ padding: '1rem' }}>
                {bootSequence.slice(0, bootStep).map((line, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`portfolio-terminal__line ${line.type === 'success' ? 'boot-line--success' : ''}`}
                  >
                    <span style={{ color: 'var(--terminal-muted)', marginRight: '0.5rem' }}>[{new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}]</span>
                    {line.text}
                  </motion.div>
                ))}
                {bootStep < bootSequence.length && <MessageLoading />}
              </div>
            ) : (
              <>
                <AnimatedBanner />

                {blocks.map((block) => (
                  <section key={block.key} className="terminal-block" style={{ marginBottom: '1.5rem' }}>
                    {block.lines.map((line) => (
                      <div key={line.key} className="portfolio-terminal__line">
                        {line.kind === 'input' ? (
                          <div className="portfolio-terminal__input-line" style={{ marginBottom: '0.75rem' }}>
                            <DynamicPrompt />
                            <span className="portfolio-terminal__typed t-cmd">{line.text}</span>
                          </div>
                        ) : null}
                      </div>
                    ))}
                    
                    {block.presentation && CUSTOM_RENDERERS[block.presentation] ? (
                      CUSTOM_RENDERERS[block.presentation]()
                    ) : (
                      <div className="portfolio-terminal__block-content">
                        {block.lines
                          .filter(l => l.kind === 'output')
                          .map(line => (
                            <div key={line.key} className="portfolio-terminal__line">
                              {line.node ?? colorizeTerminalLine(line.text)}
                            </div>
                          ))}
                      </div>
                    )}
                  </section>
                ))}

                {isLoading && (
                  <div className="portfolio-terminal__loading-line" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <DynamicPrompt />
                    <MessageLoading />
                  </div>
                )}
              </>
            )}
          </div>

          {/* Footer Input */}
          <footer className="portfolio-terminal__footer">
            <div className="portfolio-terminal__input-row">
              <DynamicPrompt />
              <input
                ref={inputRef}
                className="portfolio-terminal__input-field"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
                autoComplete="off"
                spellCheck={false}
              />
              {input === '' && <span className="portfolio-terminal__cursor" />}
            </div>
          </footer>
        </main>
      </div>
    </div>
  )
}

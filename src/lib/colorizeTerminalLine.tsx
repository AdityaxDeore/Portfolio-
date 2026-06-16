import { projects } from '@/data/projects'
import { terminalCommands } from '@/data/terminal'
import type { TerminalLineType } from '@/data/terminal'
import type { ReactNode } from 'react'

const PROJECT_IDS = new Set(projects.map((p) => p.id))
const COMMAND_SET = new Set<string>(terminalCommands)

function Span({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return <span className={className}>{children}</span>
}

function colorizeBackticks(text: string): ReactNode[] {
  const parts = text.split(/(`[^`]+`)/g)
  return parts.map((part, index) => {
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <Span key={index} className="t-cmd">
          {part.slice(1, -1)}
        </Span>
      )
    }
    return part
  })
}

function colorizeUrls(text: string): ReactNode[] {
  const parts = text.split(/(https?:\/\/\S+)/g)
  return parts.flatMap((part, index) => {
    if (/^https?:\/\//.test(part)) {
      return (
        <Span key={`url-${index}`} className="t-url">
          {part}
        </Span>
      )
    }
    return colorizeBackticks(part)
  })
}

function colorizeProjectIds(text: string): ReactNode[] {
  const regex = /\b([a-z][a-z0-9_-]*)\b/g
  const nodes: ReactNode[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = regex.exec(text)) !== null) {
    const [token] = match
    const start = match.index
    if (start > lastIndex) {
      nodes.push(text.slice(lastIndex, start))
    }
    if (PROJECT_IDS.has(token)) {
      nodes.push(
        <Span key={`${token}-${start}`} className="t-id">
          {token}
        </Span>,
      )
    } else if (COMMAND_SET.has(token)) {
      nodes.push(
        <Span key={`${token}-${start}`} className="t-cmd">
          {token}
        </Span>,
      )
    } else {
      nodes.push(token)
    }
    lastIndex = start + token.length
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex))
  }

  return nodes.length ? nodes : [text]
}

function renderLine(text: string, tone: TerminalLineType): ReactNode {
  if (!text.trim()) {
    return '\u00A0'
  }

  if (tone === 'error') {
    const match = text.match(/^([^:]+:)(.*)$/)
    if (match) {
      return (
        <>
          <Span className="t-err">{match[1]}</Span>
          {colorizeBackticks(match[2])}
        </>
      )
    }
    return <Span className="t-err">{text}</Span>
  }

  if (tone === 'success') {
    return <Span className="t-ok">{colorizeUrls(text)}</Span>
  }

  if (text.startsWith('▸ ')) {
    const body = text.slice(2)
    const atIndex = body.indexOf(' @ ')
    if (atIndex !== -1) {
      return (
        <>
          <Span className="t-bullet">▸ </Span>
          <Span className="t-hl">{body.slice(0, atIndex)}</Span>
          <Span className="t-sys"> @ </Span>
          <Span className="t-accent">{body.slice(atIndex + 3)}</Span>
        </>
      )
    }
  }

  if (text.startsWith('# ')) {
    return (
      <Span className="t-title">
        <Span className="t-sys"># </Span>
        {text.slice(2)}
      </Span>
    )
  }

  if (text.startsWith('[') && text.endsWith(']')) {
    return <Span className="t-accent">{text}</Span>
  }

  const keyValue = text.match(/^(\s*)([A-Za-z][\w]*)(:)(\s*)(.*)$/)
  if (keyValue) {
    return (
      <>
        {keyValue[1]}
        <Span className="t-key">{keyValue[2]}</Span>
        <Span className="t-sys">{keyValue[3]}</Span>
        {keyValue[4]}
        <Span className="t-val">{colorizeUrls(keyValue[5])}</Span>
      </>
    )
  }

  if (/^  \S/.test(text) && text.includes('  ') && !text.includes('://')) {
    const trimmed = text.trimStart()
    const cmdEnd = trimmed.search(/\s{2,}/)
    if (cmdEnd > 0) {
      const indent = text.slice(0, text.indexOf(trimmed))
      const cmd = trimmed.slice(0, cmdEnd)
      const gap = trimmed.slice(cmdEnd).match(/^\s+/)?.[0] ?? ''
      const desc = trimmed.slice(cmdEnd + gap.length)
      const baseCmd = cmd.split('<')[0].trim()
      const isHelpCmd =
        COMMAND_SET.has(baseCmd) || cmd.startsWith('cat <') || cmd.startsWith('open <')

      if (isHelpCmd) {
        return (
          <>
            {indent}
            <Span className="t-cmd">{cmd}</Span>
            {gap}
            <Span className="t-dim">{desc}</Span>
          </>
        )
      }
    }
  }

  if (text.startsWith('drwxr-xr-x') || text.startsWith('-rw-r--r--')) {
    const match = text.match(/^((?:drwxr-xr-x|-rw-r--r--)\s+)(.+)$/)
    if (match) {
      const target = match[2]
      const isDir = target.endsWith('/')
      return (
        <>
          <Span className="t-dim">{match[1]}</Span>
          <Span className={isDir ? 't-dir' : 't-file'}>{target}</Span>
        </>
      )
    }
  }

  const projectRow = text.match(/^(\s{2})(\S+)(\s{2,})(.+)$/)
  if (projectRow && PROJECT_IDS.has(projectRow[2])) {
    return (
      <>
        {projectRow[1]}
        <Span className="t-id">{projectRow[2]}</Span>
        {projectRow[3]}
        <Span className="t-hl">{projectRow[4]}</Span>
      </>
    )
  }

  if (text.includes(' · ') && text.trimStart().startsWith('')) {
    const tagMatch = text.match(/^(\s*)(.+)$/)
    if (tagMatch && /·/.test(tagMatch[2]) && tagMatch[1].length >= 2) {
      const tags = tagMatch[2].split(' · ')
      return (
        <>
          {tagMatch[1]}
          {tags.map((tag, index) => (
            <Span key={`${tag}-${index}`}>
              {index > 0 && <Span className="t-sys"> · </Span>}
              <Span className="t-tag">{tag}</Span>
            </Span>
          ))}
        </>
      )
    }
  }

  if (text.startsWith('  · ')) {
    return (
      <>
        <Span className="t-bullet"> · </Span>
        <Span className="t-val">{text.slice(4)}</Span>
      </>
    )
  }

  if (/^(highlights|focus|impact):/.test(text)) {
    const [label, ...rest] = text.split(':')
    return (
      <>
        <Span className="t-accent">{label}</Span>
        <Span className="t-sys">:</Span>
        {rest.length ? rest.join(':') : ''}
      </>
    )
  }

  if (text.startsWith('Project ids:')) {
    const prefix = 'Project ids: '
    const ids = text.slice(prefix.length).split(', ')
    return (
      <>
        <Span className="t-dim">{prefix}</Span>
        {ids.map((id, index) => (
          <Span key={`${id}-${index}`}>
            {index > 0 && <Span className="t-sys">, </Span>}
            <Span className="t-id">{id}</Span>
          </Span>
        ))}
      </>
    )
  }

  if (text.startsWith('open ') && text.includes('→')) {
    const match = text.match(/^open\s+(\S+)\s+(→\s+)(.+)$/)
    if (match) {
      return (
        <>
          <Span className="t-cmd">open </Span>
          <Span className="t-id">{match[1]}</Span>
          <Span className="t-sys"> {match[2]}</Span>
          <Span className="t-dim">{match[3]}</Span>
        </>
      )
    }
  }

  if (text.startsWith('● ')) {
    const body = text.slice(2)
    const openIndex = body.indexOf('(')
    if (openIndex > 0) {
      return (
        <>
          <Span className="t-bullet">● </Span>
          <Span className="t-accent">{body.slice(0, openIndex)}</Span>
          <Span className="t-sys">{body.slice(openIndex)}</Span>
        </>
      )
    }
    return <Span className="t-tool">{text}</Span>
  }

  if (tone === 'system' || tone === 'accent' || tone === 'tool') {
    return <Span className={`t-${tone}`}>{colorizeUrls(text)}</Span>
  }

  return <>{colorizeProjectIds(text).flatMap((node) => (typeof node === 'string' ? colorizeUrls(node) : [node]))}</>
}

export function inferTerminalTone(text: string): TerminalLineType {
  const trimmed = text.trim()
  if (!trimmed) return 'output'

  if (/^(cat|open|command not found):/i.test(text) || text.includes('No such project')) {
    return 'error'
  }
  if (/^Opening /i.test(text)) return 'success'
  if (/^Type `help`/i.test(text)) return 'system'

  if (text.startsWith('● ')) return 'tool'

  if (
    /^portfolio-shell/i.test(text) ||
    /^~?\//.test(text) ||
    /^cwd:/i.test(text) ||
    /^Available commands:/i.test(text) ||
    /^(experience\.log|projects\/|skills\.json|resume assets:|contact —)/i.test(text) ||
    /^Hi —/i.test(text) ||
    /^Use quick actions/i.test(text) ||
    /^Run `/i.test(text) ||
    /^Scroll to/i.test(text)
  ) {
    return 'system'
  }

  if (text.startsWith('# ') || text.startsWith('▸ ') || (text.startsWith('[') && text.endsWith(']'))) {
    return 'accent'
  }

  if (text.startsWith('drwxr-xr-x') || text.startsWith('-rw-r--r--')) {
    return 'tool'
  }

  return 'output'
}

export function colorizeTerminalLine(text: string, tone = inferTerminalTone(text)): ReactNode {
  return renderLine(text, tone)
}
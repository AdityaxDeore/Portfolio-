export type TerminalPresentation =
  | 'identity'
  | 'timeline'
  | 'projects'
  | 'skills'
  | 'help'
  | 'contact'
  | 'resume'
  | 'listing'
  | 'default'

export function inferTerminalPresentation(command: string): TerminalPresentation {
  switch (command) {
    case 'whoami':
    case 'about':
      return 'identity'
    case 'experience':
      return 'timeline'
    case 'projects':
      return 'projects'
    case 'skills':
      return 'skills'
    case 'help':
      return 'help'
    case 'contact':
      return 'contact'
    case 'resume':
      return 'resume'
    case 'ls':
    case 'cat':
      return 'listing'
    default:
      return 'default'
  }
}

export function inferLineRole(
  text: string,
  presentation: TerminalPresentation,
): 'heading' | 'meta' | 'row' | 'plain' {
  if (!text.trim()) return 'plain'

  if (
    /^(experience\.log|projects\/|skills\.json|resume assets:|contact —|Available commands:)/i.test(
      text,
    )
  ) {
    return 'heading'
  }

  if (presentation === 'timeline' && text.startsWith('▸ ')) return 'row'
  if (presentation === 'projects' && /^\s{2}\S/.test(text) && !text.includes('Run `open')) {
    return 'row'
  }
  if (presentation === 'help' && /^\s{2}\S/.test(text)) return 'row'
  if (presentation === 'skills' && (text.startsWith('[') || text.startsWith('  '))) return 'row'
  if (presentation === 'listing' && (text.startsWith('drwx') || text.startsWith('-rw') || text.startsWith('# '))) {
    return 'row'
  }
  if (presentation === 'identity' && /^(email|github|resume|name|role|location|education|phone):/i.test(text)) {
    return 'meta'
  }

  return 'plain'
}
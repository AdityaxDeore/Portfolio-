import { projects } from '@/data/projects'
import { inferTerminalPresentation, type TerminalPresentation } from '@/lib/inferTerminalPresentation'
import {
  getAboutOutput,
  getCatOutput,
  getContactOutput,
  getExperienceOutput,
  getLsOutput,
  getProjectsOutput,
  getResumeOutput,
  getSkillsOutput,
  getTerminalHelp,
  getWhoamiOutput,
  parseTerminalInput,
} from '@/data/terminal'

export type TerminalCommandResult = {
  lines: string[]
  tool?: string
  presentation?: TerminalPresentation
  clear?: boolean
  navigateTo?: string
}

function toolLabel(command: string, args: string[]): string {
  const argText = args.length ? `(${args.join(', ')})` : '()'
  return `● Run(${command}${argText})`
}

export function runTerminalCommand(raw: string): TerminalCommandResult {
  const trimmed = raw.trim()
  if (!trimmed) return { lines: [] }

  const { command, args } = parseTerminalInput(trimmed)
  const presentation = inferTerminalPresentation(command)

  switch (command) {
    case 'help':
      return { tool: toolLabel(command, args), presentation, lines: getTerminalHelp() }
    case 'whoami':
      return { tool: toolLabel(command, args), presentation, lines: getWhoamiOutput() }
    case 'about':
      return { tool: toolLabel(command, args), presentation, lines: getAboutOutput() }
    case 'experience':
      return { tool: toolLabel(command, args), presentation, lines: getExperienceOutput() }
    case 'projects':
      return { tool: toolLabel(command, args), presentation, lines: getProjectsOutput() }
    case 'skills':
      return { tool: toolLabel(command, args), presentation, lines: getSkillsOutput() }
    case 'contact':
      return { tool: toolLabel(command, args), presentation, lines: getContactOutput() }
    case 'resume':
      return { tool: toolLabel(command, args), presentation, lines: getResumeOutput() }
    case 'ls':
      return { tool: toolLabel(command, args), presentation, lines: getLsOutput() }
    case 'cat': {
      const id = args[0]
      if (!id) {
        return { tool: toolLabel(command, args), presentation, lines: ['cat: missing project id. Try `projects`.'] }
      }
      const result = getCatOutput(id)
      if ('error' in result) {
        return { tool: toolLabel(command, [id]), presentation, lines: [result.error] }
      }
      return { tool: toolLabel(command, [id]), presentation, lines: result }
    }
    case 'open': {
      const id = args[0]?.toLowerCase()
      if (!id) {
        return { tool: toolLabel(command, args), presentation, lines: ['open: missing project id. Try `projects`.'] }
      }
      const project = projects.find((p) => p.id === id)
      if (!project) {
        return {
          tool: toolLabel(command, [id]),
          presentation,
          lines: [`open: ${id}: No such project. Try \`projects\` for ids.`],
        }
      }
      return {
        tool: toolLabel(command, [id]),
        presentation,
        lines: [`Opening ${project.title}…`],
        navigateTo: `/projects/${project.id}`,
      }
    }
    case 'clear':
      return { tool: '● Clear()', presentation: 'default', lines: [], clear: true }
    default:
      return {
        tool: toolLabel(command, args),
        presentation: 'default',
        lines: [`command not found: ${command}`, 'Type `help` for available commands.'],
      }
  }
}
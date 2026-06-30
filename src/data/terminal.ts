import { aboutProfile } from '@/data/about'
import { contactEmail, contactLinks } from '@/data/contact'
import { experienceItems } from '@/data/experience'
import { projects } from '@/data/projects'
import { resumePdfUrl, resumeProfile } from '@/data/resume'
import { skillCategories } from '@/data/skills'
import { githubUrl } from '@/data/navigation'

export const terminalSection = {
  label: '07 — Interactive',
  title: 'Portfolio Shell',
  subtitle: 'Ask about my work, skills, and experience — or tap a shortcut below.',
} as const

export const TERMINAL_APP_NAME = 'portfolio-shell'

export const TERMINAL_PROMPT = '>'
export const TERMINAL_CWD = '~/portfolio'

export type TerminalQuickAction = {
  id: string
  label: string
  command: string
  hint?: string
}

export const terminalQuickActions: TerminalQuickAction[] = [
  { id: 'whoami', label: 'whoami', command: 'whoami', hint: 'about & background' },
  { id: 'experience', label: 'experience', command: 'experience', hint: 'roles & timeline' },
  { id: 'skills', label: 'skills', command: 'skills', hint: 'tools & frameworks' },
  { id: 'contact', label: 'contact', command: 'contact', hint: 'email & socials' },
  { id: 'resume', label: 'resume', command: 'resume', hint: 'download pdf' },
  { id: 'open-codecampus', label: 'open codecampus', command: 'open codecampus', hint: 'coding platform' },
  { id: 'open-braintumor', label: 'open braintumor', command: 'open braintumor', hint: 'tumor detection' },
  { id: 'open-projectclarity', label: 'open projectclarity', command: 'open projectclarity', hint: 'educational platform' },
  { id: 'help', label: 'help', command: 'help', hint: 'command reference' },
]

export const terminalWelcome = [
  `${TERMINAL_APP_NAME} v1.0 · interactive session`,
  TERMINAL_CWD,
  '',
  `Hi — I'm ${aboutProfile.shortName}'s interactive résumé shell.`,
  'Type a command or pick a shortcut below. Try `whoami`, `skills`, then `open <id>`.',
  '',
] as const

export type TerminalLineType =
  | 'system'
  | 'output'
  | 'error'
  | 'command'
  | 'accent'
  | 'tool'
  | 'success'

export type TerminalLine = {
  id: string
  type: TerminalLineType
  text: string
}

export const terminalCommands = [
  'help',
  'whoami',
  'about',
  'experience',
  'projects',
  'skills',
  'contact',
  'resume',
  'ls',
  'cat',
  'open',
  'clear',
] as const

export type TerminalCommand = (typeof terminalCommands)[number]

export function getTerminalHelp(): string[] {
  return [
    'Available commands:',
    '',
    '  help         List all commands',
    '  whoami       Quick identity card',
    '  about        Profile, education, focus areas',
    '  experience   Work history timeline',
    '  projects     List case studies (open <id> to view)',
    '  skills       Technical toolkit by category',
    '  contact      Email, LinkedIn, GitHub',
    '  resume       Download / preview links',
    '  ls           List project folders',
    '  cat <id>     Read a project summary',
    '  open <id>    Open full project page',
    '  clear        Reset terminal output',
    '',
    `Project ids: ${projects.map((p) => p.id).join(', ')}`,
  ]
}

export function getWhoamiOutput(): string[] {
  return [
    aboutProfile.name,
    aboutProfile.role,
    `${aboutProfile.location} · ${aboutProfile.education}`,
    aboutProfile.valueProp,
    '',
    `email:   ${contactEmail}`,
    `github:  ${githubUrl}`,
    `resume:  ${resumePdfUrl}`,
  ]
}

export function getAboutOutput(): string[] {
  return [
    `name:      ${aboutProfile.name}`,
    `role:      ${aboutProfile.role}`,
    `location:  ${aboutProfile.location}`,
    `education: ${aboutProfile.education}`,
    '',
    'focus:',
    '  · Production ML & model deployment',
    '  · Full-stack apps (React, FastAPI, Node)',
    '  · AI agents, RAG, and data pipelines',
    '  · Shipping polished UIs with reliable backends',
  ]
}

export function getExperienceOutput(): string[] {
  const lines: string[] = ['experience.log', '']
  for (const item of experienceItems) {
    lines.push(`▸ ${item.role} @ ${item.company}`)
    lines.push(`  ${item.period} · ${item.location} · ${item.type}`)
    lines.push(`  ${item.summary}`)
    lines.push('')
  }
  return lines
}

export function getProjectsOutput(): string[] {
  const lines: string[] = ['projects/', '']
  for (const project of projects) {
    lines.push(`  ${project.id.padEnd(14)} ${project.title}`)
    lines.push(`  ${''.padEnd(14)} ${project.tags.join(' · ')}`)
    lines.push('')
  }
  lines.push('Run `open <id>` for the full case study page.')
  return lines
}

export function getSkillsOutput(): string[] {
  const lines: string[] = ['skills.json', '']
  for (const category of skillCategories) {
    lines.push(`[${category.title}]`)
    lines.push(`  ${category.skills.map((s) => s.name).join(', ')}`)
    lines.push('')
  }
  return lines
}

export function getContactOutput(): string[] {
  const lines: string[] = ['contact — open to ML & full-stack roles (Pune / remote)', '']
  for (const link of contactLinks) {
    lines.push(`  ${link.label.padEnd(10)} ${link.description}`)
  }
  lines.push('')
  lines.push('  I usually reply within a day.')
  return lines
}

export function getResumeOutput(): string[] {
  return [
    '========================================================================',
    ' ADITYA CHANDRAJIT DEORE — RÉSUMÉ',
    '========================================================================',
    ` Phone: ${resumeProfile.phone} | Email: ${resumeProfile.email}`,
    ` LinkedIn: ${resumeProfile.linkedin} | GitHub: ${resumeProfile.github}`,
    '------------------------------------------------------------------------',
    '',
    'OBJECTIVE:',
    '  Motivated AI & Machine Learning developer with full-stack foundations',
    '  focused on building data-driven, scalable applications. Enthusiastic',
    '  about learning, contributing to real-world solutions, and growing.',
    '',
    'EDUCATION:',
    '  Pimpri Chinchwad College of Engineering (PCCOE), Pune — 2024 - 2028',
    '  Bachelor of Technology in Information Technology',
    '  Savitribai Phule Pune University',
    '',
    'TECHNICAL SKILLS:',
    '  Languages:             Python, C++, JavaScript, TypeScript',
    '  AI & Machine Learning: TensorFlow, PyTorch, Scikit-learn, Pandas, NumPy',
    '  Frameworks & Web:      React.js, Node.js, HTML5, CSS3, REST APIs',
    '  Tools & Technologies:  Git, GitHub, Linux, Docker, Cursor, Copilot',
    '  Soft Skills:           Leadership, Collaboration, Problem Solving',
    '',
    'EXPERIENCE:',
    '  ITSA (Information Technology Students Council) — 2025 - Present',
    '  Web Development Associate — PCCOE',
    '    · Develop and maintain websites for student initiatives/events.',
    '    · Design responsive interfaces to improve usability.',
    '    · Collaborate with GDG and MLSC teams for technical support.',
    '',
    'VIRTUAL EXPERIENCE:',
    '  Deloitte — Feb 2026 | Data Analytics Job Simulation',
    '    · Built Tableau dashboards analyzing 1000+ records.',
    '    · Performed data classification and analysis using Excel.',
    '',
    '  Mastercard — Jan 2026 | Cybersecurity Virtual Experience',
    '    · Analyzed phishing emails and recommended mitigation measures.',
    '    · Designed security awareness training for high-risk user groups.',
    '',
    'PROJECTS:',
    '  CodeCampus — Sandboxed Coding & Proctoring Platform | Sept 2025 - Feb 2026',
    '  [React, Node.js, MongoDB, TypeScript, Docker] · github.com/AdityaxDeore/codecampus',
    '  · Engineered a sandboxed Monaco IDE executing user submissions safely.',
    '  · Integrated real-time keystroke integrity analytics and proctoring.',
    '',
    '  Dementia Diagnostic AI — Volumetric MRI Screening | Nov 2025',
    '  [Python, PyTorch, 3D CNNs, Medical Imaging] · github.com/AdityaxDeore',
    '  · Designed 3D Convolutional networks extracting cognitive markers.',
    '  · Built automated skull-stripping voxel normalization pipelines.',
    '',
    '  Brain Tumor Detection System | Aug - Oct 2025',
    '  [Python, OpenCV, Scikit-learn] · github.com/AdityaxDeore/brain-tumor-detection',
    '  · Achieved 96.3% tumor classification accuracy using radial SVM kernels.',
    '  · Designed Otsu thresholding segmentation overlays for clinicians.',
    '',
    'CERTIFICATIONS:',
    '  · IBM Data Analyst Professional Certificate (Python, SQL, Excel, Capstone)',
    '  · HackerRank Software Engineer Intern Certification',
    '  · TCS Cybersecurity Analyst Simulation',
    '',
    `PDF Download: ${resumePdfUrl}`,
    '========================================================================'
  ]
}

export function getLsOutput(): string[] {
  return [
    'drwxr-xr-x  about/',
    'drwxr-xr-x  experience/',
    'drwxr-xr-x  projects/',
    ...projects.map((p) => `drwxr-xr-x  projects/${p.id}/`),
    'drwxr-xr-x  skills/',
    '-rw-r--r--  resume.pdf',
    '-rw-r--r--  contact.txt',
  ]
}

export function getCatOutput(id: string): string[] | { error: string } {
  const project = projects.find((p) => p.id === id)
  if (!project) {
    return { error: `cat: ${id}: No such project. Try \`projects\` for ids.` }
  }
  return [
    `# ${project.title}`,
    '',
    project.caseStudy.summary,
    '',
    'highlights:',
    ...project.caseStudy.highlights.map((h) => `  · ${h}`),
    '',
    `impact: ${project.outcome}`,
    '',
    `open ${project.id}  → full case study page`,
  ]
}

export function parseTerminalInput(raw: string): {
  command: string
  args: string[]
} {
  const trimmed = raw.trim()
  if (!trimmed) return { command: '', args: [] }
  const parts = trimmed.split(/\s+/)
  return { command: parts[0].toLowerCase(), args: parts.slice(1) }
}

export function getCommandSuggestions(input: string): string[] {
  const trimmed = input.trim().toLowerCase()
  if (!trimmed) return [...terminalCommands]

  const [cmd, ...args] = trimmed.split(/\s+/)

  if (!args.length) {
    const commandMatches = terminalCommands.filter((c) => c.startsWith(cmd))
    if (commandMatches.length) return commandMatches

    const projectMatches = projects
      .map((p) => `open ${p.id}`)
      .filter((s) => s.startsWith(trimmed))
    if (projectMatches.length) return projectMatches

    return []
  }

  if (cmd === 'open' || cmd === 'cat') {
    return projects
      .map((p) => `${cmd} ${p.id}`)
      .filter((s) => s.startsWith(trimmed))
  }

  return []
}
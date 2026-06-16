import type { Theme } from '@/lib/theme'

/** skillicons.dev slug for each skill */
export const skilliconsSlug = {
  python: 'py',
  javascript: 'js',
  typescript: 'ts',
  cpp: 'cpp',
  react: 'react',
  nodejs: 'nodejs',
  html5: 'html',
  css3: 'css',
  tensorflow: 'tensorflow',
  pytorch: 'pytorch',
  sklearn: 'sklearn',
  pandas: 'pandas',
  numpy: 'numpy',
  swagger: 'swagger',
  git: 'git',
  github: 'github',
  docker: 'docker',
  vscode: 'vscode',
  claude: 'claude',
  copilot: 'copilot',
  linux: 'linux',
  cursor: 'cursor',
  mlpipelines: 'huggingface',
} as const

export type SkillIconSlug = keyof typeof skilliconsSlug

export type SkillItem = {
  name: string
  slug?: SkillIconSlug
  /** Local image under /public/images (e.g. /images/logos/linux.png) */
  iconSrc?: string
}

export type SkillCategory = {
  id: string
  title: string
  skills: SkillItem[]
}

/** Mirrors resume Technical Skills groupings */
export const skillCategories: SkillCategory[] = [
  {
    id: 'languages',
    title: 'Programming Languages',
    skills: [
      { name: 'Python', slug: 'python' },
      { name: 'C++', slug: 'cpp' },
      { name: 'JavaScript', slug: 'javascript' },
      { name: 'TypeScript', slug: 'typescript' },
    ],
  },
  {
    id: 'ai-ml',
    title: 'AI / Machine Learning',
    skills: [
      { name: 'TensorFlow', slug: 'tensorflow' },
      { name: 'PyTorch', slug: 'pytorch' },
      { name: 'Scikit-learn', slug: 'sklearn' },
      { name: 'Pandas', slug: 'pandas' },
      { name: 'NumPy', slug: 'numpy' },
      { name: 'ML Pipelines', slug: 'mlpipelines' },
    ],
  },
  {
    id: 'frameworks',
    title: 'Frameworks & Libraries',
    skills: [
      { name: 'React.js', slug: 'react' },
      { name: 'Node.js', slug: 'nodejs' },
      { name: 'HTML5', slug: 'html5' },
      { name: 'CSS3', slug: 'css3' },
      { name: 'REST APIs', slug: 'swagger' },
    ],
  },
  {
    id: 'tools',
    title: 'Tools & Technologies',
    skills: [
      { name: 'Git', slug: 'git' },
      { name: 'GitHub', slug: 'github' },
      { name: 'Linux', slug: 'linux' },
      { name: 'Docker', slug: 'docker' },
      { name: 'Cursor AI', slug: 'cursor' },
      { name: 'GitHub Copilot', slug: 'copilot' },
      { name: 'VS Code', slug: 'vscode' },
      { name: 'Claude', slug: 'claude' },
    ],
  },
  {
    id: 'soft',
    title: 'Soft Skills',
    skills: [
      { name: 'Leadership' },
      { name: 'Team Collaboration' },
      { name: 'Problem Solving' },
      { name: 'Communication' },
      { name: 'Time Management' },
    ],
  },
]

const iconThemeMap: Record<Theme, 'light' | 'dark'> = {
  light: 'light',
  dark: 'dark',
}

export function getSkillIconUrl(slug: SkillIconSlug, theme: Theme): string {
  const icon = skilliconsSlug[slug]
  const iconTheme = iconThemeMap[theme]
  return `https://skillicons.dev/icons?i=${icon}&theme=${iconTheme}`
}

/** Top technical skills for the scrolling marquee (icons only). */
export function getMarqueeSkills(): SkillItem[] {
  return skillCategories
    .flatMap((category) => category.skills)
    .filter((skill): skill is SkillItem & { slug: SkillIconSlug } => Boolean(skill.slug))
    .slice(0, 16)
}

export function getCategoryIconsUrl(category: SkillCategory, theme: Theme): string {
  const slugs = category.skills
    .filter((skill): skill is SkillItem & { slug: SkillIconSlug } => Boolean(skill.slug))
    .map((skill) => skilliconsSlug[skill.slug])
    .join(',')
  if (!slugs) return ''
  const iconTheme = iconThemeMap[theme]
  const perline = Math.min(category.skills.filter((s) => s.slug).length, 4)
  return `https://skillicons.dev/icons?i=${slugs}&theme=${iconTheme}&perline=${perline}`
}
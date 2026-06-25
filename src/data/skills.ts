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
  mongodb: 'mongodb',
  postgresql: 'postgres',
  mysql: 'mysql',
  githubactions: 'githubactions',
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
      { name: 'SQL', slug: 'mysql' },
    ],
  },
  {
    id: 'frameworks',
    title: 'Frameworks & Libraries',
    skills: [
      { name: 'React', slug: 'react' },
      { name: 'Node.js', slug: 'nodejs' },
      { name: 'TensorFlow', slug: 'tensorflow' },
      { name: 'Scikit-learn', slug: 'sklearn' },
      { name: 'Pandas', slug: 'pandas', iconSrc: '/images/logos/pandas.svg' },
      { name: 'NumPy', slug: 'numpy', iconSrc: '/images/logos/numpy.svg' },
    ],
  },
  {
    id: 'databases',
    title: 'Databases',
    skills: [
      { name: 'MongoDB', slug: 'mongodb' },
      { name: 'PostgreSQL', slug: 'postgresql' },
      { name: 'MySQL', slug: 'mysql' },
    ],
  },
  {
    id: 'tools',
    title: 'Tools & Platforms',
    skills: [
      { name: 'Git', slug: 'git' },
      { name: 'GitHub', slug: 'github' },
      { name: 'Linux', slug: 'linux' },
      { name: 'Docker', slug: 'docker' },
      { name: 'CI/CD', slug: 'githubactions' },
    ],
  },
  {
    id: 'soft',
    title: 'Soft Skills',
    skills: [
      { name: 'Problem Solving' },
      { name: 'Teamwork' },
      { name: 'Decision Making' },
      { name: 'Critical Thinking' },
      { name: 'Adaptability' },
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
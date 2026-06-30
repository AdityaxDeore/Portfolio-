import type { Project } from '@/data/projects'
import { aboutBentoItems } from '@/data/aboutStory'

export type ProjectApproachTile = {
  id: string
  index: string
  title: string
  subtitle: string
  description: string
  variant: 'accent' | 'light'
  layout: 'hero' | 'outcome' | 'production' | 'curiosity' | 'pillar-a' | 'pillar-b'
}

const DEPTH_IMAGES: Record<string, string[]> = {
  codecampus: ['/motion/1.jfif', '/motion/4.jfif', '/motion/7.jfif', '/motion/8.jpg'],
  braintumor: ['/motion/2.jfif', '/motion/6.jpg', '/motion/11.jfif', '/motion/5.jfif'],
  projectclarity: ['/motion/3.jfif', '/motion/9.jfif', '/motion/10.jfif', '/motion/12.jfif'],
}

export type ProjectDepthFeature = {
  id: string
  title: string
  tag: string
  description: string
  image: string
}

const DEPTH_TITLES = ['Core engineering', 'System design', 'Production delivery', 'Measured impact'] as const

export function getProjectDepthFeatures(project: Project): ProjectDepthFeature[] {
  const images = DEPTH_IMAGES[project.id] ?? [project.image]

  return project.caseStudy.highlights.map((description, index) => ({
    id: `${project.id}-depth-${index}`,
    title: DEPTH_TITLES[index] ?? `Layer ${index + 1}`,
    tag: project.tags[index % project.tags.length] ?? 'Engineering',
    description,
    image: images[index % images.length] ?? project.image,
  }))
}

export function getProjectApproachTiles(project: Project): ProjectApproachTile[] {
  const production = aboutBentoItems.find((item) => item.id === 'production')!
  const curiosity = aboutBentoItems.find((item) => item.id === 'curiosity')!
  const pillars = project.caseStudy.highlights.slice(0, 2)

  return [
    {
      id: 'vision',
      index: '01',
      title: 'Problem & vision',
      subtitle: `${project.caseStudy.role} · ${project.caseStudy.year}`,
      description: project.caseStudy.summary,
      variant: 'accent',
      layout: 'hero',
    },
    {
      id: 'outcome',
      index: '02',
      title: 'Measured outcome',
      subtitle: 'Impact at a glance',
      description: project.outcome,
      variant: 'light',
      layout: 'outcome',
    },
    {
      id: 'production',
      index: production.index,
      title: production.title,
      subtitle: production.subtitle,
      description: production.description,
      variant: 'light',
      layout: 'production',
    },
    {
      id: 'curiosity',
      index: curiosity.index,
      title: curiosity.title,
      subtitle: curiosity.subtitle,
      description: curiosity.description,
      variant: 'accent',
      layout: 'curiosity',
    },
    ...pillars.map((highlight, index) => ({
      id: `pillar-${index}`,
      index: String(index + 5).padStart(2, '0'),
      title: index === 0 ? 'Engineering focus' : 'Key deliverable',
      subtitle: project.tags[index] ?? project.tags[0] ?? 'Stack',
      description: highlight,
      variant: (index === 0 ? 'light' : 'accent') as 'accent' | 'light',
      layout: (['pillar-a', 'pillar-b'] as const)[index],
    })),
  ]
}

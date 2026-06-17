export type ShowcaseItem = {
  id: number
  title: string
  subtitle: string
  description: string
  imageUrl: string
  reverse: boolean
}

export const showcaseSections: ShowcaseItem[] = [
  {
    id: 1,
    title: 'Where Nature Meets Code',
    subtitle: 'Finding clarity in simplicity',
    description:
      'The best solutions emerge when creativity meets structure — drawing inspiration from the natural world to write code that flows.',
    imageUrl:
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80&auto=format&fit=crop',
    reverse: false,
  },
  {
    id: 2,
    title: 'Crafting Every Pixel',
    subtitle: 'Precision in every detail',
    description:
      'From machine learning models to pixel-perfect interfaces — obsessing over the details is what separates good from exceptional.',
    imageUrl:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1920&q=80&auto=format&fit=crop',
    reverse: true,
  },
  {
    id: 3,
    title: 'Built for the Real World',
    subtitle: 'Engineering at scale',
    description:
      'Production systems that handle millions of requests, self-heal, and evolve — built with the discipline of shipping to real users.',
    imageUrl:
      'https://images.unsplash.com/photo-1484417894907-623942c8ee29?w=1920&q=80&auto=format&fit=crop',
    reverse: false,
  },
  {
    id: 4,
    title: 'Relentless Curiosity',
    subtitle: 'Always learning, always building',
    description:
      'Technology moves fast. Staying curious, experimenting with new tools, and pushing boundaries — that is the craft.',
    imageUrl:
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1920&q=80&auto=format&fit=crop',
    reverse: true,
  },
]

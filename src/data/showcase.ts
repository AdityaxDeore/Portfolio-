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
    title: 'ML Meets Full-Stack',
    subtitle: 'Intelligence with interface craft',
    description:
      'I pair TensorFlow and PyTorch models with React and Node backends — so AI features feel native inside real products, not bolted on as demos.',
    imageUrl: '/motion/1.jfif',
    reverse: false,
  },
  {
    id: 2,
    title: 'Precision in Every Layer',
    subtitle: 'Models, APIs, and UI detail',
    description:
      'From SVM diagnostic pipelines to Monaco editor integrations — I obsess over preprocessing, API contracts, and interaction polish.',
    imageUrl: '/motion/2.jfif',
    reverse: true,
  },
  {
    id: 3,
    title: 'Built for Real Users',
    subtitle: 'Shipped, measured, iterated',
    description:
      'Code Campus serves 90+ students. Clarity runs live WebSockets. Brain tumor detection hit 96.3% accuracy — all built with production discipline.',
    imageUrl: '/motion/3.jfif',
    reverse: false,
  },
  {
    id: 4,
    title: 'Relentless Curiosity',
    subtitle: 'Always learning, always building',
    description:
      'IBM Data Analyst certified. MLSC hackathon qualifier. I experiment with RAG search, multi-agent flows, and edge vision between semesters.',
    imageUrl: '/motion/4.jfif',
    reverse: true,
  },
]

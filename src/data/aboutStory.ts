export const aboutStorySection = {
  ctaPrimary: { label: 'View my work', href: '/#projects' },
  ctaSecondary: { label: 'Get in touch', href: '/#contact' },
} as const

export const floatingUiCards = [
  {
    id: 'codecampus',
    label: 'Code Campus IDE',
    image: '/motion/1.jfif',
    anchor: 'top-left' as const,
    x: 0,
    y: 0,
    rotate: -7,
    z: 3,
  },
  {
    id: 'clarity',
    label: 'Clarity Dashboard',
    image: '/motion/3.jfif',
    anchor: 'top-right' as const,
    x: 0,
    y: 0,
    rotate: 6,
    z: 4,
  },
  {
    id: 'tumor',
    label: 'MRI Diagnostics',
    image: '/motion/2.jfif',
    anchor: 'bottom-left' as const,
    x: 0,
    y: 0,
    rotate: 5,
    z: 2,
  },
  {
    id: 'terminal',
    label: 'Portfolio Terminal',
    image: '/motion/4.jfif',
    anchor: 'bottom-right' as const,
    x: 0,
    y: 0,
    rotate: -4,
    z: 1,
  },
] as const

export type AboutBentoItem = {
  id: string
  index: string
  title: string
  subtitle: string
  description: string
  image?: string
  variant: 'accent' | 'light'
  col: 1 | 2
  row: 1 | 2
}

export const aboutBentoItems: AboutBentoItem[] = [
  {
    id: 'fusion',
    index: '01',
    title: 'ML Meets Full-Stack',
    subtitle: 'Intelligence with interface craft',
    description:
      'I pair TensorFlow and PyTorch models with React and Node backends — so AI features feel native inside real products, not bolted on as demos.',
    image: '/motion/2.jfif',
    variant: 'accent',
    col: 2,
    row: 2,
  },
  {
    id: 'precision',
    index: '02',
    title: 'Precision in Every Layer',
    subtitle: 'Models, APIs, and UI detail',
    description:
      'From SVM diagnostic pipelines to Monaco editor integrations — I obsess over preprocessing, API contracts, and interaction polish.',
    variant: 'light',
    col: 1,
    row: 1,
  },
  {
    id: 'production',
    index: '03',
    title: 'Built for Real Users',
    subtitle: 'Shipped, measured, iterated',
    description:
      'Code Campus serves 90+ students. Clarity runs live WebSockets. Brain tumor detection hit 96.3% accuracy — all built with production discipline.',
    variant: 'light',
    col: 1,
    row: 1,
  },
  {
    id: 'curiosity',
    index: '04',
    title: 'Relentless Curiosity',
    subtitle: 'Always learning, always building',
    description:
      'IBM Data Analyst certified. MLSC hackathon qualifier. I experiment with RAG search, multi-agent flows, and edge vision between semesters.',
    variant: 'accent',
    col: 2,
    row: 1,
  },
  {
    id: 'collab',
    index: '05',
    title: 'Team-First Engineer',
    subtitle: 'Lead · collaborate · deliver',
    description:
      'Led a Wipro DICE intern team of four on TensorFlow object detection. Contributed across ITSA, GDG, and MLSC event deployments at PCCOE.',
    variant: 'light',
    col: 1,
    row: 1,
  },
]

export const stickyFeatureItems = [
  {
    id: 'ai-ml',
    title: 'AI & Machine Learning',
    description:
      'End-to-end ML workflows — data preprocessing, model training, evaluation, and deployment. Experience with TensorFlow, PyTorch, Scikit-learn, and OpenCV across medical imaging, NLP, and computer vision projects.',
    image: '/motion/2.jfif',
    tag: 'Core strength',
  },
  {
    id: 'fullstack',
    title: 'Full-Stack Development',
    description:
      'React and TypeScript frontends paired with Node.js and Express APIs. Built proctored coding platforms, wellness dashboards, and real-time chat with WebSockets, MongoDB, and PostgreSQL.',
    image: '/motion/1.jfif',
    tag: 'Product builder',
  },
  {
    id: 'data',
    title: 'Data Engineering & Analytics',
    description:
      'Pipelines for ingestion, transformation, and insight. Hybrid RAG search with Qdrant, Kafka log streaming at 15k events/sec, and IBM-certified analytics workflows with Python and SQL.',
    image: '/motion/5.jfif',
    tag: 'Signal → impact',
  },
  {
    id: 'agents',
    title: 'AI Agents & Automation',
    description:
      'Multi-agent orchestration with LangChain, Redis task queues, and workflow graphs. Designing systems that reason, call tools, and persist state across multi-turn user sessions.',
    image: '/motion/4.jfif',
    tag: 'Emerging focus',
  },
] as const

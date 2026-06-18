export type ExperienceItem = {
  id: string
  company: string
  role: string
  period: string
  location: string
  type: 'full-time' | 'internship' | 'freelance' | 'contract'
  summary: string
  highlights: string[]
  tech: string[]
}

export const experienceSection = {
  label: '04 — Experience',
  title: 'Where I have shipped',
  subtitle:
    'From ML pipelines and inference APIs to full-stack products — roles where I owned outcomes end to end.',
} as const

export const experienceItems: ExperienceItem[] = [
  {
    id: 'ml-engineer-freelance',
    company: 'Independent / Startups',
    role: 'ML Engineer & Full-Stack Architect',
    period: '2024 — Present',
    location: 'Pune · Remote',
    type: 'freelance',
    summary:
      'Designing and deploying production-grade AI features and data infrastructure for early-stage ventures.',
    highlights: [
      'Engineered a RAG-based conversational engine reducing support ticket volume by 35% through automated schema-aware responses.',
      'Developed real-time ML observability dashboards for monitoring drift and latency across 10+ production models.',
      'Orchestrated containerized inference microservices with automated scaling and blue-green deployment strategies.',
    ],
    tech: ['Python', 'FastAPI', 'React', 'PyTorch', 'Docker', 'PostgreSQL', 'AWS'],
  },
  {
    id: 'fullstack-intern',
    company: 'Agile Product Studio',
    role: 'Full-Stack Developer Intern',
    period: 'Summer 2024',
    location: 'Pune',
    type: 'internship',
    summary:
      'Core contributor to high-traffic e-commerce and automation platforms, owning feature cycles from API design to UI polish.',
    highlights: [
      'Revamped inventory management logic to support high-concurrency variant tracking, improving data consistency by 99%.',
      'Implemented a modular webhook engine with exponential backoff and dead-letter queues for robust external integrations.',
      'Standardized a reusable React component library reducing frontend development time for new features by 20%.',
    ],
    tech: ['React', 'Node.js', 'TypeScript', 'Redis', 'PostgreSQL', 'Tailwind'],
  },
  {
    id: 'ml-research',
    company: 'PCCOE Research Lab',
    role: 'ML Research Lead',
    period: '2022 — 2024',
    location: 'Pune',
    type: 'internship',
    summary:
      'Led research initiatives focused on explainable AI and high-performance data engineering for clinical decision support.',
    highlights: [
      'Architected a clinical risk-prediction system with SHAP-based interpretability, achieving a 0.88 AUC on retrospective patient cohorts.',
      'Optimized data processing pipelines using Polars, achieving a 12x speedup compared to legacy Pandas implementations.',
      'Published comprehensive evaluation reports documenting model calibration and fairness across diverse demographic slices.',
    ],
    tech: ['Python', 'Polars', 'Scikit-learn', 'TensorFlow', 'FastAPI', 'Matplotlib'],
  },
]
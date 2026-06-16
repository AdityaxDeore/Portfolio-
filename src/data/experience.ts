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
    company: 'Independent / Client Projects',
    role: 'ML Engineer & Full-Stack Developer',
    period: '2024 — Present',
    location: 'Pune · Remote',
    type: 'freelance',
    summary:
      'Building production ML features, conversational analytics, and full-stack dashboards for startups and product teams.',
    highlights: [
      'Designed RAG-style query layers over structured business data with streaming UI responses',
      'Shipped model observability dashboards with drift signals and latency percentiles',
      'Containerized inference services with CI/CD and reproducible training pipelines',
    ],
    tech: ['Python', 'FastAPI', 'React', 'PyTorch', 'Docker', 'PostgreSQL'],
  },
  {
    id: 'fullstack-intern',
    company: 'Product Studio',
    role: 'Full-Stack Developer Intern',
    period: 'Summer 2024',
    location: 'Pune',
    type: 'internship',
    summary:
      'Contributed to e-commerce and automation platforms — APIs, admin tooling, and integration workflows.',
    highlights: [
      'Built inventory and checkout flows with variant-level stock tracking',
      'Implemented webhook automation with retry-safe task execution',
      'Collaborated on component library patterns used across product squads',
    ],
    tech: ['React', 'Node.js', 'TypeScript', 'REST APIs', 'PostgreSQL'],
  },
  {
    id: 'ml-research',
    company: 'PCCOE — Academic & Research',
    role: 'ML Research & Projects Lead',
    period: '2022 — 2024',
    location: 'Pune',
    type: 'internship',
    summary:
      'Led coursework and capstone ML work — clinical decision-support prototypes, data pipelines, and deployed demos.',
    highlights: [
      'Developed explainable healthcare ML prototypes with SHAP-based feature attribution',
      'Built high-performance Polars analytics pipelines for exploratory data work',
      'Published evaluation reports with calibration plots and cohort-specific thresholds',
    ],
    tech: ['Python', 'Scikit-learn', 'TensorFlow', 'FastAPI', 'Pandas'],
  },
]
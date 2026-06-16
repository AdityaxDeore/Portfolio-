export type ProjectLink = {
  label: string
  href: string
  external?: boolean
}

export type ProjectCaseStudy = {
  summary: string
  role: string
  year: string
  highlights: string[]
}

export type Project = {
  id: string
  title: string
  tags: string[]
  outcome: string
  image: string
  links: ProjectLink[]
  caseStudy: ProjectCaseStudy
}

export const projectsSection = {
  label: '05 — Selected Work',
  title: 'Projects',
  subtitle:
    'Nine case studies across ML, full-stack, and data — click any card for the full write-up.',
} as const

export function getProjectById(id: string): Project | undefined {
  return projects.find((project) => project.id === id)
}

export const projects: Project[] = [
  {
    id: 'convoa',
    title: 'Conversational Analytics',
    tags: ['NLP', 'FastAPI', 'React'],
    outcome: 'Natural-language queries over structured business data with streaming responses.',
    image: '/images/projects/convoa.png',
    links: [{ label: 'View project', href: '#', external: true }],
    caseStudy: {
      role: 'ML Engineer · Full-Stack',
      year: '2025',
      summary:
        'A conversational layer that turns plain-English questions into SQL-safe queries, visual summaries, and streaming narrative answers for non-technical stakeholders.',
      highlights: [
        'Retrieval-augmented prompting with schema grounding to reduce hallucinated columns',
        'Server-sent events for token-by-token responses in the React client',
        'Role-based access control mapped to warehouse table permissions',
      ],
    },
  },
  {
    id: 'eletix',
    title: 'Eletix Dashboard',
    tags: ['React', 'ML', 'TypeScript'],
    outcome: 'Real-time monitoring dashboard for model metrics and inference health.',
    image: '/images/projects/eletix.png',
    links: [{ label: 'View project', href: '#', external: true }],
    caseStudy: {
      role: 'Frontend · ML Observability',
      year: '2025',
      summary:
        'Operations dashboard surfacing latency percentiles, drift signals, and alert thresholds for models running in staging and production.',
      highlights: [
        'Live charts fed by Prometheus-style metrics with graceful stale-state handling',
        'Per-model cards with version, traffic share, and last retrain timestamp',
        'Dark/light theming aligned to on-call workflows',
      ],
    },
  },
  {
    id: 'mindnest',
    title: 'MindNest',
    tags: ['PyTorch', 'Deploy', 'Python'],
    outcome: 'End-to-end ML app from training notebooks to a deployed inference API.',
    image: '/images/projects/mindnest.png',
    links: [{ label: 'View project', href: '#', external: true }],
    caseStudy: {
      role: 'ML Engineer',
      year: '2024',
      summary:
        'Notebook-to-production pipeline for a classification service with reproducible training, containerized inference, and a minimal review UI.',
      highlights: [
        'Exported ONNX artifacts with batching and warm-start for sub-200ms p95',
        'Dataset versioning and evaluation reports checked into the repo',
        'GitHub Actions workflow for lint, test, and image publish',
      ],
    },
  },
  {
    id: 'bottlehaus',
    title: 'BottleHaus',
    tags: ['Full-Stack', 'Node', 'PostgreSQL'],
    outcome: 'Product catalog and checkout flow with admin tooling and analytics.',
    image: '/images/projects/bottlehaus.jpg',
    links: [{ label: 'View project', href: '#', external: true }],
    caseStudy: {
      role: 'Full-Stack Developer',
      year: '2024',
      summary:
        'E-commerce prototype with inventory management, Stripe-ready checkout stubs, and an admin console for merchandising teams.',
      highlights: [
        'Normalized product schema with variant-level stock tracking',
        'Image CDN integration and responsive gallery components',
        'Sales funnel analytics with daily aggregation jobs',
      ],
    },
  },
  {
    id: 'ocamba',
    title: 'Ocamba Platform',
    tags: ['API', 'Automation', 'React'],
    outcome: 'Workflow automation layer connecting third-party services and internal tools.',
    image: '/images/projects/ocamba.png',
    links: [{ label: 'View project', href: '#', external: true }],
    caseStudy: {
      role: 'Backend · Integrations',
      year: '2024',
      summary:
        'Zapier-style automation builder focused on webhooks, scheduled triggers, and retry-safe task execution across SaaS APIs.',
      highlights: [
        'DAG-style workflow editor with typed step configuration',
        'Exponential backoff and dead-letter queue for failed runs',
        'OAuth token refresh middleware shared across connectors',
      ],
    },
  },
  {
    id: 'polars',
    title: 'Polars Analytics',
    tags: ['Data', 'Python', 'Visualization'],
    outcome: 'High-performance data pipelines with interactive exploration views.',
    image: '/images/projects/polars2.png',
    links: [{ label: 'View project', href: '#', external: true }],
    caseStudy: {
      role: 'Data Engineer',
      year: '2024',
      summary:
        'Analytics stack using Polars for fast transforms, Parquet storage, and a lightweight charting UI for exploratory analysis.',
      highlights: [
        'Lazy query plans for multi-GB CSV ingestion on a laptop',
        'Reusable transform library shared between CLI and API layers',
        'Export to notebook-friendly snapshots for stakeholder review',
      ],
    },
  },
  {
    id: 'meditx',
    title: 'MediTx',
    tags: ['Healthcare', 'ML', 'FastAPI'],
    outcome: 'Clinical decision-support prototype with explainable model outputs.',
    image: '/images/projects/meditx.png',
    links: [{ label: 'View project', href: '#', external: true }],
    caseStudy: {
      role: 'ML Engineer',
      year: '2023',
      summary:
        'Research prototype ranking follow-up risk from structured vitals and labs, with SHAP-based explanations surfaced to clinicians.',
      highlights: [
        'Strict PHI scrubbing in offline datasets before feature engineering',
        'Calibration plots and threshold tuning documented per cohort',
        'FastAPI service returning both score and top contributing features',
      ],
    },
  },
  {
    id: 'niftynafty',
    title: 'NiftyNafty',
    tags: ['Web3', 'React', 'API'],
    outcome: 'Marketplace interface with wallet integration and live listing feeds.',
    image: '/images/projects/niftynafty.png',
    links: [{ label: 'View project', href: '#', external: true }],
    caseStudy: {
      role: 'Frontend Developer',
      year: '2023',
      summary:
        'NFT marketplace front-end with wallet connect, live listing feed, and collection pages optimized for mobile collectors.',
      highlights: [
        'Infinite scroll with skeleton states for metadata-heavy cards',
        'Wallet connection flow with network mismatch guardrails',
        'Shareable collection URLs with Open Graph preview tags',
      ],
    },
  },
  {
    id: 'vvs',
    title: 'VVS Studio',
    tags: ['Design Systems', 'React', 'Storybook'],
    outcome: 'Component library and documentation site for a product design team.',
    image: '/images/projects/vvs.png',
    links: [{ label: 'View project', href: '#', external: true }],
    caseStudy: {
      role: 'UI Engineer',
      year: '2023',
      summary:
        'Storybook-driven component library with tokens, accessibility notes, and copy-paste examples for product squads.',
      highlights: [
        'Semantic color and spacing tokens synced to Figma variables',
        'Visual regression snapshots on every PR via Chromatic-style workflow',
        'Composable primitives documented with do/don’t usage guidance',
      ],
    },
  },
]
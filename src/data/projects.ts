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
  label: '04 — Selected Work',
  title: 'Projects',
  subtitle:
    'Nine case studies across ML, full-stack, and data — click any card for the full write-up.',
} as const

export function getProjectById(id: string): Project | undefined {
  return projects.find((project) => project.id === id)
}

export const projects: Project[] = [
  {
    id: 'codecampus',
    title: 'Code Campus',
    tags: ['React', 'Node.js', 'MongoDB', 'TypeScript'],
    outcome: 'Full-Stack proctored coding platform for live student practice, assessments, and learning analytics.',
    image: '/motion/1.jfif',
    links: [{ label: 'GitHub', href: 'https://github.com/AdityaxDeore/codecampus', external: true }],
    caseStudy: {
      role: 'Full-Stack Developer',
      year: '2025',
      summary:
        'A comprehensive online proctored coding and learning platform engineered to support student assessments, coding challenges, and analytics workflows with a secure IDE.',
      highlights: [
        'Built a VS Code-style IDE with integrated real-time code execution capabilities.',
        'Enhanced assessment integrity for 90+ students through secure automated proctoring mechanisms.',
        'Architected a scalable full-stack system supporting concurrent student programming sessions.',
        'Built a context-aware AI assistant providing adaptive hints and debugging guidance.',
      ],
    },
  },
  {
    id: 'tumorai',
    title: 'Brain Tumor Detection',
    tags: ['Python', 'OpenCV', 'Scikit-learn', 'Machine Learning'],
    outcome: 'Delivered 96.3% classification accuracy on unseen MRI scans using an optimized SVM-based diagnostic pipeline.',
    image: '/motion/2.jfif',
    links: [{ label: 'GitHub', href: 'https://github.com/AdityaxDeore/brain-tumor-detection', external: true }],
    caseStudy: {
      role: 'AI/ML Engineer',
      year: '2025',
      summary:
        'An MRI-based diagnostic and tumor classification system using machine learning, computer vision, and image processing to automate clinical decision support.',
      highlights: [
        'Delivered 96.3% classification accuracy on unseen MRI scans using an optimized SVM-based diagnostic pipeline.',
        'Improved model reliability with only 9 misclassifications, leveraging advanced image preprocessing.',
        'Benchmarked multiple ML classifiers, achieving superior detection performance and generalization with SVM.',
        'Implemented automated image preprocessing and feature extraction pipelines using OpenCV and NumPy.',
      ],
    },
  },
  {
    id: 'clarity',
    title: 'Clarity',
    tags: ['React', 'TypeScript', 'PostgreSQL', 'TensorFlow'],
    outcome: 'AI wellness platform with real-time peer interactions and conversational support.',
    image: '/motion/3.jfif',
    links: [{ label: 'GitHub', href: 'https://github.com/AdityaxDeore/Clarity', external: true }],
    caseStudy: {
      role: 'Full-Stack & AI Engineer',
      year: '2025',
      summary:
        'An AI-powered mental wellness companion combining mood tracking analytics, conversational assistant stubs, and real-time community chat features.',
      highlights: [
        'Built an AI wellness platform with conversational support and predictive mood tracking.',
        'Enabled real-time peer interaction using WebSockets.',
        'Built scalable backend services supporting real-time user interactions.',
      ],
    },
  },
  {
    id: 'agentflow',
    title: 'AgentFlow',
    tags: ['Python', 'LangChain', 'FastAPI', 'Redis'],
    outcome: 'Orchestrated multi-agent automation completing complex multi-step data integration tasks.',
    image: '/motion/4.jfif',
    links: [{ label: 'GitHub', href: 'https://github.com/AdityaxDeore', external: true }],
    caseStudy: {
      role: 'Backend & AI Engineer',
      year: '2025',
      summary:
        'A resilient multi-agent execution framework coordinating specialized LLM agents for data parsing, validation, and automated reporting.',
      highlights: [
        'Designed workflow graph using LangGraph to enable structured reasoning and tool execution.',
        'Integrated asynchronous Redis task queues handling concurrent task execution.',
        'Developed memory adapters persisting agent state across multi-turn user workflows.',
      ],
    },
  },
  {
    id: 'hybridrag',
    title: 'Hybrid RAG Search',
    tags: ['Python', 'Qdrant', 'FastAPI', 'Sentence-Transformers'],
    outcome: 'Built a search engine combining semantic vector retrieval and BM25 text queries.',
    image: '/motion/5.jfif',
    links: [{ label: 'GitHub', href: 'https://github.com/AdityaxDeore', external: true }],
    caseStudy: {
      role: 'ML Engineer',
      year: '2025',
      summary:
        'A high-performance retrieval system incorporating dense vectors and sparse keyword representations for domain-specific documentation queries.',
      highlights: [
        'Engineered dense semantic indexing pipelines with Qdrant vector database.',
        'Created reciprocal rank fusion (RRF) algorithms merging keyword search and dense queries.',
        'Reduced inference latency by 35% through custom embedding cache strategies.',
      ],
    },
  },
  {
    id: 'edgevision',
    title: 'EdgeVision Traffic',
    tags: ['Python', 'OpenCV', 'PyTorch', 'ONNX'],
    outcome: 'Real-time vehicle detection and lane traffic density estimation running on low-cost edge platforms.',
    image: '/motion/6.jpg',
    links: [{ label: 'GitHub', href: 'https://github.com/AdityaxDeore', external: true }],
    caseStudy: {
      role: 'Computer Vision Engineer',
      year: '2025',
      summary:
        'Edge intelligence camera software analyzing live video streams to identify traffic congestion zones and count vehicles dynamically.',
      highlights: [
        'Exported YOLO detection models to optimized ONNX runtimes for edge hardware acceleration.',
        'Engineered multi-object tracking logic using DeepSORT to track vehicles across frame boundaries.',
        'Achieved 22 FPS vehicle estimation on resource-constrained micro-controllers.',
      ],
    },
  },
  {
    id: 'logsync',
    title: 'LogSync Stream',
    tags: ['Go', 'Kafka', 'Elasticsearch', 'Docker'],
    outcome: 'Distributed logging pipeline ingesting 15,000+ log events per second with real-time indexing.',
    image: '/motion/7.jfif',
    links: [{ label: 'GitHub', href: 'https://github.com/AdityaxDeore', external: true }],
    caseStudy: {
      role: 'Infrastructure Developer',
      year: '2026',
      summary:
        'A high-throughput log aggregator collecting event telemetry streams across containerized microservices into a central visualization engine.',
      highlights: [
        'Written high-concurrency log collectors in Go utilizing channel multiplexing.',
        'Integrated Apache Kafka buffering spikes in data stream volume safely.',
        'Created custom Elasticsearch index patterns facilitating lightning-fast searches.',
      ],
    },
  },
  {
    id: 'keygate',
    title: 'KeyGate OAuth',
    tags: ['TypeScript', 'Node.js', 'Redis', 'PostgreSQL'],
    outcome: 'Secure, zero-trust authentication server supporting JWT sessions and multi-factor verification.',
    image: '/motion/8.jpg',
    links: [{ label: 'GitHub', href: 'https://github.com/AdityaxDeore', external: true }],
    caseStudy: {
      role: 'Security Engineer',
      year: '2026',
      summary:
        'An enterprise identity provider issuing signed JSON Web Tokens (JWT) with automated key rotation and device-level verification flows.',
      highlights: [
        'Implemented public-key cryptography algorithms (RS256) signing JWT access keys.',
        'Created Redis cache layers managing real-time session blacklist checks.',
        'Developed rate-limiting middlewares shielding API gates from brute force attacks.',
      ],
    },
  },
  {
    id: 'insightmail',
    title: 'InsightMail NLP',
    tags: ['Python', 'Scikit-learn', 'Transformers', 'FastAPI'],
    outcome: 'Automated email routing and ticket severity classifier with 91.5% classification accuracy.',
    image: '/motion/11.jfif',
    links: [{ label: 'GitHub', href: 'https://github.com/AdityaxDeore', external: true }],
    caseStudy: {
      role: 'Data Scientist',
      year: '2025',
      summary:
        'An intelligent NLP service processing incoming customer support messages to route issues to correct departments automatically.',
      highlights: [
        'Fine-tuned lightweight BERT classification models on structured email datasets.',
        'Developed sentiment grading criteria tagging high-urgency escalations immediately.',
        'Deployed REST endpoints returning predictions in under 120ms.',
      ],
    },
  },
]
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
  title: 'Featured Projects',
  subtitle:
    'Nine production-grade projects and case studies across AI/ML, data engineering, and full-stack software development.',
} as const

export function getProjectById(id: string): Project | undefined {
  return projects.find((project) => project.id === id)
}

export const projects: Project[] = [
  {
    id: 'codecampus',
    title: 'CodeCampus',
    tags: ['React', 'Node.js', 'MongoDB', 'TypeScript', 'WebRTC'],
    outcome: 'Distributed ed-tech platform featuring real-time proctored coding execution, video streaming, subscription monetization, and multiple subsystems.',
    image: '/motion/1.jfif',
    links: [{ label: 'GitHub', href: 'https://github.com/AdityaxDeore/codecampus', external: true }],
    caseStudy: {
      role: 'Full-Stack Developer',
      year: '2025',
      summary:
        'A scalable online coding platform engineered to support student practice, assessments, and learning analytics with a sandboxed coding terminal.',
      highlights: [
        'Built a Monaco-powered IDE for real-time sandboxed code execution in Docker.',
        'Implemented secure proctoring with keystroke analytics to detect anomaly patterns.',
        'Architected a scalable backend handling concurrent student practice sessions.',
        'Integrated recurring monetization flows and video streaming channels.',
      ],
    },
  },
  {
    id: 'dementiaml',
    title: 'Dementia Diagnostic AI',
    tags: ['Python', 'PyTorch', '3D MRI', 'Medical Imaging', 'Neuroscience'],
    outcome: 'Research-heavy ML system processing volumetric MRI brain scans to detect early-stage cognitive neurodegenerative indicators.',
    image: '/motion/2.jfif',
    links: [{ label: 'GitHub', href: 'https://github.com/AdityaxDeore', external: true }],
    caseStudy: {
      role: 'AI/ML Engineer',
      year: '2025',
      summary:
        'An intelligent diagnostic model processing volumetric 3D MRI scans and clinical data to support automated clinical research screenings.',
      highlights: [
        'Designed custom 3D Convolutional Neural Network architectures extracting spatial disease markers.',
        'Built image preprocessing pipelines performing skull-stripping and spatial voxel alignment.',
        'Benchmarked multiple deep learning classifiers achieving high sensitivity rates.',
        'Developed volumetric extraction tools mapping brain regions of interest.',
      ],
    },
  },
  {
    id: 'projectclarity',
    title: 'Project Clarity (Prayaas Education)',
    tags: ['TypeScript', 'React', 'PostgreSQL', 'Workflow Orchestration', 'Analytics'],
    outcome: 'Multi-module educational platform organizing curriculum planning, evaluation metrics, learning analytics, and administration.',
    image: '/motion/3.jfif',
    links: [{ label: 'GitHub', href: 'https://github.com/AdityaxDeore/Clarity', external: true }],
    caseStudy: {
      role: 'Full-Stack & AI Engineer',
      year: '2025',
      summary:
        'An enterprise education platform combining mood journaling analysis, collaborative planning, and student tracking metrics.',
      highlights: [
        'Built a multi-module dashboard tracking curriculum scheduling and teacher approvals.',
        'Enabled real-time chat rooms for school administration via WebSockets.',
        'Developed an AI sentiment helper classifying student journal entries in real time.',
        'Optimized PostgreSQL query latency to load school-wide analytical charts instantly.',
      ],
    },
  },
  {
    id: 'palantir',
    title: 'Palantir Integration',
    tags: ['Palantir Foundry', 'PySpark', 'Ontology Mapping', 'Data Engineering', 'Enterprise Pipelines'],
    outcome: 'Enterprise data pipeline aggregating unstructured client logs and database tables into clean, semantic ontology representations.',
    image: '/motion/5.jfif',
    links: [{ label: 'GitHub', href: 'https://github.com/AdityaxDeore', external: true }],
    caseStudy: {
      role: 'Data Engineer',
      year: '2026',
      summary:
        'A high-performance pipeline ingesting diverse data sources to create a unified ontology on Palantir Foundry cluster layers.',
      highlights: [
        'Designed PySpark transformations clean-filtering large unstructured log datasets.',
        'Built semantic ontology mappings linking legacy relational databases to active object classes.',
        'Configured automated health checks monitoring telemetry schema changes.',
        'Developed interactive Workshop dashboards mapping key operational KPI signals.',
      ],
    },
  },
  {
    id: 'braintumor',
    title: 'Brain Tumor Detection',
    tags: ['Python', 'OpenCV', 'Scikit-learn', 'SVM Classification', 'Computer Vision'],
    outcome: 'End-to-end ML pipeline with preprocessing, model training, evaluation, and medical tumor classification.',
    image: '/motion/6.jpg',
    links: [{ label: 'GitHub', href: 'https://github.com/AdityaxDeore/brain-tumor-detection', external: true }],
    caseStudy: {
      role: 'AI/ML Engineer',
      year: '2025',
      summary:
        'An MRI classification system using classical computer vision and optimized SVM kernels to automate early anomalies screening.',
      highlights: [
        'Delivered 96.3% tumor classification accuracy on held-out test datasets.',
        'Applied Otsu thresholding and bilateral filtering reducing raw image scan noise.',
        'Extracted Haralick texture descriptors training kernel SVM classifiers.',
        'Built color overlay tools segmenting suspected anomaly regions for clinician view.',
      ],
    },
  },
  {
    id: 'audiocnn',
    title: 'Explainable Audio CNNs',
    tags: ['Python', 'TensorFlow', 'Signal Processing', 'Audio Spectrograms', 'Explainable AI'],
    outcome: 'Deep learning research project interpreting auditory CNNs through neural signal response and frequency activations.',
    image: '/motion/11.jfif',
    links: [{ label: 'GitHub', href: 'https://github.com/AdityaxDeore', external: true }],
    caseStudy: {
      role: 'Deep Learning Researcher',
      year: '2025',
      summary:
        'A research project implementing activation maps on convolutional audio models to study how networks interpret audio features.',
      highlights: [
        'Processed raw audio signals into Mel-spectrogram images representing frequency maps.',
        'Developed explainability layers rendering visual activations in intermediate CNN steps.',
        'Mapped convolutional weights to biological auditory perceptual frequency charts.',
        'Coordinated feature extraction benchmarking across varying neural network depths.',
      ],
    },
  },
  {
    id: 'portfolio',
    title: 'PORTFOLIO',
    tags: ['React', 'TypeScript', 'Vite', 'CSS Grid', 'Framer Motion'],
    outcome: 'Full-stack portfolio platform showcasing selected projects, dynamic layouts, and integrated AI assistant chats.',
    image: '/motion/4.jfif',
    links: [{ label: 'GitHub', href: 'https://github.com/AdityaxDeore/portfolio', external: true }],
    caseStudy: {
      role: 'Software Developer',
      year: '2026',
      summary:
        'A modern responsive portfolio site utilizing client-side route caching, interactive terminals, and a NIM API chatbot.',
      highlights: [
        'Designed modular grid layouts with smooth parallax scroll mechanics.',
        'Integrated a conversational NIM AI assistant rendering interactive search cards.',
        'Optimized scroll target offsets and eliminated content layout shifts.',
        'Configured an interactive shell matching custom command utilities.',
      ],
    },
  },
  {
    id: 'shihiko',
    title: 'shihiko-E-Commerce-Website',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Responsive UI', 'UX Design'],
    outcome: 'Frontend e-commerce implementation emphasizing custom micro-animations and intuitive responsive layout patterns.',
    image: '/motion/8.jpg',
    links: [{ label: 'GitHub', href: 'https://github.com/AdityaxDeore', external: true }],
    caseStudy: {
      role: 'Frontend Developer',
      year: '2025',
      summary:
        'A high-performance responsive storefront emphasizing custom micro-interactions and smooth checkout navigation paths.',
      highlights: [
        'Designed fluid animated cart additions and transition checkout templates.',
        'Structured modular responsive design patterns adapting to various screens.',
        'Optimized image load sequences reducing frontend paint delay times.',
        'Built intuitive interactive navigation headers with drop-down filtering panels.',
      ],
    },
  },
  {
    id: 'obamify',
    title: 'Obamify',
    tags: ['C++', 'Image Processing', 'GUI Development', 'Color Mapping', 'Graphics'],
    outcome: 'Specialized graphics application executing posterization and color mappings using advanced image parsing algorithms.',
    image: '/motion/7.jfif',
    links: [{ label: 'GitHub', href: 'https://github.com/AdityaxDeore', external: true }],
    caseStudy: {
      role: 'C++ Developer',
      year: '2025',
      summary:
        'A desktop graphics application mapping average RGB structures to customized high-resolution poster scales.',
      highlights: [
        'Developed instant color mapping algorithms optimizing standard pixel parsing.',
        'Designed lightweight native GUI controls facilitating instant user imports.',
        'Structured memory layouts preventing memory leaks on high-resolution targets.',
        'Built custom exporters outputting optimized poster formats.',
      ],
    },
  },
]
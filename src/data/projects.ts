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
  bannerImage?: string
  links: ProjectLink[]
  caseStudy: ProjectCaseStudy
  highlighted?: boolean
}

export const projectsSection = {
  label: '04 — Selected Work',
  title: 'Featured Projects',
  subtitle:
    'Three flagship case studies across full-stack engineering and AI/ML systems.',
} as const

export function getProjectById(id: string): Project | undefined {
  return projects.find((project) => project.id === id)
}

export const projects: Project[] = [
  {
    id: 'codecampus',
    title: 'CodeCampus',
    tags: ['React', 'Node.js', 'PostgreSQL', 'TypeScript', 'UPI API'],
    outcome: 'Distributed EdTech SaaS platform integrating course management, secure UPI payment processing, and optimized video delivery through stateless service architecture.',
    image: '/projects/codecampus img.png',
    bannerImage: '/projects/codecampus banner.png',
    links: [{ label: 'GitHub', href: 'https://github.com/AdityaxDeore/codecampus', external: true }],
    highlighted: true,
    caseStudy: {
      role: 'Full-Stack Developer & Architect',
      year: '2025',
      summary:
        'A cloud-ready Educational Technology platform engineered to support structured learning, secure digital commerce, and optimized educational content delivery.',
      highlights: [
        'Architected stateless business services separating concern layers (User, Course, Payment, Analytics).',
        'Built a secure monetization engine integrated with India\'s UPI payments and verified via webhooks.',
        'Designed optimized content delivery mechanisms supporting chunked media streaming and progress sync.',
        'Implemented secure Identity Management with Role-Based Access Control (RBAC) and JWT validation.',
      ],
    },
  },
  {
    id: 'projectclarity',
    title: 'Clarity',
    tags: ['TypeScript', 'React', 'PostgreSQL', 'Workflow Orchestration', 'Analytics'],
    outcome: 'Multi-module educational platform organizing curriculum planning, evaluation metrics, learning analytics, and administration.',
    image: '/projects/clarity img.png',
    bannerImage: '/projects/clarity banner.png',
    links: [{ label: 'GitHub', href: 'https://github.com/AdityaxDeore/Clarity', external: true }],
    highlighted: true,
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
    id: 'braintumor',
    title: 'Brain Tumor Detection',
    tags: ['Python', 'OpenCV', 'Scikit-learn', 'SVM Classification', 'Computer Vision'],
    outcome: 'End-to-end ML pipeline with preprocessing, model training, evaluation, and medical tumor classification.',
    image: '/projects/brain tumor img.png',
    bannerImage: '/projects/brain tumor banner.png',
    links: [{ label: 'GitHub', href: 'https://github.com/AdityaxDeore/brain-tumor-detection', external: true }],
    highlighted: true,
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
    id: 'obamify',
    title: 'Obamify',
    tags: ['C++', 'Image Processing', 'GUI Development', 'Color Mapping', 'Graphics'],
    outcome: 'Specialized graphics application executing posterization and color mappings using advanced image parsing algorithms.',
    image: '/projects/obamify img.png',
    bannerImage: '/projects/obamify banner.png',
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
  {
    id: 'worldmonitor',
    title: 'World Monitor',
    tags: ['Geospatial Intelligence', 'Distributed Systems', 'Data Engineering', 'Real-Time Analytics'],
    outcome: 'A real-time global intelligence platform aggregating, processing, and visualizing large-scale geopolitical, economic, and infrastructure data.',
    image: '/projects/world monitor img.png',
    bannerImage: '/projects/world monitor banner.png',
    links: [{ label: 'GitHub', href: 'https://github.com/AdityaxDeore', external: true }],
    caseStudy: {
      role: 'Platform Architect & Engineer',
      year: '2026',
      summary: 'A distributed intelligence platform that transforms global information streams into structured, explainable, and actionable situational awareness.',
      highlights: [
        'Aggregated 435+ curated news feeds and 30+ heterogeneous external data providers.',
        'Normalized unstructured data across different schemas, languages, and update frequencies.',
        'Processed unstructured data using AI inference engines to generate real-time intelligence summaries.',
        'Uncovered hidden interconnections between seemingly unrelated global events.'
      ]
    }
  },
  {
    id: 'pinkauto',
    title: 'Pink Auto',
    tags: ['Geospatial Systems', 'Real-Time Computing', 'Safety Engineering', 'Full-Stack'],
    outcome: 'A safety-first urban mobility platform providing secure, reliable, and technology-driven transportation services for women.',
    image: '/projects/pink auto img.png',
    bannerImage: '/projects/pink auto banner.png',
    links: [{ label: 'GitHub', href: 'https://github.com/AdityaxDeore', external: true }],
    caseStudy: {
      role: 'Full-Stack Product Engineer',
      year: '2026',
      summary: 'A cloud-native mobility infrastructure combining intelligent dispatch systems, real-time location processing, and emergency workflows.',
      highlights: [
        'Built a transactional core managing ride creation and driver assignment with a strict finite state machine.',
        'Implemented driver matching evaluated on cost functions optimizing driver distance and ETA.',
        'Engineered an emergency SOS trigger that instantly notifies trusted contacts via a control dashboard.',
        'Constructed route deviation detection triggering instant safety alerts if unexpected trajectories are taken.'
      ]
    }
  },
  {
    id: 'dementiaml',
    title: 'Dementia Diagnostic AI',
    tags: ['Python', 'PyTorch', '3D MRI', 'Medical Imaging', 'Neuroscience'],
    outcome: 'Research-heavy ML system processing volumetric MRI brain scans to detect early-stage cognitive neurodegenerative indicators.',
    image: '/projects/dementia img.png',
    bannerImage: '/projects/dementia assistant banner.png',
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
    id: 'palantir',
    title: 'Palantir Integration',
    tags: ['Palantir Foundry', 'PySpark', 'Ontology Mapping', 'Data Engineering', 'Enterprise Pipelines'],
    outcome: 'Enterprise data pipeline aggregating unstructured client logs and database tables into clean, semantic ontology representations.',
    image: '/projects/palantir image.png',
    bannerImage: '/projects/palantir banner.png',
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
    id: 'audiocnn',
    title: 'Explainable Audio CNNs',
    tags: ['Python', 'TensorFlow', 'Signal Processing', 'Audio Spectrograms', 'Explainable AI'],
    outcome: 'Deep learning research project interpreting auditory CNNs through neural signal response and frequency activations.',
    image: '/projects/audio cnn.png',
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
    id: 'shihiko',
    title: 'shihiko-E-Commerce-Website',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Responsive UI', 'UX Design'],
    outcome: 'Frontend e-commerce implementation emphasizing custom micro-animations and intuitive responsive layout patterns.',
    image: '/projects/shihiko img.png',
    bannerImage: '/projects/shihiko banner.png',
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
  }
]
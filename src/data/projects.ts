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
    id: 'codecampus',
    title: 'Code Campus',
    tags: ['React', 'Node.js', 'MongoDB', 'TypeScript'],
    outcome: 'Full-Stack proctored coding platform for live student practice, assessments, and learning analytics.',
    image: '/images/projects/codecampus.png',
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
    image: '/images/projects/tumorai.png',
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
    image: '/images/projects/clarity.png',
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
]
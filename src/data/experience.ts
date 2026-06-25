export type ExperienceItem = {
  id: string
  company: string
  role: string
  period: string
  location: string
  type: 'full-time' | 'internship' | 'freelance' | 'contract' | 'part-time'
  summary: string
  highlights: string[]
  tech: string[]
}

export const experienceSection = {
  label: '03 — Experience',
  title: 'Experience',
  subtitle:
    'From ML pipelines and inference APIs to full-stack products — roles where I owned outcomes end to end.',
} as const

export const experienceItems: ExperienceItem[] = [
  {
    id: 'itsa-web-dev',
    company: 'ITSA (Information Technology Students Council)',
    role: 'Software Development Associate',
    period: 'May 2025 - Jan 2026',
    location: 'PCCOE, Pune',
    type: 'part-time',
    summary:
      'Engineered an event management platform that onboarded 3,500+ students across hackathons, workshops, and technical initiatives.',
    highlights: [
      'Engineered an event management platform that onboarded <strong>3,500+ students</strong> across hackathons, workshops, and technical initiatives.',
      'Implemented a <strong>Unique Student ID-based</strong> registration and attendance system, automating participant verification and tracking.',
      'Developed responsive full-stack web applications, streamlining event discovery, registration, and engagement for the student community.',
    ],
    tech: ['HTML5', 'CSS3', 'React.js', 'Node.js'],
  },
  {
    id: 'personify-ai-ml',
    company: 'Personify',
    role: 'AI/ML Intern',
    period: 'Mar 2025 - May 2025',
    location: 'Bengaluru, India (Hybrid)',
    type: 'internship',
    summary:
      'Engineered TensorFlow-based computer vision models for image classification and object detection, achieving over 94% accuracy.',
    highlights: [
      'Engineered TensorFlow-based computer vision models for image classification and object detection, achieving over <strong>94% accuracy</strong> across multiple datasets.',
      'Optimized CNN architectures using transfer learning, data augmentation, and hyperparameter tuning, resulting in a <strong>15% improvement in F1-Score</strong> and enhanced model generalization.',
      'Designed automated preprocessing and training pipelines, reducing data preparation time by <strong>40%</strong>.',
      'Evaluated model performance through Precision metrics, reducing false detections by <strong>25%</strong> and improving prediction reliability.',
      'Enhanced inference efficiency through feature extraction and model optimization techniques, decreasing prediction latency by <strong>30%</strong> while maintaining high accuracy.',
    ],
    tech: ['Python', 'TensorFlow', 'Machine Learning', 'NumPy', 'Pandas'],
  },
]
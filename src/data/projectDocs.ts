import type { Project } from '@/data/projects'

export type ProjectDocBlock = {
  id: string
  eyebrow: string
  title: string
  paragraphs: string[]
}

export type ProjectDocMetric = {
  label: string
  value: string
}

export type ProjectDocumentation = {
  overview: string[]
  blocks: ProjectDocBlock[]
  metrics: ProjectDocMetric[]
  constraints: string[]
}

const PROJECT_DOCS: Record<string, ProjectDocumentation> = {
  codecampus: {
    overview: [
      'Code Campus is a proctored coding and learning platform built for PCCOE student assessments. The system combines a browser-based IDE, secure code execution, keystroke integrity checks, and instructor analytics in one cohesive workflow.',
      'The platform was designed around a simple constraint: students should feel at home in a VS Code-like environment while administrators retain confidence that submissions are authentic and safely sandboxed.',
    ],
    blocks: [
      {
        id: 'scope',
        eyebrow: 'Scope',
        title: 'What the platform delivers',
        paragraphs: [
          'Students open assignments inside a Monaco-powered editor with file tabs, a terminal panel, and one-click run controls. Instructors publish timed challenges, review flagged sessions, and export performance summaries without leaving the dashboard.',
          'The backend handles authentication, telemetry ingestion, queue management for Docker runs, and WebSocket streaming of stdout/stderr back to the client.',
        ],
      },
      {
        id: 'security',
        eyebrow: 'Security model',
        title: 'How integrity is enforced',
        paragraphs: [
          'Keystroke analytics capture dwell time, flight time, and paste bursts. Statistical thresholds flag anomalous cadences before a submission is marked complete.',
          'AST scanning rejects dangerous imports and filesystem calls prior to container spin-up. Each run executes in an isolated pod with no network egress, read-only root, and hard CPU/RAM caps.',
        ],
      },
      {
        id: 'ops',
        eyebrow: 'Operations',
        title: 'Running at scale during exams',
        paragraphs: [
          'Peak windows support 90+ concurrent student sessions. Horizontal scaling of worker nodes prevents queue backlog during lab exams.',
          'MongoDB stores session metadata and keystroke timelines; Express routes validate JWTs and throttle abusive run requests.',
        ],
      },
    ],
    metrics: [
      { label: 'Active students', value: '90+' },
      { label: 'Editor', value: 'Monaco / VS Code UX' },
      { label: 'Runtime', value: 'Docker sandbox' },
      { label: 'Stack', value: 'React · Node · MongoDB' },
    ],
    constraints: [
      'No network access inside execution containers',
      'Sub-3s feedback loop for typical Python/JS runs',
      'Keyboard-first navigation for power users',
      'Instructor review for flagged integrity events',
    ],
  },
  braintumor: {
    overview: [
      'This project automates MRI-based brain tumor screening using classical computer vision and an RBF-kernel SVM classifier. The pipeline prioritizes interpretability, reproducible preprocessing, and held-out evaluation over black-box deep learning.',
      'Every stage — ingestion, denoising, skull stripping, feature extraction, and classification — is documented so results can be audited in a clinical research context.',
    ],
    blocks: [
      {
        id: 'pipeline',
        eyebrow: 'Pipeline',
        title: 'End-to-end diagnostic flow',
        paragraphs: [
          'Scans arrive as DICOM or PNG exports, normalized to 256×256 grayscale tensors. Bilateral filtering reduces noise while preserving tumor edge definition critical for texture features.',
          'Otsu thresholding isolates brain tissue from skull and background. Haralick descriptors and intensity statistics feed an SVM with grid-searched C and gamma hyperparameters.',
        ],
      },
      {
        id: 'evaluation',
        eyebrow: 'Evaluation',
        title: 'How accuracy was measured',
        paragraphs: [
          'Cross-validated folds prevented leakage between train and test partitions. The final model achieved 96.3% accuracy on held-out scans with only nine misclassifications.',
          'Precision-recall trade-offs were reviewed per class to ensure false negatives — missed tumors — were minimized even at the cost of slightly higher false positives.',
        ],
      },
    ],
    metrics: [
      { label: 'Accuracy', value: '96.3%' },
      { label: 'Misclassifications', value: '9 on test set' },
      { label: 'Input', value: 'MRI grayscale' },
      { label: 'Classifier', value: 'RBF-kernel SVM' },
    ],
    constraints: [
      'Anonymous patient metadata only',
      'Reproducible OpenCV preprocessing',
      'No GPU dependency for inference',
      'Explainable feature vectors',
    ],
  },
  projectclarity: {
    overview: [
      'Clarity is an AI-assisted wellness dashboard that pairs mood journaling, sentiment analysis, and real-time peer support. The product goal was to make mental health tracking feel proactive rather than passive chart-watching.',
      'React drives the client experience; Node.js and PostgreSQL persist user state; TensorFlow classifies journal sentiment; Socket.io delivers low-latency peer messages.',
    ],
    blocks: [
      {
        id: 'nlp',
        eyebrow: 'NLP layer',
        title: 'Sentiment from journal text',
        paragraphs: [
          'Entries pass through spaCy tokenization and lemmatization before inference. A bidirectional LSTM with attention weights returns polarity and intensity scores in under 200ms.',
          'Privacy-first storage keeps embeddings for analytics while allowing users to purge raw text on request.',
        ],
      },
      {
        id: 'realtime',
        eyebrow: 'Real-time',
        title: 'Live peer interactions',
        paragraphs: [
          'Socket.io gateways authenticate via JWT and broadcast room messages with AES-GCM-256 encryption at rest. Rate limits and moderation hooks protect high-traffic support sessions.',
          'Recommendation panels adapt as mood scores shift across multi-day windows using a lightweight knowledge graph of self-care resources.',
        ],
      },
    ],
    metrics: [
      { label: 'Inference', value: '< 200ms' },
      { label: 'Transport', value: 'WebSockets' },
      { label: 'Encryption', value: 'AES-GCM-256' },
      { label: 'Stack', value: 'React · TF · PostgreSQL' },
    ],
    constraints: [
      'Purgeable raw journal text',
      'JWT-authenticated sockets',
      'Rate-limited chat rooms',
      'Mood trends over multi-day windows',
    ],
  },
}

export function getProjectDocumentation(project: Project): ProjectDocumentation {
  const custom = PROJECT_DOCS[project.id]
  if (custom) return custom

  return {
    overview: [
      project.caseStudy.summary,
      `This case study documents the engineering approach, stack choices, and measurable outcomes behind ${project.title}. Written as technical documentation rather than marketing copy.`,
    ],
    blocks: [
      {
        id: 'build',
        eyebrow: 'Build',
        title: 'Implementation summary',
        paragraphs: [
          project.outcome,
          `Built as ${project.caseStudy.role} in ${project.caseStudy.year} using ${project.tags.join(', ')}.`,
        ],
      },
      {
        id: 'results',
        eyebrow: 'Results',
        title: 'Key deliverables',
        paragraphs: project.caseStudy.highlights.slice(0, 2),
      },
    ],
    metrics: [
      { label: 'Role', value: project.caseStudy.role },
      { label: 'Year', value: project.caseStudy.year },
      { label: 'Stack', value: project.tags.slice(0, 3).join(' · ') },
      { label: 'Outcome', value: project.outcome.slice(0, 48) + (project.outcome.length > 48 ? '…' : '') },
    ],
    constraints: project.caseStudy.highlights.slice(0, 4),
  }
}

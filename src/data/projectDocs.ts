import type { Project } from '@/data/projects'
import { pickMotionAsset } from '@/lib/motionMedia'

export type ProjectDocBlock = {
  id: string
  eyebrow: string
  title: string
  paragraphs: string[]
  image?: string
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
      'CodeCampus is a cloud-ready Educational Technology (EdTech) platform engineered to deliver a scalable, secure, and intelligent digital learning ecosystem.',
      'The platform integrates course management, high-definition educational content delivery, secure digital payments (UPI), analytics-driven learning insights, and role-based administration into a unified, modular architecture. Rather than approaching online learning as a simple content-delivery app, CodeCampus was designed as a distributed software platform capable of supporting thousands of concurrent learners while maintaining reliability, security, and operational efficiency.',
    ],
    blocks: [
      {
        id: 'lms',
        eyebrow: 'Learning Management System',
        title: 'Core administration and progress tracking',
        paragraphs: [
          'A comprehensive ecosystem built to manage course lifecycles, student enrollments, and self-paced learning progression.',
          'The LMS manages student registrations, session states, and active course tracking, providing personalized dashboards where learners can monitor their course completions and instructors can govern content pipelines.',
        ],
      },
      {
        id: 'content',
        eyebrow: 'Content Delivery System',
        title: 'High-definition video streaming infrastructure',
        paragraphs: [
          'An optimized media delivery subsystem designed for chunked streaming, adaptive delivery, and secure content access control.',
          'The platform synchronizes a student\'s exact learning progress dynamically across devices, ensuring smooth playback resumption and eliminating media loading delays.',
        ],
      },
      {
        id: 'commerce',
        eyebrow: 'Digital Commerce System',
        title: 'Secure UPI payment flows and validation',
        paragraphs: [
          'A secure financial transaction engine integrated with India\'s Unified Payments Interface (UPI) network (GPay, PhonePe, Paytm).',
          'Payments are protected using asynchronous webhook signature verification and cryptographic validations to prevent replay attacks and ensure instant, reliable enrollment activation.',
        ],
      },
      {
        id: 'architecture',
        eyebrow: 'Distributed Architecture',
        title: 'Stateless services and horizontal scaling',
        paragraphs: [
          'The backend follows service-oriented architecture principles with separate business services (User, Course, Payment, Analytics) communicating statelessly.',
          'Designed to support 10,000+ concurrent learners, the database layer routes queries to PostgreSQL and MongoDB instances, allowing horizontal scaling and strict fault isolation.',
        ],
      },
    ],
    metrics: [
      { label: 'Platform Scale', value: '10,000+ Concurrent' },
      { label: 'Payments', value: 'Secure UPI Engine' },
      { label: 'Services', value: 'Stateless Microservices' },
      { label: 'Storage Layer', value: 'PostgreSQL / MongoDB' },
    ],
    constraints: [
      'Stateless API communication for scale',
      'Cryptographic webhook signature verification',
      'Role-Based Access Control (RBAC) via JWT',
      'Chunked video streaming delivery',
    ],
  },
  braintumor: {
    overview: [
      'Brain Tumor Detection is an end-to-end machine learning system engineered to automatically identify and classify brain tumors from MRI scans using classical machine learning techniques and computer vision methodologies.',
      'Unlike general image classification problems, medical imaging presents unique challenges. MRI scans are high-dimensional, noisy, and clinically sensitive. The system focuses on prediction accuracy, reliability, generalization, and interpretability using algorithms such as Support Vector Machines (SVM), Logistic Regression, and Decision Trees.',
    ],
    blocks: [
      {
        id: 'preprocessing',
        eyebrow: 'Data Partitioning & Normalization',
        title: 'Image Preprocessing Pipeline',
        paragraphs: [
          'Raw MRI data cannot be directly used for machine learning. The preprocessing layer performs standardization, noise reduction, and transforms images into feature arrays.',
          'MRI pixel values (0 → 255) are normalized using Min-Max scaling to compress features into a standardized numerical space, significantly improving learning efficiency and stabilizing machine learning algorithms.',
        ],
        image: pickMotionAsset('braintumor:doc:preprocessing'),
      },
      {
        id: 'classification',
        eyebrow: 'Machine Learning Models',
        title: 'SVM & Logistic Regression',
        paragraphs: [
          'The system evaluates multiple algorithms. Logistic Regression discovers a linear decision boundary separating tumor classes, while Support Vector Machines (SVM) construct an optimal separating hyperplane.',
          'SVM handles complex nonlinear relationships through kernel methods and demonstrates superior equilibrium between training and testing performance in high-dimensional spaces.',
        ],
        image: pickMotionAsset('braintumor:doc:classification'),
      },
      {
        id: 'evaluation',
        eyebrow: 'Model Evaluation Framework',
        title: 'Rigorous Clinical Assessment',
        paragraphs: [
          'Healthcare systems require rigorous evaluation. The pipeline assesses Accuracy, Precision, Recall, F1 Score, and detailed prediction breakdown via Confusion Matrices.',
          'Train-test separation and comparative evaluation mitigate overfitting risks and ensure reliable medical predictions for early tumor identification.',
        ],
        image: pickMotionAsset('braintumor:doc:evaluation'),
      }
    ],
    metrics: [
      { label: 'Domain', value: 'Medical Imaging AI' },
      { label: 'Algorithms', value: 'SVM, Logistic Regression' },
      { label: 'Preprocessing', value: 'Min-Max Normalization' },
      { label: 'Evaluation', value: 'Accuracy, Precision, Recall' },
    ],
    constraints: [
      'High-dimensional image spaces requiring feature engineering',
      'Complex nonlinear relationships handled via Kernel SVM',
      'Overfitting mitigation through rigorous train-test separation',
      'Clinical reliability demanding rigorous performance metrics',
    ],
  },
  audiocnn: {
    overview: [
      'Explainable Audio CNNs is a research-oriented Artificial Intelligence project situated at the intersection of computational neuroscience, deep learning, and auditory signal processing.',
      'The project investigates how biological neural activity can be interpreted and translated into meaningful computational representations for sound classification, focusing on temporal statistics derived from the inferior colliculus.',
    ],
    blocks: [
      {
        id: 'temporal',
        eyebrow: 'Neural Data Acquisition',
        title: 'Temporal Signal Extraction',
        paragraphs: [
          'The system classifies sounds using representations derived from neural responses generated by biological auditory systems. Neural response data is collected from auditory experiments, consisting of firing rates and temporal activity windows.',
          'Raw biological signals undergo noise filtering, normalization, and temporal alignment. The findings indicate that shorter integration windows (e.g., 62.5ms vs 1000ms) produce superior classification performance.',
        ],
        image: '/motion/original_940060265cd92edbf2ac79ca814232b8.png',
      },
      {
        id: 'cnn',
        eyebrow: 'Deep Learning Architecture',
        title: 'Convolutional Neural Networks',
        paragraphs: [
          'CNNs are particularly effective because they can learn local temporal patterns from short-duration neural activity, intermediate relationships, and high-level perceptual representations of sound.',
          'The hierarchical convolutional learning solves complex temporal dependencies in high-dimensional neural signals, translating biological representations of sound into computational understanding.',
        ],
        image: '/motion/original_a32b6aa403126ba9a40d81c7bf140ca0.png',
      },
      {
        id: 'explainability',
        eyebrow: 'Model Interpretability',
        title: 'Explainable AI Layer',
        paragraphs: [
          'Most neural networks function as black boxes. This project emphasizes explainability to understand which temporal regions influence predictions and which neural populations contribute most significantly.',
          'The system maps learned representations back to perceptual characteristics, visualizing how internal feature maps evolve throughout the learning process.',
        ],
        image: '/motion/original_f41036de1b2d0374d1408475523d2b47.gif',
      }
    ],
    metrics: [
      { label: 'Domain', value: 'Computational Neuroscience' },
      { label: 'Input', value: 'Temporal Neural Signals' },
      { label: 'Architecture', value: 'Explainable CNNs' },
      { label: 'Focus', value: 'Neural Decoding' },
    ],
    constraints: [
      'Complex temporal dependencies resolved via CNNs',
      'High-dimensional neural signals processed via windowing',
      'Biological variability requiring robust normalization',
      'Black-box models solved with Explainable AI methodologies',
    ],
  },
  projectclarity: {
    overview: [
      'Clarity is an educational intelligence platform architected to optimize competitive examination preparation through structured learning frameworks, adaptive assessment systems, and behavioral analytics.',
      'Operating as a Learning Intelligence System (LIS), it models and optimizes the complete preparation lifecycle combining study planning, assessment pipelines, performance tracking, and predictive learning interventions.',
    ],
    blocks: [
      {
        id: 'lms',
        eyebrow: 'Learning Management Engine',
        title: 'Knowledge Graph Orchestration',
        paragraphs: [
          'The Learning Management Engine serves as the foundational orchestration layer for curriculum organization, subject mapping, and study plan generation.',
          'The system treats curriculum content as a structured knowledge graph rather than isolated notes, allowing for dynamic learning progression tracking across multiple subjects.',
        ],
        image: '/motion/original_dcf78e234517563067385ad67506ac7e.png',
      },
      {
        id: 'assessment',
        eyebrow: 'Assessment Intelligence Engine',
        title: 'High-Frequency Diagnostic System',
        paragraphs: [
          'The assessment layer extracts learning signals from every test. It measures Accuracy, Topic Mastery, Response Efficiency, Error Distribution, and Retention Stability.',
          'Previous Year Question (PYQ) intelligence converts historical examination papers into predictive educational intelligence by analyzing high-frequency topics, emerging trends, and priority scoring.',
        ],
        image: '/motion/original_d44beec7a81e4066b231e58cc9e2fc40.png',
      },
      {
        id: 'analytics',
        eyebrow: 'Learning Analytics Platform',
        title: 'Behavioral Learning Models',
        paragraphs: [
          'The analytics layer transforms educational telemetry into actionable insights, tracking Learning Velocity, Retention Rate, and Improvement Rate over time.',
          'The Adaptive Recommendation System uses this telemetry to function as a predictive optimization layer, suggesting recommended subjects, revision schedules, and priority topics.',
        ],
        image: '/motion/original_ff6738eee9e616cdd880a367bf234c6b.png',
      }
    ],
    metrics: [
      { label: 'Domain', value: 'Educational Technology' },
      { label: 'Architecture', value: 'Event-Driven Telemetry' },
      { label: 'Core Engine', value: 'Adaptive Recommendation' },
      { label: 'Analytics', value: 'Longitudinal Performance' },
    ],
    constraints: [
      'Modeling learning progress quantitatively via knowledge-state tracking',
      'Detecting hidden weaknesses through topic-level performance decomposition',
      'Generating meaningful recommendations using data-driven engines',
      'Handling educational uncertainty via continuous feedback loops',
    ],
  },
  pinkauto: {
    overview: [
      'Pink Auto is a safety-first urban mobility platform conceptualized to provide secure, reliable, and technology-driven transportation services primarily for women.',
      'The platform bridges the gap between accessibility and safety by integrating real-time ride booking, geospatial intelligence, live tracking, and trust-centric mobility features into a cloud-native ecosystem.',
    ],
    blocks: [
      {
        id: 'orchestration',
        eyebrow: 'Ride Orchestration Engine',
        title: 'Transactional Core & State Machine',
        paragraphs: [
          'The Ride Engine acts as the transactional core of the platform, managing ride creation, destination management, and driver assignment through a strict finite state machine.',
          'The system guarantees transactional consistency across requested, assigned, arriving, started, and completed states.',
        ],
        image: '/motion/original_aaccc00f1c51d85a2a38791634934119.png',
      },
      {
        id: 'geospatial',
        eyebrow: 'Geospatial Intelligence System',
        title: 'Real-Time Location Processing',
        paragraphs: [
          'Every ride generates a continuous stream of location updates forming a time-dependent trajectory. Distance computation uses the Haversine Formula for driver proximity search, route optimization, and geofencing.',
          'The driver matching system evaluates a cost function to assign optimal drivers based on driver distance, estimated arrival time, and driver rating.',
        ],
        image: '/motion/original_90e39b59259868533d3a039a58929fd5.png',
      },
      {
        id: 'safety',
        eyebrow: 'Safety Intelligence Layer',
        title: 'Emergency Workflows & Geofencing',
        paragraphs: [
          'Pink Auto’s distinguishing characteristic is its safety architecture. The system features SOS triggers that instantly capture location and notify trusted contacts via a control dashboard.',
          'Route deviation detection compares the expected route against the actual route trajectory, instantly triggering a safety alert if the distance threshold is exceeded.',
        ],
        image: '/motion/original_911b4b8625d678ce2451d7c942328d3b.gif',
      }
    ],
    metrics: [
      { label: 'Architecture', value: 'Distributed Mobility Platform' },
      { label: 'Core Tech', value: 'Geospatial Search & Optimization' },
      { label: 'Communication', value: 'Event Driven + Real Time' },
      { label: 'Primary Focus', value: 'Safety and Intelligent Mobility' },
    ],
    constraints: [
      'O(log n) geospatial index driver search',
      'Continuous stream event-driven tracking architecture',
      'Stateful transactional ride lifecycle synchronization',
      'Real-time Haversine distance and route deviation monitoring',
    ],
  },
  worldmonitor: {
    overview: [
      'World Monitor is a real-time global intelligence and situational awareness platform engineered to aggregate, process, correlate, and visualize large-scale geopolitical, economic, and infrastructure data streams.',
      'The platform fuses millions of continuously changing signals from independent domains into a coherent representation of global reality using distributed data ingestion, event normalization, and multi-domain correlation engines.',
    ],
    blocks: [
      {
        id: 'fusion',
        eyebrow: 'Information Fusion',
        title: 'Planet-Scale Intelligence',
        paragraphs: [
          'The system aggregates 435+ curated news feeds, 30+ heterogeneous external data providers, and 92 global financial exchanges into a unified operational interface.',
          'This data is continuously normalized, removing inconsistencies across different schemas, languages, and update frequencies to construct a single source of global truth.',
        ],
        image: '/motion/original_5de39ca3cca05ebcfbee07e13de98cce.png',
      },
      {
        id: 'ai',
        eyebrow: 'AI Inference Engines',
        title: 'Automated Synthesis & Correlation',
        paragraphs: [
          'Multiple AI inference engines process unstructured data to generate real-time intelligence summaries, extracting entities, sentiments, and geopolitical impact scores.',
          'The system uncovers hidden interconnections between seemingly unrelated global events, bridging the gap between raw data collection and actionable intelligence.',
        ],
        image: '/motion/original_7f4fccbfcf35e335b56aaf9f204723eb.gif',
      }
    ],
    metrics: [
      { label: 'Data Sources', value: '435+ Curated Feeds' },
      { label: 'Integration', value: '92 Financial Exchanges' },
      { label: 'Processing', value: 'Real-Time Event Correlation' },
      { label: 'Domain', value: 'Geospatial Intelligence' },
    ],
    constraints: [
      'Fusing millions of heterogeneous signals into coherent models',
      'Translating and normalizing 21 multilingual information streams',
      'Real-time distributed data ingestion and AI inference',
      'Synthesizing actionable intelligence from fragmented sources',
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

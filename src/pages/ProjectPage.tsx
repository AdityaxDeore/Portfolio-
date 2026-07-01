import { useState, useEffect, Fragment } from 'react'
import { Link, Navigate, useLocation, useParams } from 'react-router-dom'
import { getProjectById, projects, type Project } from '@/data/projects'
import { getProjectDocumentation } from '@/data/projectDocs'
import './ProjectPage.css'

function motionPath(filename: string) {
  return `/motion/${encodeURIComponent(filename)}`
}

const MOTION_ASSET_POOL = [
  motionPath('original_f41036de1b2d0374d1408475523d2b47.gif'),
  motionPath('original_b519a22912d25d466fdc23c6922c756b.gif'),
  motionPath('original_a34421c365ae1536d96aeb68cf555c2e.gif'),
  motionPath('original_911b4b8625d678ce2451d7c942328d3b.gif'),
  motionPath('original_7f4fccbfcf35e335b56aaf9f204723eb.gif'),
  motionPath('original_6d612022a85211811b15aa287dfb396e.gif'),
  motionPath('wipe effect.gif'),
  motionPath('Forward — Asana.gif'),
  motionPath('Ea8ZiFK_gif (800×446).gif'),
  motionPath('Yiting Nan _ Caper Illustration Agency _ Illustration & Animation Hire.gif'),
  'https://i.pinimg.com/originals/80/7f/2b/807f2b7d0f9a87fc6ec014e45cd48d5c.gif',
  'https://i.pinimg.com/originals/a8/12/88/a8128843733c1b5f067bc436dfc5dc25.gif',
  'https://i.pinimg.com/originals/9a/15/b2/9a15b21eb8de50e57fec68f679c2bbef.gif',
  'https://i.pinimg.com/originals/a6/f5/a6/a6f5a63744bb3c97bc58058bd3684009.gif',
  'https://i.pinimg.com/originals/19/22/cc/1922cc428306e3b8d4ce6cecce74f541.gif',
  'https://i.pinimg.com/originals/f2/9d/c5/f29dc579dc619ff513651282766e6940.gif',
  'https://i.pinimg.com/originals/a7/be/7a/a7be7ac034929a9e47ebcc3d2018e98a.gif',
  'https://i.pinimg.com/originals/c2/ee/9b/c2ee9bf0ca052d5f3e455c9e1ac39ae5.gif',
  'https://i.pinimg.com/originals/3e/71/67/3e71673f8b7fab3ce9b4d712eca3f7a0.gif',
  'https://i.pinimg.com/originals/73/ab/8d/73ab8d95eb845f010361cdd7f144fa6f.gif',
  'https://i.pinimg.com/originals/a1/86/93/a1869324a6880d245e82de22ab1dce58.gif',
  'https://i.pinimg.com/originals/b6/0b/4d/b60b4d99d13e79a2f236fe019ba54bf7.gif',
  'https://i.pinimg.com/originals/05/07/99/0507997fa78a1559febd4172e533abdb.gif',
  'https://i.pinimg.com/originals/9c/2c/dc/9c2cdc4cb2ef4d8626b7bd959042290a.gif',
  'https://i.pinimg.com/originals/d7/0e/88/d70e8876f616d7a93b6e385888cd2c50.gif',
  'https://i.pinimg.com/originals/82/08/0c/82080c99563446755d3f4e11fbb8720f.gif',
  'https://i.pinimg.com/originals/ac/d3/9a/acd39a47dd474ce0de9d985797981469.gif',
] as const

function hashSeed(seed: string) {
  let hash = 0
  for (let index = 0; index < seed.length; index += 1) {
    hash = (hash * 31 + seed.charCodeAt(index)) >>> 0
  }
  return hash
}

function pickMotionAsset(seed: string) {
  return MOTION_ASSET_POOL[hashSeed(seed) % MOTION_ASSET_POOL.length]
}

const TECH_ARCH_IMAGE_BY_BLOCK: Record<string, Record<string, string>> = {
  codecampus: {
    lms: pickMotionAsset('codecampus:tech:lms'),
    content: pickMotionAsset('codecampus:tech:content'),
    commerce: pickMotionAsset('codecampus:tech:commerce'),
    architecture: pickMotionAsset('codecampus:tech:architecture'),
  },
  braintumor: {
    preprocessing: pickMotionAsset('braintumor:tech:preprocessing'),
    classification: pickMotionAsset('braintumor:tech:classification'),
    evaluation: pickMotionAsset('braintumor:tech:evaluation'),
  },
  projectclarity: {
    lms: pickMotionAsset('projectclarity:tech:lms'),
    assessment: pickMotionAsset('projectclarity:tech:assessment'),
    analytics: pickMotionAsset('projectclarity:tech:analytics'),
  },
  audiocnn: {
    temporal: pickMotionAsset('audiocnn:tech:temporal'),
    cnn: pickMotionAsset('audiocnn:tech:cnn'),
    explainability: pickMotionAsset('audiocnn:tech:explainability'),
  },
  pinkauto: {
    orchestration: pickMotionAsset('pinkauto:tech:orchestration'),
    geospatial: pickMotionAsset('pinkauto:tech:geospatial'),
    safety: pickMotionAsset('pinkauto:tech:safety'),
  },
  worldmonitor: {
    fusion: pickMotionAsset('worldmonitor:tech:fusion'),
    ai: pickMotionAsset('worldmonitor:tech:ai'),
  },
  obamify: {
    build: pickMotionAsset('obamify:tech:build'),
    results: pickMotionAsset('obamify:tech:results'),
  },
  dementiaml: {
    build: pickMotionAsset('dementiaml:tech:build'),
    results: pickMotionAsset('dementiaml:tech:results'),
  },
  palantir: {
    build: pickMotionAsset('palantir:tech:build'),
    results: pickMotionAsset('palantir:tech:results'),
  },
  shihiko: {
    build: pickMotionAsset('shihiko:tech:build'),
    results: pickMotionAsset('shihiko:tech:results'),
  },
}

function getTechnicalModuleImage(projectId: string, blockId: string) {
  return TECH_ARCH_IMAGE_BY_BLOCK[projectId]?.[blockId] || pickMotionAsset(`tech:${projectId}:${blockId}`)
}

type EngineeringStrategyBlock = {
  eyebrow: string
  title: string
  description: string
  image: string
}

const PROJECT_ENGINEERING_STRATEGY: Record<string, EngineeringStrategyBlock[]> = {
  codecampus: [
    {
      eyebrow: 'Platform reliability first',
      title: 'Design for scale and continuity',
      description: 'CodeCampus was built as a service-oriented system where learning, identity, payment, and analytics are decoupled, so high traffic in one surface does not degrade core classroom workflows.',
      image: pickMotionAsset('codecampus:strategy:0'),
    },
    {
      eyebrow: 'Integrity with usability',
      title: 'Secure assessments without student friction',
      description: 'The strategy balances strict proctoring signals, resilient session handling, and smooth IDE-like UX so academic integrity is enforced without harming the learning experience.',
      image: pickMotionAsset('codecampus:strategy:1'),
    },
    {
      eyebrow: 'Commerce as core infra',
      title: 'Transactional enrollment architecture',
      description: 'Payments, webhook validation, and enrollment state changes are modeled as atomic transactions to guarantee that every successful purchase deterministically unlocks access.',
      image: pickMotionAsset('codecampus:strategy:2'),
    },
  ],
  braintumor: [
    {
      eyebrow: 'Clinical robustness',
      title: 'Prioritize precision over convenience',
      description: 'The pipeline emphasizes preprocessing rigor, clean train/test boundaries, and conservative model selection to prevent optimistic results that fail in real-world MRI distributions.',
      image: pickMotionAsset('braintumor:strategy:0'),
    },
    {
      eyebrow: 'Data discipline',
      title: 'Feature engineering before model complexity',
      description: 'Noise reduction, normalization, and texture descriptors are treated as first-class engineering stages, reducing variance and improving classifier stability.',
      image: pickMotionAsset('braintumor:strategy:1'),
    },
    {
      eyebrow: 'Explainable outcomes',
      title: 'Evaluations that support trust',
      description: 'Accuracy is never presented alone; precision, recall, confusion matrices, and misclassification inspection are used together to make predictions defensible.',
      image: pickMotionAsset('braintumor:strategy:2'),
    },
  ],
  dementiaml: [
    {
      eyebrow: '3D-first modeling',
      title: 'Respect volumetric anatomy',
      description: 'The engineering approach treats MRI volumes as spatial structures rather than flat images, using 3D operations to preserve anatomical relationships.',
      image: pickMotionAsset('dementiaml:strategy:0'),
    },
    {
      eyebrow: 'Research to deployment path',
      title: 'Reproducible preprocessing chain',
      description: 'Skull stripping, alignment, and dataset partitioning are standardized so experiments are repeatable and future clinical validation is practical.',
      image: pickMotionAsset('dementiaml:strategy:1'),
    },
    {
      eyebrow: 'Human-in-the-loop AI',
      title: 'Interpretability as a system requirement',
      description: 'Explainability outputs such as activation maps are designed as product features, not post-hoc extras, so clinicians can inspect model reasoning.',
      image: pickMotionAsset('dementiaml:strategy:2'),
    },
  ],
  projectclarity: [
    {
      eyebrow: 'Student-centered architecture',
      title: 'Emotional safety plus measurable progress',
      description: 'Clarity combines journaling, peer support, and structured preparation modules so mental wellness and exam readiness are engineered as one product surface.',
      image: pickMotionAsset('projectclarity:strategy:0'),
    },
    {
      eyebrow: 'Real-time engagement',
      title: 'Live systems for active support',
      description: 'WebSocket flows and adaptive interactions are used to reduce response latency and keep students connected during high-stress preparation cycles.',
      image: pickMotionAsset('projectclarity:strategy:1'),
    },
    {
      eyebrow: 'Analytics with intent',
      title: 'Behavior-informed intervention loops',
      description: 'Telemetry is translated into recommendation logic, enabling schedule nudges, risk signals, and personalized support trajectories.',
      image: pickMotionAsset('projectclarity:strategy:2'),
    },
  ],
  palantir: [
    {
      eyebrow: 'High-density rendering',
      title: 'Performance-aware geospatial UI',
      description: 'The map stack is optimized for dense telemetry streams, balancing visual fidelity, smooth motion, and frame stability under continuous updates.',
      image: pickMotionAsset('palantir:strategy:0'),
    },
    {
      eyebrow: 'Resilient data ingress',
      title: 'Fallback-driven telemetry acquisition',
      description: 'Multi-source ingestion is designed with provider fallback and caching tiers to maintain continuity during upstream fluctuations.',
      image: pickMotionAsset('palantir:strategy:1'),
    },
    {
      eyebrow: 'Operator usability',
      title: 'Situational awareness over dashboard noise',
      description: 'Interaction design prioritizes rapid target acquisition, altitude context, and route readability so operators can make faster decisions.',
      image: pickMotionAsset('palantir:strategy:2'),
    },
  ],
  worldmonitor: [
    {
      eyebrow: 'Signal fusion',
      title: 'Cross-domain event correlation',
      description: 'World Monitor is engineered to ingest heterogeneous streams and normalize them into a unified graph of geopolitical and financial signals.',
      image: pickMotionAsset('worldmonitor:strategy:0'),
    },
    {
      eyebrow: 'Scalable intelligence delivery',
      title: 'Variant-driven product architecture',
      description: 'A shared core powers multiple domain variants, enabling focused experiences without duplicating infrastructure logic.',
      image: pickMotionAsset('worldmonitor:strategy:1'),
    },
    {
      eyebrow: 'Actionable summaries',
      title: 'AI as synthesis engine, not decoration',
      description: 'Inference pipelines are used to collapse noisy raw feeds into interpretable briefs and risk-oriented decision signals.',
      image: pickMotionAsset('worldmonitor:strategy:2'),
    },
  ],
  pinkauto: [
    {
      eyebrow: 'Safety by design',
      title: 'Critical workflows before growth loops',
      description: 'Ride lifecycle logic, SOS escalation, and route deviation checks are prioritized as core product contracts from day one.',
      image: pickMotionAsset('pinkauto:strategy:0'),
    },
    {
      eyebrow: 'Realtime geo-compute',
      title: 'Dispatch and tracking coherence',
      description: 'Driver matching, ETA estimates, and geospatial event processing are modeled as coordinated systems rather than isolated features.',
      image: pickMotionAsset('pinkauto:strategy:1'),
    },
    {
      eyebrow: 'Trust at scale',
      title: 'Deterministic state transitions',
      description: 'Finite-state orchestration ensures that each ride stage is explicit, auditable, and recoverable during network or client disruptions.',
      image: pickMotionAsset('pinkauto:strategy:2'),
    },
  ],
  audiocnn: [
    {
      eyebrow: 'Biology-informed ML',
      title: 'Temporal encoding as the foundation',
      description: 'The project strategy starts from neural response structure, transforming biological timing patterns into learnable computational features.',
      image: pickMotionAsset('audiocnn:strategy:0'),
    },
    {
      eyebrow: 'Depth with interpretability',
      title: 'Explainability integrated into training analysis',
      description: 'CNN layers are evaluated alongside activation behavior so model performance and representational meaning evolve together.',
      image: pickMotionAsset('audiocnn:strategy:1'),
    },
    {
      eyebrow: 'Research rigor',
      title: 'Comparative windowing and model studies',
      description: 'Multiple temporal windows and architecture choices are benchmarked to isolate what genuinely improves auditory classification.',
      image: pickMotionAsset('audiocnn:strategy:2'),
    },
  ],
  obamify: [
    {
      eyebrow: 'Fast visual transformation',
      title: 'Pixel pipeline optimization',
      description: 'Posterization and tone mapping routines are engineered for responsiveness, enabling interactive image transformation without heavy latency.',
      image: '/artistic/claude_data.png',
    },
    {
      eyebrow: 'Desktop-first craftsmanship',
      title: 'Native UX around creative workflows',
      description: 'Import, preview, and export steps are organized for rapid experimentation, minimizing context switches for creators.',
      image: '/projects/obamify img.png',
    },
    {
      eyebrow: 'Output fidelity',
      title: 'Consistent export semantics',
      description: 'Color mapping and serialization are handled predictably so generated visuals preserve style intent across formats.',
      image: '/motion/original_b519a22912d25d466fdc23c6922c756b.gif',
    },
  ],
  shihiko: [
    {
      eyebrow: 'Commerce UX fluency',
      title: 'Interaction-first storefront engineering',
      description: 'Navigation, product discovery, and cart interactions are designed to keep flows intuitive on both desktop and mobile breakpoints.',
      image: pickMotionAsset('shihiko:strategy:0'),
    },
    {
      eyebrow: 'Frontend performance',
      title: 'Smoothness under visual richness',
      description: 'Animation and media decisions are tuned for quick paint and responsive transitions without sacrificing aesthetic quality.',
      image: pickMotionAsset('shihiko:strategy:1'),
    },
    {
      eyebrow: 'Conversion-oriented structure',
      title: 'Reduce friction in purchase journeys',
      description: 'Information hierarchy and action surfaces are arranged to shorten decision paths from browse to checkout.',
      image: pickMotionAsset('shihiko:strategy:2'),
    },
  ],
}

function getProjectEngineeringStrategy(project: Project): EngineeringStrategyBlock[] {
  const mapped = PROJECT_ENGINEERING_STRATEGY[project.id]
  if (mapped) return mapped

  return project.caseStudy.highlights.slice(0, 3).map((highlight, index) => ({
    eyebrow: `Engineering Focus ${index + 1}`,
    title: project.tags[index] ?? 'System Design',
    description: highlight,
    image: pickMotionAsset(`${project.id}:strategy:${index}`),
  }))
}

// ============================================================================
// BROWSER IMAGE SHOWCASE (Renders the main project screenshot inside a premium browser mock)
// ============================================================================

function BrowserImageShowcase({ image, title }: { image: string; title: string }) {
  return (
    <div className="browser-image-showcase">
      <div className="browser-header">
        <div className="browser-dots">
          <span className="dot dot-red"></span>
          <span className="dot dot-yellow"></span>
          <span className="dot dot-green"></span>
        </div>
        <div className="browser-url">https://codecampus.io/showcase/{title.toLowerCase()}</div>
        <div className="browser-theme-indicator">PORTFOLIO EDITION</div>
      </div>
      <div className="browser-viewport">
        <img src={image} alt={`${title} UI Screenshot`} className="browser-img-screenshot" />
        <div className="browser-glow-overlay"></div>
      </div>
    </div>
  )
}

// ============================================================================
// INTERACTIVE SCREENSHOT GALLERY (Interactive gallery for project screenshots)
// ============================================================================

function ProjectGallery({ projectId, defaultImage }: { projectId: string; defaultImage: string }) {
  const codeCampusImages = [
    { url: '/projects/codecampusimages/home.png', label: 'Student Dashboard Console', desc: 'Centralized dashboard showing daily learning progress and active course modules.' },
    { url: '/projects/codecampusimages/vscode.png', label: 'Code Workspace', desc: 'IDE-style coding surface with assignment context, editor tabs, and execution controls.' },
    { url: '/projects/codecampusimages/twosum.png', label: 'Problem Solving Screen', desc: 'Structured coding challenge workflow with guided problem context and attempt flow.' },
    { url: '/projects/codecampusimages/test.png', label: 'Proctored Test Interface', desc: 'Exam mode with integrity controls and timed assessment execution.' },
    { url: '/projects/codecampusimages/violations.png', label: 'Integrity Monitoring', desc: 'Real-time proctoring and policy violation insights for fair assessments.' },
    { url: '/projects/codecampusimages/report.png', label: 'Performance Reports', desc: 'Outcome analytics for learners and instructors across assessments and modules.' },
    { url: '/projects/codecampusimages/timeline.png', label: 'Progress Timeline', desc: 'Milestone timeline showing continuity of practice, submissions, and growth.' },
    { url: '/projects/codecampusimages/achivement.png', label: 'Achievement System', desc: 'Gamified recognition layer for consistency, score improvements, and completion badges.' },
  ]

  const dementiaImages = [
    { url: defaultImage, label: 'MRI Scan Analysis View', desc: 'Brain scan volumetric processing interface highlighting neurodegenerative predictive overlays.' },
    { url: '/motion/original_df22f0d31ef60e79c72679303c23f932.png', label: 'Prediction Score Metrics', desc: 'Confidence intervals, ROC analysis curves, and volumetric metrics.' }
  ]

  const clarityImages = [
    { url: defaultImage, label: 'Wellness Journal Console', desc: 'Chatbot and mood tracking interface processing dynamic sentiment analysis values.' },
    { url: '/motion/original_a32b6aa403126ba9a40d81c7bf140ca0.png', label: 'WebSocket Chat Hub', desc: 'Real-time WebSocket server connection simulator for user support.' }
  ]

  const images = projectId === 'codecampus' 
    ? codeCampusImages 
    : projectId === 'dementiaml' 
    ? dementiaImages 
    : projectId === 'projectclarity'
    ? clarityImages
    : [{ url: defaultImage, label: 'Project Screenshot', desc: 'Primary application interface showcasing functional UI layouts.' }]

  const [activeIdx, setActiveIdx] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prevIdx) => (prevIdx + 1) % images.length)
    }, 1500)
    return () => clearInterval(timer)
  }, [images.length])

  return (
    <div className="project-screenshot-gallery">
      <div className="gallery-main-view">
        <img src={images[activeIdx].url} alt={images[activeIdx].label} className="gallery-main-img" />
        <div className="gallery-main-caption">
          <strong>{images[activeIdx].label}</strong>
          <p>{images[activeIdx].desc}</p>
        </div>
      </div>
      <div className="gallery-thumbnails-strip">
        {images.map((img, i) => (
          <button
            key={i}
            className={`gallery-thumb-btn ${i === activeIdx ? 'active' : ''}`}
            onClick={() => setActiveIdx(i)}
            aria-label={`View screenshot ${i + 1}`}
          >
            <img src={img.url} alt={img.label} className="gallery-thumb-img" />
            <div className="gallery-thumb-glow"></div>
          </button>
        ))}
      </div>
    </div>
  )
}

// ============================================================================
// WIDGET: EDITORIAL FEATURE BLOCK (Image + Text alternating layout)
// ============================================================================

function EditorialFeatureBlock({ eyebrow, title, description, image, reversed, index, containImage }: { eyebrow?: string, title: string, description: React.ReactNode, image: string, reversed?: boolean, index?: string, containImage?: boolean }) {
  return (
    <div className={`editorial-feature-block ${reversed ? 'reversed' : ''} ${containImage ? 'contain-image' : ''}`}>
      <div className="feature-text-content">
        {index && <span className="feature-index">{index}</span>}
        {eyebrow && <span className="feature-eyebrow">{eyebrow}</span>}
        <h4 className="feature-title">{title}</h4>
        <div className="feature-desc">{description}</div>
      </div>
      <div className="feature-visual-content">
        <img src={image} alt={title} className="feature-image" />
        <div className="feature-glow-overlay"></div>
      </div>
    </div>
  )
}

// ============================================================================
// WIDGET: INTERACTIVE MRI SCAN SLICER (For Dementia ML / Brain Tumor projects)
// ============================================================================

function MriScannerSlicer() {
  const [sliceVal, setSliceVal] = useState(30)
  
  // Custom metadata updates based on slider slices
  const getSliceMeta = (val: number) => {
    if (val < 20) return { region: 'Cerebellum / Brainstem', state: 'Normal tissue structure observed.', color: '#27c93f' }
    if (val < 50) return { region: 'Temporal Lobe / Hippocampus', state: 'Slight volumetric decrease detected in local voxels.', color: '#D47655' }
    if (val < 80) return { region: 'Parietal Lobe Cortex', state: 'Normal functional density profile.', color: '#27c93f' }
    return { region: 'Frontal Lobe Cortex', state: 'Clear boundaries, no noticeable anomaly indicators.', color: '#27c93f' }
  }

  const meta = getSliceMeta(sliceVal)

  return (
    <div className="mri-scanner-widget">
      <div className="scanner-header">
        <div className="pulse-indicator"></div>
        <span>Interactive Volumetric MRI Slice Viewer</span>
      </div>
      
      <div className="scanner-display-area">
        {/* Dynamic scan slice projection */}
        <div className="scanner-view-box">
          <div className="scanner-lens" style={{ transform: `scale(${1 + (sliceVal - 30) / 100}) rotate(${sliceVal}deg)` }}>
            <img src="/motion/2.jfif" alt="MRI volumetric slice preview" className="scanner-slice-image" />
          </div>
          <div className="scanner-crosshair horizontal"></div>
          <div className="scanner-crosshair vertical"></div>
          <span className="scanner-coords">Z-AXIS INDEX: {sliceVal * 4}mm</span>
        </div>

        {/* Live telemetry analysis display */}
        <div className="scanner-telemetry">
          <div className="tel-cell">
            <span className="tel-lbl">Target Region</span>
            <strong className="tel-val">{meta.region}</strong>
          </div>
          <div className="tel-cell">
            <span className="tel-lbl">Diagnostic Status</span>
            <strong className="tel-val" style={{ color: meta.color }}>{meta.state}</strong>
          </div>
        </div>
      </div>

      <div className="scanner-controls-panel">
        <label htmlFor="mri-slice-slider">Adjust Voxel Scan Plane Layer:</label>
        <input 
          type="range" 
          id="mri-slice-slider"
          min="1" 
          max="100" 
          value={sliceVal} 
          onChange={(e) => setSliceVal(Number(e.target.value))} 
        />
      </div>
    </div>
  )
}

// ============================================================================
// WIDGET: LIVE MOOD JOURNAL SENTIMENT SIMULATOR (For Project Clarity)
// ============================================================================

function SentimentSimulator() {
  const [inputText, setInputText] = useState("I am feeling great today because we mapped out the server routes successfully.")
  
  const getSentimentScore = (text: string) => {
    const lowercase = text.toLowerCase()
    let score = 50
    if (lowercase.includes('great') || lowercase.includes('awesome') || lowercase.includes('happy') || lowercase.includes('success')) score += 25
    if (lowercase.includes('overwhelmed') || lowercase.includes('sad') || lowercase.includes('tired') || lowercase.includes('failed')) score -= 25
    return Math.min(Math.max(score, 10), 95)
  }

  const score = getSentimentScore(inputText)
  const getStatus = (val: number) => {
    if (val > 60) return { label: 'POSITIVE MOOD', color: '#27c93f' }
    if (val < 40) return { label: 'ANXIOUS / TIRED STATE', color: '#D47655' }
    return { label: 'NEUTRAL STATE', color: '#87867f' }
  }

  const status = getStatus(score)

  return (
    <div className="sentiment-sim-widget">
      <div className="sim-header">
        <span>AI Sentiment Journal Input Analyzer</span>
      </div>
      <div className="sim-workspace">
        <textarea 
          className="sim-textarea"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type mock student journal notes here..."
        />
        <div className="sim-analyzer-panel">
          <div className="score-meter-wrapper">
            <span className="meter-label">POLARITY SCORE: {score}%</span>
            <div className="meter-track">
              <div className="meter-fill" style={{ width: `${score}%`, backgroundColor: status.color }}></div>
            </div>
          </div>
          <div className="result-label" style={{ color: status.color }}>
            {status.label}
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// SVG ICONS
// ============================================================================

function UserIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="svg-icon">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}

function BookIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="svg-icon">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  )
}

type ProjectPageNavigationState = {
  from?: {
    pathname: string
    search?: string
    hash?: string
  }
  fromScrollY?: number
}

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export function ProjectPage() {
  const { id } = useParams<{ id: string }>()
  const location = useLocation()
  const navigationState = location.state as ProjectPageNavigationState | null
  const project = id ? getProjectById(id) : undefined

  const currentIndex = project ? projects.findIndex((p) => p.id === project.id) : -1
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null
  const nextProject =
    currentIndex >= 0 && currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null

  if (!project) {
    return <Navigate to="/#projects" replace />
  }

  const documentation = getProjectDocumentation(project)
  const projectEngineeringStrategy = getProjectEngineeringStrategy(project)
  const backTarget = navigationState?.from
    ? `${navigationState.from.pathname}${navigationState.from.search ?? ''}${navigationState.from.hash ?? ''}`
    : '/#projects'
  const backState =
    typeof navigationState?.fromScrollY === 'number'
      ? { restoreScrollY: navigationState.fromScrollY }
      : undefined

  return (
    <main id="main-content" className="canvas project-page-refactored">
      {/* Dynamic Ambient Background Grid Pattern */}
      <div className="ambient-grid-overlay" aria-hidden="true"></div>

      <div className="container project-container">
        
        {/* Top Back Navigation */}
        <header className="project-top-nav">
          <Link to={backTarget} state={backState} className="project-back-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M15 6l-6 6 6 6"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back to Case Studies
          </Link>
          <span className="project-index-badge">
            {String(currentIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
          </span>
        </header>

        {/* HERO AREA: Left Editorial, Right Browser Screenshot Showcase */}
        <section className="project-hero-grid">
          <div className="hero-editorial">
            <p className="hero-category-eyebrow">{project.caseStudy.year} · System Architecture</p>
            <h1 className="hero-project-title">{project.title}</h1>
            <p className="hero-project-subtitle">
              {project.id === 'codecampus' 
                ? 'Engineering the Infrastructure Behind Scalable Digital Learning' 
                : project.id === 'dementiaml'
                ? 'Processing Volumetric 3D MRI Scans to Predict Neurodegenerative Anomaly Patterns'
                : project.id === 'projectclarity'
                ? 'Mental Wellness Platform orchestrating Curriculum & AI Sentiment Journals'
                : 'Advanced Engineering Project & Systems Implementation'}
            </p>
            <div className="hero-tags-row">
              {project.tags.map((tag) => (
                <span key={tag} className="hero-tech-tag">{tag}</span>
              ))}
            </div>
            <div className="hero-links-row">
              {project.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-action-btn"
                >
                  Explore Codebase
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
          
          <div className="hero-visual-frame">
            <BrowserImageShowcase image={project.image} title={project.title} />
          </div>
        </section>

        {/* METADATA & METRICS STRIP: Unified horizontal row arrangement */}
        <section className="project-metadata-strip">
          <div className="meta-strip-grid-unified">
            <div className="meta-cell">
              <span className="meta-lbl">Role</span>
              <strong className="meta-val">{project.caseStudy.role}</strong>
            </div>
            <div className="meta-cell">
              <span className="meta-lbl">Category</span>
              <strong className="meta-val">
                {project.id === 'codecampus'
                  ? 'Full-Stack EdTech SaaS'
                  : project.id === 'braintumor' || project.id === 'dementiaml'
                  ? 'AI/ML Medical Imaging'
                  : 'Full-Stack Software'}
              </strong>
            </div>
            <div className="meta-cell">
              <span className="meta-lbl">Developer</span>
              <strong className="meta-val">Aditya C. Deore</strong>
            </div>
            <div className="meta-cell">
              <span className="meta-lbl">Status</span>
              <span className="status-badge-indicator">
                {project.id === 'codecampus' ? 'In Development' : 'Completed'}
              </span>
            </div>
            {documentation.metrics.map((metric) => (
              <div className="meta-cell highlight-cell" key={metric.label}>
                <span className="meta-lbl">{metric.label}</span>
                <strong className="meta-val">{metric.value}</strong>
              </div>
            ))}
          </div>
        </section>

        {/* IMAGE BANNER: Full-Width across container */}
        <div className="project-detail-banner-wrapper">
          <img 
            src={project.bannerImage || project.image} 
            alt="Technical Infrastructure Overview" 
            className="project-detail-banner" 
          />
          <div className="banner-caption">Platform Technical Infrastructure &amp; Workspace Architecture</div>
        </div>

        {/* DETAILS SECTION: Full width, clean editorial layout */}
        <section className="project-details-editorial-only">
          <div className="details-editorial">
            
            {/* ========================================================================
               BESPOKE PROJECT LAYOUT: CODECAMPUS (EdTech SaaS)
               ======================================================================== */}
            {project.id === 'codecampus' && (
              <div className="editorial-content-wrapper animate-fade-in">
                <h3>Executive Summary</h3>
                <p>
                  CodeCampus is a <span className="highlight-orange">cloud-ready Educational Technology (EdTech) platform</span> engineered to provide a <span className="highlight-orange">scalable, secure, and intelligent</span> digital learning ecosystem. The platform integrates course management, high-definition educational content delivery, secure digital payments, analytics-driven learning insights, and role-based administration into a unified architecture.
                </p>
                <p>
                  The project was conceived as an exploration of how modern software engineering principles can be applied to solve real-world challenges in digital education. Rather than approaching learning management as a simple content-delivery application, CodeCampus was designed as a <span className="highlight-orange">distributed software platform</span> capable of supporting <span className="highlight-orange">thousands of concurrent learners</span> while maintaining reliability, security, and operational efficiency.
                </p>

                <div className="vision-mission-panel">
                  <div className="vm-block complete-orange">
                    <h5>Vision</h5>
                    <blockquote>"To democratize quality education by building scalable digital infrastructure that enables seamless learning experiences regardless of geographical, technological, or economic boundaries."</blockquote>
                  </div>
                  <div className="vm-block complete-orange">
                    <h5>Mission</h5>
                    <blockquote>"To engineer a modern learning ecosystem where education, technology, and digital commerce converge into a secure, scalable, and highly accessible platform."</blockquote>
                  </div>
                </div>

                <h3>Problem Statement</h3>
                <p>
                  The rapid growth of online education has exposed significant limitations in conventional learning platforms. Most systems struggle with handling <span className="highlight-orange">large numbers of simultaneous learners</span>, delivering high-quality educational content efficiently, managing secure transactions, and providing granular analytics. This fragmentation introduces poor user experiences and high operational overhead. CodeCampus addresses this by grouping commerce, identity, analytics, and content distribution under a cohesive, service-oriented structure.
                </p>

                <h3>Platform Interface Gallery</h3>
                <ProjectGallery projectId={project.id} defaultImage={project.image} />

                <h3>System Infrastructure Demonstration</h3>
                <div className="system-video-container">
                  <div className="video-browser-header">
                    <div className="browser-dots">
                      <span className="dot dot-red"></span>
                      <span className="dot dot-yellow"></span>
                      <span className="dot dot-green"></span>
                    </div>
                    <span className="video-title">infrastructure_simulation.gif</span>
                  </div>
                  <img
                    className="system-video-element"
                    src={pickMotionAsset('codecampus:video')}
                    alt="Infrastructure simulation GIF preview"
                  />
                </div>

                <h3>System Architecture Mapping (ASCII Schema)</h3>
                <div className="ascii-diagram-container">
                  <pre className="ascii-art">
{`                  [ Internet Traffic ]
                           │
                           ▼
                  [ Load Balancer ]
                           │
         ┌─────────────────┼─────────────────┐
         │                 │                 │
         ▼                 ▼                 ▼
  [ React Client ]  [ Auth Service ]  [ API Gateway ]
         │                 │                 │
         └─────────────────┼─────────────────┘
                           │
                 [ Business Services ]
                           │
    ┌──────────────┬───────┴───────┬──────────────┐
    │              │               │              │
    ▼              ▼               ▼              ▼
[ User ]       [ Course ]      [ Payment ]   [ Analytics ]
Service        Service         Service       Service
    │              │               │              │
    └──────────────┼───────────────┘              │
                   │                              ▼
           [ Database Layer ]             [ Media Storage ]
                   │                              │
                   ▼                              ▼
            [ PostgreSQL ]                 [ Object Store ]`}
                  </pre>
                </div>

                <h3>Development Milestone Timeline</h3>
                <div className="development-timeline">
                  <div className="timeline-item">
                    <div className="timeline-node">1</div>
                    <div className="timeline-content">
                      <h5>Phase 1: Conceptualization &amp; Identity</h5>
                      <p>Established the core identity management layer. Configured JSON Web Tokens (JWT) and designed role-based access controls for Students, Instructors, and Administrators.</p>
                    </div>
                  </div>
                  <div className="timeline-item">
                    <div className="timeline-node">2</div>
                    <div className="timeline-content">
                      <h5>Phase 2: Video Streaming &amp; LMS Integration</h5>
                      <p>Built the course lifecycle APIs. Connected content delivery systems to handle large media streaming with dynamic checkpoint memory for user resumes.</p>
                    </div>
                  </div>
                  <div className="timeline-item">
                    <div className="timeline-node">3</div>
                    <div className="timeline-content">
                      <h5>Phase 3: Secure Digital Commerce</h5>
                      <p>Designed the UPI transactional engine. Built secure order flows and integrated cryptographic signature verifications for verified payment webhooks.</p>
                    </div>
                  </div>
                  <div className="timeline-item">
                    <div className="timeline-node">4</div>
                    <div className="timeline-content">
                      <h5>Phase 4: Load Testing &amp; Infrastructure Optimization</h5>
                      <p>Conducted load concurrency modeling. Shifted Express.js routes to a stateless model to scale horizontally past 10,000+ mock active students.</p>
                    </div>
                  </div>
                </div>

                <h3>User Personas</h3>
                <div className="personas-layout">
                  <div className="persona-card persona-card--light">
                    <div className="card-grid-bg"></div>
                    <div className="persona-card-header">
                      <UserIcon />
                      <h5>Student Persona</h5>
                    </div>
                    <div className="persona-card-body-wrapper">
                      <div className="spec-item">
                        <strong>Primary Goals:</strong>
                        <p>Stream high-definition lecture assets seamlessly on variable network bands, execute checkout intent scripts securely for new course unlock operations, and track path syllabus markers continuously.</p>
                      </div>
                      <div className="spec-item">
                        <strong>Critical Pain Points:</strong>
                        <p>Friction during checkout sequences, progress metrics falling out of synchronization upon media buffers, and distracting UI dashboard navigation routes.</p>
                      </div>
                    </div>
                  </div>

                  <div className="persona-card persona-card--accent">
                    <div className="card-grid-bg"></div>
                    <div className="persona-card-header">
                      <BookIcon />
                      <h5>Instructor Persona</h5>
                    </div>
                    <div className="persona-card-body-wrapper">
                      <div className="spec-item">
                        <strong>Primary Goals:</strong>
                        <p>Upload educational assets through simplified publishing panels, generate reliable recurring subscription statistics, and evaluate aggregate learner engagement metrics across courses.</p>
                      </div>
                      <div className="spec-item">
                        <strong>Critical Pain Points:</strong>
                        <p>Complex content dashboard routing paths, delayed payment transaction webhook logs, and raw, unsummarized student completion analytics.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {project.id === 'dementiaml' && (
              <div className="editorial-content-wrapper animate-fade-in">
                <h3>Executive Summary</h3>
                <p>
                  Dementia Diagnostic AI is a <span className="highlight-orange">research-driven healthcare intelligence system</span> engineered to investigate how modern machine learning and deep learning techniques can assist in the early identification of neurodegenerative disorders through the analysis of <span className="highlight-orange">volumetric Magnetic Resonance Imaging (MRI) data</span>.
                </p>
                <p>
                  The project explores the intersection of Artificial Intelligence, neuroscience, and medical imaging by constructing computational pipelines capable of learning structural and anatomical patterns hidden within brain MRI scans. The system aims to identify <span className="highlight-orange">subtle indicators of neurological degeneration</span> that may precede clinical symptoms by several years.
                </p>
                <p>
                  Unlike conventional image classification systems that operate on independent images, Dementia Diagnostic AI addresses an inherently more complex problem: learning meaningful representations from <span className="highlight-orange">three-dimensional biological structures</span> where spatial relationships, volumetric integrity, and anatomical context directly influence diagnostic outcomes.
                </p>

                <div className="vision-mission-panel">
                  <div className="vm-block complete-orange">
                    <h5>Vision</h5>
                    <blockquote>"To leverage artificial intelligence and medical imaging technologies to facilitate earlier, more accessible, and more objective neurological diagnostics."</blockquote>
                  </div>
                  <div className="vm-block complete-orange">
                    <h5>Mission</h5>
                    <blockquote>"To engineer intelligent systems capable of analyzing complex brain imaging data and extracting clinically meaningful patterns that can support healthcare professionals."</blockquote>
                  </div>
                </div>

                <h3>Why This Project Matters</h3>
                <p>
                  Dementia affects millions of individuals worldwide and remains one of the most challenging neurological conditions to diagnose early. The progression of neurodegenerative diseases often begins <span className="highlight-orange">years before significant cognitive symptoms</span> become clinically evident. By the time conventional diagnosis occurs, substantial and frequently irreversible neurological damage may already have taken place.
                </p>
                <p>
                  Early detection has the potential to enable earlier medical intervention, improve treatment planning, <span className="highlight-orange">slow disease progression</span>, and enhance patient quality of life by assisting clinicians with objective analysis and supporting large-scale screening initiatives.
                </p>

                <h3>The Engineering Problem</h3>
                <p>
                  At its core, Dementia Diagnostic AI attempts to solve a highly complex pattern recognition problem. The system must process massive volumetric data, preserve complex anatomical relationships, learn high-level representations, and minimize diagnostic risk since <span className="highlight-orange">false negatives carry severe clinical implications</span>.
                </p>

                <div className="tech-details-grid-unified">
                  <div className="tech-card tech-card--accent">
                    <div className="card-grid-bg"></div>
                    <span className="tech-card-index">PROBLEM 01</span>
                    <h5>Massive Volumetric Data</h5>
                    <div className="tech-card-inner-box">
                      <p>MRI scans contain millions of intensity values distributed across multiple dimensions, requiring efficient preprocessing and optimized tensor pipelines.</p>
                    </div>
                  </div>

                  <div className="tech-card tech-card--light">
                    <div className="card-grid-bg"></div>
                    <span className="tech-card-index">PROBLEM 02</span>
                    <h5>Anatomical Relationships</h5>
                    <div className="tech-card-inner-box">
                      <p>Preserving structural boundaries and local shape features across three dimensions is critical since spatial context directly influences diagnostic outcomes.</p>
                    </div>
                  </div>

                  <div className="tech-card tech-card--accent">
                    <div className="card-grid-bg"></div>
                    <span className="tech-card-index">PROBLEM 03</span>
                    <h5>Explainable Decisions</h5>
                    <div className="tech-card-inner-box">
                      <p>Healthcare systems cannot function as black boxes. Providing radiologists with interpretable Grad-CAM saliency maps of predictions is essential.</p>
                    </div>
                  </div>
                </div>

                <h3>System Overview Flow</h3>
                <div className="ascii-diagram-container">
                  <pre className="ascii-art">
{`  Volumetric MRI Dataset (.nii)
               │
               ▼
  Medical Image Preprocessing   <-- Bilateral Filtering, contrast enhancements
               │
               ▼
    Volume Standardization     <-- Skull stripping (BET), resampling, slice alignment
               │
               ▼
     Deep Feature Learning     <-- 3D Convolutional Network layers
               │
               ▼
     Classification Engine     <-- Softmax risk prediction layers
               │
               ▼
     Explainability Module     <-- Grad-CAM & Saliency Maps visualizer
               │
               ▼
   Clinical Decision Support`}
                  </pre>
                </div>

                <h3>Data Processing Pipeline</h3>
                <div className="development-timeline">
                  <div className="timeline-item">
                    <div className="timeline-node">1</div>
                    <div className="timeline-content">
                      <h5>Stage 1 — Data Ingestion</h5>
                      <p>Ingests volumetric MRI studies mapping structural features. Categorizes studies into Healthy Control, Mild Cognitive Impairment, and Dementia classes.</p>
                    </div>
                  </div>
                  <div className="timeline-item">
                    <div className="timeline-node">2</div>
                    <div className="timeline-content">
                      <h5>Stage 2 — Bilateral Noise Filtering</h5>
                      <p>Applies bilateral filtering algorithms to denoise the scan volumes without blurring structural boundaries between gray and white matter tissue.</p>
                    </div>
                  </div>
                  <div className="timeline-item">
                    <div className="timeline-node">3</div>
                    <div className="timeline-content">
                      <h5>Stage 3 — Skull Stripping &amp; MNI152 Alignment</h5>
                      <p>Extracts brain soft tissue using Brain Extraction Tool (BET) algorithms, and normalizes orientations by registering volumes to the MNI152 coordinate template.</p>
                    </div>
                  </div>
                  <div className="timeline-item">
                    <div className="timeline-node">4</div>
                    <div className="timeline-content">
                      <h5>Stage 4 — Dataset Construction</h5>
                      <p>Divides dataset volumes into independent Train, Validation, and Test subsets to evaluate models cleanly and prevent data leakage.</p>
                    </div>
                  </div>
                </div>

                <h3>Deep Learning Architecture (3D CNNs)</h3>
                <p>
                  Unlike traditional image classifiers that process two-dimensional inputs, Dementia Diagnostic AI maps three-dimensional anatomical structures. Consequently, <span className="highlight-orange">3D Convolutional Neural Networks</span> are utilized to capture spatial structures across the X, Y, and Z axes simultaneously.
                </p>
                <div className="ascii-diagram-container">
                  <pre className="ascii-art">
{`          [ Input MRI Volume (128x128x128) ]
                          │
                          ▼
            [ 3D Convolution (3x3x3 Kernels) ]
                          │
                          ▼
            [ Activation Function (ReLU) ]
                          │
                          ▼
              [ 3D Max Pooling Layer ]
                          │
                          ▼
            [ Fully Connected Layers (Dense) ]
                          │
                          ▼
             [ Softmax Risk Prediction ]`}
                  </pre>
                </div>

                <h3>Explainable AI Layer</h3>
                <p>
                  To transition deep learning research into clinical settings, models must justify predictions. The explainability layer implements <span className="highlight-orange">Grad-CAM (Gradient-weighted Class Activation Mapping)</span> to highlight localized brain regions (such as the hippocampus or temporal lobes) that heavily influenced the model's neurodegenerative classifications.
                </p>

                <h3>Diagnostic AI Capabilities</h3>
                <div className="editorial-features-list">
                  <EditorialFeatureBlock 
                    index="01"
                    eyebrow="Spatial Normalization"
                    title="3D Neural Fields"
                    description={<p>Registers volumetric scan grids using spatial affine mappings, resolving discrepancies in orientation, size, and slice spacing to match template MNI152 dimensions.</p>}
                    image="/artistic/claude_precision.png"
                  />
                  <EditorialFeatureBlock 
                    index="02"
                    eyebrow="Segmentation Detail"
                    title="Voxel Precision"
                    description={<p>Applies volumetric kernel convolvers across three axes simultaneously, catching spatial structures overlooked by slice-by-slice 2D models.</p>}
                    image="/artistic/claude_ml_stack.png"
                    reversed
                  />
                </div>
              </div>
            )}

            {/* ========================================================================
               BESPOKE PROJECT LAYOUT: PROJECTCLARITY (Mental Wellness & WebSocket Chat)
               ======================================================================== */}
            {project.id === 'projectclarity' && (
              <div className="editorial-content-wrapper animate-fade-in">
                <h3>Executive Summary</h3>
                <p>
                  <strong>Clarity</strong> is a comprehensive digital mental health platform designed specifically for students. Clarity provides AI-powered wellness support, mood tracking, peer community features, creative expression tools, and crisis intervention resources.
                </p>

                {/* Counselor Journal sentiment Sim */}
                <h3>AI Journal Sentiment Analyzer</h3>
                <SentimentSimulator />

                <h3>Mobile Experience Walkthrough</h3>
                
                {/* 1. Welcome & Home Flow */}
                <div style={{ margin: '2.5rem 0 1.25rem' }}>
                  <h4 style={{ color: 'var(--color-orange)', margin: '0 0 0.25rem', fontSize: '1.25rem', fontWeight: '700' }}>
                    🔐 Student Onboarding &amp; Main Hub
                  </h4>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)' }}>
                    Initial entry sequence, customized student profiling, and daily dashboard setup.
                  </p>
                </div>
                
                {/* Row 1 (3 items) */}
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1.5rem', marginBottom: '1.25rem', justifyContent: 'center' }}>
                  {[
                    { label: "Welcome Landing", src: "/projects/clarityimages/file_00000000be4071fd9786c407acceced3.png" },
                    { label: "Personalized Home", src: "/projects/clarityimages/file_000000008ad071fd9ece6a817d96fd81.png" },
                    { label: "Daily Wellness", src: "/projects/clarityimages/file_000000008d64720c827a44c43c064896.png" }
                  ].map((phone, idx, arr) => (
                    <Fragment key={phone.label}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '230px' }}>
                        <div style={{
                          border: '2px solid rgba(255, 255, 255, 0.15)',
                          borderRadius: '1.25rem',
                          boxShadow: '0 12px 24px rgba(0,0,0,0.5)',
                          overflow: 'hidden',
                          width: '100%',
                          padding: '4px',
                          background: '#1c1917'
                        }}>
                          <img src={phone.src} alt={phone.label} style={{ width: '100%', height: 'auto', borderRadius: '1rem', display: 'block' }} />
                        </div>
                        <div style={{ marginTop: '1.25rem', fontSize: '0.9rem', fontWeight: '600', letterSpacing: '0.05em', color: 'var(--color-orange)', fontFamily: 'var(--font-mono, monospace)', textAlign: 'center', textTransform: 'uppercase' }}>
                          {phone.label}
                        </div>
                      </div>
                      {idx < arr.length - 1 && (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-orange)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 0.75rem', flexShrink: 0 }}>
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      )}
                    </Fragment>
                  ))}
                </div>
                {/* Row 2 (1 item) */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '3.5rem', justifyContent: 'center' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-orange)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '1rem', flexShrink: 0 }}>
                    <path d="M9 4v10a2 2 0 002 2h8M15 12l4 4-4 4" />
                  </svg>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '230px' }}>
                    <div style={{
                      border: '2px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: '1.25rem',
                      boxShadow: '0 12px 24px rgba(0,0,0,0.5)',
                      overflow: 'hidden',
                      width: '100%',
                      padding: '4px',
                      background: '#1c1917'
                    }}>
                      <img src="/projects/clarityimages/file_000000002140722f84027d605cb19ef7.png" alt="Clarity Entry" style={{ width: '100%', height: 'auto', borderRadius: '1rem', display: 'block' }} />
                    </div>
                    <div style={{ marginTop: '1.25rem', fontSize: '0.9rem', fontWeight: '600', letterSpacing: '0.05em', color: 'var(--color-orange)', fontFamily: 'var(--font-mono, monospace)', textAlign: 'center', textTransform: 'uppercase' }}>
                      Clarity Entry
                    </div>
                  </div>
                </div>

                {/* 2. AI Support & Progress */}
                <div style={{ margin: '2.5rem 0 1.25rem' }}>
                  <h4 style={{ color: 'var(--color-orange)', margin: '0 0 0.25rem', fontSize: '1.25rem', fontWeight: '700' }}>
                    🤖 AI Sentiment Companion &amp; Tracking
                  </h4>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)' }}>
                    LLM-powered emotional guidance chatbots paired with clinical mood validation checks.
                  </p>
                </div>
                
                {/* Row 1 (3 items) */}
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1.5rem', marginBottom: '1.25rem', justifyContent: 'center' }}>
                  {[
                    { label: "AI Emotional Support", src: "/projects/clarityimages/file_00000000890c71f8bed7941010f7c855.png" },
                    { label: "Growth Journey", src: "/projects/clarityimages/file_00000000b834720cb8c901a188d4ce6d.png" },
                    { label: "AI Chat Buddy", src: "/projects/clarityimages/Screenshot_2026_0529_124702.jpg" }
                  ].map((phone, idx, arr) => (
                    <Fragment key={phone.label}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '230px' }}>
                        <div style={{
                          border: '2px solid rgba(255, 255, 255, 0.15)',
                          borderRadius: '1.25rem',
                          boxShadow: '0 12px 24px rgba(0,0,0,0.5)',
                          overflow: 'hidden',
                          width: '100%',
                          padding: '4px',
                          background: '#1c1917'
                        }}>
                          <img src={phone.src} alt={phone.label} style={{ width: '100%', height: 'auto', borderRadius: '1rem', display: 'block' }} />
                        </div>
                        <div style={{ marginTop: '1.25rem', fontSize: '0.9rem', fontWeight: '600', letterSpacing: '0.05em', color: 'var(--color-orange)', fontFamily: 'var(--font-mono, monospace)', textAlign: 'center', textTransform: 'uppercase' }}>
                          {phone.label}
                        </div>
                      </div>
                      {idx < arr.length - 1 && (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-orange)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 0.75rem', flexShrink: 0 }}>
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      )}
                    </Fragment>
                  ))}
                </div>
                {/* Row 2 (1 item) */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '3.5rem', justifyContent: 'center' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-orange)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '1rem', flexShrink: 0 }}>
                    <path d="M9 4v10a2 2 0 002 2h8M15 12l4 4-4 4" />
                  </svg>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '230px' }}>
                    <div style={{
                      border: '2px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: '1.25rem',
                      boxShadow: '0 12px 24px rgba(0,0,0,0.5)',
                      overflow: 'hidden',
                      width: '100%',
                      padding: '4px',
                      background: '#1c1917'
                    }}>
                      <img src="/projects/clarityimages/Screenshot_2026_0529_124747.jpg" alt="Wellness Screening" style={{ width: '100%', height: 'auto', borderRadius: '1rem', display: 'block' }} />
                    </div>
                    <div style={{ marginTop: '1.25rem', fontSize: '0.9rem', fontWeight: '600', letterSpacing: '0.05em', color: 'var(--color-orange)', fontFamily: 'var(--font-mono, monospace)', textAlign: 'center', textTransform: 'uppercase' }}>
                      Wellness Screening
                    </div>
                  </div>
                </div>

                {/* 3. Support & Community Connect */}
                <div style={{ margin: '2.5rem 0 1.25rem' }}>
                  <h4 style={{ color: 'var(--color-orange)', margin: '0 0 0.25rem', fontSize: '1.25rem', fontWeight: '700' }}>
                    👥 Anonymous Forum &amp; Peer Networks
                  </h4>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)' }}>
                    Goal setting, certified counselor connect routes, and moderated community boards.
                  </p>
                </div>
                
                {/* Row 1 (3 items) */}
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1.5rem', marginBottom: '1.25rem', justifyContent: 'center' }}>
                  {[
                    { label: "Goal Tracker Dashboard", src: "/projects/clarityimages/Screenshot_2026_0529_124912.jpg" },
                    { label: "Counselor Connect", src: "/projects/clarityimages/Screenshot_2026_0529_125133.jpg" },
                    { label: "Clarity Forums", src: "/projects/clarityimages/Screenshot_2026_0529_125149.jpg" }
                  ].map((phone, idx, arr) => (
                    <Fragment key={phone.label}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '230px' }}>
                        <div style={{
                          border: '2px solid rgba(255, 255, 255, 0.15)',
                          borderRadius: '1.25rem',
                          boxShadow: '0 12px 24px rgba(0,0,0,0.5)',
                          overflow: 'hidden',
                          width: '100%',
                          padding: '4px',
                          background: '#1c1917'
                        }}>
                          <img src={phone.src} alt={phone.label} style={{ width: '100%', height: 'auto', borderRadius: '1rem', display: 'block' }} />
                        </div>
                        <div style={{ marginTop: '1.25rem', fontSize: '0.9rem', fontWeight: '600', letterSpacing: '0.05em', color: 'var(--color-orange)', fontFamily: 'var(--font-mono, monospace)', textAlign: 'center', textTransform: 'uppercase' }}>
                          {phone.label}
                        </div>
                      </div>
                      {idx < arr.length - 1 && (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-orange)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 0.75rem', flexShrink: 0 }}>
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      )}
                    </Fragment>
                  ))}
                </div>
                {/* Row 2 (1 item) */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '3.5rem', justifyContent: 'center' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-orange)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '1rem', flexShrink: 0 }}>
                    <path d="M9 4v10a2 2 0 002 2h8M15 12l4 4-4 4" />
                  </svg>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '230px' }}>
                    <div style={{
                      border: '2px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: '1.25rem',
                      boxShadow: '0 12px 24px rgba(0,0,0,0.5)',
                      overflow: 'hidden',
                      width: '100%',
                      padding: '4px',
                      background: '#1c1917'
                    }}>
                      <img src="/projects/clarityimages/Screenshot_2026_0529_125253.jpg" alt="Community Discovery" style={{ width: '100%', height: 'auto', borderRadius: '1rem', display: 'block' }} />
                    </div>
                    <div style={{ marginTop: '1.25rem', fontSize: '0.9rem', fontWeight: '600', letterSpacing: '0.05em', color: 'var(--color-orange)', fontFamily: 'var(--font-mono, monospace)', textAlign: 'center', textTransform: 'uppercase' }}>
                      Community Discovery
                    </div>
                  </div>
                </div>

                {/* 4. Safety & Therapy Hubs */}
                <div style={{ margin: '2.5rem 0 1.25rem' }}>
                  <h4 style={{ color: 'var(--color-orange)', margin: '0 0 0.25rem', fontSize: '1.25rem', fontWeight: '700' }}>
                    🎨 Expression &amp; Crisis Safety Nets
                  </h4>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)' }}>
                    Creative self-expression drawing canvases and immediate safety emergency tools.
                  </p>
                </div>
                
                {/* Row 1 (2 items) */}
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1.5rem', marginBottom: '3.5rem', justifyContent: 'center' }}>
                  {[
                    { label: "Creative Expression Art Zone", src: "/projects/clarityimages/Screenshot_2026_0529_125356.jpg" },
                    { label: "Crisis Support Dashboard", src: "/projects/clarityimages/Screenshot_2026_0529_125410.jpg" }
                  ].map((phone, idx, arr) => (
                    <Fragment key={phone.label}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '230px' }}>
                        <div style={{
                          border: '2px solid rgba(255, 255, 255, 0.15)',
                          borderRadius: '1.25rem',
                          boxShadow: '0 12px 24px rgba(0,0,0,0.5)',
                          overflow: 'hidden',
                          width: '100%',
                          padding: '4px',
                          background: '#1c1917'
                        }}>
                          <img src={phone.src} alt={phone.label} style={{ width: '100%', height: 'auto', borderRadius: '1rem', display: 'block' }} />
                        </div>
                        <div style={{ marginTop: '1.25rem', fontSize: '0.9rem', fontWeight: '600', letterSpacing: '0.05em', color: 'var(--color-orange)', fontFamily: 'var(--font-mono, monospace)', textAlign: 'center', textTransform: 'uppercase' }}>
                          {phone.label}
                        </div>
                      </div>
                      {idx < arr.length - 1 && (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-orange)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 0.75rem', flexShrink: 0 }}>
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      )}
                    </Fragment>
                  ))}
                </div>

                <h3>Key Platform Modules</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginTop: '1.5rem' }}>
                  <div>
                    <h5 style={{ color: 'var(--color-orange)' }}>🤖 AI Wellness Buddy</h5>
                    <ul style={{ listStyleType: 'disc', paddingLeft: '1.25rem', marginTop: '0.5rem' }}>
                      <li>Conversational AI support for mental health guidance.</li>
                      <li>Safe space for expressing thoughts and feelings.</li>
                      <li>24/7 availability for immediate support and coping strategies.</li>
                    </ul>
                  </div>
                  <div>
                    <h5 style={{ color: 'var(--color-orange)' }}>📊 Mood &amp; Wellness Tracking</h5>
                    <ul style={{ listStyleType: 'disc', paddingLeft: '1.25rem', marginTop: '0.5rem' }}>
                      <li>Daily mood logging with visual progress tracking.</li>
                      <li>Streak tracking to build healthy habits over time.</li>
                      <li>Comprehensive analytics dashboard tracking sleep and mood scores.</li>
                    </ul>
                  </div>
                  <div>
                    <h5 style={{ color: 'var(--color-orange)' }}>👥 Peer Support Community</h5>
                    <ul style={{ listStyleType: 'disc', paddingLeft: '1.25rem', marginTop: '0.5rem' }}>
                      <li>Anonymous peer support forum for safe sharing.</li>
                      <li>Safe sharing environment with strict moderation.</li>
                      <li>Connect with others facing similar student-life challenges.</li>
                    </ul>
                  </div>
                  <div>
                    <h5 style={{ color: 'var(--color-orange)' }}>🎨 Expression &amp; Crisis Nets</h5>
                    <ul style={{ listStyleType: 'disc', paddingLeft: '1.25rem', marginTop: '0.5rem' }}>
                      <li>Digital art canvas for therapeutic expression and mindfulness.</li>
                      <li>Safety planning tools and quick access to crisis hotlines (988).</li>
                      <li>Emergency resources &amp; safety escalations integrated seamlessly.</li>
                    </ul>
                  </div>
                </div>

                <h3>Technical Architecture</h3>
                <div style={{ overflowX: 'auto', marginTop: '1.5rem' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <tbody>
                      <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                        <td style={{ padding: '0.75rem 0', fontWeight: 'bold', width: '200px' }}>Frontend Stack</td>
                        <td style={{ padding: '0.75rem 0' }}>React 18 + TypeScript + Vite, Tailwind CSS + Shadcn/UI, Framer Motion</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                        <td style={{ padding: '0.75rem 0', fontWeight: 'bold' }}>Backend Stack</td>
                        <td style={{ padding: '0.75rem 0' }}>Node.js + Express + TypeScript, MySQL (mysql2) + Express APIs, WebSocket</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                        <td style={{ padding: '0.75rem 0', fontWeight: 'bold' }}>Authentication</td>
                        <td style={{ padding: '0.75rem 0' }}>Passport.js + Express Sessions</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div style={{ marginTop: '2.5rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)' }}>
                  <p>Built with ❤️ for student mental health and wellbeing · Licensed under MIT</p>
                </div>
              </div>
            )}

            {/* ========================================================================
               BESPOKE PROJECT LAYOUT: CODECAMPUS (Academic Coding Platform)
               ======================================================================== */}
            {project.id === 'codecampus' && (
              <div className="editorial-content-wrapper animate-fade-in">
                <h3>Executive Overview</h3>
                <p>
                  <strong>CodeCampus</strong> is a polished academic coding platform for computer science students with a VS Code-style IDE, proctored exams, guided practice, teacher review flows, and community learning.
                </p>

                <h3>Visual Journey</h3>
                <p>
                  A guided tour through the main student and teacher experiences:
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
                  <div className="journey-card" style={{ border: '1px solid rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '0.5rem' }}>
                    <h5 style={{ marginBottom: '0.5rem', color: 'var(--color-orange)' }}>01. Home</h5>
                    <img src="/projects/codecampusimages/home.png" alt="CodeCampus home screen" style={{ width: '100%', borderRadius: '0.25rem' }} />
                  </div>
                  <div className="journey-card" style={{ border: '1px solid rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '0.5rem' }}>
                    <h5 style={{ marginBottom: '0.5rem', color: 'var(--color-orange)' }}>02. Practice Problems</h5>
                    <img src="/projects/codecampusimages/practice problems.png" alt="Practice problems screen" style={{ width: '100%', borderRadius: '0.25rem' }} />
                  </div>
                  <div className="journey-card" style={{ border: '1px solid rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '0.5rem' }}>
                    <h5 style={{ marginBottom: '0.5rem', color: 'var(--color-orange)' }}>03. Learning Path</h5>
                    <img src="/projects/codecampusimages/learning path.png" alt="Learning path screen" style={{ width: '100%', borderRadius: '0.25rem' }} />
                  </div>
                  <div className="journey-card" style={{ border: '1px solid rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '0.5rem' }}>
                    <h5 style={{ marginBottom: '0.5rem', color: 'var(--color-orange)' }}>04. Two Sum</h5>
                    <img src="/projects/codecampusimages/twosum.png" alt="Two Sum problem screen" style={{ width: '100%', borderRadius: '0.25rem' }} />
                  </div>
                  <div className="journey-card" style={{ border: '1px solid rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '0.5rem' }}>
                    <h5 style={{ marginBottom: '0.5rem', color: 'var(--color-orange)' }}>05. VS Code Workspace</h5>
                    <img src="/projects/codecampusimages/vscode.png" alt="VS Code style workspace" style={{ width: '100%', borderRadius: '0.25rem' }} />
                  </div>
                  <div className="journey-card" style={{ border: '1px solid rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '0.5rem' }}>
                    <h5 style={{ marginBottom: '0.5rem', color: 'var(--color-orange)' }}>06. Test</h5>
                    <img src="/projects/codecampusimages/test.png" alt="Test environment screen" style={{ width: '100%', borderRadius: '0.25rem' }} />
                  </div>
                  <div className="journey-card" style={{ border: '1px solid rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '0.5rem' }}>
                    <h5 style={{ marginBottom: '0.5rem', color: 'var(--color-orange)' }}>07. Violations</h5>
                    <img src="/projects/codecampusimages/violations.png" alt="Violation tracking screen" style={{ width: '100%', borderRadius: '0.25rem' }} />
                  </div>
                  <div className="journey-card" style={{ border: '1px solid rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '0.5rem' }}>
                    <h5 style={{ marginBottom: '0.5rem', color: 'var(--color-orange)' }}>08. Achievement</h5>
                    <img src="/projects/codecampusimages/achivement.png" alt="Achievement center screen" style={{ width: '100%', borderRadius: '0.25rem' }} />
                  </div>
                  <div className="journey-card" style={{ border: '1px solid rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '0.5rem' }}>
                    <h5 style={{ marginBottom: '0.5rem', color: 'var(--color-orange)' }}>09. Teacher Home</h5>
                    <img src="/projects/codecampusimages/teacher hhome.png" alt="Teacher home screen" style={{ width: '100%', borderRadius: '0.25rem' }} />
                  </div>
                  <div className="journey-card" style={{ border: '1px solid rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '0.5rem' }}>
                    <h5 style={{ marginBottom: '0.5rem', color: 'var(--color-orange)' }}>10. Students</h5>
                    <img src="/projects/codecampusimages/students .png" alt="Students screen" style={{ width: '100%', borderRadius: '0.25rem' }} />
                  </div>
                  <div className="journey-card" style={{ border: '1px solid rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '0.5rem' }}>
                    <h5 style={{ marginBottom: '0.5rem', color: 'var(--color-orange)' }}>11. Teacher Views</h5>
                    <img src="/projects/codecampusimages/teacher viewws.png" alt="Teacher views screen" style={{ width: '100%', borderRadius: '0.25rem' }} />
                  </div>
                  <div className="journey-card" style={{ border: '1px solid rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '0.5rem' }}>
                    <h5 style={{ marginBottom: '0.5rem', color: 'var(--color-orange)' }}>12. Report</h5>
                    <img src="/projects/codecampusimages/report.png" alt="Report screen" style={{ width: '100%', borderRadius: '0.25rem' }} />
                  </div>
                  <div className="journey-card" style={{ border: '1px solid rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '0.5rem' }}>
                    <h5 style={{ marginBottom: '0.5rem', color: 'var(--color-orange)' }}>13. Timeline</h5>
                    <img src="/projects/codecampusimages/timeline.png" alt="Timeline screen" style={{ width: '100%', borderRadius: '0.25rem' }} />
                  </div>
                </div>

                <h3>Platform Features</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginTop: '1.5rem' }}>
                  <div>
                    <h5 style={{ color: 'var(--color-orange)' }}>📝 VS Code-Style Workspace</h5>
                    <ul style={{ listStyleType: 'disc', paddingLeft: '1.25rem', marginTop: '0.5rem' }}>
                      <li>Activity bar, file explorer, search, and AI assistant in a familiar IDE layout</li>
                      <li>Tabbed multi-file editing with Monaco Editor</li>
                      <li>Integrated terminal, auto-save, and breadcrumb navigation</li>
                      <li>Search across assignment files without leaving the workspace</li>
                    </ul>
                  </div>
                  <div>
                    <h5 style={{ color: 'var(--color-orange)' }}>📚 Assignments System</h5>
                    <ul style={{ listStyleType: 'disc', paddingLeft: '1.25rem', marginTop: '0.5rem' }}>
                      <li>Subject-based organization for DSA, DBMS, Web Dev, OOP, and more</li>
                      <li>Deadline tracking with urgency colors and visible progress</li>
                      <li>Simulated JavaScript, Python, and SQL execution in browser</li>
                      <li>Paste detection, auto-save, and multi-file project support</li>
                    </ul>
                  </div>
                  <div>
                    <h5 style={{ color: 'var(--color-orange)' }}>🔒 Proctoring &amp; Tests</h5>
                    <ul style={{ listStyleType: 'disc', paddingLeft: '1.25rem', marginTop: '0.5rem' }}>
                      <li>Fullscreen enforcement with tab switch monitoring</li>
                      <li>Auto-submit after repeated warnings or time expiry</li>
                      <li>Question navigation with secure submission flow</li>
                      <li>Built for low-distraction, high-integrity exam sessions</li>
                    </ul>
                  </div>
                  <div>
                    <h5 style={{ color: 'var(--color-orange)' }}>🎓 Collaborative Forums</h5>
                    <ul style={{ listStyleType: 'disc', paddingLeft: '1.25rem', marginTop: '0.5rem' }}>
                      <li>Problem history, achievements, and gamification</li>
                      <li>Campus forums for collaborative discussion</li>
                      <li>Project showcase pages for portfolios and reviews</li>
                      <li>Guided learning paths and long-term skill progression</li>
                    </ul>
                  </div>
                </div>

                <h3>Architecture at a Glance</h3>
                <div className="ascii-diagram-container">
                  <pre className="ascii-art">
{`Student/Teacher UI ──► React + Vite Client ──► Monaco IDE + Workspace
                                          ├──► AI Assistant ──► Contextual Hints
                                          ├──► Assignment Services ──► Firestore
                                          ├──► Proctored Testing ──► Integrity Logs
                                          └──► Auth Gateway ──► Firebase Auth`}
                  </pre>
                </div>

                <h3>Technical Stack</h3>
                <div style={{ overflowX: 'auto', marginTop: '1.5rem' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <tbody>
                      <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                        <td style={{ padding: '0.75rem 0', fontWeight: 'bold', width: '200px' }}>Frontend</td>
                        <td style={{ padding: '0.75rem 0' }}>React 18, Vite 5, React Router 6, TailwindCSS, Framer Motion, Monaco Editor</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                        <td style={{ padding: '0.75rem 0', fontWeight: 'bold' }}>UI System</td>
                        <td style={{ padding: '0.75rem 0' }}>Radix UI, cva button variants, styled-components, Lucide icons</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                        <td style={{ padding: '0.75rem 0', fontWeight: 'bold' }}>Backend</td>
                        <td style={{ padding: '0.75rem 0' }}>Firebase Auth, Firestore, Express.js, MongoDB</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                        <td style={{ padding: '0.75rem 0', fontWeight: 'bold' }}>Build & Deploy</td>
                        <td style={{ padding: '0.75rem 0' }}>Vite production builds, Docker, docker-compose, nginx, PostCSS</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h3>Code Execution Engines</h3>
                <p>The platform supports in-browser code execution for multiple languages:</p>
                <ul style={{ listStyleType: 'disc', paddingLeft: '1.25rem', marginTop: '0.5rem' }}>
                  <li><strong>JavaScript:</strong> Sandboxed execution in isolated Function context, intercepting console streams, and displaying runtime errors.</li>
                  <li><strong>Python (Simulated):</strong> Pattern matching for stdout analysis, TODO detection, and simulated console outputs.</li>
                  <li><strong>SQL (Simulated):</strong> Parsing common statements (SELECT, CREATE, etc.), query feedback grids, and multi-statement support.</li>
                </ul>

                <h3>Academic Integrity & AI Features</h3>
                <p>Built-in features to preserve academic honesty and assist self-paced learning:</p>
                <ul style={{ listStyleType: 'disc', paddingLeft: '1.25rem', marginTop: '0.5rem' }}>
                  <li><strong>Integrity:</strong> Tab-switch count alerts, copy-paste block tracking with exact timestamps/lengths, and forced fullscreen exam modes.</li>
                  <li><strong>AI Assistant:</strong> Context-aware assistant that reads current assignment structures and guides students using progressive hints without revealing direct answers.</li>
                </ul>
              </div>
            )}

            {/* ========================================================================
               BESPOKE PROJECT LAYOUT: BRAINTUMOR (CV Classification)
               ======================================================================== */}
            {project.id === 'braintumor' && (
              <div className="editorial-content-wrapper animate-fade-in">
                <h3>Executive Summary</h3>
                <p>
                  Brain Tumor Detection maps out a <span className="highlight-orange">highly accurate classification pipeline</span> processing MRI scans. The model performs threshold filtering, contour extractions, and uses Support Vector Machines to output tumor classifications.
                </p>

                <h3>Implementation Guide: Brain Tumor Detection (Python & Sklearn)</h3>
                <h3>STEP 1: Load Dependencies</h3>
                <div className="editorial-step-block">
                  <p>Import required libraries: <strong>Python, sklearn, OpenCV, NumPy, and Matplotlib</strong> to handle image processing and ML algorithms.</p>
                  <img src="https://cwadtech.files.wordpress.com/2021/07/img.png?w=680" alt="Load Dependencies" className="editorial-step-image" />
                </div>

                <h3>STEP 2: Load and prepare data</h3>
                <div className="editorial-step-block">
                  <p>Note: You can find dataset directory inside github repository link (given below) or download dataset from <a href="https://www.kaggle.com/sartajbhuvaji/brain-tumor-classification-mri" target="_blank" rel="noopener noreferrer">kaggle</a></p>
                  <img src="https://cwadtech.files.wordpress.com/2021/07/img-1.png?w=680" alt="Load and prepare data" className="editorial-step-image" />
                </div>

                <h3>STEP 3: Data Analysis</h3>
                <div className="editorial-step-block">
                  <img src="https://cwadtech.files.wordpress.com/2021/07/img-2.png?w=681" alt="Data Analysis" className="editorial-step-image" />
                </div>

                <h3>STEP 4: Data Visualization</h3>
                <div className="editorial-step-block">
                  <img src="https://cwadtech.files.wordpress.com/2021/07/img-3.png?w=680" alt="Data Visualization" className="editorial-step-image" />
                </div>

                <h3>STEP 5: Split Data</h3>
                <div className="editorial-step-block">
                  <p>In this step, we are going to split data in two parts (training and testing), so that we can train our model on training dataset and test its accuracy on unseen (test) data.</p>
                  <img src="https://cwadtech.files.wordpress.com/2021/07/img-4.png?w=760" alt="Split Data" className="editorial-step-image" />
                </div>

                <h3>STEP 6: Feature Scaling</h3>
                <div className="editorial-step-block">
                  <p>In this step, we are going to use minmax scaling technique to bring all the feature values to less than or equal to 1. In order to do so, we have divided the training data by its maximum value.</p>
                  <img src="https://cwadtech.files.wordpress.com/2021/07/img-5.png?w=681" alt="Feature Scaling" className="editorial-step-image" />
                </div>

                <h3>STEP 7: Model Training</h3>
                <div className="editorial-step-block">
                  <p>As we have done with preprocessing part, it is time to train our model. I am going to train model using SVM (Support Vector Machine) and Logistic Regression algorithms and then we will compare the performance of these two different models.</p>
                  <img src="https://cwadtech.files.wordpress.com/2021/07/img-7.png?w=681" alt="Model Training" className="editorial-step-image" />
                </div>

                <h3>STEP 8: Evaluation</h3>
                <div className="editorial-step-block">
                  <p>In this part, we will compare the scores of above two models.</p>
                  <img src="https://cwadtech.files.wordpress.com/2021/07/img-8.png?w=680" alt="Evaluation" className="editorial-step-image" />
                </div>

                <p>
                  As we can observe, <strong>SVM</strong> showed a great balance among training an testing score as compared to Logistic Regression. So we can reach to the conclusion that it is ideal model for this particular dataset
                </p>

                <h3>STEP 9: Prediction</h3>
                <div className="editorial-step-block">
                  <p>In this step we are going to predict test dataset. Afterwards, I have checked the total number of misclassified samples out of total test samples.</p>
                  <img src="https://cwadtech.files.wordpress.com/2021/07/img-9.png?w=680" alt="Prediction" className="editorial-step-image" />
                </div>

                <h3>STEP 10: TESTING (On test dataset)</h3>
                <div className="editorial-step-block">
                  <p>Finally, it is the time to examine the results.</p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                    <img src="https://cwadtech.files.wordpress.com/2021/07/img-11.png?w=680" alt="Testing Step 1" className="editorial-step-image" />
                    <img src="https://cwadtech.files.wordpress.com/2021/07/img-12.png?w=655" alt="Testing Step 2" className="editorial-step-image" />
                  </div>
                </div>

                <h4>OUTPUT</h4>
                <div className="editorial-step-block">
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                    <img src="https://cwadtech.files.wordpress.com/2021/07/img-13.png?w=649" alt="Output 1" className="editorial-step-image" />
                    <img src="https://cwadtech.files.wordpress.com/2021/07/img-14.png?w=639" alt="Output 2" className="editorial-step-image" />
                  </div>
                </div>

                <h3>Final Testing & Output Visualizations</h3>
                <p>
                  Examining the final predictions on the test dataset. The outputs successfully classify tumor presence using the optimized SVM architecture.
                </p>
              </div>
            )}

            {/* ========================================================================
               BESPOKE PROJECT LAYOUT: PALANTIR (Data Engineering)
               ======================================================================== */}
            {project.id === 'palantir' && (
              <div className="editorial-content-wrapper animate-fade-in">
                <h3>Executive Summary</h3>
                <p>
                  <strong>PALANTIR</strong> is a live, immersive map command center that turns raw ADS-B telemetry into instant situational awareness. Every aircraft is rendered with altitude-aware motion, crisp 3D models, and adaptive performance tuned for modern browsers.
                </p>
                <p>
                  <a href="https://palantir-7dem.vercel.app/?city=SFO" target="_blank" rel="noopener noreferrer" className="highlight-orange font-bold">
                    → Open the live site (https://palantir-7dem.vercel.app/?city=SFO)
                  </a>
                </p>

                <h3>Live Airspace &amp; Maritime Surveillance</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '1.5rem' }}>
                  <div style={{ border: '1px solid rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '0.5rem' }}>
                    <h5 style={{ marginBottom: '0.85rem', color: 'var(--color-orange)' }}>Vessels on the sea body</h5>
                    <img src="/projects/palantirimages/ships.png" alt="Vessels on the sea body" style={{ width: '100%', borderRadius: '0.25rem' }} />
                  </div>
                  
                  <div>
                    <h5 style={{ marginBottom: '0.85rem', color: 'var(--color-orange)' }}>3D Aeroplane Trajectories</h5>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                      <img src="/projects/palantirimages/p1.png" alt="Aeroplane path 1" style={{ width: '100%', borderRadius: '0.25rem', border: '1px solid rgba(255,255,255,0.1)' }} />
                      <img src="/projects/palantirimages/p2.png" alt="Aeroplane path 2" style={{ width: '100%', borderRadius: '0.25rem', border: '1px solid rgba(255,255,255,0.1)' }} />
                      <img src="/projects/palantirimages/p3.png" alt="Aeroplane path 3" style={{ width: '100%', borderRadius: '0.25rem', border: '1px solid rgba(255,255,255,0.1)' }} />
                    </div>
                  </div>
                </div>

                <h3>Key Value Proposition</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginTop: '1.5rem' }}>
                  <div>
                    <h5 style={{ color: 'var(--color-orange)' }}>What makes PALANTIR better</h5>
                    <ul style={{ listStyleType: 'disc', paddingLeft: '1.25rem', marginTop: '0.5rem' }}>
                      <li>Real-time air traffic in 3D across the world’s busiest airspaces.</li>
                      <li>Altitude-based color and elevation mapping for instant threat and traffic separation.</li>
                      <li>Smooth animated trails, frictionless camera transitions, and intuitive city targeting.</li>
                      <li>Built to scale with a 3-tier fallback data pipeline: airplanes.live → adsb.lol → OpenSky.</li>
                      <li>Minimal setup, no private API keys required, and a polished dark-mode interface.</li>
                    </ul>
                  </div>
                  <div>
                    <h5 style={{ color: 'var(--color-orange)' }}>Why use PALANTIR</h5>
                    <ul style={{ listStyleType: 'disc', paddingLeft: '1.25rem', marginTop: '0.5rem' }}>
                      <li><strong>Flight ops teams:</strong> Get pro-grade visibility without the clutter.</li>
                      <li><strong>Developers:</strong> Get a modern Next.js stack with a ready-to-customize architecture.</li>
                      <li><strong>Designers:</strong> Get a refined experience built for motion, contrast, and responsiveness.</li>
                      <li><strong>Explorers:</strong> Get instant airspace context for every flight, airport, and route.</li>
                    </ul>
                  </div>
                </div>

                <h3>Quick Start Commands</h3>
                <div className="ascii-diagram-container">
                  <pre className="ascii-art">
{`# Install dependencies
pnpm install

# Setup environment
cp .env.example .env.local

# Run developer server
pnpm dev`}
                  </pre>
                </div>

                <h3>Aircraft Silhouettes &amp; Category Mapping</h3>
                <p>
                  PALANTIR renders 14 distinct aircraft silhouettes based on ADS-B emitter category and ICAO type codes:
                </p>
                <div style={{ overflowX: 'auto', marginTop: '1.5rem' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ borderBottom: '2px solid rgba(255,255,255,0.2)' }}>
                        <th style={{ padding: '0.75rem 0', fontWeight: 'bold' }}>Model Key</th>
                        <th style={{ padding: '0.75rem 0', fontWeight: 'bold' }}>Represents</th>
                        <th style={{ padding: '0.75rem 0', fontWeight: 'bold' }}>Assignment</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                        <td style={{ padding: '0.75rem 0' }}><code>narrowbody</code></td>
                        <td style={{ padding: '0.75rem 0' }}>A320, B737 family</td>
                        <td style={{ padding: '0.75rem 0' }}>Category 3 (Small), 4 (Large), 5 (High vortex)</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                        <td style={{ padding: '0.75rem 0' }}><code>widebody-2eng</code></td>
                        <td style={{ padding: '0.75rem 0' }}>A330, A350, B777, B787</td>
                        <td style={{ padding: '0.75rem 0' }}>Category 6 (Heavy)</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                        <td style={{ padding: '0.75rem 0' }}><code>widebody-4eng</code></td>
                        <td style={{ padding: '0.75rem 0' }}>A380, B747, A340</td>
                        <td style={{ padding: '0.75rem 0' }}>—</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                        <td style={{ padding: '0.75rem 0' }}><code>helicopter</code></td>
                        <td style={{ padding: '0.75rem 0' }}>All rotorcraft</td>
                        <td style={{ padding: '0.75rem 0' }}>Category 8 (Rotorcraft)</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                        <td style={{ padding: '0.75rem 0' }}><code>fighter</code></td>
                        <td style={{ padding: '0.75rem 0' }}>Military fast-movers</td>
                        <td style={{ padding: '0.75rem 0' }}>Category 7 (High-perf)</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                        <td style={{ padding: '0.75rem 0' }}><code>drone</code></td>
                        <td style={{ padding: '0.75rem 0' }}>UAVs</td>
                        <td style={{ padding: '0.75rem 0' }}>Category 14 (UAV)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h3>Key Technical Features</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginTop: '1.5rem' }}>
                  <div>
                    <h5 style={{ color: 'var(--color-orange)' }}>Rendering &amp; UI</h5>
                    <ul style={{ listStyleType: 'disc', paddingLeft: '1.25rem', marginTop: '0.5rem' }}>
                      <li><strong>Smooth animation:</strong> Catmull-Rom spline trails, per-frame interpolation between polls.</li>
                      <li><strong>Glassmorphism:</strong> <code>backdrop-blur-2xl</code>, <code>bg-black/60</code>, <code>border-white/[0.08]</code>.</li>
                      <li><strong>Spring physics:</strong> All UI transitions use spring easing.</li>
                      <li><strong>Responsive layouts:</strong> Desktop sidebar dialog &amp; mobile bottom-sheets.</li>
                    </ul>
                  </div>
                  <div>
                    <h5 style={{ color: 'var(--color-orange)' }}>Caching &amp; Storage</h5>
                    <ul style={{ listStyleType: 'disc', paddingLeft: '1.25rem', marginTop: '0.5rem' }}>
                      <li><strong>API efficiency:</strong> Adaptive polling (30 s → 5 min) based on remaining credits.</li>
                      <li><strong>Deep-linking:</strong> Snap to specific IATA airports with URL parameters (e.g. <code>?city=SFO</code>).</li>
                      <li><strong>Local storage:</strong> Saved settings and theme persistent states.</li>
                    </ul>
                  </div>
                </div>

                <div style={{ marginTop: '2.5rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)' }}>
                  <p>Copyright © 2026 Aditya Deore · Licensed under AGPL-3.0</p>
                </div>
              </div>
            )}

            {/* ========================================================================
               BESPOKE PROJECT LAYOUT: WORLDMONITOR (Geospatial Intelligence)
               ======================================================================== */}
            {project.id === 'worldmonitor' && (
              <div className="editorial-content-wrapper animate-fade-in">
                <h3>Executive Summary</h3>
                <p>
                  <strong>World Monitor</strong> is a real-time global intelligence dashboard offering AI-powered news aggregation, geopolitical monitoring, and infrastructure tracking in a unified situational awareness interface.
                </p>
                <div style={{ margin: '1.5rem 0 2rem' }}>
                  <img src={project.image || '/projects/world monitor img.png'} alt="World Monitor UI" style={{ width: '100%', maxWidth: '1100px', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.1)', display: 'block' }} />
                </div>

                {/* Badge Grid / Links */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', margin: '1.5rem 0' }}>
                  <a href="https://worldmonitor.app" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block' }}>
                    <img src="https://img.shields.io/badge/Web_App-worldmonitor.app-blue?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Web App" />
                  </a>
                  <a href="https://tech.worldmonitor.app" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block' }}>
                    <img src="https://img.shields.io/badge/Tech_Variant-tech.worldmonitor.app-0891b2?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Tech Variant" />
                  </a>
                  <a href="https://finance.worldmonitor.app" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block' }}>
                    <img src="https://img.shields.io/badge/Finance_Variant-finance.worldmonitor.app-059669?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Finance Variant" />
                  </a>
                  <a href="https://commodity.worldmonitor.app" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block' }}>
                    <img src="https://img.shields.io/badge/Commodity_Variant-commodity.worldmonitor.app-b45309?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Commodity Variant" />
                  </a>
                  <a href="https://happy.worldmonitor.app" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block' }}>
                    <img src="https://img.shields.io/badge/Happy_Variant-happy.worldmonitor.app-f59e0b?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Happy Variant" />
                  </a>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '2rem' }}>
                  <a href="https://worldmonitor.app/api/download?platform=windows-exe" target="_blank" rel="noopener noreferrer">
                    <img src="https://img.shields.io/badge/Download-Windows_(.exe)-0078D4?style=for-the-badge&logo=windows&logoColor=white" alt="Download Windows" />
                  </a>
                  <a href="https://worldmonitor.app/api/download?platform=macos-arm64" target="_blank" rel="noopener noreferrer">
                    <img src="https://img.shields.io/badge/Download-macOS_Apple_Silicon-000000?style=for-the-badge&logo=apple&logoColor=white" alt="Download macOS ARM" />
                  </a>
                  <a href="https://worldmonitor.app/api/download?platform=macos-x64" target="_blank" rel="noopener noreferrer">
                    <img src="https://img.shields.io/badge/Download-macOS_Intel-555555?style=for-the-badge&logo=apple&logoColor=white" alt="Download macOS Intel" />
                  </a>
                  <a href="https://worldmonitor.app/api/download?platform=linux-appimage" target="_blank" rel="noopener noreferrer">
                    <img src="https://img.shields.io/badge/Download-Linux_(.AppImage)-FCC624?style=for-the-badge&logo=linux&logoColor=black" alt="Download Linux" />
                  </a>
                </div>

                <h3>What It Does</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginTop: '1.5rem' }}>
                  <div>
                    <h5 style={{ color: 'var(--color-orange)' }}>Geospatial Intelligence &amp; AI</h5>
                    <ul style={{ listStyleType: 'disc', paddingLeft: '1.25rem', marginTop: '0.5rem' }}>
                      <li><strong>435+ curated news feeds</strong> across 15 categories, AI-synthesized into briefs</li>
                      <li><strong>Dual map engine</strong> — 3D globe (globe.gl) and WebGL flat map (deck.gl) with 45 data layers</li>
                      <li><strong>Cross-stream correlation</strong> — military, economic, disaster, and escalation signal convergence</li>
                      <li><strong>Country Risk scoring</strong> across 12 signal categories</li>
                    </ul>
                  </div>
                  <div>
                    <h5 style={{ color: 'var(--color-orange)' }}>Finance, Local AI &amp; Desktop</h5>
                    <ul style={{ listStyleType: 'disc', paddingLeft: '1.25rem', marginTop: '0.5rem' }}>
                      <li><strong>Finance radar</strong> — 92 stock exchanges, commodities, crypto, and 7-signal market composite</li>
                      <li><strong>Local AI execution</strong> — run everything with Ollama, no API keys required</li>
                      <li><strong>5 site variants</strong> from a single codebase (world, tech, finance, commodity, happy)</li>
                      <li><strong>Native desktop app</strong> (Tauri 2) for macOS, Windows, and Linux with RTL support</li>
                    </ul>
                  </div>
                </div>

                <h3>Quick Start</h3>
                <div className="ascii-diagram-container">
                  <pre className="ascii-art">
{`# Clone the repository
git clone https://github.com/koala73/worldmonitor.git
cd worldmonitor

# Install dependencies
npm install

# Run the default development server
npm run dev

# Run variant-specific environments
npm run dev:tech       # tech.worldmonitor.app
npm run dev:finance    # finance.worldmonitor.app
npm run dev:commodity  # commodity.worldmonitor.app
npm run dev:happy      # happy.worldmonitor.app`}
                  </pre>
                </div>

                <h3>Technical Stack</h3>
                <div style={{ overflowX: 'auto', marginTop: '1.5rem' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <tbody>
                      <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                        <td style={{ padding: '0.75rem 0', fontWeight: 'bold', width: '200px' }}>Frontend</td>
                        <td style={{ padding: '0.75rem 0' }}>Vanilla TypeScript, Vite, globe.gl + Three.js, deck.gl + MapLibre GL</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                        <td style={{ padding: '0.75rem 0', fontWeight: 'bold' }}>Desktop Wrapper</td>
                        <td style={{ padding: '0.75rem 0' }}>Tauri 2 (Rust) with Node.js sidecar</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                        <td style={{ padding: '0.75rem 0', fontWeight: 'bold' }}>AI &amp; Models</td>
                        <td style={{ padding: '0.75rem 0' }}>Ollama / Groq / OpenRouter, Transformers.js (browser-side embeddings)</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                        <td style={{ padding: '0.75rem 0', fontWeight: 'bold' }}>API Contracts</td>
                        <td style={{ padding: '0.75rem 0' }}>Protocol Buffers (92 protos, 22 services), sebuf HTTP annotations</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                        <td style={{ padding: '0.75rem 0', fontWeight: 'bold' }}>Infrastructure</td>
                        <td style={{ padding: '0.75rem 0' }}>Vercel Edge Functions (60+), Railway relay, Redis (Upstash) 3-tier cache</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h3>Data Sources &amp; Partners</h3>
                <p>
                  WorldMonitor aggregates 30+ external data sources across geopolitics, finance, energy, climate, aviation, and cyber. Flight surveillance data is graciously provided by <strong>Wingbits</strong>, the leading ADS-B decentralized flight tracking network.
                </p>

                <div style={{ marginTop: '2.5rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)' }}>
                  <p>Copyright © 2024-2026 Aditya Deore · Licensed under AGPL-3.0 for non-commercial use</p>
                </div>
              </div>
            )}

            <div className="key-features-section">
              <h3>Engineering Philosophy &amp; Strategy</h3>
              <div className="editorial-features-list">
                {projectEngineeringStrategy.map((item, index) => (
                  <EditorialFeatureBlock
                    key={`${project.id}-strategy-${item.title}`}
                    index={`PILLAR ${String(index + 1).padStart(2, '0')}`}
                    eyebrow={item.eyebrow}
                    title={item.title}
                    description={<p>{item.description}</p>}
                    image={item.image}
                    reversed={index % 2 !== 0}
                  />
                ))}
              </div>
            </div>

            {/* ========================================================================
               KEY FEATURES & CAPABILITIES (EDITORIAL LAYOUT)
               ======================================================================== */}
            <div className="key-features-section">
              <h3>Technical Architecture &amp; Implementation</h3>
              <div className="editorial-features-list">
                {project.id === 'codecampus' ? (
                  <>
                    <EditorialFeatureBlock 
                      index="SYSTEM 01"
                      eyebrow="Learning Management System"
                      title="Core Administration (LMS)"
                      description={<p>Orchestrates course schemas, student profile lifecycle states, and certification path generations. Integrates dynamic SQL schemas inside a cluster-ready PostgreSQL instance to resolve multi-tenant dashboards with under 15ms query overhead.</p>}
                      image={getTechnicalModuleImage(project.id, 'lms')}
                    />
                    <EditorialFeatureBlock 
                      index="SYSTEM 02"
                      eyebrow="Content Delivery System"
                      title="High-Definition Streaming"
                      description={<p>Delivers high-definition media distribution by segmenting raw assets into secure index fragments. Features a client-side dynamic checkpoint loop that saves progress tags every 3 seconds to mitigate buffer dropouts on high latency bands.</p>}
                      image={getTechnicalModuleImage(project.id, 'content')}
                      reversed
                    />
                    <EditorialFeatureBlock 
                      index="SYSTEM 03"
                      eyebrow="Digital Commerce System"
                      title="Secure UPI Engine"
                      description={<p>Processes UPI checkouts by creating intent signatures and validating NPCI webhook callbacks. Uses strict database lock steps and transactional state logs to guarantee auto-enrollment actions happen atomically.</p>}
                      image={getTechnicalModuleImage(project.id, 'commerce')}
                    />
                  </>
                ) : (
                  documentation.blocks.map((block, bIdx) => (
                    <EditorialFeatureBlock 
                      key={block.id}
                      index={`MODULE ${String(bIdx + 1).padStart(2, '0')}`}
                      eyebrow={block.eyebrow}
                      title={block.title}
                      description={<p>{block.paragraphs.join(' ')}</p>}
                      image={getTechnicalModuleImage(project.id, block.id)}
                      reversed={bIdx % 2 !== 0}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER NAVIGATION */}
        <footer className="project-footer-nav">
          {prevProject ? (
            <Link to={`/projects/${prevProject.id}`} state={navigationState ?? undefined} className="nav-direction-btn prev">
              <span className="direction-label">← Previous Case Study</span>
              <strong className="direction-title">{prevProject.title}</strong>
            </Link>
          ) : (
            <div />
          )}
          
          {nextProject ? (
            <Link to={`/projects/${nextProject.id}`} state={navigationState ?? undefined} className="nav-direction-btn next">
              <span className="direction-label">Next Case Study →</span>
              <strong className="direction-title">{nextProject.title}</strong>
            </Link>
          ) : (
            <div />
          )}
        </footer>

      </div>
    </main>
  )
}

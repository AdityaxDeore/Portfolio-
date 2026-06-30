import type { CSSProperties } from 'react'
import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { getProjectById, projects } from '@/data/projects'
import { getProjectDocumentation } from '@/data/projectDocs'
import { getBentoSpan } from '@/lib/bentoLayout'
import { getProjectApproachTiles, getProjectDepthFeatures } from '@/lib/projectApproach'
import { useIsTouchDevice } from '@/hooks/useMediaQuery'
import { ProjectDepthScroll } from '@/components/ui/ProjectDepthScroll'
import { CurvedLoop } from '@/components/ui/CurvedLoop'
import { CharReveal } from '@/components/ui/CharReveal'
import './ProjectPage.css'

type ArchLayer = {
  id: string
  badge: string
  title: string
  description: string
  detail: string
  tech: string[]
  isSecure?: boolean
}

interface ProjectLayoutConfig {
  architecture?: {
    title: string
    description: string
    layers: ArchLayer[]
  }
  highlightsTitle: string
  outcomeTitle: string
}

const DEFAULT_CONFIG: ProjectLayoutConfig = {
  highlightsTitle: 'Engineering highlights',
  outcomeTitle: 'Impact & outcomes',
}

const CODE_CAMPUS_CONFIG: ProjectLayoutConfig = {
  architecture: {
    title: 'Core architecture',
    description:
      'Client IDE, API routing, and sandboxed execution — isolated pipelines that keep live feedback fast and assessments secure.',
    layers: [
      {
        id: 'client',
        badge: 'Client layer',
        title: 'VS Code-style IDE',
        description: 'Monaco editor compiles keystrokes and triggers sandboxed runs.',
        detail:
          'File tree, tabbed editor, terminal panel, and run controls modeled after VS Code. Students get real-time stdout over WebSockets with keyboard-first navigation.',
        tech: ['React', 'TypeScript', 'Monaco'],
      },
      {
        id: 'api',
        badge: 'API hub',
        title: 'Express API router',
        description: 'Validates JWT credentials, stores telemetry, and manages run queues.',
        detail:
          'REST endpoints authenticate sessions, log keystroke analytics to MongoDB, and enqueue container jobs with rate limits during peak exam windows.',
        tech: ['Node.js', 'Express', 'MongoDB'],
      },
      {
        id: 'sandbox',
        badge: 'Sandbox VM',
        title: 'Docker isolation',
        description: 'Executes code under restricted CPU/RAM with no network egress.',
        detail:
          'Per-submission containers spin up with read-only filesystems and hard timeouts. AST scanning blocks dangerous imports before execution.',
        tech: ['Docker', 'WebSockets', 'AST'],
        isSecure: true,
      },
    ],
  },
  highlightsTitle: 'Engineering highlights',
  outcomeTitle: 'Business outcome',
}

const TUMOR_AI_CONFIG: ProjectLayoutConfig = {
  architecture: {
    title: 'CV & SVM pipeline',
    description:
      'MRI scans flow through preprocessing, skull stripping, feature extraction, and RBF-kernel SVM classification.',
    layers: [
      {
        id: 'input',
        badge: 'Scan input',
        title: 'MRI imagery loader',
        description: 'Raw sagittal/axial brain scans normalized to grayscale tensors.',
        detail:
          'DICOM and PNG exports are clipped, resized to 256×256, and tagged with anonymous metadata for batch inference pipelines.',
        tech: ['Python', 'NumPy', 'OpenCV'],
      },
      {
        id: 'cv',
        badge: 'CV pipeline',
        title: 'OpenCV segmenter',
        description: 'Bilateral filters and Otsu masking isolate diagnostically relevant regions.',
        detail:
          'Noise reduction preserves tumor boundaries. Morphological closing fills mask holes before Haralick texture descriptors are extracted.',
        tech: ['OpenCV', 'Scikit-image'],
      },
      {
        id: 'svm',
        badge: 'Classifier',
        title: 'RBF kernel SVM',
        description: 'Projects texture features into a decision boundary for tumor classification.',
        detail:
          'Grid search optimized C and gamma across cross-validated folds — 96.3% accuracy with only 9 misclassifications on held-out scans.',
        tech: ['Scikit-learn', 'SVM', 'RBF'],
        isSecure: true,
      },
    ],
  },
  highlightsTitle: 'Engineering highlights',
  outcomeTitle: 'Diagnostic outcome',
}

const CLARITY_CONFIG: ProjectLayoutConfig = {
  architecture: {
    title: 'Real-time & AI architecture',
    description:
      'Wellness UI, WebSocket gateways, and TensorFlow sentiment scoring orchestrated for secure, low-latency interactions.',
    layers: [
      {
        id: 'ui',
        badge: 'Client state',
        title: 'Wellness web UI',
        description: 'React dashboard mapping mood fluctuations and journal entries.',
        detail:
          'Mood charts, journaling flows, and recommendation panels update in real time as sentiment scores shift across multi-day windows.',
        tech: ['React', 'TypeScript', 'PostgreSQL'],
      },
      {
        id: 'socket',
        badge: 'Message broker',
        title: 'Socket gateways',
        description: 'Broadcasts peer support messages with JWT-authenticated handshakes.',
        detail:
          'Socket.io rooms encrypt messages at rest with AES-GCM-256. Rate limiting and moderation hooks protect high-traffic support sessions.',
        tech: ['Socket.io', 'Node.js', 'JWT'],
      },
      {
        id: 'nlp',
        badge: 'Sentiment NLP',
        title: 'TensorFlow engine',
        description: 'Bi-LSTM attention layer classifying journal text vectors.',
        detail:
          'spaCy tokenization feeds a bidirectional LSTM returning mood polarity in under 200ms via TensorFlow Serving endpoints.',
        tech: ['TensorFlow', 'Bi-LSTM', 'spaCy'],
        isSecure: true,
      },
    ],
  },
  highlightsTitle: 'Engineering highlights',
  outcomeTitle: 'Wellness impact',
}

function tileStyle(index: number): CSSProperties {
  return { '--tile-i': index } as CSSProperties
}

function getConfig(projectId: string): ProjectLayoutConfig {
  if (projectId === 'codecampus') return CODE_CAMPUS_CONFIG
  if (projectId === 'braintumor') return TUMOR_AI_CONFIG
  if (projectId === 'projectclarity') return CLARITY_CONFIG
  return DEFAULT_CONFIG
}

export function ProjectPage() {
  const { id } = useParams<{ id: string }>()
  const project = id ? getProjectById(id) : undefined
  const [expandedArchId, setExpandedArchId] = useState<string | null>(null)
  const [hoveredArchId, setHoveredArchId] = useState<string | null>(null)
  const isTouch = useIsTouchDevice()

  const currentIndex = project ? projects.findIndex((p) => p.id === project.id) : -1
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null
  const nextProject =
    currentIndex >= 0 && currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null

  if (!project) {
    return <Navigate to="/#projects" replace />
  }

  const config = getConfig(project.id)
  const approachTiles = getProjectApproachTiles(project)
  const depthFeatures = getProjectDepthFeatures(project)
  const documentation = getProjectDocumentation(project)

  const toggleArch = (layerId: string) => {
    setExpandedArchId((prev) => (prev === layerId ? null : layerId))
  }

  return (
    <main id="main-content" className="canvas project-page">
      <div className="container project-page__inner">
        <header className="project-page__top">
          <Link to="/#projects" className="project-page__back">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M15 6l-6 6 6 6"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back to projects
          </Link>
          <p className="project-page__index">
            {String(currentIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
          </p>
        </header>

        <section className="project-hero" aria-label="Project overview">
          <div className="project-hero__media">
            <img src={project.image} alt="" className="project-hero__image" />
            <span className="project-hero__index">{String(currentIndex + 1).padStart(2, '0')}</span>
          </div>
          <div className="project-hero__content">
            <p className="project-page__eyebrow">Case Study · {project.caseStudy.year}</p>
            <CharReveal text={project.title} className="project-hero__title" as="h1" />
            <p className="project-hero__role">{project.caseStudy.role}</p>
            <p className="project-hero__desc">{project.outcome}</p>
            <ul className="project-hero__tags" aria-label="Technologies">
              {project.tags.map((tag) => (
                <li key={tag} className="tech-pill tech-pill--hero">
                  {tag}
                </li>
              ))}
            </ul>
            <div className="project-hero__actions">
              {project.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-btn project-btn--primary"
                >
                  Open {link.label}
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="approach" className="project-approach doc-section" aria-labelledby="project-approach-title">
          <header className="project-approach__header">
            <p className="project-approach__label">Build philosophy</p>
            <h2 id="project-approach-title" className="project-approach__title">
              How I think &amp; build
            </h2>
            <p className="project-approach__subtitle">
              Problem framing, production discipline, and curiosity — applied to{' '}
              <strong>{project.title}</strong>.
            </p>
          </header>

          <div className="project-approach__bento">
            {approachTiles.map((tile) => (
              <article
                key={tile.id}
                className={`project-approach__tile project-approach__tile--${tile.layout} project-approach__tile--${tile.variant}`}
              >
                <span className="project-approach__index">{tile.index}</span>
                <p className="project-approach__tag">{tile.subtitle}</p>
                <h3 className="project-approach__card-title">{tile.title}</h3>
                <p className="project-approach__desc">{tile.description}</p>
              </article>
            ))}
          </div>
        </section>

        <ProjectDepthScroll features={depthFeatures} projectTitle={project.title} />

        <div className="project-page__body">
          <section id="introduction" className="project-section doc-section">
            <header className="project-section__header">
              <h2 className="project-section__title">Introduction</h2>
            </header>

            <div className="project-doc">
              {documentation.overview.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="project-doc__paragraph">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="project-metrics" aria-label="Project metrics">
              {documentation.metrics.map((metric) => (
                <article key={metric.label} className="project-metrics__card">
                  <span className="project-metrics__label">{metric.label}</span>
                  <p className="project-metrics__value">{metric.value}</p>
                </article>
              ))}
            </div>

            <div className="project-panels">
              <article className="project-panel project-panel--light">
                <span className="project-panel__eyebrow">Problem statement</span>
                <p className="project-panel__text">{project.caseStudy.summary}</p>
              </article>
              <article className="project-panel project-panel--accent">
                <span className="project-panel__eyebrow">Solution &amp; impact</span>
                <p className="project-panel__text project-panel__text--lead">{project.outcome}</p>
              </article>
            </div>
          </section>

          <section id="documentation" className="project-section doc-section">
            <header className="project-section__header">
              <h2 className="project-section__title">Technical documentation</h2>
              <p className="project-section__lead">
                Engineering notes, constraints, and implementation detail for{' '}
                <strong>{project.title}</strong>.
              </p>
            </header>

            <div className="project-doc-blocks">
              {documentation.blocks.map((block) => (
                <article key={block.id} className="project-doc-block">
                  <span className="project-doc-block__eyebrow">{block.eyebrow}</span>
                  <h3 className="project-doc-block__title">{block.title}</h3>
                  {block.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 36)} className="project-doc-block__text">
                      {paragraph}
                    </p>
                  ))}
                </article>
              ))}
            </div>

            <aside className="project-constraints">
              <h3 className="project-constraints__title">Design constraints</h3>
              <ul className="project-constraints__list">
                {documentation.constraints.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </aside>
          </section>

          {config.architecture && (
            <section id="architecture" className="project-section doc-section">
              <header className="project-section__header">
                <h2 className="project-section__title">{config.architecture.title}</h2>
                <p className="project-section__lead">{config.architecture.description}</p>
              </header>

              <div className="project-arch-stack">
                {config.architecture.layers.map((layer, index) => {
                  const isOpen =
                    expandedArchId === layer.id || (!isTouch && hoveredArchId === layer.id)
                  let tileIndex = 0

                  return (
                    <article
                      key={layer.id}
                      className={`project-arch-card${isOpen ? ' project-arch-card--open' : ''}`}
                      onMouseEnter={() => !isTouch && setHoveredArchId(layer.id)}
                      onMouseLeave={() => !isTouch && setHoveredArchId(null)}
                    >
                      <button
                        type="button"
                        className="project-arch-card__trigger"
                        onClick={() => toggleArch(layer.id)}
                        aria-expanded={isOpen}
                        aria-controls={`arch-panel-${layer.id}`}
                      >
                        <span className="project-arch-card__index">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <div className="project-arch-card__headline">
                          <p className="project-arch-card__tag">{layer.badge}</p>
                          <h3 className="project-arch-card__title">{layer.title}</h3>
                          <p className="project-arch-card__summary">{layer.description}</p>
                        </div>
                        <span className="project-arch-card__hint">
                          {isTouch ? 'Tap to expand' : 'Hover to explore'}
                        </span>
                        <span className="project-arch-card__chevron" aria-hidden="true" />
                      </button>

                      <div
                        id={`arch-panel-${layer.id}`}
                        className="project-arch-card__panel"
                        aria-hidden={!isOpen}
                      >
                        <div className="project-arch-card__panel-inner">
                          <div className="project-arch-card__bento">
                            <div
                              className="project-arch-card__tile project-arch-card__tile--detail"
                              style={tileStyle(tileIndex++)}
                            >
                              <p className="project-arch-card__tile-label">Overview</p>
                              <p>{layer.detail}</p>
                            </div>
                            <div
                              className={`project-arch-card__tile project-arch-card__tile--tech${layer.isSecure ? ' project-arch-card__tile--secure' : ''}`}
                              style={tileStyle(tileIndex++)}
                            >
                              <p className="project-arch-card__tile-label">Technologies</p>
                              <ul>
                                {layer.tech.map((tech) => (
                                  <li key={tech}>{tech}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                  )
                })}
              </div>
            </section>
          )}

          <section id="deliverables" className="project-section doc-section">
            <header className="project-section__header">
              <h2 className="project-section__title">{config.highlightsTitle}</h2>
            </header>
            <div className="bento-grid">
              {project.caseStudy.highlights.map((highlight, index) => {
                const span = getBentoSpan(project.id, index)
                return (
                  <article
                    key={highlight}
                    className={`bento-tile bento-tile--col-${span.col} bento-tile--row-${span.row}${index === 0 ? ' bento-tile--featured' : ''}`}
                  >
                    <span className="bento-tile__index">0{index + 1}</span>
                    <p className="bento-tile__text">{highlight}</p>
                  </article>
                )
              })}
            </div>
          </section>

          <section id="outcome" className="project-section doc-section">
            <header className="project-section__header">
              <h2 className="project-section__title">{config.outcomeTitle}</h2>
            </header>
            <div className="project-outcome">
              <div className="project-outcome__icon" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <div>
                <p className="project-outcome__label">Measured outcome</p>
                <p className="project-outcome__text">{project.outcome}</p>
              </div>
            </div>
            <div className="project-panels project-panels--triple project-panels--desktop-only">
              {project.caseStudy.highlights.slice(0, 3).map((highlight, index) => (
                <article
                  key={highlight}
                  className={`project-panel${index === 1 ? ' project-panel--accent' : ' project-panel--light'}`}
                >
                  <span className="project-panel__eyebrow">Key result 0{index + 1}</span>
                  <p className="project-panel__text">{highlight}</p>
                </article>
              ))}
            </div>
          </section>

          <nav className="project-page__nav" aria-label="Adjacent case studies">
            {prevProject ? (
              <Link to={`/projects/${prevProject.id}`} className="project-page__nav-link">
                <span className="project-page__nav-label">Previous</span>
                <span className="project-page__nav-title">{prevProject.title}</span>
              </Link>
            ) : (
              <span />
            )}
            {nextProject ? (
              <Link
                to={`/projects/${nextProject.id}`}
                className="project-page__nav-link project-page__nav-link--next"
              >
                <span className="project-page__nav-label">Next</span>
                <span className="project-page__nav-title">{nextProject.title}</span>
              </Link>
            ) : (
              <span />
            )}
          </nav>
        </div>
      </div>

      <div className="project-page__footer-marquee">
        <CurvedLoop
          text={project.tags.join('  ·  ') + '  ·  ' + project.title}
          speed={1.0}
          curveHeight={16}
          fontSize={24}
          height={80}
          direction="left"
          className="project-page__marquee"
        />
      </div>
    </main>
  )
}

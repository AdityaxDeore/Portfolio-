import { useState, useRef, useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { getProjectById, projects } from '@/data/projects'
import { CurvedLoop } from '@/components/ui/CurvedLoop'
import { CharReveal } from '@/components/ui/CharReveal'
import './ProjectPage.css'

interface ProjectLayoutConfig {
  outline: { label: string; href: string }[];
  lifecycle?: {
    title: string;
    description: string;
    stages: {
      number: string;
      title: string;
      description: string;
      image: string;
    }[];
  };
  architecture?: {
    title: string;
    description: string;
    cards: {
      badge: string;
      title: string;
      description: string;
      isSecure?: boolean;
    }[];
  };
  highlightsTitle: string;
  outcomeTitle: string;
}

const DEFAULT_CONFIG: ProjectLayoutConfig = {
  outline: [
    { label: '1. Introduction', href: '#introduction' },
    { label: '2. Key Highlights', href: '#deliverables' },
    { label: '3. Impact & Outcomes', href: '#outcome' },
  ],
  highlightsTitle: '2. Key Highlights & Deliverables',
  outcomeTitle: '3. Impact & Outcomes',
}

const CODE_CAMPUS_CONFIG: ProjectLayoutConfig = {
  outline: [
    { label: '1. Introduction', href: '#introduction' },
    { label: '2. Detailed Lifecycle', href: '#lifecycle' },
    { label: '3. Core Architecture', href: '#architecture' },
    { label: '4. Engineering Highlights', href: '#deliverables' },
    { label: '5. Business Outcome', href: '#outcome' },
  ],
  lifecycle: {
    title: '2. Detailed Lifecycle Flowchart',
    description: 'A walkthrough of the end-to-end development and runtime stages designed to verify sandboxing safety and keystroke integrity.',
    stages: [
      {
        number: '01',
        title: 'Prototyping & Visual Design',
        description: 'Creating high-fidelity layouts and interactive editor interfaces for the code execution environment.',
        image: '/images/whatcreate/interface/prototype.webp'
      },
      {
        number: '02',
        title: 'Keystroke Analytics Logging',
        description: 'Integrating high-resolution keystroke tracking systems to detect anomalous writing cadences.',
        image: '/images/whatcreate/interface/tasks.webp'
      },
      {
        number: '03',
        title: 'Restricted AST Scanning',
        description: 'Implementing static code checks via abstract syntax trees before running user-submitted containers.',
        image: '/images/whatcreate/interface/sidebar.webp'
      },
      {
        number: '04',
        title: 'Sandboxed Container Execution',
        description: 'Deploying isolated, resource-constrained container pods to compile and run scripts securely.',
        image: '/images/whatcreate/interface/mobile_ops.webp'
      }
    ]
  },
  architecture: {
    title: '3. Core Architecture & Workflow',
    description: 'The system architecture separates client code editing, API routing, and the sandboxed micro-container compilation pipelines. This isolation guarantees safety while keeping live feedback fast.',
    cards: [
      { badge: 'Client View', title: 'VS Code IDE', description: 'Monaco editor compiles keystrokes and runs triggers.' },
      { badge: 'Router Hub', title: 'Express API', description: 'Validates JWT credentials, stores telemetry, and manages runs.' },
      { badge: 'Sandbox VM', title: 'Docker Isolation', description: 'Executes code strings under restricted CPU/RAM containers.', isSecure: true }
    ]
  },
  highlightsTitle: '4. Engineering Highlights',
  outcomeTitle: '5. Business Outcome'
}

const TUMOR_AI_CONFIG: ProjectLayoutConfig = {
  outline: [
    { label: '1. Introduction', href: '#introduction' },
    { label: '2. Detailed Lifecycle', href: '#lifecycle' },
    { label: '3. CV & SVM Architecture', href: '#architecture' },
    { label: '4. Engineering Highlights', href: '#deliverables' },
    { label: '5. Diagnostic Outcome', href: '#outcome' },
  ],
  lifecycle: {
    title: '2. Detailed Lifecycle Flowchart',
    description: 'A step-by-step diagnostic journey processing sagittal brain MRI scans, stripping noise, and projecting boundaries.',
    stages: [
      {
        number: '01',
        title: 'Grayscale Scan Input',
        description: 'Ingesting raw axial or sagittal brain scans in normalized grayscale format.',
        image: '/images/whatcreate/1.webp'
      },
      {
        number: '02',
        title: 'Bilateral Noise Filtering',
        description: 'Applying bilateral filtering algorithms to preserve sharp structural margins while eliminating scan noise.',
        image: '/images/whatcreate/2.webp'
      },
      {
        number: '03',
        title: 'Otsu Skull Masking',
        description: 'Executing adaptive thresholding algorithms to separate cerebral structures from non-relevant regions.',
        image: '/images/whatcreate/3.webp'
      },
      {
        number: '04',
        title: 'SVM Kernel Projection',
        description: 'Mapping extracted texture features into high-dimensional space using RBF kernels for tumor classification.',
        image: '/images/whatcreate/4.webp'
      }
    ]
  },
  architecture: {
    title: '3. CV & SVM Diagnostic Pipeline',
    description: 'The diagnostic system pipes raw DICOM/PNG brain scans through automated skull-stripping operations, bilateral noise filtering, contour segmentation, and RBF kernel SVM projection.',
    cards: [
      { badge: 'Scan Input', title: 'MRI Imagery', description: 'Raw sagittal/axial brain scans loaded in grayscale.' },
      { badge: 'CV Pipeline', title: 'OpenCV Segmenter', description: 'Applies bilateral filters and Otsu masking to isolate regions.' },
      { badge: 'Decision Boundary', title: 'RBF Kernel SVM', description: 'Projects extracted texture descriptors to classify tumors.', isSecure: true }
    ]
  },
  highlightsTitle: '4. Engineering Highlights',
  outcomeTitle: '5. Diagnostic Outcome'
}

const CLARITY_CONFIG: ProjectLayoutConfig = {
  outline: [
    { label: '1. Introduction', href: '#introduction' },
    { label: '2. Detailed Lifecycle', href: '#lifecycle' },
    { label: '3. Real-Time & AI Architecture', href: '#architecture' },
    { label: '4. Engineering Highlights', href: '#deliverables' },
    { label: '5. Wellness Impact', href: '#outcome' },
  ],
  lifecycle: {
    title: '2. Detailed Lifecycle Flowchart',
    description: 'A timeline mapping real-time journal analysis, WebSocket packet broadcasting, and adaptive recommendations.',
    stages: [
      {
        number: '01',
        title: 'NLP Journal Tokenization',
        description: 'Parsing journal text streams into normalized vector structures for classification models.',
        image: '/images/whatcreate/5.webp'
      },
      {
        number: '02',
        title: 'Bi-LSTM Sentiment Scoring',
        description: 'Feeding text vector layers into specialized sentiment classification networks.',
        image: '/images/whatcreate/6.webp'
      },
      {
        number: '03',
        title: 'WebSocket Packet Relay',
        description: 'Broadcasting anonymized message payloads securely using AES-GCM-256 protocols.',
        image: '/images/whatcreate/grid.webp'
      },
      {
        number: '04',
        title: 'Knowledge Graph Recommendations',
        description: 'Retrieving context-aware suggestions from structured wellness data nodes based on state vectors.',
        image: '/images/whatcreate/interface/row.webp'
      }
    ]
  },
  architecture: {
    title: '3. Distributed & NLP Architecture',
    description: 'Clarity orchestrates microservice message brokers, real-time WebSocket state synchronizers, and localized sentiment evaluation networks to ensure highly secure user interactions.',
    cards: [
      { badge: 'Client State', title: 'Wellness Web UI', description: 'React-driven dashboard mapping mood fluctuations.' },
      { badge: 'Message Broker', title: 'Socket Gateways', description: 'Broadcasts instant support messages with low overhead.' },
      { badge: 'Sentiment NLP', title: 'TensorFlow Engine', description: 'Bi-LSTM attention neural layer classifying journal text vectors.', isSecure: true }
    ]
  },
  highlightsTitle: '4. Engineering Highlights',
  outcomeTitle: '5. Wellness Impact'
}

export function ProjectPage() {
  const { id } = useParams<{ id: string }>()
  const project = id ? getProjectById(id) : undefined
  const pageRef = useRef<HTMLElement>(null)

  let config = DEFAULT_CONFIG
  if (project?.id === 'codecampus') config = CODE_CAMPUS_CONFIG
  else if (project?.id === 'tumorai') config = TUMOR_AI_CONFIG
  else if (project?.id === 'clarity') config = CLARITY_CONFIG

  const [activeSection, setActiveSection] = useState<string>('')

  useEffect(() => {
    const sections = config.outline.map((item) => document.querySelector(item.href))

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting)
        if (visible) {
          setActiveSection(visible.target.id)
        }
      },
      {
        rootMargin: '-10% 0px -70% 0px',
        threshold: 0.1
      }
    )

    sections.forEach((sec) => {
      if (sec) observer.observe(sec)
    })

    return () => {
      sections.forEach((sec) => {
        if (sec) observer.unobserve(sec)
      })
    }
  }, [config.outline, id])

  const currentIndex = project ? projects.findIndex((p) => p.id === project.id) : -1
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null
  const nextProject =
    currentIndex >= 0 && currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null

  if (!project) {
    return <Navigate to="/#projects" replace />
  }

  return (
    <main id="main-content" className="canvas project-page" ref={pageRef} tabIndex={-1}>
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

        {/* Top Banner */}
        <div className="project-page__banner">
          <img src={project.image} alt={project.title} className="project-page__banner-image" />
          <div className="project-page__banner-overlay" />
        </div>

        {/* Horizontal Navigation and Metadata Panel */}
        <div className="project-page__header-panel">
          <div className="project-page__title-block">
            <p className="project-page__eyebrow">Case Study · {project.caseStudy.year}</p>
            <CharReveal text={project.title} className="project-page__heading" as="h1" />
            <p className="project-page__role-tag">{project.caseStudy.role}</p>
          </div>

          <div className="project-page__meta-grid">
            <div className="project-page__meta-col">
              <h3 className="project-page__meta-title">Outline</h3>
              <nav className="project-page__top-nav" aria-label="Page Outline">
                <ul>
                  {config.outline.map((item) => {
                    const isActive = activeSection === item.href.slice(1)
                    return (
                      <li key={item.href}>
                        <a
                          href={item.href}
                          className={isActive ? 'outline-link--active' : ''}
                        >
                          {item.label}
                        </a>
                      </li>
                    )
                  })}
                </ul>
              </nav>
            </div>

            <div className="project-page__meta-col">
              <h3 className="project-page__meta-title">Technologies</h3>
              <ul className="project-page__tech-pills">
                {project.tags.map((tag) => (
                  <li key={tag} className="tech-pill">{tag}</li>
                ))}
              </ul>
            </div>

            <div className="project-page__meta-col project-page__meta-col--actions">
              <h3 className="project-page__meta-title">Links</h3>
              <div className="project-page__top-actions">
                {project.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sidebar-action-btn"
                  >
                    {link.label === 'GitHub' ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '0.35rem', display: 'inline-block', verticalAlign: 'middle' }}>
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                      </svg>
                    ) : (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '0.35rem', display: 'inline-block', verticalAlign: 'middle' }}>
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    )}
                    <span style={{ verticalAlign: 'middle' }}>Open {link.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="project-page__layout">
          <article className="project-page__content">
            <section id="introduction" className="doc-section">
              <h2 className="doc-section-title">1. Introduction</h2>
              <p className="doc-text">{project.caseStudy.summary}</p>
            </section>

            {/* 2. Detailed Lifecycle */}
            {config.lifecycle && (
              <section id="lifecycle" className="doc-section">
                <h2 className="doc-section-title">{config.lifecycle.title}</h2>
                <p className="doc-text">{config.lifecycle.description}</p>
                
                <div className="lifecycle-grid">
                  {config.lifecycle.stages.map((stage) => (
                    <div key={stage.number} className="lifecycle-stage-card">
                      <div className="lifecycle-stage-image-wrap">
                        <img src={stage.image} alt={stage.title} className="lifecycle-stage-image" loading="lazy" />
                      </div>
                      <div className="lifecycle-stage-content">
                        <span className="lifecycle-stage-number">{stage.number}</span>
                        <h3 className="lifecycle-stage-title">{stage.title}</h3>
                        <p className="lifecycle-stage-text">{stage.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 3. Core Architecture */}
            {config.architecture && (
              <section id="architecture" className="doc-section">
                <h2 className="doc-section-title">{config.architecture.title}</h2>
                <p className="doc-text">{config.architecture.description}</p>

                <div className="arch-flow">
                  {config.architecture.cards.map((card, idx) => (
                    <div key={card.title} style={{ display: 'contents' }}>
                      <div className={`arch-card ${card.isSecure ? 'arch-card--secure' : ''}`}>
                        <span className={`arch-badge ${card.isSecure ? 'arch-badge--secure' : ''}`}>{card.badge}</span>
                        <h4>{card.title}</h4>
                        <p>{card.description}</p>
                      </div>
                      {idx < (config.architecture?.cards.length ?? 0) - 1 && (
                        <div className="arch-arrow">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                          </svg>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}



            {/* 4. Deliverables */}
            <section id="deliverables" className="doc-section">
              <h2 className="doc-section-title">{config.highlightsTitle}</h2>
              <div className="deliverables-grid">
                {project.caseStudy.highlights.map((highlight, index) => (
                  <div key={index} className="deliverable-card">
                    <div className="deliverable-badge">0{index + 1}</div>
                    <p className="deliverable-text">{highlight}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 5. Outcome */}
            <section id="outcome" className="doc-section">
              <h2 className="doc-section-title">{config.outcomeTitle}</h2>
              <div className="outcome-block">
                <div className="outcome-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div className="outcome-copy">
                  <h4>Measured Outcome</h4>
                  <p>{project.outcome}</p>
                </div>
              </div>
            </section>

            {/* Adjacent project nav footer */}
            <nav className="project-page__nav" aria-label="Adjacent case studies">
              {prevProject ? (
                <Link to={`/projects/${prevProject.id}`} className="project-page__nav-link project-page__nav-link--prev">
                  <span className="project-page__nav-label">Previous Case Study</span>
                  <span className="project-page__nav-title">{prevProject.title}</span>
                </Link>
              ) : (
                <span />
              )}
              {nextProject ? (
                <Link to={`/projects/${nextProject.id}`} className="project-page__nav-link project-page__nav-link--next">
                  <span className="project-page__nav-label">Next Case Study</span>
                  <span className="project-page__nav-title">{nextProject.title}</span>
                </Link>
              ) : (
                <span />
              )}
            </nav>
          </article>
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
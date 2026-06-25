import { useState } from 'react'
import {
  resumePdfUrl,
  resumeDocxUrl,
  resumePageImages,
  resumeSection,
  resumeExternalLinks,
} from '@/data/resume'
import './Resume.css'

function DownloadIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3v12m0 0 4-4m-4 4-4-4M5 19h14"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ExternalLinkIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M14 5h5v5M10 14 19 5M19 10v9a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h9"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function Resume() {
  const [showPreview, setShowPreview] = useState(false)

  return (
    <section id="resume" className="resume" aria-labelledby="resume-title">
      <div className="container resume__layout">
        <header className="resume__header">
          <p className="resume__label">{resumeSection.label}</p>
          <h2 id="resume-title" className="resume__title">
            {resumeSection.title}
          </h2>
          <p className="resume__subtitle">{resumeSection.subtitle}</p>
        </header>

        <div className="resume__panel">
          <div className="resume__toolbar">
            <a
              href={resumePdfUrl}
              download="Aditya_Deore_Resume.pdf"
              className="resume__action-link-btn resume__action-link-btn--primary"
            >
              <DownloadIcon size={16} />
              Download PDF
            </a>
            <a
              href={resumeDocxUrl}
              download="Aditya_Deore_Resume.docx"
              className="resume__action-link-btn"
            >
              <DownloadIcon size={16} />
              Download Word
            </a>
            <a
              href={resumeExternalLinks.driveFolder}
              target="_blank"
              rel="noopener noreferrer"
              className="resume__action-link-btn"
            >
              <ExternalLinkIcon size={16} />
              Google Drive
            </a>
            <a
              href={resumeExternalLinks.googleDocsEdit}
              target="_blank"
              rel="noopener noreferrer"
              className="resume__action-link-btn"
            >
              <ExternalLinkIcon size={16} />
              Google Docs
            </a>
            <button
              type="button"
              className={`resume__action-link-btn resume__action-link-btn--toggle ${
                showPreview ? 'resume__action-link-btn--active' : ''
              }`}
              onClick={() => setShowPreview(!showPreview)}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                className={`resume__chevron${showPreview ? ' resume__chevron--open' : ''}`}
                style={{
                  transition: 'transform 0.3s ease',
                  transform: showPreview ? 'rotate(180deg)' : 'rotate(0deg)',
                  marginRight: '0.375rem',
                }}
                aria-hidden="true"
              >
                <path
                  d="M6 9l6 6 6-6"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {showPreview ? 'Hide Preview' : 'Preview Resume'}
            </button>
          </div>

          {showPreview && (
            <div className="resume__preview-split">
              {/* Left side: Resume Preview */}
              <div className="resume__preview-left">
                <figure className="resume__page">
                  <a
                    href={resumePdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="resume__page-link"
                    aria-label="Open resume PDF in a new tab"
                  >
                    <img
                      src={resumePageImages[0]}
                      alt="Aditya Deore Resume"
                      className="resume__page-image"
                      loading="eager"
                      decoding="async"
                    />
                  </a>
                </figure>
              </div>

              {/* Right side: AI Insights */}
              <div className="resume__preview-right">
                <div className="resume__insights claude-chat-bubble">
                  <div className="claude-chat-header">
                    <div className="claude-avatar">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="claude-avatar-svg">
                        <circle cx="12" cy="12" r="10" fill="var(--color-primary)" fillOpacity="0.12" />
                        <path d="M12 8v8M8 12h8" stroke="var(--color-primary)" strokeWidth="1.75" strokeLinecap="round" />
                      </svg>
                      <span className="claude-avatar-text">Claude</span>
                      <span className="claude-avatar-tag">Recruiter Bot</span>
                    </div>
                    <div className="claude-score-badge">
                      <span className="score-num">94%</span>
                      <span className="score-label">ATS Score</span>
                    </div>
                  </div>

                  <div className="claude-chat-body">
                    <p className="claude-para">
                      I have analyzed your resume structure against industry screening filters and senior recruiter benchmarks for Machine Learning (CV/ML) and Full-Stack Engineering roles.
                    </p>

                    <div className="claude-section">
                      <h4 className="claude-subheading">Key Strengths & Role Fit</h4>
                      <ul className="claude-list">
                        <li>
                          <strong>Computer Vision Core:</strong> Strong indexing on convolutional architectures, transfer learning, precision-recall optimization, and automated training pipelines.
                        </li>
                        <li>
                          <strong>Production Ownership:</strong> ITSA Event platform demonstrates robust database architecture, transaction flows, and full-stack security integrations.
                        </li>
                        <li>
                          <strong>Quantifiable Achievements:</strong> High business clarity via impact metrics (96.3% accuracy, 40% workflow speedups, 3.5k+ active platform users).
                        </li>
                      </ul>
                    </div>

                    <div className="claude-section">
                      <h4 className="claude-subheading">Primary Keyword Matches</h4>
                      <div className="resume__tags">
                        <span className="resume__tag-pill resume__tag-pill--match">TensorFlow</span>
                        <span className="resume__tag-pill resume__tag-pill--match">Computer Vision</span>
                        <span className="resume__tag-pill resume__tag-pill--match">CNN Optimization</span>
                        <span className="resume__tag-pill resume__tag-pill--match">Transfer Learning</span>
                        <span className="resume__tag-pill resume__tag-pill--match">React.js</span>
                        <span className="resume__tag-pill resume__tag-pill--match">Node.js</span>
                        <span className="resume__tag-pill resume__tag-pill--match">Data Preprocessing</span>
                        <span className="resume__tag-pill resume__tag-pill--match">Inference Efficiency</span>
                      </div>
                    </div>

                    <div className="claude-section">
                      <h4 className="claude-subheading">Suggested Enhancements</h4>
                      <ul className="claude-list claude-list--suggestions">
                        <li>
                          Highlight cloud hosting services and containerization tools (AWS, GCP, Docker) in active project bullets to optimize for DevOps criteria.
                        </li>
                        <li>
                          Incorporate metrics for API unit testing coverage (Jest, PyTest) and robustness in backend descriptions.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
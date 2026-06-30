import { ResumeRecruiterChat } from '@/components/ui/ResumeRecruiterChat'
import { useCallback, useEffect, useRef, useState } from 'react'
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
  const [showPreview, setShowPreview] = useState(true)
  const resumeImageRef = useRef<HTMLImageElement>(null)
  const pageFrameRef = useRef<HTMLElement>(null)
  const [previewHeight, setPreviewHeight] = useState<number | null>(null)

  const syncPreviewHeight = useCallback(() => {
    const frame = pageFrameRef.current
    if (!frame) return

    const nextHeight = Math.ceil(frame.getBoundingClientRect().height)
    if (nextHeight > 0) {
      setPreviewHeight((prev) => (prev === nextHeight ? prev : nextHeight))
    }
  }, [])

  useEffect(() => {
    if (!showPreview) return

    syncPreviewHeight()

    const frame = pageFrameRef.current
    const observer = frame ? new ResizeObserver(syncPreviewHeight) : null
    if (frame && observer) observer.observe(frame)

    window.addEventListener('resize', syncPreviewHeight)
    return () => {
      observer?.disconnect()
      window.removeEventListener('resize', syncPreviewHeight)
    }
  }, [showPreview, syncPreviewHeight])

  const pairedHeightStyle =
    previewHeight != null ? { height: previewHeight, minHeight: previewHeight } : undefined

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
              {showPreview ? 'Hide Preview' : 'Show Preview'}
            </button>
          </div>

          <div
            className={`resume__preview-split${showPreview ? ' resume__preview-split--visible' : ''}`}
            aria-hidden={!showPreview}
          >
            <div className="resume__preview-left" style={pairedHeightStyle}>
              <figure className="resume__page" ref={pageFrameRef}>
                <a
                  href={resumePdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="resume__page-link"
                  aria-label="Open resume PDF in a new tab"
                >
                  <img
                    ref={resumeImageRef}
                    src={resumePageImages[0]}
                    alt="Aditya Deore Resume"
                    className="resume__page-image"
                    width={816}
                    height={1056}
                    loading="eager"
                    decoding="async"
                    onLoad={syncPreviewHeight}
                  />
                </a>
              </figure>
            </div>

            <div className="resume__preview-right" style={pairedHeightStyle}>
              <ResumeRecruiterChat />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
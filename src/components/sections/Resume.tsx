import { ResumeRecruiterChat } from '@/components/ui/ResumeRecruiterChat'
import { useCallback, useEffect, useRef, useState } from 'react'
import {
  resumePdfUrl,
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
  const [mobilePreviewOpen, setMobilePreviewOpen] = useState(false)
  const [isMobileViewport, setIsMobileViewport] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(max-width: 768px)')
    const updateViewport = () => setIsMobileViewport(media.matches)

    updateViewport()
    media.addEventListener('change', updateViewport)
    return () => media.removeEventListener('change', updateViewport)
  }, [])

  useEffect(() => {
    if (!mobilePreviewOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [mobilePreviewOpen])

  const openMobilePreview = () => {
    if (isMobileViewport) {
      setMobilePreviewOpen(true)
    }
  }

  const closeMobilePreview = () => setMobilePreviewOpen(false)

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
              download="adi resume.pdf"
              className="resume__action-link-btn resume__action-link-btn--primary"
            >
              <DownloadIcon size={16} />
              Download PDF
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
            hidden={!showPreview}
          >
            <div className="resume__preview-left">
              <figure className="resume__page">
                <a
                  href={resumePdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="resume__page-link"
                  aria-label="Open resume PDF in a new tab"
                  onClick={(event) => {
                    if (!isMobileViewport) return
                    event.preventDefault()
                    openMobilePreview()
                  }}
                >
                  <img
                    src={resumePageImages[0]}
                    alt="Aditya Deore Resume"
                    className="resume__page-image"
                    width={816}
                    height={1056}
                    loading="eager"
                    decoding="async"
                  />
                </a>
              </figure>
            </div>

            <div className="resume__preview-right">
              <ResumeRecruiterChat />
            </div>
          </div>
        </div>
      </div>

      {mobilePreviewOpen && (
        <div
          className="resume__mobile-preview"
          role="dialog"
          aria-modal="true"
          aria-label="Resume preview"
          onClick={closeMobilePreview}
        >
          <div className="resume__mobile-preview-shell" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className="resume__mobile-preview-close"
              onClick={closeMobilePreview}
              aria-label="Close resume preview"
            >
              Close
            </button>
            <div className="resume__mobile-preview-frame">
              <img
                src={resumePageImages[0]}
                alt="Aditya Deore Resume"
                className="resume__mobile-preview-image"
                loading="eager"
                decoding="async"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
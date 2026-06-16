import { useCallback, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowUpRightIcon } from '@/components/icons/social-icons'
import {
  resumeFormats,
  resumePageImages,
  resumeSection,
  type ResumeFormatId,
} from '@/data/resume'
import './Resume.css'

function DownloadIcon({ size = 18 }: { size?: number }) {
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

function ExternalLinkIcon({ size = 18 }: { size?: number }) {
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
  const [format, setFormat] = useState<ResumeFormatId>('pdf')
  const [loadedPages, setLoadedPages] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  const activeFormat = resumeFormats.find((item) => item.id === format) ?? resumeFormats[0]
  const isPdf = activeFormat.behavior === 'preview'
  const isRendering = isPdf && loadedPages < resumePageImages.length

  useEffect(() => {
    const media = window.matchMedia('(max-width: 580px)')
    const update = () => setIsMobile(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    setLoadedPages(0)
  }, [format])

  const handlePageLoad = useCallback(() => {
    setLoadedPages((count) => Math.min(count + 1, resumePageImages.length))
  }, [])

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
          <div className="resume__toolbar" role="tablist" aria-label="Resume format">
            {resumeFormats.map((item) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                id={`resume-tab-${item.id}`}
                aria-selected={format === item.id}
                aria-controls="resume-preview-panel"
                className={`resume__tab${format === item.id ? ' resume__tab--active' : ''}`}
                onClick={() => setFormat(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>

          {isPdf ? (
            <div className="resume__actions resume__actions--pdf">
              <Button asChild size="lg" className="resume__action-btn resume__action-btn--primary">
                <a href={activeFormat.downloadHref} download={activeFormat.downloadName}>
                  <DownloadIcon size={18} />
                  Download PDF
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="resume__action-btn resume__action-btn--secondary"
              >
                <a href={activeFormat.openHref} target="_blank" rel="noopener noreferrer">
                  <ExternalLinkIcon size={18} />
                  Open PDF
                  <ArrowUpRightIcon size={16} />
                </a>
              </Button>
            </div>
          ) : null}

          <article
            id="resume-preview-panel"
            className="resume__preview"
            role="tabpanel"
            aria-labelledby={`resume-tab-${format}`}
          >
            {isPdf ? (
              <>
                <div className="resume__preview-header">
                  <p className="resume__preview-label">{resumeSection.previewLabel}</p>
                  {isRendering ? (
                    <p className="resume__preview-status" aria-live="polite">
                      {resumeSection.loadingText}
                    </p>
                  ) : (
                    <p className="resume__preview-status resume__preview-status--ready">
                      {resumePageImages.length} pages
                    </p>
                  )}
                </div>

                {isMobile ? (
                  <p className="resume__mobile-hint">{resumeSection.mobileHint}</p>
                ) : null}

                <div
                  className={`resume__pages${isRendering ? ' resume__pages--loading' : ''}`}
                  aria-busy={isRendering}
                >
                  {resumePageImages.map((src, index) => (
                    <figure key={src} className="resume__page">
                      <a
                        href={activeFormat.openHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="resume__page-link"
                        aria-label={`Open resume page ${index + 1} in a new tab`}
                      >
                        <img
                          src={src}
                          alt={`Resume page ${index + 1}`}
                          className="resume__page-image"
                          loading={index === 0 ? 'eager' : 'lazy'}
                          decoding="async"
                          onLoad={handlePageLoad}
                        />
                      </a>
                      <figcaption className="resume__page-caption">
                        Page {index + 1} of {resumePageImages.length}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </>
            ) : (
              <div className="resume__external">
                <div className="resume__external-icon" aria-hidden="true">
                  <ExternalLinkIcon size={28} />
                </div>
                <h3 className="resume__external-title">
                  {activeFormat.externalTitle ?? `Open ${activeFormat.label}`}
                </h3>
                <p className="resume__external-copy">
                  {activeFormat.externalDescription ??
                    `This resume opens on ${activeFormat.label} in a new browser tab.`}
                </p>
                <div className="resume__external-actions">
                  <Button asChild size="lg" className="resume__action-btn">
                    <a href={activeFormat.openHref} target="_blank" rel="noopener noreferrer">
                      Open in {activeFormat.label}
                      <ArrowUpRightIcon size={16} />
                    </a>
                  </Button>
                  {activeFormat.downloadHref ? (
                    <Button asChild size="lg" variant="outline" className="resume__action-btn">
                      <a href={activeFormat.downloadHref} download={activeFormat.downloadName}>
                        <DownloadIcon size={18} />
                        Download {activeFormat.label}
                      </a>
                    </Button>
                  ) : null}
                </div>
              </div>
            )}
          </article>
        </div>
      </div>
    </section>
  )
}
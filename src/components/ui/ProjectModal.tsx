import { UnderLink } from '@/components/ui/UnderLink'
import type { Project } from '@/data/projects'
import { gsap, useGSAP } from '@/lib/gsap'
import { useReducedMotion } from 'motion/react'
import { useCallback, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import './ProjectModal.css'

type ProjectModalProps = {
  project: Project | null
  open: boolean
  onClose: () => void
}

export function ProjectModal({ project, open, onClose }: ProjectModalProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const backdropRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    },
    [onClose],
  )

  useEffect(() => {
    if (!open) return

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    const focusable = panelRef.current?.querySelector<HTMLElement>(
      'button, a[href], [tabindex]:not([tabindex="-1"])',
    )
    focusable?.focus()

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [open, handleKeyDown])

  useGSAP(
    () => {
      if (!open || !project || reducedMotion) return

      const panel = panelRef.current
      const backdrop = backdropRef.current
      if (!panel || !backdrop) return

      gsap.fromTo(backdrop, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: 'power2.out' })
      gsap.fromTo(
        panel,
        { y: 32, opacity: 0, scale: 0.98 },
        { y: 0, opacity: 1, scale: 1, duration: 0.55, ease: 'power3.out', delay: 0.05 },
      )

      const items = panel.querySelectorAll<HTMLElement>('.project-modal__reveal')
      gsap.fromTo(
        items,
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.06,
          ease: 'power3.out',
          delay: 0.12,
        },
      )
    },
    { dependencies: [open, project?.id, reducedMotion] },
  )

  if (!open || !project) return null

  return createPortal(
    <div className="project-modal" role="presentation">
      <button
        ref={backdropRef as never}
        type="button"
        className="project-modal__backdrop"
        aria-label="Close case study"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        className="project-modal__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
      >
        <header className="project-modal__header">
          <div className="project-modal__header-copy project-modal__reveal">
            <p className="project-modal__eyebrow">
              Case study · {project.caseStudy.year}
            </p>
            <h2 id="project-modal-title" className="project-modal__title">
              {project.title}
            </h2>
            <p className="project-modal__role">{project.caseStudy.role}</p>
          </div>
          <button
            type="button"
            className="project-modal__close"
            onClick={onClose}
            aria-label="Close"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </header>

        <div className="project-modal__media project-modal__reveal">
          <img src={project.image} alt="" width={960} height={540} />
        </div>

        <div className="project-modal__body">
          <ul className="project-modal__tags project-modal__reveal" aria-label="Technologies">
            {project.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>

          <p className="project-modal__summary project-modal__reveal">
            {project.caseStudy.summary}
          </p>

          <div className="project-modal__highlights project-modal__reveal">
            <h3>What I delivered</h3>
            <ul>
              {project.caseStudy.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <p className="project-modal__outcome project-modal__reveal">
            <strong>Impact:</strong> {project.outcome}
          </p>

          <div className="project-modal__actions project-modal__reveal">
            {project.links.map((link) => (
              <UnderLink
                key={link.label}
                href={link.href}
                className="project-modal__link"
                {...(link.external
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : undefined)}
              >
                {link.label}
              </UnderLink>
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}
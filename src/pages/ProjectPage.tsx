import { UnderLink } from '@/components/ui/UnderLink'
import { getProjectById, projects } from '@/data/projects'
import { gsap, useGSAP } from '@/lib/gsap'
import { useReducedMotion } from 'motion/react'
import { useRef } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import './ProjectPage.css'

export function ProjectPage() {
  const { id } = useParams<{ id: string }>()
  const project = id ? getProjectById(id) : undefined
  const pageRef = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()

  const currentIndex = project ? projects.findIndex((p) => p.id === project.id) : -1
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null
  const nextProject =
    currentIndex >= 0 && currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null

  useGSAP(
    () => {
      if (!project || reducedMotion) return
      const root = pageRef.current
      if (!root) return

      const items = root.querySelectorAll<HTMLElement>('.project-page__reveal')
      gsap.fromTo(
        items,
        { y: 22, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.55,
          stagger: 0.07,
          ease: 'power3.out',
          clearProps: 'opacity,transform',
        },
      )
    },
    { dependencies: [project?.id, reducedMotion] },
  )

  if (!project) {
    return <Navigate to="/#projects" replace />
  }

  return (
    <main id="main-content" className="canvas project-page" ref={pageRef} tabIndex={-1}>
      <div className="container project-page__inner">
        <header className="project-page__top project-page__reveal">
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
            All projects
          </Link>
          <p className="project-page__index">
            {String(currentIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
          </p>
        </header>

        <div className="project-page__hero project-page__reveal">
          <p className="project-page__eyebrow">
            Case study · {project.caseStudy.year}
          </p>
          <h1 className="project-page__title">{project.title}</h1>
          <p className="project-page__role">{project.caseStudy.role}</p>
        </div>

        <div className="project-page__media project-page__reveal">
          <img src={project.image} alt="" width={1200} height={675} />
        </div>

        <div className="project-page__body">
          <ul className="project-page__tags project-page__reveal" aria-label="Technologies">
            {project.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>

          <p className="project-page__summary project-page__reveal">{project.caseStudy.summary}</p>

          <div className="project-page__highlights project-page__reveal">
            <h2>What I delivered</h2>
            <ul>
              {project.caseStudy.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <p className="project-page__outcome project-page__reveal">
            <strong>Impact:</strong> {project.outcome}
          </p>

          <div className="project-page__actions project-page__reveal">
            {project.links.map((link) => (
              <UnderLink
                key={link.label}
                href={link.href}
                className="project-page__link"
                {...(link.external
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : undefined)}
              >
                {link.label}
              </UnderLink>
            ))}
          </div>
        </div>

        <nav className="project-page__nav project-page__reveal" aria-label="Adjacent projects">
          {prevProject ? (
            <Link to={`/projects/${prevProject.id}`} className="project-page__nav-link project-page__nav-link--prev">
              <span className="project-page__nav-label">Previous</span>
              <span className="project-page__nav-title">{prevProject.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {nextProject ? (
            <Link to={`/projects/${nextProject.id}`} className="project-page__nav-link project-page__nav-link--next">
              <span className="project-page__nav-label">Next</span>
              <span className="project-page__nav-title">{nextProject.title}</span>
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </div>
    </main>
  )
}
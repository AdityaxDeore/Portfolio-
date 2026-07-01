import { UnderLink } from '@/components/ui/UnderLink'
import { projects, projectsSection } from '@/data/projects'
import { getProjectCardVariant } from '@/lib/bentoLayout'
import { motion, useReducedMotion } from 'motion/react'
import { Link, useLocation } from 'react-router-dom'
import './Projects.css'

export function Projects() {
  const reducedMotion = useReducedMotion()
  const location = useLocation()
  const featuredProjectIds = new Set(['codecampus', 'projectclarity', 'braintumor'])
  const featuredProjects = projects.filter((project) => featuredProjectIds.has(project.id))
  const otherProjects = projects.filter((project) => !featuredProjectIds.has(project.id))
  const projectNavState = {
    from: {
      pathname: location.pathname,
      search: location.search,
      hash: location.hash,
    },
    fromScrollY: window.scrollY,
  }

  const renderProjectCards = (projectList: typeof projects, indexOffset = 0) =>
    projectList.map((project, index) => {
      const itemIndex = index + indexOffset
      const variant = getProjectCardVariant(itemIndex)

      return (
        <motion.li
          key={project.id}
          className={`projects__card projects__card--${variant}`}
          initial={reducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1],
            delay: reducedMotion ? 0 : index * 0.06,
          }}
        >
          <article className="projects__card-inner">
            <Link
              to={`/projects/${project.id}`}
              state={projectNavState}
              className="projects__media-link"
              aria-label={`Open case study for ${project.title}`}
            >
              <div className="projects__image-wrap">
                <img
                  className="projects__image"
                  src={project.image}
                  alt=""
                  width={640}
                  height={400}
                  loading="lazy"
                  decoding="async"
                />
                {project.highlighted && (
                  <span className="projects__highlighted-badge">Featured</span>
                )}
                <span className="projects__media-overlay">
                  <span className="projects__media-cta">View case study</span>
                </span>
              </div>
              <span className="projects__index" aria-hidden="true">
                {String(itemIndex + 1).padStart(2, '0')}
              </span>
            </Link>

            <div className="projects__body">
              <header className="projects__card-header">
                <h3 className="projects__card-title">
                  <Link to={`/projects/${project.id}`} state={projectNavState} className="projects__title-link">
                    {project.title}
                  </Link>
                </h3>
                <p className="projects__role">{project.caseStudy.role}</p>
              </header>

              <p className="projects__card-desc">{project.outcome}</p>

              <ul className="projects__tags" aria-label="Technologies">
                {project.tags.slice(0, 3).map((tag) => (
                  <li key={tag} className="projects__tag">
                    {tag}
                  </li>
                ))}
                {project.tags.length > 3 && (
                  <li className="projects__tag projects__tag--more">
                    +{project.tags.length - 3}
                  </li>
                )}
              </ul>

              <div className="projects__links">
                <Link to={`/projects/${project.id}`} state={projectNavState} className="projects__case-btn">
                  Case study
                </Link>
                {project.links.map((link) => (
                  <UnderLink
                    key={link.label}
                    href={link.href}
                    className="projects__link"
                    {...(link.external
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : undefined)}
                    onClick={(event) => event.stopPropagation()}
                  >
                    {link.label}
                  </UnderLink>
                ))}
              </div>
            </div>
          </article>
        </motion.li>
      )
    })

  return (
    <section id="projects" className="projects" aria-labelledby="projects-title">
      <div className="container">
        <header className="projects__header">
          <p className="projects__label">{projectsSection.label}</p>
          <h2 id="projects-title" className="projects__title">
            {projectsSection.title}
          </h2>
          <p className="projects__subtitle">{projectsSection.subtitle}</p>
        </header>

        <ul className="projects__masonry">
          {renderProjectCards(featuredProjects)}
        </ul>

        <header className="projects__header projects__header--secondary">
          <h3 className="projects__title">Projects</h3>
        </header>

        <ul className="projects__masonry">
          {renderProjectCards(otherProjects, featuredProjects.length)}
        </ul>
      </div>
    </section>
  )
}

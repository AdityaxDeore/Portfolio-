import { UnderLink } from '@/components/ui/UnderLink'
import { projects, projectsSection } from '@/data/projects'
import { motion, useReducedMotion } from 'motion/react'
import { Link } from 'react-router-dom'
import './Projects.css'

export function Projects() {
  const reducedMotion = useReducedMotion()

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

        <ul className="projects__grid">
          {projects.map((project, index) => (
            <motion.li
              key={project.id}
              className="projects__card"
              initial={reducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
                delay: reducedMotion ? 0 : index * 0.05,
              }}
            >
              <article className="projects__card-inner">
                <Link
                  to={`/projects/${project.id}`}
                  className="projects__media-btn"
                  aria-label={`Open case study for ${project.title}`}
                >
                  <div className="projects__image-mask">
                    <img
                      className="projects__image"
                      src={project.image}
                      alt=""
                      width={640}
                      height={400}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <span className="projects__media-overlay">
                    <span className="projects__media-cta">View case study</span>
                  </span>
                  <span className="projects__index" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </Link>

                <div className="projects__body">
                  <ul className="projects__tags" aria-label="Technologies">
                    {project.tags.map((tag) => (
                      <li key={tag} className="projects__tag">
                        {tag}
                      </li>
                    ))}
                  </ul>
                  <h3 className="projects__card-title">
                    <Link to={`/projects/${project.id}`} className="projects__title-link">
                      {project.title}
                    </Link>
                  </h3>
                  <p className="projects__outcome">{project.outcome}</p>
                  <div className="projects__links">
                    <Link to={`/projects/${project.id}`} className="projects__case-btn">
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
          ))}
        </ul>
      </div>
    </section>
  )
}
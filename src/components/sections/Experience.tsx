import { experienceItems, experienceSection } from '@/data/experience'
import { motion, useReducedMotion } from 'motion/react'
import './Experience.css'

export function Experience() {
  const reducedMotion = useReducedMotion()

  return (
    <section id="experience" className="experience" aria-labelledby="experience-title">
      <div className="container">
        <header className="experience__header">
          <p className="experience__label">{experienceSection.label}</p>
          <h2 id="experience-title" className="experience__title">
            {experienceSection.title}
          </h2>
          <p className="experience__subtitle">{experienceSection.subtitle}</p>
        </header>

        <ol className="experience__timeline">
          {experienceItems.map((item, index) => (
            <motion.li
              key={item.id}
              className="experience__item"
              initial={reducedMotion ? false : { opacity: 0, x: -16 }}
              whileInView={reducedMotion ? undefined : { opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
                delay: reducedMotion ? 0 : index * 0.08,
              }}
            >
              <div className="experience__marker" aria-hidden="true">
                <div className={`experience__logo-box experience__logo-box--${item.id}`}>
                  {item.id === 'itsa-web-dev' ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="16 18 22 12 16 6" />
                      <polyline points="8 6 2 12 8 18" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="5" r="2.5" />
                      <circle cx="5" cy="12" r="2.5" />
                      <circle cx="19" cy="12" r="2.5" />
                      <circle cx="12" cy="19" r="2.5" />
                      <line x1="12" y1="7.5" x2="12" y2="16.5" />
                      <line x1="6.77" y1="10.23" x2="17.23" y2="13.77" />
                      <line x1="6.77" y1="13.77" x2="17.23" y2="10.23" />
                    </svg>
                  )}
                </div>
              </div>

              <article className="experience__card">
                <header className="experience__card-header">
                  <div>
                    <p className="experience__role">{item.role}</p>
                    <h3 className="experience__company">{item.company}</h3>
                  </div>
                  <div className="experience__meta">
                    <span className="experience__period">{item.period}</span>
                    <span className="experience__location">{item.location}</span>
                    <span className="experience__type">{item.type}</span>
                  </div>
                </header>

                <p className="experience__summary">{item.summary}</p>

                <ul className="experience__highlights">
                  {item.highlights.map((highlight) => (
                    <li key={highlight} dangerouslySetInnerHTML={{ __html: highlight }} />
                  ))}
                </ul>

                <ul className="experience__tech" aria-label="Technologies">
                  {item.tech.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>
              </article>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
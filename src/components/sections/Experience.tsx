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
              initial={reducedMotion ? false : { opacity: 0, y: 16 }}
              whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
                delay: reducedMotion ? 0 : index * 0.08,
              }}
            >
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

                {item.milestones && (
                  <div className="experience__milestones-container">
                    <h4 className="experience__milestones-title">Timeline of Milestones & Key Events</h4>
                    <div className="experience__milestones-list">
                      {item.milestones.map((milestone, idx) => (
                        <div key={idx} className="experience__milestone-step">
                          <div className="experience__milestone-indicator">
                            <span className="experience__milestone-dot"></span>
                            {idx < item.milestones!.length - 1 && <span className="experience__milestone-line"></span>}
                          </div>
                          <div className="experience__milestone-content">
                            <div className="experience__milestone-header">
                              <span className="experience__milestone-date">{milestone.date}</span>
                              <h5 className="experience__milestone-name">{milestone.title}</h5>
                            </div>
                            <p className="experience__milestone-desc">{milestone.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

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
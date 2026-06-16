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
                <span className="experience__dot" />
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
                    <li key={highlight}>{highlight}</li>
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
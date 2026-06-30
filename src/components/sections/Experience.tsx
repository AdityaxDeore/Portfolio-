import { experienceItems, experienceSection } from '@/data/experience'
import type { CSSProperties } from 'react'
import { useState } from 'react'
import './Experience.css'

const typeLabels: Record<string, string> = {
  'part-time': 'Part-time',
  internship: 'Internship',
  freelance: 'Freelance',
  contract: 'Contract',
  'full-time': 'Full-time',
}

function tileStyle(index: number): CSSProperties {
  return { '--tile-i': index } as CSSProperties
}

export function Experience() {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const toggleCard = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id))
  }

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

        <div className="experience__stack">
          {experienceItems.map((item, index) => {
            const isOpen = expandedId === item.id || hoveredId === item.id
            let tileIndex = 0

            return (
              <article
                key={item.id}
                className={`experience__card${isOpen ? ' experience__card--open' : ''}`}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <button
                  type="button"
                  className="experience__card-trigger"
                  onClick={() => toggleCard(item.id)}
                  aria-expanded={isOpen}
                  aria-controls={`experience-panel-${item.id}`}
                >
                  <span className="experience__card-index">{String(index + 1).padStart(2, '0')}</span>

                  <div className="experience__card-headline">
                    <p className="experience__card-tag">{typeLabels[item.type] ?? item.type}</p>
                    <h3 className="experience__card-role">{item.role}</h3>
                    <p className="experience__card-company">{item.company}</p>
                  </div>

                  <div className="experience__card-meta">
                    <span className="experience__card-period">{item.period}</span>
                    <span className="experience__card-location">{item.location}</span>
                  </div>

                  <span className="experience__card-hint">Hover to explore</span>
                  <span className="experience__card-chevron" aria-hidden="true" />
                </button>

                <div
                  id={`experience-panel-${item.id}`}
                  className="experience__card-panel"
                  aria-hidden={!isOpen}
                >
                  <div className="experience__card-panel-inner">
                    <div className="experience__bento">
                      <div
                        className="experience__bento-tile experience__bento-tile--summary experience__bento-tile--accent"
                        style={tileStyle(tileIndex++)}
                      >
                        <p className="experience__bento-label">Overview</p>
                        <p className="experience__summary">{item.summary}</p>
                      </div>

                      <div
                        className="experience__bento-tile experience__bento-tile--stats experience__bento-tile--light"
                        style={tileStyle(tileIndex++)}
                      >
                        <p className="experience__bento-label">At a glance</p>
                        <ul className="experience__stats">
                          <li>
                            <span className="experience__stat-value">{item.highlights.length}</span>
                            <span className="experience__stat-key">Key wins</span>
                          </li>
                          {item.milestones && (
                            <li>
                              <span className="experience__stat-value">{item.milestones.length}</span>
                              <span className="experience__stat-key">Milestones</span>
                            </li>
                          )}
                          <li>
                            <span className="experience__stat-value">{item.tech.length}</span>
                            <span className="experience__stat-key">Technologies</span>
                          </li>
                        </ul>
                      </div>

                      <div
                        className="experience__bento-section experience__bento-section--highlights"
                        style={tileStyle(tileIndex++)}
                      >
                        <p className="experience__bento-section-label">Key contributions</p>
                        <div className="experience__highlight-grid">
                          {item.highlights.map((highlight) => (
                            <div
                              key={highlight}
                              className="experience__bento-tile experience__bento-tile--light experience__bento-tile--highlight"
                              style={tileStyle(tileIndex++)}
                            >
                              <p
                                className="experience__highlight-text"
                                dangerouslySetInnerHTML={{ __html: highlight }}
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      {item.milestones && (
                        <div
                          className="experience__bento-section experience__bento-section--milestones"
                          style={tileStyle(tileIndex++)}
                        >
                          <p className="experience__bento-section-label">Timeline &amp; milestones</p>
                          <div className="experience__milestone-grid">
                            {item.milestones.map((milestone) => (
                              <div
                                key={`${milestone.date}-${milestone.title}`}
                                className="experience__bento-tile experience__bento-tile--light experience__bento-tile--milestone"
                                style={tileStyle(tileIndex++)}
                              >
                                <span className="experience__milestone-date">{milestone.date}</span>
                                <h4 className="experience__milestone-title">{milestone.title}</h4>
                                <p className="experience__milestone-desc">{milestone.description}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div
                        className="experience__bento-tile experience__bento-tile--tech experience__bento-tile--accent"
                        style={tileStyle(tileIndex++)}
                      >
                        <p className="experience__bento-label experience__bento-label--on-accent">
                          Technologies
                        </p>
                        <ul className="experience__tech" aria-label="Technologies">
                          {item.tech.map((tech) => (
                            <li key={tech}>{tech}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

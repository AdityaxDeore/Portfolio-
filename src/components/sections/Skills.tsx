import PlugConnectedIcon from '@/components/icons/plug-connected-icon'
import { SkillMarquee } from '@/components/ui/SkillMarquee'
import { getSkillIconUrl, skillCategories } from '@/data/skills'
import { useSkillsScrollAnimation } from '@/hooks/useSkillsScrollAnimation'
import { useTheme } from '@/providers/ThemeProvider'
import { CheckCircle2 } from 'lucide-react'
import './Skills.css'

export function Skills() {
  const { theme } = useTheme()
  const sectionRef = useSkillsScrollAnimation()

  return (
    <section id="skills" className="skills" ref={sectionRef} aria-labelledby="skills-title">
      <div className="container">
        <header className="skills__header">
          <div className="skills__label-row skills__reveal">
            <PlugConnectedIcon size={22} color="var(--color-primary)" strokeWidth={2} />
            <p className="skills__label">05 — Skills</p>
          </div>
          <h2 id="skills-title" className="skills__title skills__reveal">
            My toolkit
          </h2>
          <p className="skills__description skills__reveal">
            Languages, ML stacks, frameworks, and tools I use to ship production-ready work.
          </p>
        </header>

        <SkillMarquee />

        <div className="skills__grid">
          {skillCategories.map((category, index) => (
            <article key={category.id} className="skills__card skills__reveal-group">
              <div className="skills__card-head">
                <span className="skills__card-index" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="skills__card-title">{category.title}</h3>
              </div>

              <ul className="skills__chips">
                {category.skills.map((skill) => {
                  const iconSrc = skill.iconSrc ?? (skill.slug ? getSkillIconUrl(skill.slug, theme) : null)

                  return (
                    <li key={skill.name} className="skills__chip">
                      {iconSrc ? (
                        <img
                          className="skills__chip-icon"
                          src={iconSrc}
                          alt=""
                          width={28}
                          height={28}
                          loading="lazy"
                          decoding="async"
                        />
                      ) : (
                        <CheckCircle2 className="skills__chip-icon" size={24} color="var(--color-primary)" strokeWidth={2} />
                      )}
                      <span className="skills__chip-label">{skill.name}</span>
                    </li>
                  )
                })}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
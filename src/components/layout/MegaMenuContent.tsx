import { projects } from '@/data/projects'
import { experienceItems } from '@/data/experience'
import { skillCategories } from '@/data/skills'
import { valuePillars } from '@/data/value'
import { Link } from 'react-router-dom'
import './MegaMenuContent.css'

export function MegaMenuContent({ section }: { section: string }) {
  if (section === 'projects') {
    const featured = projects.slice(0, 3)
    return (
      <div className="mega-content__grid mega-content__grid--projects">
        {featured.map((project) => (
          <Link key={project.id} to={`/projects/${project.id}`} className="mega-content__project">
            <img src={project.image} alt={project.title} className="mega-content__project-thumb" />
            <div>
              <p className="mega-content__project-title">{project.title}</p>
              <p className="mega-content__project-desc">{project.outcome}</p>
            </div>
          </Link>
        ))}
      </div>
    )
  }

  if (section === 'experience') {
    return (
      <div className="mega-content__grid mega-content__grid--experience">
        {experienceItems.slice(0, 4).map((item) => (
          <div key={item.id} className="mega-content__exp">
            <p className="mega-content__exp-role">{item.role}</p>
            <p className="mega-content__exp-company">{item.company}</p>
            <p className="mega-content__exp-period">{item.period}</p>
          </div>
        ))}
      </div>
    )
  }

  if (section === 'skills') {
    const allSkills = skillCategories.flatMap((cat) => cat.skills).slice(0, 16)
    return (
      <div className="mega-content__grid mega-content__grid--skills">
        {allSkills.map((skill) => (
          <span key={skill.name} className="mega-content__skill">
            {skill.name}
          </span>
        ))}
      </div>
    )
  }

  if (section === 'expertise') {
    const featured = valuePillars.slice(0, 3)
    return (
      <div className="mega-content__grid mega-content__grid--expertise">
        {featured.map((pillar) => (
          <div key={pillar.id} className="mega-content__expertise">
            <p className="mega-content__expertise-tag">{pillar.tag}</p>
            <h4 className="mega-content__expertise-title">{pillar.label}</h4>
          </div>
        ))}
      </div>
    )
  }

  return null
}

import React from 'react'
import { projects } from '@/data/projects'
import { experienceItems } from '@/data/experience'
import { skillCategories } from '@/data/skills'
import { valuePillars } from '@/data/value'
import { Link } from 'react-router-dom'
import './MegaMenuPanel.css'

type MegaMenuSection = 'projects' | 'experience' | 'skills' | 'expertise'

const MENU_SECTIONS: Record<string, MegaMenuSection | null> = {
  projects: 'projects',
  experience: 'experience',
  skills: 'skills',
  expertise: 'expertise',
}

export function getMegaMenuSection(sectionId: string): MegaMenuSection | null {
  return MENU_SECTIONS[sectionId] ?? null
}

function ProjectsPanel() {
  const featured = projects.slice(0, 3)
  return (
    <>
      <h3 className="mega-menu__section-title">Selected Work</h3>
      <div className="mega-menu__grid mega-menu__grid--projects">
        {featured.map((project) => (
          <Link
            key={project.id}
            to={`/projects/${project.id}`}
            className="mega-menu__project"
          >
            <img
              className="mega-menu__project-thumb"
              src={project.image}
              alt=""
              width={320}
              height={200}
              loading="lazy"
              decoding="async"
            />
            <p className="mega-menu__project-title">{project.title}</p>
            <ul className="mega-menu__project-tags">
              {project.tags.slice(0, 3).map((tag) => (
                <li key={tag} className="mega-menu__project-tag">
                  {tag}
                </li>
              ))}
            </ul>
          </Link>
        ))}
      </div>
    </>
  )
}

function ExperiencePanel() {
  return (
    <>
      <h3 className="mega-menu__section-title">Experience</h3>
      <div className="mega-menu__grid mega-menu__grid--experience">
        {experienceItems.map((item) => (
          <div key={item.id} className="mega-menu__exp">
            <p className="mega-menu__exp-role">{item.role}</p>
            <p className="mega-menu__exp-company">{item.company}</p>
            <p className="mega-menu__exp-period">{item.period}</p>
          </div>
        ))}
      </div>
    </>
  )
}

function SkillsPanel() {
  const allSkills = skillCategories.flatMap((cat) => cat.skills).slice(0, 16)
  return (
    <>
      <h3 className="mega-menu__section-title">Skills &amp; Tools</h3>
      <div className="mega-menu__grid mega-menu__grid--skills">
        {allSkills.map((skill) => (
          <span key={skill.name} className="mega-menu__skill">
            {skill.name}
          </span>
        ))}
      </div>
    </>
  )
}

function ExpertisePanel() {
  const featured = valuePillars.slice(0, 3)
  return (
    <>
      <h3 className="mega-menu__section-title">Expertise</h3>
      <div className="mega-menu__grid mega-menu__grid--expertise">
        {featured.map((pillar) => (
          <div key={pillar.id} className="mega-menu__expertise">
            <p className="mega-menu__expertise-tag">{pillar.tag}</p>
            <h4 className="mega-menu__expertise-title">{pillar.label}</h4>
            <p className="mega-menu__expertise-desc">{pillar.description}</p>
          </div>
        ))}
      </div>
    </>
  )
}

const panelMap: Record<MegaMenuSection, React.ComponentType> = {
  projects: ProjectsPanel,
  experience: ExperiencePanel,
  skills: SkillsPanel,
  expertise: ExpertisePanel,
}

export function MegaMenuPanel({
  activeSection,
  onClose,
}: {
  activeSection: MegaMenuSection | null
  onClose: () => void
}) {
  const PanelContent = activeSection ? panelMap[activeSection] : null
  const isOpen = activeSection !== null

  return (
    <>
      <div
        className={`mega-menu__backdrop${isOpen ? ' mega-menu__backdrop--visible' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={`mega-menu${isOpen ? ' mega-menu--open' : ''}`}
        onMouseLeave={onClose}
      >
        <div className="mega-menu__panel">
          <div className="container">
            {PanelContent && <PanelContent />}
          </div>
        </div>
      </div>
    </>
  )
}

/* ---- Mobile accordion items for the mobile sheet ---- */

function ChevronDown() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mega-menu__accordion-chevron"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

const accordionData: {
  section: MegaMenuSection
  label: string
  items: { label: string; href: string }[]
}[] = [
  {
    section: 'expertise',
    label: 'Expertise',
    items: valuePillars.slice(0, 4).map((p) => ({
      label: p.label,
      href: '/#expertise',
    })),
  },
  {
    section: 'experience',
    label: 'Experience',
    items: experienceItems.map((e) => ({
      label: `${e.role} — ${e.company}`,
      href: '/#experience',
    })),
  },
  {
    section: 'projects',
    label: 'Work',
    items: projects.slice(0, 4).map((p) => ({
      label: p.title,
      href: `/projects/${p.id}`,
    })),
  },
  {
    section: 'skills',
    label: 'Skills',
    items: skillCategories.map((c) => ({
      label: c.title,
      href: '/#skills',
    })),
  },
]

export function MobileAccordionNav({
  onNavigate,
}: {
  onNavigate: () => void
}) {
  const [openSection, setOpenSection] = React.useState<string | null>(null)

  const toggle = (section: string) => {
    setOpenSection((prev) => (prev === section ? null : section))
  }

  return (
    <>
      {accordionData.map((group) => (
        <div key={group.section} className="top-nav__mobile-accordion">
          <button
            type="button"
            className="mega-menu__accordion-btn"
            onClick={() => toggle(group.section)}
            aria-expanded={openSection === group.section}
          >
            {group.label}
            <ChevronDown />
          </button>
          <div
            className={`mega-menu__accordion-content${
              openSection === group.section ? ' mega-menu__accordion-content--open' : ''
            }`}
          >
            <div className="mega-menu__accordion-inner">
              {group.items.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="mega-menu__accordion-link"
                  onClick={onNavigate}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      ))}
    </>
  )
}


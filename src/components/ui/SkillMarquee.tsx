import { getSkillIconUrl, getMarqueeSkills, type SkillItem } from '@/data/skills'
import { useTheme } from '@/providers/ThemeProvider'
import './SkillMarquee.css'

function SkillMarqueeItem({ skill, theme }: { skill: SkillItem; theme: 'light' | 'dark' }) {
  const iconSrc = skill.iconSrc ?? (skill.slug ? getSkillIconUrl(skill.slug, theme) : null)

  return (
    <span className="skill-marquee__item">
      {iconSrc ? (
        <img
          className="skill-marquee__icon"
          src={iconSrc}
          alt=""
          width={36}
          height={36}
          loading="lazy"
          decoding="async"
        />
      ) : (
        <span className="skill-marquee__dot" aria-hidden="true" />
      )}
      <span className="skill-marquee__label">{skill.name}</span>
    </span>
  )
}

export function SkillMarquee() {
  const { theme } = useTheme()
  const skills = getMarqueeSkills()
  const row = [...skills, ...skills]

  return (
    <div className="skill-marquee" aria-hidden="true">
      <div className="skill-marquee__track">
        {row.map((skill, index) => (
          <SkillMarqueeItem key={`${skill.name}-${index}`} skill={skill} theme={theme} />
        ))}
      </div>
      <p className="sr-only">{skills.map((skill) => skill.name).join(', ')}</p>
    </div>
  )
}
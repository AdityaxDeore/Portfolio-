import { AmbientVideo } from '@/components/ui/AmbientVideo'
import { RotatingTagline } from '@/components/ui/RotatingTagline'
import { aboutProfile, aboutRevealLines, aboutRotatingKeywords } from '@/data/about'
import { useRef } from 'react'
import './About.css'

const HERO_VIDEO_SRC = '/videos/hero-ambient.mp4'

export function About() {
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <section
      id="about"
      className="about"
      ref={sectionRef}
      aria-labelledby="about-title"
    >
      <AmbientVideo src={HERO_VIDEO_SRC} className="about__ambient" opacity={0.16} />

      <div className="about__sticky">
        <div className="container about__layout">
          <div className="about__content">
            <p className="about__label">01 — About</p>

            {aboutRevealLines.map((line) => {
              if (line.id === 'name') {
                return (
                  <h1 key={line.id} id="about-title" className={line.lineClass}>
                    {aboutProfile.shortName}
                  </h1>
                )
              }

              return (
                <p key={line.id} className={line.lineClass}>
                  {line.text}
                </p>
              )
            })}

            <RotatingTagline words={aboutRotatingKeywords} className="about__rotating" />
            <p className="about__tagline">{aboutProfile.valueProp}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
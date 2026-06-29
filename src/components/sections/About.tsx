import { RotatingTagline } from '@/components/ui/RotatingTagline'
import { aboutRotatingKeywords } from '@/data/about'
import { useRef } from 'react'
import './About.css'

const InfoIcon = ({ type }: { type: 'website' | 'phone' | 'address' }) => {
  const icons = {
    website: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="2" x2="22" y1="12" y2="12"></line>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
      </svg>
    ),
    phone: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
      </svg>
    ),
    address: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
        <circle cx="12" cy="10" r="3"></circle>
      </svg>
    ),
  };
  return <span className="mr-2 inline-flex items-center justify-center shrink-0">{icons[type]}</span>;
};

export function About() {
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <section
      id="about"
      className="about"
      ref={sectionRef}
      aria-labelledby="about-title"
    >
      <div className="about__sticky">
        <div className="container about__layout">
          <div className="about__content">
            <div className="about__group about__group--identity">
              <p className="about__label">01 — About</p>
              <h1 id="about-title" className="about__line about__line--name">Aditya Deore</h1>
              <p className="about__line about__line--role">Machine Learning Engineer &amp; Full-Stack Developer</p>
              <p className="about__line about__line--meta">Pune, India · B.Tech IT @ PCCOE</p>
            </div>

            <div className="about__group about__group--bio">
              <RotatingTagline words={aboutRotatingKeywords} className="about__rotating" />
              <p className="about__tagline">I build ML systems and full-stack products that ship to production.</p>
            </div>

            <div className="about__group about__group--actions">
              <div className="about__contact-grid">
                <div className="about__contact-item">
                  <InfoIcon type="website" />
                  <span>github.com/AdityaxDeore</span>
                </div>
                <div className="about__contact-item">
                  <InfoIcon type="phone" />
                  <span>8010767685</span>
                </div>
                <div className="about__contact-item">
                  <InfoIcon type="address" />
                  <span>Pune, India</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
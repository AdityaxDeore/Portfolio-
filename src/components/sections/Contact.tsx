import { FooterMarquee } from '@/components/ui/FooterMarquee'
import { PulseButton } from '@/components/ui/PulseButton'
import { UnderLink } from '@/components/ui/UnderLink'
import { aboutProfile } from '@/data/about'
import { contactEmail, contactLinks, contactSection } from '@/data/contact'
import {
  ArrowUpRightIcon,
  GithubIcon,
  LinkedinIcon,
  MailIcon,
} from '@/components/icons/social-icons'
import { motion, useReducedMotion } from 'motion/react'
import type { ComponentType } from 'react'
import './Contact.css'

const contactIcons: Record<string, ComponentType<{ size?: number }>> = {
  email: MailIcon,
  linkedin: LinkedinIcon,
  github: GithubIcon,
}

const footerMarqueeText = `${aboutProfile.shortName} · ${aboutProfile.role}`

export function Contact() {
  const reducedMotion = useReducedMotion()

  return (
    <section id="contact" className="contact" aria-labelledby="contact-title">
      <div className="container">
        <motion.header
          className="contact__header"
          initial={reducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="contact__label">{contactSection.label}</p>
          <h2 id="contact-title" className="contact__title">
            {contactSection.title}
          </h2>
          <p className="contact__description">{contactSection.description}</p>
        </motion.header>

        <ul className="contact__links">
          {contactLinks.map((link, index) => {
            const Icon = contactIcons[link.id]
            return (
              <motion.li
                key={link.id}
                className="contact__item"
                initial={reducedMotion ? false : { opacity: 0, y: 14 }}
                whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                  delay: reducedMotion ? 0 : index * 0.07,
                }}
              >
                <UnderLink
                  href={link.href}
                  className="contact__link"
                  {...(link.external
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : undefined)}
                >
                  <span className="contact__link-icon" aria-hidden="true">
                    {Icon ? <Icon size={20} /> : null}
                  </span>
                  <span className="contact__link-copy">
                    <span className="contact__link-label">{link.label}</span>
                    <span className="contact__link-value">{link.description}</span>
                  </span>
                  <span className="contact__link-arrow" aria-hidden="true">
                    <ArrowUpRightIcon size={18} />
                  </span>
                </UnderLink>
              </motion.li>
            )
          })}
        </ul>

        <motion.div
          className="contact__cta"
          initial={reducedMotion ? false : { opacity: 0, y: 12 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        >
          <PulseButton
            href={`mailto:${contactEmail}`}
            className="contact__cta-btn"
            showLoaderOnClick
          >
            Send an email
          </PulseButton>
        </motion.div>
      </div>

      <FooterMarquee text={footerMarqueeText} />
    </section>
  )
}
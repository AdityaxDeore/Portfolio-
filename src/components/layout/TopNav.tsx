import { gsap, useGSAP } from '@/lib/gsap'
import { useEffect, useRef, useState } from 'react'
import { navItems, contactEmail, socialLinks } from '@/data/navigation'
import { PulseButton } from '@/components/ui/PulseButton'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { GithubIcon, LinkedinIcon } from '@/components/icons/social-icons'
import type { ComponentType } from 'react'
import './TopNav.css'

const navSocialIcons: Record<string, ComponentType<{ size?: number }>> = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
}

function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  )
}

export function TopNav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const mobileNavRef = useRef<HTMLElement>(null)

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    const closeOnResize = () => {
      if (window.innerWidth > 900) setMenuOpen(false)
    }
    window.addEventListener('resize', closeOnResize)
    return () => window.removeEventListener('resize', closeOnResize)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  useGSAP(
    () => {
      const nav = mobileNavRef.current
      if (!nav || !menuOpen) return

      const items = [
        ...gsap.utils.toArray<HTMLElement>('.top-nav__mobile-link', nav),
        ...gsap.utils.toArray<HTMLElement>('.top-nav__mobile-social-link', nav),
        nav.querySelector<HTMLElement>('.top-nav__mobile-cta'),
      ].filter(Boolean)

      gsap.fromTo(
        items,
        { y: 22, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.42,
          stagger: 0.05,
          ease: 'power3.out',
          delay: 0.04,
          clearProps: 'opacity,transform',
        },
      )
    },
    { dependencies: [menuOpen], scope: mobileNavRef },
  )

  return (
    <header className="top-nav">
      <div className="container top-nav__inner">
        <nav className="top-nav__links" aria-label="Primary">
          {navItems.map((link) => (
            <a key={link.href} href={link.href} className="top-nav__link">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="top-nav__actions">
          {socialLinks.map((link) => {
            const Icon = navSocialIcons[link.id]
            return (
              <a
                key={link.id}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="top-nav__icon-link"
                aria-label={`${link.label} profile`}
              >
                {Icon ? <Icon size={20} /> : null}
              </a>
            )
          })}
          <ThemeToggle />
          <PulseButton
            href={`mailto:${contactEmail}`}
            className="top-nav__cta"
            pulseClassName="top-nav__cta-wrap"
          >
            Get in touch
          </PulseButton>
          <button
            type="button"
            className="top-nav__menu-btn"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      <nav
        id="mobile-nav"
        ref={mobileNavRef}
        className={`top-nav__mobile-sheet${menuOpen ? ' top-nav__mobile-sheet--open' : ''}`}
        aria-label="Mobile"
        aria-hidden={!menuOpen}
      >
        {navItems.map((link) => (
          <a key={link.href} href={link.href} className="top-nav__mobile-link" onClick={closeMenu}>
            {link.label}
          </a>
        ))}
        <div className="top-nav__mobile-social">
          {socialLinks.map((link) => {
            const Icon = navSocialIcons[link.id]
            return (
              <a
                key={link.id}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="top-nav__mobile-social-link"
                aria-label={`${link.label} profile`}
                onClick={closeMenu}
              >
                {Icon ? <Icon size={18} /> : null}
                <span>{link.label}</span>
              </a>
            )
          })}
        </div>
        <PulseButton
          href={`mailto:${contactEmail}`}
          className="top-nav__mobile-cta"
          pulseClassName="top-nav__mobile-cta-wrap"
          onClick={closeMenu}
        >
          Get in touch
        </PulseButton>
      </nav>
    </header>
  )
}
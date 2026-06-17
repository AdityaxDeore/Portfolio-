import { gsap, useGSAP } from '@/lib/gsap'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { navItems, contactEmail, socialLinks } from '@/data/navigation'
import { PulseButton } from '@/components/ui/PulseButton'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { GithubIcon, LinkedinIcon } from '@/components/icons/social-icons'
import { MegaMenuPanel, MobileAccordionNav, getMegaMenuSection } from '@/components/layout/MegaMenuPanel'
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

// Sections that get a mega-menu dropdown
const MEGA_MENU_SECTIONS = new Set(['projects', 'experience', 'skills', 'expertise'])

export function TopNav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const mobileNavRef = useRef<HTMLElement>(null)
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (pathname !== '/') {
      setActiveSection(null)
      return
    }

    const sectionIds = navItems
      .map((link) => link.href.split('#')[1])
      .filter(Boolean)

    const updateActiveSection = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.35
      let currentSection = sectionIds[0] ?? null

      for (const sectionId of sectionIds) {
        const section = document.getElementById(sectionId)
        if (!section) continue

        if (section.offsetTop <= scrollPosition) {
          currentSection = sectionId
        } else {
          break
        }
      }

      setActiveSection(currentSection)
    }

    let rafId: number | null = null

    const onScroll = () => {
      if (rafId !== null) return

      rafId = window.requestAnimationFrame(() => {
        rafId = null
        updateActiveSection()
      })
    }

    updateActiveSection()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId)
      }
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [pathname])

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

  // Close dropdown on Escape
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveDropdown(null)
    }
    if (activeDropdown) {
      window.addEventListener('keydown', onKeyDown)
      return () => window.removeEventListener('keydown', onKeyDown)
    }
  }, [activeDropdown])

  const closeMenu = () => setMenuOpen(false)

  const directNavItems = navItems.filter(
    (link) => !MEGA_MENU_SECTIONS.has(link.href.split('#')[1] ?? '')
  )

  const handleLinkMouseEnter = useCallback((sectionId: string) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
    if (MEGA_MENU_SECTIONS.has(sectionId)) {
      setActiveDropdown(sectionId)
    }
  }, [])

  const handleLinkMouseLeave = useCallback(() => {
    closeTimerRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 200)
  }, [])

  const handleDropdownClose = useCallback(() => {
    setActiveDropdown(null)
  }, [])

  useGSAP(
    () => {
      const nav = mobileNavRef.current
      if (!nav || !menuOpen) return

      const items = [
        ...gsap.utils.toArray<HTMLElement>('.top-nav__mobile-link', nav),
        ...gsap.utils.toArray<HTMLElement>('.top-nav__mobile-accordion', nav),
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
        <div />

        <nav className="top-nav__links" aria-label="Primary">
          {navItems.map((link) => {
            const sectionId = link.href.split('#')[1]
            const isActive =
              pathname === '/' && (hash ? hash === `#${sectionId}` : activeSection === sectionId)
            const hasMegaMenu = MEGA_MENU_SECTIONS.has(sectionId ?? '')
            return (
              <a
                key={link.href}
                href={link.href}
                className={`top-nav__link${isActive ? ' top-nav__link--active' : ''}${
                  activeDropdown === sectionId ? ' top-nav__link--dropdown-open' : ''
                }`}
                onMouseEnter={() => sectionId && handleLinkMouseEnter(sectionId)}
                onMouseLeave={handleLinkMouseLeave}
                aria-haspopup={hasMegaMenu ? 'true' : undefined}
                aria-expanded={hasMegaMenu ? activeDropdown === sectionId : undefined}
              >
                {link.label}
              </a>
            )
          })}
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

      {/* Desktop mega-menu dropdown */}
      <MegaMenuPanel
        activeSection={getMegaMenuSection(activeDropdown ?? '')}
        onClose={handleDropdownClose}
      />

      {/* Mobile navigation sheet */}
      <nav
        id="mobile-nav"
        ref={mobileNavRef}
        className={`top-nav__mobile-sheet${menuOpen ? ' top-nav__mobile-sheet--open' : ''}`}
        aria-label="Mobile"
        aria-hidden={!menuOpen}
      >
        {/* Direct links (no sub-items) */}
        {directNavItems.map((link) => (
          <a key={link.href} href={link.href} className="top-nav__mobile-link" onClick={closeMenu}>
            {link.label}
          </a>
        ))}

        {/* Accordion sections for mega-menu items */}
        <MobileAccordionNav onNavigate={closeMenu} />

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
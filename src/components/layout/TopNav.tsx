import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { navItems, contactEmail, socialLinks } from '@/data/navigation'
import { PulseButton } from '@/components/ui/PulseButton'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { GithubIcon, LinkedinIcon } from '@/components/icons/social-icons'
import { MegaMenuContent } from '@/components/layout/MegaMenuContent'
import type { ComponentType } from 'react'
import './TopNav.css'

const navSocialIcons: Record<string, ComponentType<{ size?: number }>> = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
}

const MEGA_MENU_SECTIONS = new Set(['projects', 'experience', 'skills', 'expertise'])

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
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

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

  const handleMouseEnter = (section: string) => {
    if (timerRef.current) clearTimeout(timerRef.current)
    if (MEGA_MENU_SECTIONS.has(section)) {
      setActiveDropdown(section)
    } else {
      setActiveDropdown(null)
    }
  }

  const handleMouseLeave = () => {
    timerRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 200)
  }

  return (
    <header className="top-nav" onMouseLeave={handleMouseLeave}>
      <div className="container top-nav__inner">
        <div className="top-nav__logo">
          {/* Logo placeholder */}
        </div>

        <nav className="top-nav__links" aria-label="Primary">
          {navItems.map((link) => {
            const sectionId = link.href.split('#')[1] || ''
            return (
              <div 
                key={link.href} 
                className="top-nav__link-wrapper"
                onMouseEnter={() => handleMouseEnter(sectionId)}
              >
                <a
                  href={link.href}
                  className="top-nav__link"
                >
                  {link.label}
                </a>
              </div>
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
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {activeDropdown && (
          <motion.div 
            className="top-nav__dropdown"
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            onMouseEnter={() => {
              if (timerRef.current) clearTimeout(timerRef.current)
            }}
            onMouseLeave={handleMouseLeave}
          >
            <div className="container">
              <MegaMenuContent section={activeDropdown} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            className="top-nav__mobile-sheet"
            aria-label="Mobile"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
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
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}

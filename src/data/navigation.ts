import { contactEmail, socialLinks } from '@/data/contact'

export type NavItem = {
  label: string
  href: string
}

export const navItems: NavItem[] = [
  { label: 'About', href: '/#about' },
  { label: 'Expertise', href: '/#expertise' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Work', href: '/#projects' },
  { label: 'Skills', href: '/#skills' },
  { label: 'Resume', href: '/#resume' },
  { label: 'Terminal', href: '/#terminal' },
  { label: 'Showcase', href: '/#showcase' },
  { label: 'Contact', href: '/#contact' },
]

export { contactEmail, socialLinks }

export const githubUrl =
  socialLinks.find((link) => link.id === 'github')?.href ?? 'https://github.com/AdityaxDeore'
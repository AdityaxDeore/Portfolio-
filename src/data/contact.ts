export type ContactLink = {
  id: string
  label: string
  href: string
  description: string
  external?: boolean
}

export const contactEmail = 'adityadeorework@gmail.com'

export const contactSection = {
  label: '08 — Contact',
  title: 'Get in touch',
  description:
    'Open to ML engineering and full-stack roles — Pune or remote. Collaborations welcome. I usually reply within a day.',
} as const

export const contactLinks: ContactLink[] = [
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    href: 'https://wa.me/918010767685',
    description: 'Text me on WhatsApp (+91 8010767685)',
    external: true,
  },
  {
    id: 'email',
    label: 'Email',
    href: `mailto:${contactEmail}`,
    description: contactEmail,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/aditya-deore-3a725a263',
    description: 'linkedin.com/in/aditya-deore-3a725a263',
    external: true,
  },
  {
    id: 'github',
    label: 'GitHub',
    href: 'https://github.com/AdityaxDeore',
    description: 'github.com/AdityaxDeore',
    external: true,
  },
]

export const socialLinks = contactLinks.filter((link) => link.id !== 'email' && link.id !== 'whatsapp')
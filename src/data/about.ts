export const aboutProfile = {
  name: 'Aditya Chandrajit Deore',
  shortName: 'Aditya Deore',
  role: 'Machine Learning Engineer & Full-Stack Developer',
  education: 'B.Tech IT @ PCCOE',
  location: 'Pune, India',
  valueProp: 'I build ML systems and full-stack products that ship to production.',
} as const

export const aboutRotatingKeywords = [
  'Production ML',
  'Full-Stack Apps',
  'AI Agents',
  'Data Pipelines',
  'Model Deployment',
] as const

export const aboutRevealLines = [
  { id: 'name', text: aboutProfile.shortName, lineClass: 'about__line about__line--name' },
  { id: 'role', text: aboutProfile.role, lineClass: 'about__line about__line--role' },
  {
    id: 'meta',
    text: `${aboutProfile.location} · ${aboutProfile.education}`,
    lineClass: 'about__line about__line--meta',
  },
] as const
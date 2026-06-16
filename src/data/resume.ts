import { aboutProfile } from '@/data/about'
import { contactEmail } from '@/data/contact'

export const resumePdfUrl = '/assets/files/Aditya_Deore_Resume.pdf'
export const resumeDocxUrl = '/assets/files/Aditya_Deore_Resume.docx'

export const resumePageImages = [
  '/resume-page-1.png',
  '/resume-page-2.png',
] as const

export const resumeGoogleDocId = '11W-WCQrjPfvzGVs8ovxyofMCHZ0IHZKP'

export const resumeExternalLinks = {
  driveFolder:
    'https://drive.google.com/drive/folders/1RB-_rTcFMZ1rljaqO_W91Gng4fIYWAq8?usp=sharing',
  googleDocsEdit:
    'https://docs.google.com/document/d/11W-WCQrjPfvzGVs8ovxyofMCHZ0IHZKP/edit?usp=sharing&ouid=110537191993897286893&rtpof=true&sd=true',
  googleDocsPreview: `https://docs.google.com/document/d/${resumeGoogleDocId}/preview`,
  driveFilePreview: `https://drive.google.com/file/d/${resumeGoogleDocId}/preview`,
} as const

export type ResumeFormatId = 'pdf' | 'word' | 'drive' | 'google-docs'

export type ResumeFormat = {
  id: ResumeFormatId
  label: string
  behavior: 'preview' | 'external'
  downloadHref?: string
  downloadName?: string
  openHref: string
  externalTitle?: string
  externalDescription?: string
}

export const resumeFormats: ResumeFormat[] = [
  {
    id: 'pdf',
    label: 'PDF',
    behavior: 'preview',
    downloadHref: resumePdfUrl,
    downloadName: 'Aditya_Deore_Resume.pdf',
    openHref: resumePdfUrl,
  },
  {
    id: 'word',
    label: 'Word',
    behavior: 'external',
    downloadHref: resumeDocxUrl,
    downloadName: 'Aditya_Deore_Resume.docx',
    openHref: resumeExternalLinks.googleDocsEdit,
    externalTitle: 'Word resume on Google Docs',
    externalDescription:
      'View and edit the Word resume online in Google Docs, or download the DOCX copy below.',
  },
  {
    id: 'drive',
    label: 'Drive',
    behavior: 'external',
    openHref: resumeExternalLinks.driveFolder,
    externalTitle: 'Resume folder on Google Drive',
    externalDescription:
      'Browse resume files in Google Drive — PDF, Word, and related documents.',
  },
  {
    id: 'google-docs',
    label: 'Google Docs',
    behavior: 'external',
    openHref: resumeExternalLinks.googleDocsEdit,
    externalTitle: 'Live Google Docs resume',
    externalDescription:
      'Open the live Google Docs version — always up to date and easy to share.',
  },
]

export const resumeSection = {
  label: '07 — Resume',
  title: 'Resume',
  subtitle: 'Preview my experience and skills — or download a copy.',
  previewLabel: 'Document Preview',
  loadingText: 'Rendering…',
  mobileHint: 'Pinch to zoom · Scroll for pages',
} as const

export const resumeProfile = {
  name: aboutProfile.name,
  phone: '8010767685',
  email: contactEmail,
  linkedin: 'linkedin.com/in/aditya-deore-3a725a263',
  github: 'github.com/AdityaxDeore',
} as const
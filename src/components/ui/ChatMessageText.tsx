import { projects, type Project } from '@/data/projects'
import { resumePdfUrl, resumeDocxUrl, resumeExternalLinks } from '@/data/resume'
import { Link } from 'react-router-dom'
import { GithubIcon, LinkedinIcon, MailIcon, WhatsappIcon } from '@/components/icons/social-icons'
import { ExternalLink, FileText, Download, ArrowRight, Sparkles } from 'lucide-react'

export function ChatMessageText({ 
  text, 
  isAssistant = true,
  isMaximized = true 
}: { 
  text: string; 
  isAssistant?: boolean;
  isMaximized?: boolean;
}) {
  const lines = text.split('\n')

  // Detect matching entities for rich card rendering
  const textLower = text.toLowerCase()
  
  const isContact = textLower.includes('adityadeorework@gmail.com') || 
                    (textLower.includes('contact') && (textLower.includes('email') || textLower.includes('linkedin') || textLower.includes('github')))
  
  const isResume = textLower.includes('resume') && (textLower.includes('pdf') || textLower.includes('download') || textLower.includes('word') || textLower.includes('docs'))

  const detectedProjects: Project[] = []
  if (textLower.includes('code campus') || textLower.includes('codecampus')) {
    const p = projects.find(pr => pr.id === 'codecampus')
    if (p) detectedProjects.push(p)
  }
  if (textLower.includes('dementia') || textLower.includes('cognitive')) {
    const p = projects.find(pr => pr.id === 'dementiaml')
    if (p) detectedProjects.push(p)
  }
  if (textLower.includes('clarity') || textLower.includes('prayaas')) {
    const p = projects.find(pr => pr.id === 'projectclarity')
    if (p) detectedProjects.push(p)
  }
  if (textLower.includes('palantir') || textLower.includes('ontology')) {
    const p = projects.find(pr => pr.id === 'palantir')
    if (p) detectedProjects.push(p)
  }
  if (textLower.includes('brain tumor') || textLower.includes('tumor classification') || textLower.includes('braintumor')) {
    const p = projects.find(pr => pr.id === 'braintumor')
    if (p) detectedProjects.push(p)
  }
  if (textLower.includes('audio cnn') || textLower.includes('explainable audio') || textLower.includes('audiocnn')) {
    const p = projects.find(pr => pr.id === 'audiocnn')
    if (p) detectedProjects.push(p)
  }
  if (textLower.includes('portfolio')) {
    const p = projects.find(pr => pr.id === 'portfolio')
    if (p) detectedProjects.push(p)
  }
  if (textLower.includes('shihiko') || textLower.includes('e-commerce')) {
    const p = projects.find(pr => pr.id === 'shihiko')
    if (p) detectedProjects.push(p)
  }
  if (textLower.includes('obamify') || textLower.includes('posterization')) {
    const p = projects.find(pr => pr.id === 'obamify')
    if (p) detectedProjects.push(p)
  }

  // If general projects inquiry, output top projects as visual cards
  if (detectedProjects.length === 0 && (textLower.includes('projects') || textLower.includes('portfolio') || textLower.includes('selected work') || textLower.includes('all projects') || textLower.includes('show me your work'))) {
    projects.slice(0, 3).forEach(p => {
      detectedProjects.push(p)
    })
  }

  const isSkills = textLower.includes('skills') || textLower.includes('toolkit') || textLower.includes('languages') || textLower.includes('frameworks') || textLower.includes('technologies')

  // Deduplicate projects just in case
  const uniqueProjects = Array.from(new Set(detectedProjects.map(p => p.id)))
    .map(id => detectedProjects.find(p => p.id === id))
    .filter(Boolean) as Project[]

  return (
    <div className="chat-message-content">
      {lines.map((line, idx) => {
        let trimmed = line.trim()
        const isBullet = trimmed.startsWith('•') || trimmed.startsWith('- ') || trimmed.startsWith('* ')

        if (isBullet) {
          trimmed = trimmed.replace(/^[•\-*]\s+/, '')
        }

        const parts: Array<
          | { type: 'text'; val: string }
          | { type: 'bold'; val: string }
          | { type: 'link'; label: string; url: string }
        > = []
        const currentText = trimmed
        const regex = /(\*\*.*?\*\*|\[.*?\]\(.*?\))/g
        let match
        let lastIndex = 0

        while ((match = regex.exec(currentText)) !== null) {
          const matchIndex = match.index
          const matchStr = match[0]

          if (matchIndex > lastIndex) {
            parts.push({
              type: 'text',
              val: currentText.substring(lastIndex, matchIndex),
            })
          }

          if (matchStr.startsWith('**') && matchStr.endsWith('**')) {
            parts.push({
              type: 'bold',
              val: matchStr.slice(2, -2),
            })
          } else if (matchStr.startsWith('[') && matchStr.includes('](')) {
            const labelEnd = matchStr.indexOf(']')
            const urlStart = matchStr.indexOf('(') + 1
            const urlEnd = matchStr.indexOf(')')
            parts.push({
              type: 'link',
              label: matchStr.substring(1, labelEnd),
              url: matchStr.substring(urlStart, urlEnd),
            })
          }

          lastIndex = regex.lastIndex
        }

        if (lastIndex < currentText.length) {
          parts.push({
            type: 'text',
            val: currentText.substring(lastIndex),
          })
        }

        const contentNode = parts.map((part, pIdx) => {
          if (part.type === 'bold') {
            return <strong key={pIdx}>{part.val}</strong>
          }
          if (part.type === 'link') {
            return (
              <a
                key={pIdx}
                href={part.url}
                target="_blank"
                rel="noopener noreferrer"
                className="chat-message-link"
              >
                {part.label}
              </a>
            )
          }
          return part.val
        })

        if (isBullet) {
          return (
            <div key={idx} className="chat-message-bullet">
              <span className="bullet-dot">•</span>
              <div className="bullet-text">{contentNode}</div>
            </div>
          )
        }

        return (
          <p key={idx} className={trimmed === '' ? 'chat-message-empty-line' : 'chat-message-line'}>
            {contentNode}
          </p>
        )
      })}

      {isAssistant && (uniqueProjects.length > 0 || isContact || isResume || isSkills) && (
        <div className="chat-rich-container">
          {/* Project Cards */}
          {uniqueProjects.map((project) => (
            <div key={project.id} className={`chat-project-card animate-fade-in ${!isMaximized ? 'chat-project-card--minimized' : ''}`}>
              {!isMaximized ? (
                <div className="chat-project-card__body" style={{ padding: '0.75rem' }}>
                  <div className="chat-project-card__header" style={{ marginBottom: '0.2rem' }}>
                    <h4 className="chat-project-card__title" style={{ fontSize: '0.82rem' }}>{project.title}</h4>
                    <span className="chat-project-card__year" style={{ fontSize: '0.7rem' }}>{project.caseStudy.year}</span>
                  </div>
                  <p className="chat-project-card__outcome" style={{ fontSize: '0.74rem', WebkitLineClamp: 2, display: '-webkit-box', WebkitBoxOrient: 'vertical', overflow: 'hidden', margin: 0 }}>
                    {project.outcome}
                  </p>
                  <div className="chat-project-card__actions" style={{ marginTop: '0.5rem', gap: '0.4rem' }}>
                    <Link to={`/projects/${project.id}`} className="chat-project-card__btn chat-project-card__btn--primary" style={{ padding: '0.35rem 0.65rem', fontSize: '0.74rem' }}>
                      Case Study
                    </Link>
                    {project.links.map(link => (
                      <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="chat-project-card__btn chat-project-card__btn--secondary" style={{ padding: '0.35rem 0.65rem', fontSize: '0.74rem' }}>
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  <div className="chat-project-card__image-container">
                    <img src={project.image} alt={project.title} className="chat-project-card__image" />
                    <div className="chat-project-card__overlay" />
                  </div>
                  <div className="chat-project-card__body">
                    <div className="chat-project-card__header">
                      <h4 className="chat-project-card__title">{project.title}</h4>
                      <span className="chat-project-card__year">{project.caseStudy.year}</span>
                    </div>
                    <p className="chat-project-card__outcome">{project.outcome}</p>
                    <div className="chat-project-card__tags">
                      {project.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="chat-project-card__tag">{tag}</span>
                      ))}
                    </div>
                    <div className="chat-project-card__actions">
                      <Link to={`/projects/${project.id}`} className="chat-project-card__btn chat-project-card__btn--primary">
                        View Case Study <ArrowRight size={12} className="ml-1" style={{ display: 'inline' }} />
                      </Link>
                      {project.links.map(link => (
                        <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="chat-project-card__btn chat-project-card__btn--secondary">
                          <span className="mr-1" style={{ display: 'inline-flex', alignItems: 'center', marginRight: '4px', verticalAlign: 'middle' }}>
                            <GithubIcon size={12} />
                          </span> {link.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}

          {/* Contact Card */}
          {isContact && (
            <div className="chat-contact-card animate-fade-in">
              <div className="chat-contact-card__header">
                <span className="chat-contact-card__icon" style={{ display: 'inline-flex', alignItems: 'center' }}>
                  <MailIcon size={20} />
                </span>
                <div>
                  <h4 className="chat-contact-card__title">Get in Touch</h4>
                  <p className="chat-contact-card__subtitle">Send Aditya a message directly</p>
                </div>
              </div>
              <div className="chat-contact-card__actions">
                <a href="mailto:adityadeorework@gmail.com" className="chat-contact-card__btn chat-contact-card__btn--email">
                  <MailIcon size={14} /> Email
                </a>
                <a href="https://wa.me/918010767685" target="_blank" rel="noopener noreferrer" className="chat-contact-card__btn chat-contact-card__btn--whatsapp">
                  <WhatsappIcon size={14} /> WhatsApp
                </a>
                <a href="https://www.linkedin.com/in/aditya-deore-3a725a263" target="_blank" rel="noopener noreferrer" className="chat-contact-card__btn chat-contact-card__btn--linkedin">
                  <LinkedinIcon size={14} /> LinkedIn
                </a>
                <a href="https://github.com/AdityaxDeore" target="_blank" rel="noopener noreferrer" className="chat-contact-card__btn chat-contact-card__btn--github">
                  <GithubIcon size={14} /> GitHub
                </a>
              </div>
            </div>
          )}

          {/* Resume Card */}
          {isResume && (
            <div className="chat-resume-card animate-fade-in">
              <div className="chat-resume-card__header">
                <FileText className="chat-resume-card__icon" size={20} />
                <div>
                  <h4 className="chat-resume-card__title">Aditya's Resume</h4>
                  <p className="chat-resume-card__subtitle">Download or preview resume document</p>
                </div>
              </div>
              <div className="chat-resume-card__actions">
                <a href={resumePdfUrl} download="Aditya_Deore_Resume.pdf" className="chat-resume-card__btn chat-resume-card__btn--pdf">
                  <Download size={14} /> Download PDF
                </a>
                <a href={resumeDocxUrl} download="Aditya_Deore_Resume.docx" className="chat-resume-card__btn chat-resume-card__btn--word">
                  <Download size={14} /> Download Word
                </a>
                <a href={resumeExternalLinks.driveFolder} target="_blank" rel="noopener noreferrer" className="chat-resume-card__btn chat-resume-card__btn--drive">
                  <ExternalLink size={14} /> Google Drive
                </a>
              </div>
            </div>
          )}

          {/* Skills Card */}
          {isSkills && (
            <div className="chat-skills-card animate-fade-in">
              <div className="chat-skills-card__header">
                <Sparkles className="chat-skills-card__icon" size={20} />
                <div>
                  <h4 className="chat-skills-card__title">Technical Toolkit</h4>
                  <p className="chat-skills-card__subtitle">Core technologies Aditya works with</p>
                </div>
              </div>
              <div className="chat-skills-card__body">
                <div className="chat-skills-card__group">
                  <span className="chat-skills-card__group-label">AI & ML</span>
                  <div className="chat-skills-card__group-tags">
                    <span className="chat-skills-card__tag">TensorFlow</span>
                    <span className="chat-skills-card__tag">PyTorch</span>
                    <span className="chat-skills-card__tag">Scikit-learn</span>
                    <span className="chat-skills-card__tag">OpenCV</span>
                  </div>
                </div>
                <div className="chat-skills-card__group">
                  <span className="chat-skills-card__group-label">Full-Stack Web</span>
                  <div className="chat-skills-card__group-tags">
                    <span className="chat-skills-card__tag">React.js</span>
                    <span className="chat-skills-card__tag">Node.js</span>
                    <span className="chat-skills-card__tag">TypeScript</span>
                    <span className="chat-skills-card__tag">PostgreSQL</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

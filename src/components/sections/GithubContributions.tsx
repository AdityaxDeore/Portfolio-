import { GithubCalendar } from '@/components/ui/retro-space-shooter-git-hub-calendar'
import { Terminal } from 'lucide-react'
import './GithubContributions.css'

export function GithubContributions() {
  return (
    <section id="github-contributions" className="github-contributions" aria-labelledby="github-contributions-title">
      <div className="container">
        <header className="github-contributions__header">
          <div className="github-contributions__label-row">
            <Terminal size={22} className="text-secondary" strokeWidth={2} />
            <p className="github-contributions__label">06 — Activity</p>
          </div>
          <h2 id="github-contributions-title" className="github-contributions__title">
            Open Source Activity
          </h2>
          <p className="github-contributions__description">
            My real-time GitHub commits visualization. Toggle <strong>Game Mode</strong> to play an interactive space shooter game on top of my contributions grid!
          </p>
        </header>

        <div className="github-contributions__calendar-wrapper">
          <GithubCalendar username="AdityaxDeore" cellSize={16} cellGap={4} />
        </div>

        <div className="github-contributions__cta-row">
          <a
            href="https://github.com/AdityaxDeore"
            target="_blank"
            rel="noopener noreferrer"
            className="github-contributions__cta-btn"
          >
            Visit GitHub Profile
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
          </a>
        </div>
      </div>
    </section>
  )
}

import { About } from '@/components/sections/About'
import { CodeTerminal } from '@/components/sections/CodeTerminal'
import { Contact } from '@/components/sections/Contact'
import { Experience } from '@/components/sections/Experience'
import { FeatureShowcase } from '@/components/sections/FeatureShowcase'
import { Projects } from '@/components/sections/Projects'
import { Resume } from '@/components/sections/Resume'
import { Skills } from '@/components/sections/Skills'
import { WhatIBring } from '@/components/sections/WhatIBring'

export function HomePage() {
  return (
    <main id="main-content" className="canvas animate-fade-in" tabIndex={-1}>
      <About />
      <WhatIBring />
      <Experience />
      <Projects />
      <Skills />
      <Resume />
      <CodeTerminal />
      <FeatureShowcase />
      <Contact />
    </main>
  )
}
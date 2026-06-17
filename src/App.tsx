import { TopNav } from '@/components/layout/TopNav'
import { GrainOverlay } from '@/components/ui/GrainOverlay'
import { HomePage } from '@/pages/HomePage'
import { ProjectPage } from '@/pages/ProjectPage'
import { isPageReload, scrollToTop } from '@/lib/scrollToTop'
import { useLayoutEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { DevAgentation } from '@/agentation'


function ScrollManager() {
  const { pathname, hash } = useLocation()

  useLayoutEffect(() => {
    if (isPageReload()) {
      scrollToTop()
      return
    }

    if (hash) {
      const id = hash.replace('#', '')
      document.getElementById(id)?.scrollIntoView({ behavior: 'auto' })
      return
    }

    scrollToTop()
  }, [pathname, hash])

  return null
}

export default function App() {
  return (
    <>
      <GrainOverlay />
      <a href="/#main-content" className="skip-link">
        Skip to content
      </a>
      <TopNav />
      <ScrollManager />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects/:id" element={<ProjectPage />} />
      </Routes>
      <DevAgentation />
    </>
  )
}
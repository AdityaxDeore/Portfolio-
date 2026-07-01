import { useEffect, useLayoutEffect, useRef } from 'react'
import { Route, Routes, useLocation, useNavigationType } from 'react-router-dom'
import { TopNav } from '@/components/layout/TopNav'
import { HomePage } from '@/pages/HomePage'
import { ProjectPage } from '@/pages/ProjectPage'
import { isPageReload, scrollToTop } from '@/lib/scrollToTop'
import { DevAgentation } from '@/agentation'
import { FloatingChatbot } from '@/components/ui/FloatingChatbot'

function ScrollManager() {
  const location = useLocation()
  const navigationType = useNavigationType()
  const { pathname, hash, state } = location
  const scrollStorageKey = `scroll-position:${pathname}`
  const lastLocationKeyRef = useRef<string | null>(null)

  useLayoutEffect(() => {
    const previousKey = lastLocationKeyRef.current
    lastLocationKeyRef.current = location.key

    return () => {
      if (previousKey) {
        sessionStorage.setItem(scrollStorageKey, String(window.scrollY))
      }
    }
  }, [location.key, scrollStorageKey])

  useLayoutEffect(() => {
    const restoreScrollY = typeof (state as { restoreScrollY?: unknown } | null)?.restoreScrollY === 'number'
      ? (state as { restoreScrollY: number }).restoreScrollY
      : null

    if (restoreScrollY !== null) {
      window.scrollTo({
        top: restoreScrollY,
        behavior: 'auto',
      })
      return
    }

    if (hash) {
      const id = hash.replace('#', '')
      const element = document.getElementById(id)
      if (element) {
        const timer = setTimeout(() => {
          const header = document.querySelector('.top-nav')
          const headerHeight = header ? header.getBoundingClientRect().height : 56
          const elementPosition = element.getBoundingClientRect().top + window.scrollY
          const offsetPosition = elementPosition - headerHeight - 16

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          })
        }, 150)
        return () => clearTimeout(timer)
      }
    }

    if (navigationType === 'POP') {
      const storedScrollY = Number(sessionStorage.getItem(scrollStorageKey))
      if (!Number.isNaN(storedScrollY) && storedScrollY > 0) {
        window.scrollTo({
          top: storedScrollY,
          behavior: 'auto',
        })
        return
      }
    }

    if (isPageReload()) {
      scrollToTop()
      return
    }

    scrollToTop()
  }, [pathname, hash, state])

  return null
}

export default function App() {
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchor = target.closest('a')
      if (!anchor) return

      const href = anchor.getAttribute('href')
      if (!href) return

      // Handle same page anchor link navigation with header offset subtraction
      if (
        (href.startsWith('#') || href.startsWith('/#')) &&
        (window.location.pathname === '/' || href.startsWith(window.location.pathname + '#'))
      ) {
        const id = href.split('#')[1]
        const element = document.getElementById(id)
        if (element) {
          e.preventDefault()
          const header = document.querySelector('.top-nav')
          const headerHeight = header ? header.getBoundingClientRect().height : 56
          const elementPosition = element.getBoundingClientRect().top + window.scrollY
          const offsetPosition = elementPosition - headerHeight - 16

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          })

          window.history.pushState(null, '', href)
        }
      }
    }

    document.addEventListener('click', handleAnchorClick)
    return () => document.removeEventListener('click', handleAnchorClick)
  }, [])

  return (
    <>
      <a href="/#main-content" className="skip-link">
        Skip to content
      </a>
      <TopNav />
      <ScrollManager />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects/:id" element={<ProjectPage />} />
      </Routes>
      <FloatingChatbot />
      <DevAgentation />
    </>
  )
}
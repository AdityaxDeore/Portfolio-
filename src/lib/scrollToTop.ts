export function scrollToTop() {
  if (typeof window === 'undefined') return

  window.scrollTo(0, 0)
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0
}

export function isPageReload() {
  if (typeof performance === 'undefined' || !performance.getEntriesByType) return false

  const entry = performance.getEntriesByType('navigation')[0] as
    | PerformanceNavigationTiming
    | undefined

  return entry?.type === 'reload'
}
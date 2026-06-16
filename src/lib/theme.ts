export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'portfolio-theme'

export function getSystemTheme(): Theme {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function getStoredTheme(): Theme | null {
  if (typeof window === 'undefined') return null
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored === 'light' || stored === 'dark' ? stored : null
}

export function getInitialTheme(): Theme {
  return getStoredTheme() ?? getSystemTheme()
}

export function applyTheme(theme: Theme): void {
  const root = document.documentElement
  root.dataset.theme = theme
  root.style.colorScheme = theme
  root.classList.toggle('dark', theme === 'dark')
}

export function storeTheme(theme: Theme): void {
  localStorage.setItem(STORAGE_KEY, theme)
}
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import {
  applyTheme,
  getInitialTheme,
  getSystemTheme,
  storeTheme,
  type Theme,
} from '@/lib/theme'

type ThemeContextValue = {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}

type ThemeProviderProps = {
  children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    applyTheme(theme)
    storeTheme(theme)
  }, [theme])

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')

    const onChange = () => {
      const stored = localStorage.getItem('portfolio-theme')
      if (!stored) {
        const next = getSystemTheme()
        setThemeState(next)
        applyTheme(next)
      }
    }

    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  const setTheme = (next: Theme) => setThemeState(next)
  const toggleTheme = () => setThemeState((current) => (current === 'light' ? 'dark' : 'light'))

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
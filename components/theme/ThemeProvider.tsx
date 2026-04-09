'use client'

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { useLocalStorage } from 'usehooks-ts'

type ThemeContextType = {
  theme: string
  toggleTheme: () => void
  setTheme: (themeName: string) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [storedTheme, setStoredTheme] = useLocalStorage('theme', 'business') // Default to 'business' (dark)
  const [theme, setThemeState] = useState<string>(storedTheme)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Sync theme state with localStorage on initial load and changes
  useEffect(() => {
    if (mounted) {
      setThemeState(storedTheme)
    }
  }, [storedTheme, mounted])

  // Apply theme to document element
  useEffect(() => {
    if (mounted) {
      document.documentElement.setAttribute('data-theme', theme)
    }
  }, [theme, mounted])

  const toggleTheme = useCallback(() => {
    setStoredTheme(prevTheme => (prevTheme === 'business' ? 'corporate' : 'business'))
  }, [setStoredTheme])

  const setTheme = useCallback((themeName: string) => {
    setStoredTheme(themeName)
  }, [setStoredTheme])

  if (!mounted) {
    return null // Avoid rendering children until mounted to prevent hydration issues
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

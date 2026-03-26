"use client"

import * as React from "react"

type Theme = "light" | "dark" | "system"
type ResolvedTheme = "light" | "dark"

type ThemeContextValue = {
  theme: Theme
  setTheme: (theme: Theme) => void
  resolvedTheme: ResolvedTheme
}

const ThemeContext = React.createContext<ThemeContextValue | null>(null)

interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: Theme
  enableSystem?: boolean
  attribute?: "class"
  disableTransitionOnChange?: boolean
}

function getSystemTheme(): ResolvedTheme {
  if (typeof window === "undefined") return "light"
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light"
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
  enableSystem = true,
  attribute = "class",
  disableTransitionOnChange = false,
}: ThemeProviderProps) {
  const [theme, setThemeState] = React.useState<Theme>(defaultTheme)
  const [resolvedTheme, setResolvedTheme] = React.useState<ResolvedTheme>(
    defaultTheme === "system" ? "light" : defaultTheme
  )

  React.useEffect(() => {
    const stored = window.localStorage.getItem("theme") as Theme | null
    const initialTheme = stored || defaultTheme
    setThemeState(initialTheme)
  }, [defaultTheme])

  React.useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)")

    const applyTheme = (nextTheme: Theme) => {
      const finalTheme: ResolvedTheme =
        nextTheme === "system"
          ? enableSystem
            ? getSystemTheme()
            : "light"
          : nextTheme

      setResolvedTheme(finalTheme)

      if (attribute === "class") {
        const root = document.documentElement
        const previousTransition = root.style.transition
        if (disableTransitionOnChange) {
          root.style.transition = "none"
        }

        root.classList.remove("light", "dark")
        root.classList.add(finalTheme)

        if (disableTransitionOnChange) {
          void root.offsetHeight
          root.style.transition = previousTransition
        }
      }
    }

    applyTheme(theme)

    const onMediaChange = () => {
      if (theme === "system") {
        applyTheme("system")
      }
    }

    media.addEventListener("change", onMediaChange)
    return () => media.removeEventListener("change", onMediaChange)
  }, [theme, enableSystem, attribute, disableTransitionOnChange])

  const setTheme = React.useCallback((nextTheme: Theme) => {
    setThemeState(nextTheme)
    window.localStorage.setItem("theme", nextTheme)
  }, [])

  const value = React.useMemo(
    () => ({ theme, setTheme, resolvedTheme }),
    [theme, setTheme, resolvedTheme]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = React.useContext(ThemeContext)

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider")
  }

  return context
}
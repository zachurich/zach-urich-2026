"use client";

import { useEffect, useState, useSyncExternalStore, type ReactNode } from "react";
import { ThemeContext } from "./ThemeContext";
import { setThemeCookie, Theme, DEFAULT_THEME } from "../../lib/theme";

const DARK_QUERY = "(prefers-color-scheme: dark)";

const subscribeToSystemTheme = (onChange: () => void) => {
  const mediaQuery = window.matchMedia(DARK_QUERY);
  mediaQuery.addEventListener("change", onChange);
  return () => mediaQuery.removeEventListener("change", onChange);
};

const getSystemTheme = (): Theme =>
  window.matchMedia(DARK_QUERY).matches ? "dark" : "light";

// Server has no notion of the OS preference, so it renders DEFAULT_THEME;
// React reconciles to the real value right after hydration.
const getServerSystemTheme = (): Theme => DEFAULT_THEME;

export const ThemeProvider = ({
  children,
  initialTheme = null,
}: {
  children: ReactNode;
  initialTheme?: Theme | null;
}) => {
  // `override` is the visitor's explicit choice (persisted to a cookie).
  // `null` means "no override yet" — follow the system preference instead.
  const [override, setOverride] = useState<Theme | null>(initialTheme);
  const systemTheme = useSyncExternalStore(
    subscribeToSystemTheme,
    getSystemTheme,
    getServerSystemTheme,
  );

  const theme = override ?? systemTheme;

  useEffect(() => {
    if (override) {
      document.documentElement.setAttribute("data-theme", override);
      setThemeCookie(override);
    } else {
      // No override: let the `prefers-color-scheme` CSS take over.
      document.documentElement.removeAttribute("data-theme");
    }
  }, [override]);

  const toggleTheme = () => {
    setOverride(theme === "dark" ? "light" : "dark");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

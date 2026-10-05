"use client";

import { useEffect, useState, useSyncExternalStore, type ReactNode } from "react";
import { ThemeContext } from "./ThemeContext";
import {
  getThemeFromCookie,
  setThemeCookie,
  Theme,
  DEFAULT_THEME,
} from "../../lib/theme";

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

// The saved theme is applied to <html> by the inline script in the root
// layout before paint; this just mirrors it into React after hydration.
const subscribeToSavedTheme = () => () => {};
const getServerSavedTheme = (): Theme | null => null;

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  // `override` is a choice made via the toggle this session. `savedTheme` is
  // one persisted to a cookie on an earlier visit. With neither, follow the
  // system preference.
  const [override, setOverride] = useState<Theme | null>(null);
  const savedTheme = useSyncExternalStore(
    subscribeToSavedTheme,
    getThemeFromCookie,
    getServerSavedTheme,
  );
  const systemTheme = useSyncExternalStore(
    subscribeToSystemTheme,
    getSystemTheme,
    getServerSystemTheme,
  );

  const theme = override ?? savedTheme ?? systemTheme;

  useEffect(() => {
    // Without an override, leave `data-theme` alone: it's either the saved
    // theme set before paint, or absent so `prefers-color-scheme` applies.
    if (override) {
      document.documentElement.setAttribute("data-theme", override);
      setThemeCookie(override);
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

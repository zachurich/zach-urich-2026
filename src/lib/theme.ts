export type Theme = "light" | "dark";

export const DEFAULT_THEME: Theme = "light";

export const setThemeCookie = (theme: Theme) => {
  document.cookie = `theme=${theme}; path=/; max-age=31536000`; // 1 year
};

/**
 * Returns the visitor's saved theme override, or `null` if they've never
 * set one. `null` means the UI should follow `prefers-color-scheme` rather
 * than being pinned to `DEFAULT_THEME`.
 */
export const getThemeFromCookie = (): Theme | null => {
  const match = document.cookie.match(/(?:^|; )theme=(light|dark)(?:;|$)/);
  return match ? (match[1] as Theme) : null;
};

export const getServerThemeFromCookie = (
  cookieHeader: string | null,
): Theme | null => {
  if (!cookieHeader) return null;
  const match = cookieHeader.match(/(?:^|; )theme=(light|dark)(?:;|$)/);
  return match ? (match[1] as Theme) : null;
};

export type Theme = "light" | "dark";

export const DEFAULT_THEME: Theme = "light";

export const setThemeCookie = (theme: Theme) => {
  document.cookie = `theme=${theme}; path=/; max-age=31536000`; // 1 year
};

export const getThemeFromCookie = (): Theme => {
  const match = document.cookie.match(/(?:^|; )theme=(light|dark)(?:;|$)/);
  return match ? (match[1] as Theme) : DEFAULT_THEME;
};

export const getServerThemeFromCookie = (
  cookieHeader: string | null,
): Theme => {
  if (!cookieHeader) return DEFAULT_THEME;
  const match = cookieHeader.match(/(?:^|; )theme=(light|dark)(?:;|$)/);
  console.log("Parsed theme from cookie:", match ? match[1] : "none");
  return match ? (match[1] as Theme) : DEFAULT_THEME;
};

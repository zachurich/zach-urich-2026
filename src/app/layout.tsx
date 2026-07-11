import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { ThemeProvider } from "@/contexts/Theme/ThemeProvider";
import "./globals.css";
import { Header } from "../components/Header/Header";
import { Navigation } from "../components/Navigation/Navigation";
import { SiteContent } from "../components/SiteContent/SiteContent";
import { getServerThemeFromCookie } from "../lib/theme";
import { headers } from "next/headers";

const primaryFont = Outfit({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "zachurich.com",
  description: "Zach Urich's personal website",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const serverTheme = getServerThemeFromCookie(headersList.get("cookie"));
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-theme={serverTheme}
    >
      <body className={primaryFont.className}>
        <ThemeProvider initialTheme={serverTheme}>
          <Header />
          <SiteContent>
            <Navigation tagType="aside" />
            {children}
          </SiteContent>
        </ThemeProvider>
      </body>
    </html>
  );
}

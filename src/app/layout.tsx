import type { Metadata } from "next";
import { Outfit, Courier_Prime } from "next/font/google";
import { ThemeProvider } from "@/contexts/Theme/ThemeProvider";
import { MobileNavProvider } from "@/contexts/MobileNav/MobileNavProvider";
import "./globals.css";
import { Header } from "../components/Header/Header";
import { Navigation } from "../components/Navigation/Navigation";
import { SiteContent } from "../components/SiteContent/SiteContent";
import { getServerThemeFromCookie } from "../lib/theme";
import { getAtprotoProfile } from "../lib/atproto";
import { headers } from "next/headers";
import classNames from "classnames";
import { Footer } from "@/components/Footer/Footer";

const primaryFont = Outfit({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-family-primary",
});

const secondaryFont = Courier_Prime({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-family-secondary",
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
  const atprotoProfile = await getAtprotoProfile();
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-theme={serverTheme}
      className={classNames(primaryFont.variable, secondaryFont.variable)}
    >
      <body>
        <ThemeProvider initialTheme={serverTheme}>
          <MobileNavProvider>
            <Header
              avatarUrl={atprotoProfile?.avatarUrl}
              handle={atprotoProfile?.handle}
            />
            <SiteContent>
              <Navigation
                tagType="aside"
                avatarUrl={atprotoProfile?.avatarUrl}
                handle={atprotoProfile?.handle}
              />
              {children}
            </SiteContent>
            <Footer />
          </MobileNavProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

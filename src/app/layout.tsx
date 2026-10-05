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
import {
  AUTHOR,
  RSS_PATH,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "@/lib/seo";

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
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  authors: [AUTHOR],
  creator: AUTHOR.name,
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    types: { "application/rss+xml": RSS_PATH },
  },
  icons: {
    apple: "/apple-touch-icon.png",
    icon: "/favicon-32x32.png",
  },
  manifest: "/site.webmanifest",
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
      data-theme={serverTheme ?? undefined}
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

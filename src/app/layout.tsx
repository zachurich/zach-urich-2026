import type { Metadata } from "next";
import { Outfit, Courier_Prime } from "next/font/google";
import { ThemeProvider } from "@/contexts/Theme/ThemeProvider";
import { MobileNavProvider } from "@/contexts/MobileNav/MobileNavProvider";
import "./globals.css";
import { Header } from "../components/Header/Header";
import { Navigation } from "../components/Navigation/Navigation";
import { SiteContent } from "../components/SiteContent/SiteContent";
import { getAtprotoProfile } from "../lib/atproto";
import classNames from "classnames";
import { Footer } from "@/components/Footer/Footer";
import {
  AUTHOR,
  RSS_PATH,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "@/lib/seo";

const INIT_SCRIPT = `(() => {
  const root = document.documentElement;
  root.classList.add("js");
  const theme = document.cookie.match(/(?:^|; )theme=(light|dark)(?:;|$)/);
  if (theme) root.setAttribute("data-theme", theme[1]);
})();`;

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
  const atprotoProfile = await getAtprotoProfile();
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={classNames(primaryFont.variable, secondaryFont.variable)}
    >
      <head>
        {/* Runs before paint. Applies the saved theme without reading cookies
            on the server (which would make every page dynamic), and adds a
            `js` class so CSS hides content for entrance animations only once
            JS is running. Crawlers and no-JS clients get fully visible HTML. */}
        <script dangerouslySetInnerHTML={{ __html: INIT_SCRIPT }} />
      </head>
      <body>
        <ThemeProvider>
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

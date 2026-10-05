import type { Metadata } from "next";
import { getExternalRoutes } from "@/components/Navigation/helpers";

export const SITE_URL = "https://zachurich.com";
export const SITE_NAME = "Zach Urich";
export const SITE_DESCRIPTION =
  "Zach Urich is a self-taught web engineer with a background in graphic design. Zach sometimes writes about web development, career, video games, and whatever else.";
export const RSS_PATH = "/writing/feed.xml";

export const AUTHOR = {
  name: "Zach Urich",
  url: SITE_URL,
};

/** Profiles that represent the same person, used for JSON-LD `sameAs`. */
export const SAME_AS = [
  ...getExternalRoutes().map((route) => route.path),
  "https://www.linkedin.com/in/zachurich/",
];

export const absoluteUrl = (path: string) => new URL(path, SITE_URL).toString();

type PageMetadataOptions = {
  title?: string;
  description?: string;
  path: string;
  openGraph?: Metadata["openGraph"];
};

/**
 * Builds page metadata with a canonical URL and full Open Graph data.
 * Next.js shallow-merges metadata objects, so a page that sets `openGraph`
 * or `alternates` would otherwise drop the values defined in the root layout.
 */
export const pageMetadata = ({
  title,
  description = SITE_DESCRIPTION,
  path,
  openGraph,
}: PageMetadataOptions): Metadata => ({
  // An explicit `title: undefined` would clear the layout's default title
  ...(title && { title }),
  description,
  alternates: {
    canonical: path,
    types: { "application/rss+xml": RSS_PATH },
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
    url: path,
    title: title ?? SITE_NAME,
    description,
    // Pages that set `openGraph` don't inherit the root opengraph-image.
    // Segments with their own opengraph-image file still override this.
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
    ...openGraph,
  },
});

export const jsonLdPerson = {
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: AUTHOR.name,
  url: SITE_URL,
  image: absoluteUrl("/bsky-avatar.png"),
  jobTitle: "Software Engineer",
  sameAs: SAME_AS,
};

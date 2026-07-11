import { MDXContent } from "mdx/types";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

type ContentType = "posts" | "pages";

export interface PageMetadata {
  title: string;
  date: string;
  description: string;
  slug: string;
}

const POSTS_DIR = join(process.cwd(), "src/content/posts");
const PAGES_DIR = join(process.cwd(), "src/content/pages");

const CONTENT_MAP: Record<ContentType, string> = {
  posts: POSTS_DIR,
  pages: PAGES_DIR,
};

export function getContentSlugs(contentType: ContentType): string[] {
  const dir = CONTENT_MAP[contentType];
  return readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getPageMetadata(
  contentType: ContentType,
  slug: string,
): PageMetadata {
  const dir = CONTENT_MAP[contentType];
  console.log(dir);
  const file = readFileSync(join(dir, `${slug}.mdx`), "utf-8");
  const match = file.match(/export const metadata = ({[\s\S]*?});/);
  if (!match) throw new Error(`No metadata found in ${slug}.mdx`);
  // Safe: only runs on our own build-time content files
  const data = new Function(`return ${match[1]}`)() as Omit<
    PageMetadata,
    "slug"
  >;
  return { ...data, slug };
}

export function getAllContent(contentType: ContentType): PageMetadata[] {
  return getContentSlugs(contentType)
    .map((slug) => getPageMetadata(contentType, slug))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getContentBySlug(
  contentType: ContentType,
  slug: string,
): Promise<MDXContent> {
  const { default: ContentMdx }: { default: MDXContent } = await import(
    `@/content/${contentType}/${slug}.mdx`
  );

  return ContentMdx;
}

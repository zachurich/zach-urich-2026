import { dateFromString } from "@/utils/dates";
import { MDXContent } from "mdx/types";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

export type ContentType = "posts" | "pages";

export interface ContentMetadata {
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

const sortByDateDesc = (a: ContentMetadata, b: ContentMetadata) =>
  new Date(b.date).getTime() - new Date(a.date).getTime();

function getContentSlugs(contentType: ContentType): string[] {
  const dir = CONTENT_MAP[contentType];
  return readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

function getContentMetadata(
  contentType: ContentType,
  slug: string,
): ContentMetadata {
  const dir = CONTENT_MAP[contentType];
  const file = readFileSync(join(dir, `${slug}.mdx`), "utf-8");
  const match = file.match(/export const metadata = ({[\s\S]*?});/);
  if (!match) throw new Error(`No metadata found in ${slug}.mdx`);
  // Safe: only runs on our own build-time content files
  const data = new Function(`return ${match[1]}`)() as Omit<
    ContentMetadata,
    "slug"
  >;
  return { ...data, slug, date: dateFromString(data.date) };
}

function getAllContent(contentType: ContentType): ContentMetadata[] {
  return getContentSlugs(contentType)
    .map((slug) => getContentMetadata(contentType, slug))
    .sort(sortByDateDesc);
}

function getSomeContent(
  contentType: ContentType,
  count: number,
): ContentMetadata[] {
  return getContentSlugs(contentType)
    .map((slug) => getContentMetadata(contentType, slug))
    .sort(sortByDateDesc)
    .slice(0, count);
}

async function getContentBySlug(
  contentType: ContentType,
  slug: string,
): Promise<MDXContent> {
  const { default: ContentMdx }: { default: MDXContent } = await import(
    `@/content/${contentType}/${slug}.mdx`
  );

  return ContentMdx;
}

const mdx = {
  getContentSlugs,
  getContentMetadata,
  getAllContent,
  getSomeContent,
  getContentBySlug,
};

export default mdx;

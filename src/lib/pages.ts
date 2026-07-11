import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const PAGES_DIR = join(process.cwd(), "src/content/pages");

export interface PageMetadata {
  title: string;
  date: string;
  description: string;
  slug: string;
}

export function getPageSlugs(): string[] {
  return readdirSync(PAGES_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getPageMetadata(slug: string): PageMetadata {
  const file = readFileSync(join(PAGES_DIR, `${slug}.mdx`), "utf-8");
  const match = file.match(/export const metadata = ({[\s\S]*?});/);
  if (!match) throw new Error(`No metadata found in ${slug}.mdx`);
  // Safe: only runs on our own build-time content files
  const data = new Function(`return ${match[1]}`)() as Omit<
    PageMetadata,
    "slug"
  >;
  return { ...data, slug };
}

export function getAllPages(): PageMetadata[] {
  return getPageSlugs().map(getPageMetadata);
}

import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const POSTS_DIR = join(process.cwd(), "src/content/posts");

export interface PostMetadata {
  title: string;
  date: string;
  description: string;
  slug: string;
}

export function getPostSlugs(): string[] {
  return readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getPostMetadata(slug: string): PostMetadata {
  const file = readFileSync(join(POSTS_DIR, `${slug}.mdx`), "utf-8");
  const match = file.match(/export const metadata = ({[\s\S]*?});/);
  if (!match) throw new Error(`No metadata found in ${slug}.mdx`);
  // Safe: only runs on our own build-time content files
  const data = new Function(`return ${match[1]}`)() as Omit<
    PostMetadata,
    "slug"
  >;
  return { ...data, slug };
}

export function getAllPosts(sort: "asc" | "desc" = "desc"): PostMetadata[] {
  return getPostSlugs()
    .map(getPostMetadata)
    .sort((a, b) =>
      sort === "asc" ? (a.date > b.date ? 1 : -1) : a.date < b.date ? 1 : -1,
    );
}

/**
 * Returns next post in sorted order (newest to oldest). Otherwise, returns previous post.
 * @param slug
 * @returns
 */
export function getNextPost(slug: string): PostMetadata | null {
  const posts = getAllPosts();
  // find nearest next date
  const { date } = getPostMetadata(slug);
  const index = posts.findIndex(
    (s) => new Date(s.date).getTime() === new Date(date).getTime(),
  );
  if (index <= 0) return posts[index + 1] || null; // loop to end if at start
  return posts[index - 1];
}

import mdx, { ContentMetadata } from "@/lib/mdx";

export type PostMetadata = ContentMetadata;

function getPostSlugs(): string[] {
  return mdx.getContentSlugs("posts");
}

function getPostMetadata(slug: string): PostMetadata {
  return mdx.getContentMetadata("posts", slug);
}

function getAllPosts(sort: "asc" | "desc" = "desc"): PostMetadata[] {
  const posts = mdx.getAllContent("posts");
  return sort === "asc" ? [...posts].reverse() : posts;
}

function getSomePosts(count: number): PostMetadata[] {
  return mdx.getSomeContent("posts", count);
}

/**
 * Returns next post in sorted order (newest to oldest). Otherwise, returns previous post.
 */
function getNextPost(slug: string): PostMetadata | null {
  const posts = getAllPosts();
  const { date } = getPostMetadata(slug);
  const index = posts.findIndex(
    (s) => new Date(s.date).getTime() === new Date(date).getTime(),
  );
  if (index <= 0) return posts[index + 1] || null; // loop to end if at start
  return posts[index - 1];
}

function getPostBySlug(slug: string) {
  return mdx.getContentBySlug("posts", slug);
}

const posts = {
  getPostSlugs,
  getPostMetadata,
  getAllPosts,
  getSomePosts,
  getNextPost,
  getPostBySlug,
};

export default posts;

import { OG_IMAGE_SIZE, renderOgImage } from "@/lib/ogImage";
import posts from "@/lib/posts";

export const alt = "Blog post by Zach Urich";
export const size = OG_IMAGE_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return posts.getPostSlugs().map((slug) => ({ slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { title, date } = posts.getPostMetadata(slug);
  return renderOgImage({ title, subtitle: `Zach Urich · ${date}` });
}

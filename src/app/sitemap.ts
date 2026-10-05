import type { MetadataRoute } from "next";
import posts from "@/lib/posts";
import { absoluteUrl } from "@/lib/seo";
import { isoDateFromString } from "@/utils/dates";

export default function sitemap(): MetadataRoute.Sitemap {
  const allPosts = posts.getAllPosts();
  const latestPostDate = allPosts[0] && isoDateFromString(allPosts[0].date);

  return [
    { url: absoluteUrl("/"), lastModified: latestPostDate, priority: 1 },
    { url: absoluteUrl("/about"), priority: 0.8 },
    {
      url: absoluteUrl("/writing"),
      lastModified: latestPostDate,
      priority: 0.8,
    },
    { url: absoluteUrl("/contact"), priority: 0.5 },
    { url: absoluteUrl("/info"), priority: 0.3 },
    ...allPosts.map((post) => ({
      url: absoluteUrl(`/writing/${post.slug}`),
      lastModified: isoDateFromString(post.date),
      priority: 0.7,
    })),
  ];
}

import posts from "@/lib/posts";
import { SAME_AS, SITE_DESCRIPTION, SITE_NAME, absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

/**
 * https://llmstxt.org — a plain markdown summary of the site for AI tools.
 */
export function GET() {
  const postLinks = posts
    .getAllPosts()
    .map(
      (post) =>
        `- [${post.title}](${absoluteUrl(`/writing/${post.slug}`)}): ${post.description}`,
    )
    .join("\n");

  const body = `# ${SITE_NAME}

> ${SITE_DESCRIPTION}

## Pages

- [Home](${absoluteUrl("/")}): Introduction, recent writing, and recent GitHub activity.
- [About](${absoluteUrl("/about")}): Background and the full story of how Zach got into web development.
- [Writing](${absoluteUrl("/writing")}): All blog posts.
- [Contact](${absoluteUrl("/contact")}): Contact form.
- [Site Info](${absoluteUrl("/info")}): Tech stack and details behind this site.

## Writing

${postLinks}

## Elsewhere

${SAME_AS.map((url) => `- ${url}`).join("\n")}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

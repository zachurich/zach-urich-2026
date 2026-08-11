import type { Metadata } from "next";
import { Page } from "@/components/Page/Page";
import posts from "@/lib/posts";
import { PostContent } from "@/components/PostContent/PostContent";
import type { MDXComponents } from "mdx/types";
import { HeadingAnchor } from "@/components/HeadingAnchor/HeadingAnchor";
import { BackLink } from "@/components/BackLink/BackLink";
import { Box } from "@/components/Box/Box";
import { CodeBlock } from "@/components/CodeBlock/CodeBlock";
import { LinkWithIcon } from "@/components/LinkWithIcon/LinkWithIcon";

export function generateStaticParams() {
  return posts.getPostSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { title, description } = posts.getPostMetadata(slug);
  return { title, description };
}

const overrideComponents: MDXComponents = {
  h2: (props) => <HeadingAnchor {...props} tagType="h2" />,
  code: (props) => (
    <Box className="s-b-base">
      <CodeBlock lang={props?.className?.split("-")[1]}>
        {props.children}
      </CodeBlock>
    </Box>
  ),
};

// const getPreviousPost = (slug: string) => {
//   const slugs = posts.getPostSlugs();
//   const index = slugs.findIndex((s) => s === slug);
//   if (index === -1 || index === slugs.length - 1) return null;
//   return posts.getPostMetadata(slugs[index + 1]);
// };

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const Content = await posts.getPostBySlug(slug);
  const { title, date } = posts.getPostMetadata(slug);
  const nextPost = posts.getNextPost(slug);
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <Page>
      <BackLink className="s-b-xs" />
      <PostContent title={title} date={formattedDate}>
        <Content components={overrideComponents} />
        <Box tagType="article">
          <div className="heading3 s-b-xxs">Read next</div>
          <LinkWithIcon href={"/writing/" + nextPost?.slug}>
            {nextPost?.title}
          </LinkWithIcon>
        </Box>
      </PostContent>
    </Page>
  );
}

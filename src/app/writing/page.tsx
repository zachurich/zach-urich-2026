import { getAllContent } from "@/lib/mdx";
import { Page } from "../../components/Page/Page";
import { Section } from "../../components/Section/Section";
import { Box } from "../../components/Box/Box";
import { LinkWithIcon } from "../../components/LinkWithIcon/LinkWithIcon";
import { FadeIn } from "@/components/FadeIn/FadeIn";

export const metadata = { title: "Writing" };

export default function WritingPage() {
  const posts = getAllContent("posts");
  return (
    <Page>
      <FadeIn>
        <h1>
          Some shit I{" "}
          <FadeIn delay={0.25} tagType="span">
            <em>wrote</em>
          </FadeIn>
        </h1>
      </FadeIn>
      <FadeIn delay={1}>
        <h2 className="body2 heading2variant">read if you dare</h2>
      </FadeIn>

      <Section>
        {posts.map((post) => (
          <Box key={post.slug} tagType="article" className="s-b-sm">
            <h3 className="s-b-xs">{post.title}</h3>
            <p className="body2 s-b-sm">{post.description}</p>
            <LinkWithIcon href={`/writing/${post.slug}`}>Read</LinkWithIcon>
          </Box>
        ))}
      </Section>
    </Page>
  );
}

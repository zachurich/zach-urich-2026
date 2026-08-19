import posts from "@/lib/posts";
import { Page } from "../../components/Page/Page";
import { Section } from "../../components/Section/Section";
import { Box } from "../../components/Box/Box";
import { LinkWithIcon } from "../../components/LinkWithIcon/LinkWithIcon";
import { FadeIn } from "@/components/FadeIn/FadeIn";
import { Metadata } from "next";
import { AnimateWord } from "@/components/AnimateWord/AnimateWord";

export const metadata: Metadata = { title: "Writing" };

export default function WritingPage() {
  const allPosts = posts.getAllPosts();
  return (
    <Page>
      <FadeIn>
        <h1>
          <AnimateWord>Thoughts</AnimateWord>
        </h1>
      </FadeIn>
      <FadeIn delay={0.35}>
        <h2 className="body2 heading2variant">
          semi-coherent writings on various topics
        </h2>
      </FadeIn>

      <Section>
        {allPosts.map((post, index) => (
          <FadeIn key={post.slug} delay={0.55 + index * 0.15}>
            <Box tagType="article" className="s-b-sm">
              <h3 className="s-b-xs">{post.title}</h3>
              <p className="body2 s-b-sm">{post.description}</p>
              <LinkWithIcon href={`/writing/${post.slug}`}>Read</LinkWithIcon>
            </Box>
          </FadeIn>
        ))}
      </Section>
    </Page>
  );
}

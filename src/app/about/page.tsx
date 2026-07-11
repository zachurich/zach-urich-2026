import { getContentBySlug } from "@/lib/mdx";
import { Page } from "../../components/Page/Page";
import { Section } from "../../components/Section/Section";
import { PostContent } from "../../components/PostContent/PostContent";

import { FadeIn } from "../../components/FadeIn/FadeIn";
export const metadata = { title: "About" };

export default async function AboutPage() {
  const Content = await getContentBySlug("pages", "about");
  return (
    <Page>
      <FadeIn>
        <h1>
          A little about{" "}
          <FadeIn delay={0.25} tagType="span">
            <em>me...</em>
          </FadeIn>
        </h1>
      </FadeIn>
      {/* <h2 className="body2 heading2variant">read if you dare</h2> */}
      <FadeIn delay={0.75}>
        <Section>
          <PostContent>
            <Content />
          </PostContent>
        </Section>
      </FadeIn>
    </Page>
  );
}

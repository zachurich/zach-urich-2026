import pages from "@/lib/pages";
import { Page } from "../../components/Page/Page";
import { Section } from "../../components/Section/Section";
import { PostContent } from "../../components/PostContent/PostContent";

import { FadeIn } from "../../components/FadeIn/FadeIn";
import { Metadata } from "next";
import { AnimateWord } from "@/components/AnimateWord/AnimateWord";

export const metadata: Metadata = { title: "About" };

export default async function AboutPage() {
  const Content = await pages.getPageBySlug("about");
  return (
    <Page>
      <FadeIn>
        <h1>
          A little about <AnimateWord>me...</AnimateWord>
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

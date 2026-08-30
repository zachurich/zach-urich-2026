import { Page } from "@/components/Page/Page";
import { Section } from "@/components/Section/Section";

import { FadeIn } from "@/components/FadeIn/FadeIn";
import github from "@/lib/github";
import { AnimateWord } from "@/components/AnimateWord/AnimateWord";
import { Box } from "@/components/Box/Box";
import { LineItem } from "@/components/LineItem/LineItem";
import { LinkWithIcon } from "@/components/LinkWithIcon/LinkWithIcon";
import { List } from "@/components/List/List";
import visitor from "@/lib/visitor";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Info" };

export default async function AboutPage() {
  const recentCommit = await github.getLatestCommit();
  const visitorCount = await visitor.getVisitorCount();
  return (
    <Page>
      <FadeIn>
        <h1>
          Site{" "}
          <FadeIn delay={0.25} tagType="span">
            <AnimateWord>info</AnimateWord>
          </FadeIn>
        </h1>
      </FadeIn>
      {/* <h2 className="body2 heading2variant">read if you dare</h2> */}
      <FadeIn delay={0.35}>
        <Section>
          <h2 className="s-b-sm">Tech Stack</h2>
          <Box className="s-b-sm">
            <List>
              <LineItem key="react">
                <LinkWithIcon href="https://reactjs.org/">React</LinkWithIcon>
                <span className="bodysmall">UI Library</span>
              </LineItem>
              <LineItem key="nextjs">
                <LinkWithIcon href="https://nextjs.org/">Next.js</LinkWithIcon>
                <span className="bodysmall">Framework</span>
              </LineItem>
              <LineItem key="typescript">
                <LinkWithIcon href="https://www.typescriptlang.org/">
                  TypeScript
                </LinkWithIcon>
                <span className="bodysmall">Programming Language</span>
              </LineItem>
              <LineItem key="mongodb">
                <LinkWithIcon href="https://github.com/mongodb/mongo">
                  MongoDB
                </LinkWithIcon>
                <span className="bodysmall">Database</span>
              </LineItem>
              <LineItem key="backpack">
                <LinkWithIcon href="https://github.com/zachurich/backpack">
                  Backpack
                </LinkWithIcon>
                <span className="bodysmall">
                  My subjective starter bag of components, themeing, & utils.
                </span>
              </LineItem>
            </List>
          </Box>
        </Section>
      </FadeIn>
      <FadeIn delay={0.45}>
        <Section>
          <h2 className="s-b-sm">Latest commit</h2>
          <Box>
            <LineItem className="s-b-base">
              <div>Last updated</div>
              <span className="bodysmall">{recentCommit?.date}</span>
            </LineItem>
            <LineItem>
              <LinkWithIcon href={recentCommit?.url}>
                <span>{recentCommit?.sha}</span>
              </LinkWithIcon>
              <span className="bodysmall">{recentCommit?.message}</span>
            </LineItem>
          </Box>
        </Section>
      </FadeIn>
      <FadeIn delay={0.55}>
        <Section>
          <h2 className="s-b-sm">Misc</h2>
          <Box>
            <LineItem>
              <span>Visitor Count</span>{" "}
              <span className="bodysmall">{visitorCount}</span>
            </LineItem>
          </Box>
        </Section>
      </FadeIn>
    </Page>
  );
}

import { Page } from "@/components/Page/Page";
import { FadeIn } from "@/components/FadeIn/FadeIn";
import { List } from "@/components/List/List";
import posts from "@/lib/posts";
import { Section } from "@/components/Section/Section";
import { LinkWithIcon } from "@/components/LinkWithIcon/LinkWithIcon";
import github from "@/lib/github";
import { Box } from "@/components/Box/Box";
import { LineItem } from "@/components/LineItem/LineItem";
import { Cta } from "@/components/Cta/Cta";

export const metadata = { title: "Home" };

export default async function Home() {
  // const Content = await pages.getPageBySlug("home");
  const recentPosts = posts.getSomePosts(3);
  const commits = await github.getLatestUserCommits({
    limitPerRepo: 3,
    maxRepos: 5,
  });
  console.log("commits", commits);
  return (
    <Page>
      <FadeIn>
        <h1>
          Hi, I&apos;m{" "}
          <FadeIn delay={0.25} tagType="span">
            <em>Zach</em>
          </FadeIn>
        </h1>
      </FadeIn>
      <FadeIn delay={0.35}>
        <div className="body2 heading2variant s-b-xxl">
          i like to draw, play video games, and occasionally take pictures. i
          also write code for a living.
        </div>
      </FadeIn>
      <Section className="s-b-xxl">
        <FadeIn delay={0.45}>
          <h2 className="s-b-sm">Recent thoughts</h2>
        </FadeIn>
        {recentPosts.map((post, index) => (
          <FadeIn key={post.slug} delay={0.55 + index * 0.15}>
            <Box tagType="article" className="s-b-sm">
              <h3 className="s-b-xs">{post.title}</h3>
              <p className="body2 s-b-sm">{post.description}</p>
              <LinkWithIcon href={`/writing/${post.slug}`}>Read</LinkWithIcon>
            </Box>
          </FadeIn>
        ))}
        <FadeIn delay={0.55 + recentPosts.length * 0.15}>
          <Cta className="s-t-lg" href="/writing">
            Read more
          </Cta>
        </FadeIn>
      </Section>
      <Section>
        <FadeIn delay={0.65}>
          <h2 className="s-b-sm">Gitub Activity log</h2>
        </FadeIn>
        <FadeIn delay={0.75}>
          <Box>
            <List
              items={commits.map((commit) => (
                <>
                  <LineItem key={commit.sha}>
                    <a href={commit.url}>
                      {commit.message.slice(0, 50)}
                      <span className="bodysmall">
                        ...[{commit.sha.slice(0, 7)}]
                      </span>
                    </a>
                    <p className="bodysmall s-t-sm">{commit.date}</p>
                  </LineItem>
                </>
              ))}
            />
          </Box>
        </FadeIn>
        <FadeIn delay={0.55 + recentPosts.length * 0.15}>
          <Cta
            className="s-t-lg"
            href="https://github.com/zachurich?tab=overview"
          >
            See more
          </Cta>
        </FadeIn>
      </Section>
    </Page>
  );
}

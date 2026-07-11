import { Page } from "../components/Page/Page";
import { FadeIn } from "../components/FadeIn/FadeIn";

export const metadata = { title: "Home" };

export default async function Home() {
  // const Content = await getContentBySlug("pages", "home");
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
      <FadeIn delay={0.75}>
        <div className="body2 heading2variant">
          i like to draw, play video games, and occasionally take pictures. i
          also write code for a living.
        </div>
      </FadeIn>
    </Page>
  );
}

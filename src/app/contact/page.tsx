import { Page } from "../../components/Page/Page";
import { Section } from "../../components/Section/Section";
import { FadeIn } from "@/components/FadeIn/FadeIn";
import { Metadata } from "next";
import { AnimateWord } from "@/components/AnimateWord/AnimateWord";
import { ContactForm } from "./components/ContactForm";
import { getSubmission } from "../actions";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description: "Get in touch with Zach Urich with questions, or just say hello.",
  path: "/contact",
});

export default async function ContactPage() {
  const submittedBefore = await getSubmission();
  console.log(submittedBefore);
  return (
    <Page>
      <FadeIn>
        <h1>
          <AnimateWord>Reach out to me</AnimateWord>
        </h1>
      </FadeIn>
      <FadeIn delay={0.35}>
        <h2 className="body2 heading2variant">
          Feel free to reach out to me with any questions, or just say hello.
        </h2>
      </FadeIn>
      <Section>
        <div>
          <ContactForm submittedBefore={submittedBefore} />
        </div>
      </Section>
    </Page>
  );
}

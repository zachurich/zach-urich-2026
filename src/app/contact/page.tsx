import { Page } from "../../components/Page/Page";
import { Section } from "../../components/Section/Section";
import { FadeIn } from "@/components/FadeIn/FadeIn";
import { Metadata } from "next";
import { AnimateWord } from "@/components/AnimateWord/AnimateWord";
import { ContactForm } from "./components/ContactForm";
import { getSubmission } from "../actions";

export const metadata: Metadata = { title: "Contact" };

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
          Ill get an email and may or may not reply
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

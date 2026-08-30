import posts from "@/lib/posts";
import { Page } from "../../components/Page/Page";
import { Section } from "../../components/Section/Section";
import { Box } from "../../components/Box/Box";
import { LinkWithIcon } from "../../components/LinkWithIcon/LinkWithIcon";
import { FadeIn } from "@/components/FadeIn/FadeIn";
import { Metadata } from "next";
import { AnimateWord } from "@/components/AnimateWord/AnimateWord";
import { Input } from "@/components/Input/Input";
import { Button } from "@/components/Button/Button";

export const metadata: Metadata = { title: "Contact" };

export default function WritingPage() {
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
          <form>
            <div className="form-group">
              <Input label="First Name" required maxLength={50} minLength={2} />
              <Input label="Last Name" required maxLength={50} minLength={2} />
            </div>
            <Input
              label="Message"
              variant="textarea"
              maxLength={500}
              required
            />
            <Input variant="honeypot" type="email" />
            <Button type="submit" variant="primary">
              Submit
            </Button>
          </form>
        </div>
      </Section>
    </Page>
  );
}

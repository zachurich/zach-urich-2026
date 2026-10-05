import { FadeIn } from "@/components/FadeIn/FadeIn";
import { GuestBookEntry } from "@/components/GuestBookEntry/GuestBookEntry";
import { Page } from "@/components/Page/Page";
import { Section } from "@/components/Section/Section";
import guestBook from "@/lib/guestBook";
import type { Metadata } from "next";

// Hidden from navigation while under construction, so keep it out of search.
export const metadata: Metadata = {
  title: "Guestbook",
  robots: { index: false, follow: true },
};

export default async function GuestBookPage() {
  const entries = await guestBook.getGuestBookEntries();
  return (
    <Page>
      <FadeIn>
        <h1>
          Sign the{" "}
          <FadeIn delay={0.25} tagType="span">
            <em>guestbook</em>.
          </FadeIn>
        </h1>
      </FadeIn>
      {/* <h2 className="body2 heading2variant">read if you dare</h2> */}
      <FadeIn delay={0.75}>
        <Section>
          {entries.map((entry) => (
            <GuestBookEntry
              className="s-b-sm"
              key={entry._id}
              name={entry.name}
              message={entry.message}
              createdAt={entry.createdAt?.toISOString()}
            />
          ))}
        </Section>
      </FadeIn>
    </Page>
  );
}

import { FadeIn } from "@/components/FadeIn/FadeIn";
import { GuestBookEntry } from "@/components/GuestBookEntry/GuestBookEntry";
import { Page } from "@/components/Page/Page";
import { Section } from "@/components/Section/Section";
import guestBook from "@/lib/guestBook";

export default async function GuestBookPage() {
  const entries = await guestBook.getGuestBookEntries();
  await guestBook.saveGuestBookEntry("John Doe", "This is a test message.");
  // await guestBook.__debug_flushAllGuestBookEntries();
  console.log("Guest book entries:", entries);
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

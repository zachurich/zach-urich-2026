type Props = {
  data: Record<string, unknown>;
};

/**
 * Renders schema.org structured data. `<` is escaped to prevent
 * breaking out of the script tag.
 */
export const JsonLd = ({ data }: Props) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          ...data,
        }).replace(/</g, "\\u003c"),
      }}
    />
  );
};

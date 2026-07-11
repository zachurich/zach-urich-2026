import type { BundledLanguage } from "shiki";
import { codeToHtml } from "shiki";

type Props = {
  children: string;
  lang: BundledLanguage;
};

export const CodeBlock = async (props: Props) => {
  const out = await codeToHtml(props.children, {
    lang: props.lang,
    theme: "synthwave-84",
    rootStyle: `background-color: inherit;`,
  });

  return <div dangerouslySetInnerHTML={{ __html: out }} />;
};

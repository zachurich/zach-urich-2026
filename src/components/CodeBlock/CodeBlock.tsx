"use client";

import { useTheme } from "@/contexts/Theme/hooks";
import { useEffect, useState } from "react";
import type { BundledLanguage } from "shiki";
import { codeToHtml } from "shiki";

type Props = {
  children: string;
  lang: BundledLanguage;
};

export const CodeBlock = (props: Props) => {
  const { theme } = useTheme();
  const [html, setHtml] = useState(props.children);

  useEffect(() => {
    codeToHtml(props.children, {
      lang: props.lang,
      theme: theme === "dark" ? "github-dark" : "github-light",
      rootStyle: `background-color: inherit;`,
    }).then((latestHtml) => {
      setHtml(latestHtml);
    });
  }, [theme, props.children, props.lang]);

  return (
    <div className="code-block" dangerouslySetInnerHTML={{ __html: html }} />
  );
};

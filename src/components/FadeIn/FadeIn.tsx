"use client";

import { motion } from "motion/react";
import styles from "./fadeIn.module.css";

type Props = {
  children?: React.ReactNode;
  delay?: number;
  tagType?: "div" | "span";
};

export const FadeIn = ({ children, delay = 0, tagType = "div" }: Props) => {
  const Tag = motion[tagType];
  return (
    <Tag
      className={styles.fadeIn}
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeIn", delay }}
    >
      {children}
    </Tag>
  );
};

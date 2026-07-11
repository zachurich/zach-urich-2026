"use client";

import { AnimatePresence, motion } from "motion/react";
import styles from "./transition.module.css";
import classNames from "classnames";

type Props = {
  children?: React.ReactNode;
  className?: string;
  delay?: number;
  tagType?: "div" | "span";
};

export const Transition = ({
  children,
  className,
  delay,
  tagType = "div",
}: Props) => {
  const MotionTag = motion[tagType];
  return (
    <AnimatePresence mode="wait">
      <MotionTag
        className={classNames(styles.transition, className)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25, ease: "easeIn", delay }}
      >
        {children}
      </MotionTag>
    </AnimatePresence>
  );
};

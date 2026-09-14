"use client";

import { motion } from "motion/react";
import styles from "./fadeIn.module.css";
import { useCallback, useEffect, useRef, useState } from "react";

type Props = {
  children?: React.ReactNode;
  delay?: number;
  tagType?: "div" | "span";
  showWhenInView?: boolean;
};

export const FadeIn = ({
  children,
  delay = 0,
  tagType = "div",
  showWhenInView = true,
}: Props) => {
  const Tag = motion[tagType];
  const ref = useRef<HTMLDivElement | null>(null);
  const [delayState, setDelayState] = useState(delay);

  const getDelay = useCallback(() => {
    const elementTop = ref.current?.getBoundingClientRect()?.top;
    const isElementInView =
      elementTop !== undefined && elementTop < window.innerHeight;
    if (!isElementInView) {
      return 0;
    }
    return delayState;
  }, [delayState]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDelayState(getDelay());
  }, [getDelay]);

  return (
    <Tag
      ref={ref}
      className={styles.fadeIn}
      initial={{ opacity: showWhenInView ? 0 : 1, y: 5 }}
      whileInView={showWhenInView ? { opacity: 1, y: 0 } : undefined}
      animate={!showWhenInView ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once: true, amount: 0.1, margin: "-10px" }}
      transition={{ duration: 0.25, ease: "easeIn", delay: delayState }}
    >
      {children}
    </Tag>
  );
};

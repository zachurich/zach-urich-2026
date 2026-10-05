import classNames from "classnames";
import styles from "./animateWord.module.css";
import { FadeIn } from "../FadeIn/FadeIn";
import { useId } from "react";

type Props = {
  children: string;
  className?: string;
};

export const AnimateWord = ({ children, className }: Props) => {
  const id = useId();
  return (
    <span className={classNames(styles.animateWord, className)}>
      {/* Letters are split for the animation; screen readers get the word */}
      <span className={styles.srOnly}>{children}</span>
      <span aria-hidden="true">
        {children.split("").map((char, index) => (
          <FadeIn
            key={id + char + index.toString()}
            delay={0.25 + index * 0.1}
            tagType="span"
          >
            {char}
          </FadeIn>
        ))}
      </span>
    </span>
  );
};

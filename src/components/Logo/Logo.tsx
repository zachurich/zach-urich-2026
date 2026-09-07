import classNames from "classnames";
import { motion } from "motion/react";
import styles from "./logo.module.css";

type Props = {
  className?: string;
};

export const Logo = ({ className }: Props) => {
  return (
    <div className={classNames(styles.logo, className)}>
      <svg
        width="284"
        height="355"
        viewBox="0 0 284 355"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="M71.9057 21.3159C138.391 -1.68408 242.906 51.3159 264.123 182.714C286.635 322.138 199.233 362.222 87.9851 325.531C81.9427 323.538 76.1273 320.639 71.0261 316.837C-39.5996 234.376 36.8665 84.582 122.555 96.2069C158.067 105.818 214.959 127.083 197.716 242.118C195.948 253.915 188.482 264.369 177.373 268.714C147.646 280.34 120.521 277.942 94.9635 249.368C50.9055 200.111 104.964 116.316 138.391 200.111"
          // stroke="var(--color-tertiary)"
          strokeWidth="32"
          strokeLinecap="round"
          animate={{
            stroke: [
              "var(--color-secondary)",
              "var(--color-quaternary)",
              "var(--color-tertiary)",
              "var(--color-secondary)",
            ],
          }}
          transition={{
            duration: 10,
            ease: "easeOut",
            repeat: Infinity,
          }}
        />
      </svg>
    </div>
  );
};

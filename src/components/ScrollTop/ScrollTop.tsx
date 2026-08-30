"use client";

import classNames from "classnames";
import styles from "./scrollTop.module.css";
import Link from "next/link";

type Props = {
  children?: React.ReactNode;
  className?: string;
};

export const ScrollTop = ({ children, className }: Props) => {
  return (
    <div className={classNames(styles.scrollTop, className, "bodysmall")}>
      <Link
        href="#"
        onClick={() => {
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
        }}
      >
        {children}
      </Link>
    </div>
  );
};

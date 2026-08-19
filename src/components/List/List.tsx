import React from "react";
import classNames from "classnames";
import styles from "./list.module.css";

type Props = {
  className?: string;
  children?: React.ReactNode;
};

export const List = ({ className, children }: Props) => {
  return (
    <div className={classNames(styles.list, className)}>
      <ul className={styles.listItems}>
        {React.Children.map(children, (child, index) => (
          <li key={index} className={styles.listItem}>
            {child}
          </li>
        ))}
      </ul>
    </div>
  );
};

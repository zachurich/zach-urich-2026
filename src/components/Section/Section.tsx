import styles from "./section.module.css";
import classNames from "classnames";

type Props = {
  children?: React.ReactNode;
  className?: string;
};

export const Section = ({ children, className }: Props) => {
  return (
    <div className={classNames(styles.section, className)}>{children}</div>
  );
};

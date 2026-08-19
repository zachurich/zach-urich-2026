import classNames from "classnames";
import styles from "./container.module.css";

type Props = {
  children?: React.ReactNode;
  tagType?: "div" | "main" | "section";
  className?: string;
};

export const Container = ({ className, children, tagType = "div" }: Props) => {
  const Tag = tagType;
  return (
    <Tag className={classNames(styles.container, className)}>{children}</Tag>
  );
};

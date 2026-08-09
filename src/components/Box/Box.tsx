import classNames from "classnames";
import styles from "./box.module.css";

type Props = {
  className?: string;
  children?: React.ReactNode;
  tagType?: "div" | "section" | "article" | "aside";
  size?: "small" | "base";
};

export const Box = ({
  className,
  children,
  tagType = "div",
  size = "base",
}: Props) => {
  const Tag = tagType;
  return (
    <Tag className={classNames(styles.box, className, styles[size])}>
      {children}
    </Tag>
  );
};

import styles from "./container.module.css";

type Props = {
  children?: React.ReactNode;
  tagType?: "div" | "main" | "section";
};

export const Container = ({ children, tagType = "div" }: Props) => {
  const Tag = tagType;
  return <Tag className={styles.container}>{children}</Tag>;
};

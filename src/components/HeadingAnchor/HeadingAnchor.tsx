import styles from "./headingAnchor.module.css";

type Props = {
  children: React.ReactNode;
  tagType: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
};

export const HeadingAnchor = ({ children, tagType }: Props) => {
  const Tag = tagType;
  const id = String(children).toLowerCase().replace(/\s+/g, "-");
  return (
    <Tag className={styles.headingAnchor} id={id}>
      <a href={`#${id}`}>
        {children} <span className={styles.anchorIcon}>#</span>
      </a>
    </Tag>
  );
};

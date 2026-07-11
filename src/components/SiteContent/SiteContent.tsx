import styles from "./siteContent.module.css";

type Props = {
  children?: React.ReactNode;
};

export const SiteContent = ({ children }: Props) => {
  return <div className={styles.siteContent}>{children}</div>;
};

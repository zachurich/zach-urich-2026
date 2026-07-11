import styles from "./postContent.module.css";

type Props = {
  title?: string;
  date?: string;
  children?: React.ReactNode;
};

export const PostContent = ({ title, date, children }: Props) => {
  return (
    <div className={styles.postContent}>
      {title && <h1 className="brand">{title}</h1>}
      {date && <p className={styles.date}>{date}</p>}
      {children}
    </div>
  );
};

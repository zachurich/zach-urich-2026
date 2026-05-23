import styles from "./page.module.css";

type Props = {
  children?: React.ReactNode;
};

export const Page = ({ children }: Props) => {
  return (
    <div className={styles.page}>
      {children}
    </div>
  );
};

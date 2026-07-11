import styles from "./section.module.css";

type Props = {
  children?: React.ReactNode;
};

export const Section = ({ children }: Props) => {
  return (
    <div className={styles.section}>
      {children}
    </div>
  );
};

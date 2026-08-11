import styles from "./homeLink.module.css";
import Link from "next/link";

export const HomeLink = () => {
  return (
    <Link href="/" className={styles.homeLink}>
      <span className="heading1 brand">Z</span>
    </Link>
  );
};

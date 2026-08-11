import styles from "./homeLink.module.css";
import Link from "next/link";

type Props = {};

export const HomeLink = ({}: Props) => {
  return (
    <Link href="/" className={styles.homeLink}>
      <span className="heading1 brand">Z</span>
    </Link>
  );
};

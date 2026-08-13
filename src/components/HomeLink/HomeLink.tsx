import styles from "./homeLink.module.css";
import Link from "next/link";
import Image from "next/image";

type Props = {
  avatarUrl?: string;
  handle?: string;
};

export const HomeLink = ({ avatarUrl, handle = "zachurich.com" }: Props) => {
  return (
    <Link href="/" className={styles.homeLink}>
      <div className={styles.avatar} />
      {/* {avatarUrl && <Image src={avatarUrl} alt="" width={40} height={40} />} */}
      <span className="heading1 brand">Zach Urich</span>
    </Link>
  );
};

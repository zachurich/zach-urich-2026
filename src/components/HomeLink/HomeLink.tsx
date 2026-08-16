import styles from "./homeLink.module.css";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";

type Props = {
  avatarUrl?: string;
  handle?: string;
};

export const HomeLink = ({ avatarUrl, handle = "zachurich.com" }: Props) => {
  return (
    <Link href="/" className={styles.homeLink}>
      {/* <div className={styles.avatar}>
        <motion.div
          style={{
            opacity: 1,
            boxShadow: "0 0 15px 10px var(--brand-3)",
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [1, 1.15, 1.5],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            repeatType: "loop",
          }}
        /> */}
      {/* <span className={styles.onlineIndicator} /> */}
      {/* {avatarUrl && <Image src={avatarUrl} alt="" width={40} height={40} />} */}
      <span className="heading1 brand">Zach Urich</span>
      {/* </div> */}
    </Link>
  );
};

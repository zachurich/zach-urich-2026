import styles from "./backLink.module.css";
import { ArrowLeft } from "lucide-react";
import classNames from "classnames";
import Link from "next/link";

type Props = {
  className?: string;
  children?: React.ReactNode;
};

export const BackLink = ({ className, children }: Props) => {
  return (
    <div className={styles.backLink}>
      <Link href="." className={classNames(styles.link, className)}>
        {children ?? (
          <>
            <ArrowLeft size={18} />
            <div className="body2">Back</div>
          </>
        )}
      </Link>
    </div>
  );
};

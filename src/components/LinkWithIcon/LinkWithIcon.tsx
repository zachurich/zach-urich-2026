import Link from "next/link";
import styles from "./linkWithIcon.module.css";
import { ArrowRight } from "lucide-react";
import classNames from "classnames";

type Props = {
  className?: string;
  children?: React.ReactNode;
  href: string;
};

export const LinkWithIcon = ({ children, href, className }: Props) => {
  return (
    <Link className={classNames(styles.linkWithIcon, className)} href={href}>
      <div className="link">{children}</div>
      <ArrowRight size={20} />
    </Link>
  );
};

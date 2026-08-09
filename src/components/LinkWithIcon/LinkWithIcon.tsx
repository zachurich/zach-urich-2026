import Link from "next/link";
import styles from "./linkWithIcon.module.css";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import classNames from "classnames";

type Props = {
  className?: string;
  children?: React.ReactNode;
  href: string;
};

export const LinkWithIcon = ({ children, href, className }: Props) => {
  const external = href.startsWith("http");
  return (
    <Link
      className={classNames(styles.linkWithIcon, className)}
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <div className="link">{children}</div>
      {external ? <ArrowUpRight size={20} /> : <ArrowRight size={20} />}
    </Link>
  );
};

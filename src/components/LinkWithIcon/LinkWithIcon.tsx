import Link from "next/link";
import styles from "./linkWithIcon.module.css";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import classNames from "classnames";

type Props = {
  className?: string;
  children?: React.ReactNode;
  href: string;
  variant?: "default" | "inline";
};

export const LinkWithIcon = ({
  children,
  href,
  className,
  variant = "default",
}: Props) => {
  const external = href.startsWith("http");
  const iconSize = variant === "inline" ? 16 : 20;
  return (
    <Link
      className={classNames(styles.linkWithIcon, className, {
        [styles.inline]: variant === "inline",
      })}
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <div className="link">{children}</div>
      {external ? (
        <ArrowUpRight size={iconSize} />
      ) : (
        <ArrowRight size={iconSize} />
      )}
    </Link>
  );
};

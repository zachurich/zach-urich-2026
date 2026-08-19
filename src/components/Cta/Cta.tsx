import classNames from "classnames";
import styles from "./cta.module.css";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/Button/Button";

type Props = {
  children?: React.ReactNode;
  className?: string;
  href: string;
};

export const Cta = ({ children, className, href }: Props) => {
  const external = href.startsWith("http");
  return (
    <Link
      href={href}
      className={classNames(styles.cta, className)}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      <Button
        icon={external ? <ArrowUpRight size={18} /> : <ArrowRight size={18} />}
        iconPlacement="right"
        tagType="div"
      >
        {children}
      </Button>
    </Link>
  );
};

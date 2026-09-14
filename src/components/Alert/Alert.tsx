import classNames from "classnames";
import styles from "./alert.module.css";
import { Info } from "lucide-react";

type Props = {
  children?: React.ReactNode;
  className?: string;
  variant?: "info" | "error";
};

export const Alert = ({ children, className, variant = "info" }: Props) => {
  return (
    <div
      aria-live="polite"
      className={classNames(styles.alert, "body2", styles[variant], className)}
    >
      <Info size={18} /> <span>{children}</span>
    </div>
  );
};

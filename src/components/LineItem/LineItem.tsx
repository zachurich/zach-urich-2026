import classNames from "classnames";
import styles from "./lineItem.module.css";

type Props = {
  children?: React.ReactNode;
  className?: string;
};

export const LineItem = ({ children, className }: Props) => {
  return (
    <div className={classNames(styles.lineItem, className)}>{children}</div>
  );
};

import classNames from "classnames";
import styles from "./inlineBox.module.css";

type Props = {
  children?: React.ReactNode;
  className?: string;
};

export const InlineBox = ({ children, className }: Props) => {
  return (
    <div className={classNames(styles.inlineBox, className)}>
      {children}
    </div>
  );
};

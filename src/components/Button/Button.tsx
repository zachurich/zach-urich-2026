import classNames from "classnames";
import styles from "./button.module.css";

type Props = {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  variant?:
    | "primary"
    | "secondary"
    | "icon"
    | "iconSm"
    | "pill"
    | "inline"
    | "error";
  icon?: React.ReactNode;
  iconPlacement?: "left" | "right";
  className?: string;
  getRef?: React.Ref<HTMLButtonElement>;
  tagType?: "button" | "div";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  className,
  onClick,
  children,
  icon,
  iconPlacement = "left",
  variant = "primary",
  disabled,
  getRef,
  tagType = "button",
  ...rest
}: Props) => {
  if (tagType === "div") {
    return (
      <div
        className={classNames(className, styles.button, styles[variant], {
          [styles.disabled]: disabled,
        })}
      >
        {iconPlacement === "left" && icon}
        {children}
        {iconPlacement === "right" && icon}
      </div>
    );
  }
  return (
    <button
      ref={getRef}
      onClick={onClick}
      className={classNames(styles.button, styles[variant], className, {
        [styles.disabled]: disabled,
      })}
      aria-disabled={disabled}
      disabled={disabled}
      {...rest}
    >
      {iconPlacement === "left" && icon}
      {children}
      {iconPlacement === "right" && icon}
    </button>
  );
};

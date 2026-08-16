import classNames from "classnames";
import styles from "./input.module.css";
import { useId } from "react";

type Props = {
  className?: string;
  type?: HTMLInputElement["type"];
  value?: string;
  placeholder?: string;
  label?: string;
  description?: string;
  id?: string;
  name?: string;
};

export const Input = ({
  className,
  type = "text",
  value,
  placeholder,
  label,
  description,
  id,
  name,
}: Props) => {
  const generatedId = useId();
  return (
    <div className={classNames(styles.input, className)}>
      {description && (
        <span className={classNames(styles.description, "body2")}>
          {description}
        </span>
      )}
      <label htmlFor={id ?? generatedId}>{label}</label>
      <input
        id={id ?? generatedId}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
      />
    </div>
  );
};

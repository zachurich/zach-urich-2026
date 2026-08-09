import classNames from "classnames";
import styles from "./input.module.css";
import { useId } from "react";

type Props = {
  className?: string;
  type?: HTMLInputElement["type"];
  value?: string;
  placeholder?: string;
  id?: string;
  name?: string;
};

export const Input = ({
  className,
  type = "text",
  value,
  placeholder,
  id,
  name,
}: Props) => {
  const generatedId = useId();
  return (
    <div className={classNames(styles.input, className)}>
      <label htmlFor={id ?? generatedId}>{placeholder}</label>
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

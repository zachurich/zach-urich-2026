"use client";

import classNames from "classnames";
import styles from "./input.module.css";
import { useId } from "react";

type Props = {
  className?: string;
  label?: string;
  description?: string;
  variant?: "default" | "textarea" | "honeypot";
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Input = ({
  className,
  type = "text",
  value,
  placeholder,
  label,
  description,
  id,
  name,
  minLength,
  maxLength,
  required,
  disabled,
  variant = "default",
  ...rest
}: Props) => {
  const generatedId = useId();

  if (variant === "honeypot") {
    return (
      <input
        className={styles.hidden}
        aria-hidden
        tab-index="-1"
        auto-complete="off"
        type={type}
        name={name}
        id={id}
        {...rest}
      />
    );
  }

  const Tag = variant === "default" ? "input" : "textarea";
  return (
    <div className={classNames(styles.input, className)}>
      {description && (
        <span className={classNames(styles.description, "body2")}>
          {description}
        </span>
      )}
      <label htmlFor={id ?? generatedId}>{label}</label>
      <Tag
        id={id ?? generatedId}
        name={name}
        type={type}
        required={required}
        value={value}
        placeholder={placeholder}
        minLength={minLength}
        maxLength={maxLength}
        aria-disabled={disabled}
        disabled={disabled}
        {...rest}
      />
    </div>
  );
};

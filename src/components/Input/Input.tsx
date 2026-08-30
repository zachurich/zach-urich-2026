"use client";

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
  maxLength?: number;
  minLength?: number;
  required?: boolean;
  variant?: "default" | "textarea" | "honeypot";
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
  minLength,
  maxLength,
  required,
  variant = "default",
}: Props) => {
  const generatedId = useId();

  if (variant === "honeypot") {
    return (
      <input
        className={styles.hidden}
        aria-hidden
        tab-index="-1"
        auto-complete="off"
        placeholder="Your email"
        type={type}
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
        // @ts-expect-error React shit
        minlength={minLength}
        maxlength={maxLength}
      />
    </div>
  );
};

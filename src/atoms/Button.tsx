import React from "react";

interface ButtonProps {
  type?: "submit" | "reset" | "button";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  children?: React.ReactNode;
  form?: string;
  disabled?: boolean;
}

export default function Button({
  type = "button",
  onClick,
  className,
  children,
  form,
  disabled = false,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={className}
      form={form}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

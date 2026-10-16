import { ReactNode, ButtonHTMLAttributes } from "react";
import css from "./Button.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
 }

export default function Button({
  onClick,
  children = "Load More",
  type = "submit",
  disabled = false,
  className,
  ...props
}: ButtonProps) {
  
  const classes = [css.btn, className].filter(Boolean).join(" ");

  return (
    <button
      type={type}
      onClick={onClick}
      className={classes}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

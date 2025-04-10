import React from "react";

interface ButtonProps {
  title: string;
  type?: "submit" | "reset" | "button";
  disabled?: boolean;
  className: string;
  onClick?: (
    e: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>
  ) => void;
}
function Button(props: ButtonProps) {
  return (
    <button
      type={props.type}
      className={props.className}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.title}
    </button>
  );
}

export default Button;

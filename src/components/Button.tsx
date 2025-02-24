import React from "react";

interface ButtonProps {
  title: string;
  disabled?: boolean;
  className: string;
  onClick?: (e: any) => void;
}
function Button(props: ButtonProps) {
  return (
    <button
      className={props.className}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.title}
    </button>
  );
}

export default Button;

import React from "react";

interface ButtonProps {
  title: string;
  disabled?: boolean;
  className: string;
}
function Button(props: ButtonProps) {
  return (
    <button className={props.className} disabled={props.disabled}>
      {props.title}
    </button>
  );
}

export default Button;

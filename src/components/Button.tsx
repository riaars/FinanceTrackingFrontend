import React from "react";

interface ButtonProps {
  title: string;
  type?: "submit" | "reset" | "button";
  disabled?: boolean;
  className: string;
  icon?: any;
  onClick?: (
    e: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>
  ) => void;
}
function Button(props: ButtonProps) {
  return (
    <>
      <button
        type={props.type}
        className={props.className}
        disabled={props.disabled}
        onClick={props.onClick}
        // style={{
        //   display: "inline",
        //   justifyContent: "center",
        //   flexDirection: "row",
        //   alignItems: "center",
        //   gap: "8px",
        // }}
      >
        {props.icon}
        {props.title}
      </button>
    </>
  );
}

export default Button;

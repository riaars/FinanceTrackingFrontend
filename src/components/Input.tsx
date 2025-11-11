import React from "react";

interface InputProps {
  type: string;
  name: string;
  placeholder: string;
  value?: string | number;
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isDisabled?: boolean;
}
function Input(props: InputProps) {
  return (
    <input
      className={props.className ? props.className : "input-field"}
      type={props.type}
      name={props.name}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
      disabled={props.isDisabled}
    />
  );
}

export default Input;

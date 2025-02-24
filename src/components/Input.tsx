import React from "react";

interface InputProps {
  type: string;
  name: string;
  placeholder: string;
  value?: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
function Input(props: InputProps) {
  return (
    <input
      className="input-field"
      type={props.type}
      name={props.name}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
    />
  );
}

export default Input;

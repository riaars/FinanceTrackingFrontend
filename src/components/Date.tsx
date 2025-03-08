import React from "react";

interface DateProps {
  name: string;
  placeholder: string;
  value?: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min?: string;
  max?: string;
}
function InputDate(props: DateProps) {
  return (
    <input
      className="input-field"
      type="date"
      name={props.name}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
      min={props.min}
      max={props.max}
    />
  );
}

export default InputDate;

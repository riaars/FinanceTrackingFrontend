import React from "react";
import Input, { InputProps } from "./Input";

const CurrencyInput = (props: InputProps) => {
  return (
    <div className="input-with-icon">
      <span>kr</span>
      <Input {...props} />
    </div>
  );
};

export default CurrencyInput;

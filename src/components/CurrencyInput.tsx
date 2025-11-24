import React from "react";

interface CurrencyProps {
  name: string;
  placeholder: string;
  value: number | string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const CurrencyInput = ({
  name,
  placeholder,
  value,
  onChange,
}: CurrencyProps) => {
  return (
    <div className="currency-box">
      <span className="icon">kr</span>
      <input
        className="input-search"
        type="number"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default CurrencyInput;

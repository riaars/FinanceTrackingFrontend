import React from "react";
import Input from "./Input";

type SearchBarType = {
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  name: string;
};
const SearchBar = ({ value, onChange, placeholder, name }: SearchBarType) => {
  return (
    <Input
      className="search-field"
      type="text"
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default SearchBar;

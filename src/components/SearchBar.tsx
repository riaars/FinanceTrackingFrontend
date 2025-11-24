import React from "react";

type SearchBarType = {
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  name: string;
};
const SearchBar = ({ value, onChange, placeholder, name }: SearchBarType) => {
  return (
    <div className="search-box">
      <i className="fa fa-search icon"></i>
      <input
        className="input-search"
        type="text"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchBar;

import React from "react";

type FilterActionProps = {
  period: string;
  setPeriod: (view: string) => void;
};
const FilterAction = (props: FilterActionProps) => {
  const options = ["day", "week", "month", "year"];

  return (
    <>
      {options.map((option) => (
        <button
          key={option}
          className={` ${
            props.period === option ? "filter-button active" : "filter-button"
          }`}
          onClick={() => props.setPeriod(option)}
        >
          {option.charAt(0).toUpperCase() + option.slice(1)}
        </button>
      ))}
    </>
  );
};

export default FilterAction;

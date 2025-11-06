import React from "react";

type FilterActionProps = {
  view: string;
  setView: (view: string) => void;
};
const FilterAction = (props: FilterActionProps) => {
  const options = ["day", "week", "month", "year"];

  return (
    <>
      {options.map((option) => (
        <button
          key={option}
          className={` ${
            props.view === option ? "filter-button active" : "filter-button"
          }`}
          onClick={() => props.setView(option)}
        >
          {option.charAt(0).toUpperCase() + option.slice(1)}
        </button>
      ))}
    </>
  );
};

export default FilterAction;

import React, { useState } from "react";

const Dropdown = ({ options }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Select a category");

  return (
    <div style={{ position: "relative", minWidth: "240px" }}>
      <button onClick={() => setIsOpen(!isOpen)} className="input-field">
        {selected} ▼
      </button>

      {isOpen && (
        <ul
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            width: "100%",
            border: "1px solid #ccc",
            background: "white",
            listStyle: "none",
            padding: 0,
          }}
        >
          {options.map((option: string) => (
            <li
              key={option}
              onClick={() => {
                setSelected(option);
                setIsOpen(false);
              }}
              style={{ padding: "10px", cursor: "pointer" }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;

import React, { useEffect, useRef, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { RiArrowDropUpLine } from "react-icons/ri";

type DropdownType = {
  options: string[];
  name: string;
  value?: string;
  onChange: (name: string, value: string) => void;
  className?: string;
};
const Dropdown = ({
  options,
  name,
  value,
  onChange,
  className,
}: DropdownType) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="dropdown">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`dropdown__button ${className}`}
      >
        <div className="dropdown__button__selected-item">
          {value}
          {isOpen ? <RiArrowDropUpLine /> : <RiArrowDropDownLine />}
        </div>
      </button>

      {isOpen && (
        <ul className="dropdown__list">
          {options.map((option: string) => (
            <li
              className="dropdown__list__item"
              key={option}
              onClick={() => {
                onChange(name, option);
                setIsOpen(false);
              }}
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

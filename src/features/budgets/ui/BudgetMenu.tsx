import React from "react";
import { BsGrid } from "react-icons/bs";
import { LuTable } from "react-icons/lu";

interface BudgetMenuProps {
  isManageBudget: boolean;
  setManageBudget: (e: boolean) => void;
}
const BudgetMenu = ({ isManageBudget, setManageBudget }: BudgetMenuProps) => {
  return (
    <div className="budgets__option-view">
      <button
        className={`${
          !isManageBudget ? "primary-button" : "secondary-button"
        } `}
        onClick={() => setManageBudget(false)}
      >
        <span className="button-icon__wrapper">
          <BsGrid />
          <span> Budget Overview </span>
        </span>
      </button>
      <button
        className={`${isManageBudget ? "primary-button" : "secondary-button"} `}
        onClick={() => setManageBudget(true)}
      >
        <span className="button-icon__wrapper">
          <LuTable />
          <span> Manage Budget </span>
        </span>
      </button>
    </div>
  );
};

export default BudgetMenu;

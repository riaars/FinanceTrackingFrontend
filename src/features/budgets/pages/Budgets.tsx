import Content from "@/layout/Content";
import React, { useState } from "react";
import { BsGrid } from "react-icons/bs";
import { LuTable } from "react-icons/lu";
import ManageBudgetList from "../ui/ManageBudgetList";
import ManageBudgetCard from "../ui/ManageBudgetCard";

const Budgets = () => {
  const [manageBudget, setManageBudget] = useState(false);

  return (
    <Content title="Budgets">
      <div className="budgets__option-view">
        <button
          className={`${
            !manageBudget ? "primary-button" : "secondary-button"
          } `}
          onClick={() => setManageBudget(false)}
        >
          <span className="button-icon__wrapper">
            <BsGrid />
            <span> Budget Overview </span>
          </span>
        </button>
        <button
          className={`${manageBudget ? "primary-button" : "secondary-button"} `}
          onClick={() => setManageBudget(true)}
        >
          <span className="button-icon__wrapper">
            <LuTable />
            <span> Manage Budget </span>
          </span>
        </button>
      </div>

      {!manageBudget ? <ManageBudgetCard /> : <ManageBudgetList />}
    </Content>
  );
};

export default Budgets;

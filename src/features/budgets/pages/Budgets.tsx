import Content from "@/layout/Content";
import React, { useState } from "react";
import { BsGrid } from "react-icons/bs";
import { LuTable } from "react-icons/lu";
import ManageBudgetList from "../ui/ManageBudgetList";
import ManageBudgetCard from "../ui/ManageBudgetCard";
import { useGetMonthlyBudgetQuery } from "../api";
import { useGetAllTransactionsQuery } from "@/features/transaction/api";
import { filterTransactionsByView } from "@/features/dashboard/utils/transactionUtils";

const Budgets = () => {
  const [manageBudget, setManageBudget] = useState(false);

  const { data: budget_data } = useGetMonthlyBudgetQuery();
  const { data: transactionsData } = useGetAllTransactionsQuery();

  const transactions = transactionsData?.data || [];

  const current_month_transactions = filterTransactionsByView(
    transactions,
    "month"
  );

  const budget = budget_data?.data;

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
      {!manageBudget ? (
        <ManageBudgetCard
          current_month_transactions={current_month_transactions}
          budget={budget}
        />
      ) : (
        <ManageBudgetList
          current_month_transactions={current_month_transactions}
          budget={budget}
        />
      )}
    </Content>
  );
};

export default Budgets;

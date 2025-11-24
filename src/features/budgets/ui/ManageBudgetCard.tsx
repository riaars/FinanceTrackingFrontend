import React from "react";
import {
  getBudgetByCategory,
  getCurrentMonthTransactionsCategory,
} from "@/features/dashboard/utils/transactionUtils";
import BudgetCard from "./BudgetCard";

const ManageBudgetCard = ({
  data,
  current_month_transactions,
  budget,
}: any) => {
  return (
    <div className="budgets__grid">
      {data.map((expense_item: any, index: number) => (
        <BudgetCard
          key={index}
          category_type={expense_item.type}
          category_label={expense_item.label}
          current_balance={getCurrentMonthTransactionsCategory(
            current_month_transactions,
            expense_item.label
          )}
          category_budget={getBudgetByCategory(budget, expense_item.type)}
        />
      ))}
    </div>
  );
};

export default ManageBudgetCard;

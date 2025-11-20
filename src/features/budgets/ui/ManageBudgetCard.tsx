import { CategoryExpenseObject } from "@/utils/Constant";
import React from "react";
import {
  getBudgetByCategory,
  getCurrentMonthTransactionsCategory,
} from "@/features/dashboard/utils/transactionUtils";
import BudgetCard from "./BudgetCard";

const ManageBudgetCard = ({ current_month_transactions, budget }: any) => {
  return (
    <div className="budgets__grid">
      {CategoryExpenseObject.filter(
        (item) => getBudgetByCategory(budget, item.type) > 0
      ).map((expense_item) => (
        <BudgetCard
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

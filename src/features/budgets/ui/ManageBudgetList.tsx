import React, { useEffect, useRef, useState } from "react";
import { useAddMonthlyBudgetMutation } from "../api";
import { CategoryExpenseObject } from "@/utils/Constant";
import {
  formattedCategory,
  getCurrentMonthTransactionsCategory,
} from "@/features/dashboard/utils/transactionUtils";
import { CategoryIcons } from "@/utils/categoryIcons";

const ManageBudgetList = ({ current_month_transactions, budget }: any) => {
  const [addMonthlyBudget] = useAddMonthlyBudgetMutation();

  const [monthlyBudget, setMonthlyBudget] = useState(
    budget?.budget_per_categories
  );

  const getCategoryBudget = (type: string) => {
    return monthlyBudget?.[type];
  };

  const budgetPerCategories = (type: string, value: number) => {
    return {
      budget_per_categories: {
        [type]: value,
      },
    };
  };

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleChange = (name: string, value: string) => {
    setMonthlyBudget({ ...budget, [name]: value });

    if (timerRef?.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      addMonthlyBudget(budgetPerCategories(name, value));
    }, 500);
  };

  useEffect(() => {
    return () => {
      if (timerRef?.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <table>
      <thead className="table-head">
        <tr className="table-row-head">
          <td className="table-cell compact">Category</td>
          <td className="table-cell compact">Current Spending</td>
          <td className="table-cell compact">Budget</td>
        </tr>
      </thead>

      <tbody>
        {CategoryExpenseObject.map((item) => (
          <tr className="table-row ">
            <td className="table-cell compact">
              <div className="transaction-category__wrapper">
                <button
                  className={`category-icon-button ${formattedCategory(
                    item.label
                  )}`}
                >
                  {CategoryIcons(item.label)}
                </button>
                <div className="transaction-category__details">
                  <span> {item.label} </span>
                </div>
              </div>
            </td>
            <td className="table-cell compact">
              {getCurrentMonthTransactionsCategory(
                current_month_transactions,
                item.label
              )}{" "}
              kr
            </td>
            <td className="table-cell compact">
              <input
                type="number"
                value={getCategoryBudget(item.type)}
                name={item.type}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                className="input-field"
              />
              kr
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ManageBudgetList;

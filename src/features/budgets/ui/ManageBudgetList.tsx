import React, { useEffect, useRef, useState } from "react";
import { useAddMonthlyBudgetMutation } from "../api";
import {
  formattedCategory,
  getBudgetByCategory,
  getCurrentMonthTransactionsCategory,
} from "@/features/dashboard/utils/transactionUtils";
import { CategoryIcons } from "@/utils/categoryIcons";
import { Budget } from "../api/type";

const ManageBudgetList = ({
  data,
  current_month_transactions,
  budget,
}: any) => {
  const [addMonthlyBudget] = useAddMonthlyBudgetMutation();
  const [monthlyBudget, setMonthlyBudget] = useState(budget);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleChange = (name: string, value: string) => {
    setMonthlyBudget((prev: Budget) => ({
      ...prev,
      budget_per_categories: {
        ...prev.budget_per_categories,
        [name]: value,
      },
    }));

    if (timerRef?.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      const payload: Budget = {
        budget_per_categories: {
          [name]: value,
        },
      };
      addMonthlyBudget(payload);
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
        {data.map((item: any, index: number) => (
          <tr className="table-row" key={index}>
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
                value={
                  getBudgetByCategory(monthlyBudget, item.type) !== null
                    ? String(getBudgetByCategory(monthlyBudget, item.type))
                    : ""
                }
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

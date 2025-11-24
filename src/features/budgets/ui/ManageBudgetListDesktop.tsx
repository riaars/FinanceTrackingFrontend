import {
  formattedCategory,
  getCurrentMonthTransactionsCategory,
} from "@/features/dashboard/utils/transactionUtils";
import { CategoryIcons } from "@/utils/categoryIcons";
import React from "react";

const ManageBudgetListDesktop = ({
  data,
  current_month_transactions,
  handleChange,
  budget,
}: any) => {
  return (
    <div className="budget-list-desktop">
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
    </div>
  );
};

export default ManageBudgetListDesktop;

import { formattedCategory } from "@/features/dashboard/utils/transactionUtils";
import { Transaction } from "@/features/transaction/api/type";
import { CategoryIcons } from "@/utils/categoryIcons";
import React from "react";

const RecurringMobile = ({ data }: { data: Transaction[] }) => {
  return (
    <div className="transaction-mobile">
      {data.map((recurring) => (
        <div className="transaction-card" key={recurring.transaction_id}>
          <div className="transaction-category__wrapper">
            <button
              className={`category-icon-button ${formattedCategory(
                recurring.category
              )}`}
            >
              {CategoryIcons(recurring.category)}
            </button>

            <div className="transaction-category__details">
              <div className="transaction-category">{recurring.category}</div>
              <div className="transaction-detail">
                <div>{recurring.interval}</div>
              </div>
              <div className="transaction-detail">
                {new Date(recurring.nextDate).toLocaleDateString("en-SE")}
              </div>
            </div>
          </div>

          <div className="transaction-amount__wrapper">
            <div className="transaction-amount">
              <span
                className={`${
                  recurring.type === "Expense"
                    ? "amount-expense"
                    : "amount-income"
                }`}
              >
                {recurring.type === "Expense" ? "-" : "+"}
                {recurring.amount} kr
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecurringMobile;

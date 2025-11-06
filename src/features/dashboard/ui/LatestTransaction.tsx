import Button from "@/components/Button";
import { Transaction } from "@/features/transaction/api/type";
import { CategoryIcons } from "@/utils/categoryIcons";
import React from "react";
import { formattedCategory } from "../utils/transactionUtils";

const LatestTransaction = ({
  transactions,
}: {
  transactions: Transaction[];
}) => {
  return (
    <div>
      <div className="transaction-desktop">
        <table className="transaction-table">
          <thead className="table-head"></thead>
          <tbody>
            {transactions.slice(0, 5)?.map((transaction) => (
              <tr key={transaction.transaction_id} className="table-row">
                <td className="table-cell">
                  <div className="transaction-category__wrapper">
                    <button
                      className={`category-icon-button ${formattedCategory(
                        transaction.category
                      )}`}
                    >
                      {CategoryIcons(transaction.category)}
                    </button>
                    <div className="transaction-category__details">
                      <div>{transaction.category}</div>
                      <div className="transaction-detail">
                        {transaction.detail.slice(0, 40)}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="table-cell">
                  {new Date(transaction.createdAt).toLocaleString("en-SE")}
                </td>
                <td className={`table-cell}`}>
                  <span
                    className={`${
                      transaction.type === "Expense"
                        ? "amount-expense"
                        : "amount-income"
                    }`}
                  >
                    {transaction.type === "Expense" ? "-" : "+"}
                    {transaction.amount} kr
                  </span>
                </td>

                {/* <td className="table-cell">
                  <Button
                    title={transaction?.type}
                    className={`tag-button ${transaction?.type?.toLowerCase()}`}
                  />
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LatestTransaction;

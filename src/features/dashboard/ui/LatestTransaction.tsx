import { Transaction } from "@/features/transaction/api/type";
import { CategoryIcons } from "@/utils/categoryIcons";
import React from "react";
import { formattedCategory } from "../utils/transactionUtils";
import { Link } from "react-router-dom";
import * as PATH from "@/config/Path";
const LatestTransaction = ({
  transactions,
}: {
  transactions: Transaction[];
}) => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "1rem",
          margin: "1rem",
        }}
      >
        <div className="chart__title">Latest Transactions</div>
        <Link to={PATH.TRANSACTIONS} className="link">
          View All
        </Link>
      </div>
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
                      <div className="transaction-category">
                        {transaction.category}
                      </div>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="transaction-mobile">
        {transactions.slice(0, 5)?.map((transaction) => (
          <div className="transaction-card" key={transaction.transaction_id}>
            <div className="transaction-category__wrapper">
              <button
                className={`category-icon-button ${formattedCategory(
                  transaction.category
                )}`}
              >
                {CategoryIcons(transaction.category)}
              </button>
              <div className="transaction-category__details">
                <div className="transaction-category">
                  {transaction.category}
                </div>
                <div className="transaction-detail">
                  {new Date(transaction.createdAt).toLocaleString("en-SE")}
                </div>
              </div>
            </div>

            <div className="transaction-amount__wrapper">
              <div className="transaction-amount">
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
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default LatestTransaction;

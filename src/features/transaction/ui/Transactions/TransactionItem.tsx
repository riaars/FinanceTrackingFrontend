import React from "react";
import { Transaction } from "../../api/type";
import { formattedCategory } from "@/features/dashboard/utils/transactionUtils";
import { CategoryIcons } from "@/utils/categoryIcons";

const TransactionItem = (transaction: Transaction) => {
  return (
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
            transaction.type === "Expense" ? "amount-expense" : "amount-income"
          }`}
        >
          {transaction.type === "Expense" ? "-" : "+"}
          {transaction.amount} kr
        </span>
      </td>
    </tr>
  );
};

export default TransactionItem;

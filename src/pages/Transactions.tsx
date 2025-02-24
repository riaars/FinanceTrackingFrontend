import React from "react";
import Button from "../components/Button";
import { useGetAllTransactions } from "../hooks/getAllTransactions";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

function Transactions() {
  const { transactions } = useGetAllTransactions();

  return (
    <div>
      <h1>Transactions</h1>
      <table className="transaction-table">
        <thead className="table-head">
          <tr className="table-row">
            <td className="table-cell">Date</td>
            <td className="table-cell">Transaction ID</td>
            <td className="table-cell">Category</td>
            <td className="table-cell">Type</td>
            <td className="table-cell">Detail</td>
            <td className="table-cell">Amount</td>
            <td className="table-cell">Actions</td>
          </tr>
        </thead>
        <tbody>
          {transactions?.map((transaction) => (
            <tr className="table-row">
              <td className="table-cell">{transaction.date}</td>
              <td className="table-cell">{transaction.transaction_id}</td>
              <td className="table-cell">{transaction.category}</td>
              <td className="table-cell">
                <Button
                  title={transaction.type}
                  className={`tag-button ${transaction.type}`}
                />
              </td>
              <td className="table-cell">{transaction.detail}</td>
              <td className="table-cell">{transaction.amount}</td>
              <td className="table-cell">
                <MdEdit className="table-cell__icon edit" />
                <MdDelete className="table-cell__icon delete" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Transactions;

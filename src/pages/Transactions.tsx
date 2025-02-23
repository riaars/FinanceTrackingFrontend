import React, { useEffect, useState } from "react";
import { API_URL } from "../config/API";
import Button from "../components/Button";

type TransactionType = {
  date: string;
  transaction_id: string;
  email: string;
  category: string;
  type: string;
  detail: string;
  amount: number;
};
function Transactions() {
  const token = localStorage.getItem("token");

  const [transactions, setTransactions] = useState<TransactionType[]>([]);

  const getAllTransactions = async () => {
    const url = `${API_URL}/getAllTransactions`;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error("error");
    }
  };
  useEffect(() => {
    getAllTransactions();
  }, []);

  return (
    <div>
      <h1>List of Transactions</h1>
      <table className="transaction-table">
        <thead>
          <tr>
            <td className="table-cell">Date</td>
            <td className="table-cell">Transaction ID</td>
            <td className="table-cell">Email</td>
            <td className="table-cell">Category</td>
            <td className="table-cell">Type</td>
            <td className="table-cell">Detail</td>
            <td className="table-cell">Amount</td>
          </tr>
        </thead>
        <tbody>
          {transactions?.map((transaction) => (
            <tr>
              <td className="table-cell">{transaction.date}</td>
              <td className="table-cell">{transaction.transaction_id}</td>
              <td className="table-cell">{transaction.email}</td>
              <td className="table-cell">{transaction.category}</td>
              <td className="table-cell">
                <Button
                  title={transaction.type}
                  className={`tag-button ${transaction.type}`}
                />
              </td>
              <td className="table-cell">{transaction.detail}</td>
              <td className="table-cell">{transaction.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Transactions;

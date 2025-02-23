import React, { useEffect, useState } from "react";
import { API_URL } from "../config/API";

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
  const [transactions, setTransactions] = useState<TransactionType[]>([]);

  const getAllTransactions = async () => {
    const url = `${API_URL}/getAllTransactions`;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2I4YzVmYjk5NzViMmU1MGZjYTY1OGQiLCJpYXQiOjE3NDAzNDAwMzcsImV4cCI6MTc0MDQyNjQzN30.-NOP85pBD1_Y79gQaduxpZD4KGezzU9nDj7GmvC5da4`,
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
              <td className="table-cell">{transaction.type}</td>
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

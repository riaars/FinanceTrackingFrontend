import React, { useMemo } from "react";
import TinyLineChart from "./TinyLineChart";
import { Transaction } from "@/features/transaction/api/type";

const DashboardOverview = ({
  transactions,
}: {
  transactions: Transaction[];
}) => {
  const totalExpense = useMemo(() => {
    return transactions
      .filter((t: Transaction) => t.type === "Expense")
      .reduce((sum, t: Transaction) => sum + t.amount, 0);
  }, [transactions]);

  const totalIncome = useMemo(() => {
    return transactions
      .filter((t: Transaction) => t.type === "Income")
      .reduce((sum, t: Transaction) => sum + t.amount, 0);
  }, [transactions]);

  const currentBalance = totalIncome - totalExpense;

  const expenseData = transactions
    .filter((t: Transaction) => t.type === "Expense")
    .slice(-10)
    .map((t: Transaction) => ({ value: t.amount }));

  const incomeData = transactions
    .filter((t: Transaction) => t.type === "Income")
    .slice(-10)
    .map((t: Transaction) => ({ value: t.amount }));

  const balanceData = [];
  for (let i = 0; i < 10; i++) {
    const income = incomeData[i] ? incomeData[i].value : 0;
    const expense = expenseData[i] ? expenseData[i].value : 0;
    balanceData.push({ value: income - expense });
  }

  return (
    <>
      <div className="dashboard-summary__item">
        <div className="dashboard-summary__item__details">
          <p className="summary-text">Current Balance </p>
          <TinyLineChart data={balanceData} color="blue" />
        </div>
        <p className="total-amount">{currentBalance.toLocaleString()} kr</p>
      </div>

      <div className="dashboard-summary__item">
        <div className="dashboard-summary__item__details">
          <p className="summary-text">Total Income</p>
          <TinyLineChart data={incomeData} color="green" />
        </div>
        <p className="total-amount">{totalIncome.toLocaleString()} kr</p>
      </div>

      <div className="dashboard-summary__item">
        <div className="dashboard-summary__item__details">
          <p className="summary-text">Total Expense</p>
          <TinyLineChart data={expenseData} color="red" />
        </div>
        <p className="total-amount">{totalExpense.toLocaleString()} kr</p>
      </div>
    </>
  );
};

export default DashboardOverview;

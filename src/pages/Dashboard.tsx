import React, { useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import { State, transactionCreators } from "../redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { TransactionType } from "./Transactions";
import BarChart from "../components/BarChart";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ chartData }: any) => {
  const data = {
    labels: chartData.labelData,
    datasets: [
      {
        label: "Expenses",
        data: chartData.amountData,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4CAF50",
          "#9966FF",
        ],
        hoverBackgroundColor: [
          "#FF4365",
          "#209CEE",
          "#FFD633",
          "#3EBA61",
          "#7755FF",
        ],
      },
    ],
  };

  return <Pie data={data} style={{ maxWidth: "300px", height: "auto" }} />;
};

interface MonthlySummary {
  month: string;
  year: string;
  type: string;
  totalAmount: number;
}

function Dashboard() {
  const token = localStorage.getItem("token");

  const dispatch = useDispatch();
  const { getAllTransactions } = bindActionCreators(
    transactionCreators,
    dispatch
  );

  const { transactions } = useSelector((state: State) => state.transaction);

  const expenses = transactions.filter(
    (transaction: any) => transaction?.type?.toLowerCase() !== "income"
  );

  const income = transactions.filter(
    (transaction: any) => transaction?.type?.toLowerCase() === "income"
  );

  const getChartData = (data: TransactionType[]) => {
    const expenseMap = new Map();
    for (const { category, amount } of data) {
      expenseMap.set(category, (expenseMap.get(category) || 0) + amount);
    }
    const groupedData = Object.fromEntries(expenseMap);
    const labelData = Object.keys(groupedData);
    const amountData = Object.values(groupedData);

    return {
      labelData,
      amountData,
    };
  };

  const getMonthlyData = (type: string) => {
    const expenseMap = new Map();

    let expenses = transactions.filter(
      (transaction: TransactionType) =>
        transaction?.type?.toLowerCase() === type
    );

    for (const { date, amount } of expenses) {
      expenseMap.set(date, (expenseMap.get(date) || 0) + amount);
    }
    let totalExpense = expenses
      .map((expense: TransactionType) => expense.amount)
      .reduce((curr: number, sum: number) => curr + sum, 0);

    return totalExpense;
  };

  const getMonthlySummary = (data: TransactionType[]): MonthlySummary[] => {
    const summary: { [key: string]: number } = {};

    data.forEach((transaction) => {
      // Extract the year and month from the date
      const date = new Date(transaction.date);
      const monthName = date.toLocaleString("en-US", { month: "long" });
      const fullYear = `${date.getFullYear()}`;

      const key = `${fullYear}:${monthName}:${transaction.type}`;
      if (summary[key]) {
        summary[key] += Number(transaction.amount);
      } else {
        summary[key] = Number(transaction.amount);
      }
    });

    return Object.keys(summary).map((key) => {
      const [year, month, type] = key.split(":");
      return {
        year,
        month,
        type,
        totalAmount: summary[key],
      };
    });
  };

  const summary = getMonthlySummary(transactions);
  console.log(summary);

  const months = Array.from(
    new Set(summary.map((item) => `${item.month} ${item.year}`))
  );
  console.log(months);

  const expenseData = months.map((month) => {
    const expense = summary.find(
      (item) =>
        `${item.month} ${item.year}` === month && item.type === "Expense"
    );
    return expense ? expense.totalAmount : 0;
  });

  const incomeData = months.map((month) => {
    const income = summary.find(
      (item) => `${item.month} ${item.year}` === month && item.type === "Income"
    );
    return income ? income.totalAmount : 0;
  });

  useEffect(() => {
    if (token) {
      getAllTransactions(token);
    }
  }, [token]);

  return (
    <>
      <div className="page_title">Dashboard</div>
      <BarChart
        months={months}
        expenseData={expenseData}
        incomeData={incomeData}
      />
      {/* <div className="dashboard">
        <div>
          <p>Expenses Chart</p>
          <PieChart chartData={getChartData(expenses)} />
        </div>
        <div>
          <p>Income Chart</p>
          <PieChart chartData={getChartData(income)} />
        </div>
      </div> */}
    </>
  );
}

export default Dashboard;

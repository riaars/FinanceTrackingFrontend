import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import { State, transactionCreators } from "../redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { TransactionType } from "./Transactions";
import BarChart from "../components/BarChart";
import Button from "../components/Button";

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
  const [currentTabIndex, setCurrentTabIndex] = useState(0);

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

  const months = Array.from(
    new Set(summary.map((item) => `${item.month} ${item.year}`))
  );

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

  const getCurrentMonthSummary = (type: string) => {
    const date = new Date();
    const month = date.toLocaleString("en-US", { month: "long" });
    const year = `${date.getFullYear()}`;

    const currentMonthSummary = summary.filter(
      (item) => item.month === month && item.year === year && item.type === type
    )[0];

    return currentMonthSummary?.totalAmount;
  };

  const getPreviousMonthSummary = (type: string) => {
    const date = new Date();
    date.setMonth(date.getMonth() - 1);
    const month = date.toLocaleString("en-US", { month: "long" });
    const year = `${date.getFullYear()}`;

    const currentMonthSummary = summary.filter(
      (item) => item.month === month && item.year === year && item.type === type
    )[0];

    return currentMonthSummary?.totalAmount;
  };

  useEffect(() => {
    if (token) {
      getAllTransactions(token);
    }
  }, [token]);

  return (
    <>
      <div className="page_title">Dashboard</div>
      <ul className="dashboard-filter">
        <li
          className={`dashboard-filter__item ${
            currentTabIndex === 0 ? `active` : ``
          }`}
          value={0}
          onClick={() => setCurrentTabIndex(0)}
        >
          Today
        </li>
        <li
          className={`dashboard-filter__item ${
            currentTabIndex === 1 ? `active` : ``
          }`}
          value={1}
          onClick={() => setCurrentTabIndex(1)}
        >
          This week
        </li>
        <li
          className={`dashboard-filter__item ${
            currentTabIndex === 2 ? `active` : ``
          }`}
          value={2}
          onClick={() => setCurrentTabIndex(2)}
        >
          This month
        </li>
        <li
          className={`dashboard-filter__item ${
            currentTabIndex === 3 ? `active` : ``
          }`}
          value={3}
          onClick={() => setCurrentTabIndex(3)}
        >
          This year
        </li>
      </ul>

      <div className="dashboard-summary">
        <div className="dashboard-summary__item">
          <p className="total-amount">
            SEK {getCurrentMonthSummary("Expense")}
          </p>
          <div className="dashboard-summary__item__details">
            <p className="summary-text">Expense in this month</p>
            <Button
              title={`+${(
                ((getCurrentMonthSummary("Expense") -
                  getPreviousMonthSummary("Expense")) /
                  getPreviousMonthSummary("Expense")) *
                100
              ).toFixed(2)}%`}
              className="tag-button expense"
            />
          </div>
        </div>
        <div className="dashboard-summary__item">
          <p className="total-amount">SEK {getCurrentMonthSummary("Income")}</p>
          <div className="dashboard-summary__item__details">
            <p className="summary-text">Income in this month</p>
            <Button
              title={`${(
                ((getCurrentMonthSummary("Income") -
                  getPreviousMonthSummary("Income")) /
                  getPreviousMonthSummary("Income")) *
                100
              ).toFixed(2)}%`}
              className="tag-button income"
            />
          </div>
        </div>
      </div>

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

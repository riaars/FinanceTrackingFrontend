import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import { State, transactionCreators } from "../redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { TransactionType } from "./Transactions";
import BarChart from "../components/BarChart";
import Button from "../components/Button";
import { get } from "http";

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
  date: string;
  day: string;
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

  const getTransactionsSummary = (
    data: TransactionType[]
  ): MonthlySummary[] => {
    const summary: { [key: string]: number } = {};

    let sortedData = [...data].sort(
      (a: TransactionType, b: TransactionType) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
    );

    sortedData.forEach((transaction) => {
      // Extract the year and month from the date
      const date = new Date(transaction.date);
      const day = date.toLocaleDateString("en-SE");
      const monthName = date.toLocaleDateString("en-SE", { month: "long" });
      const fullYear = `${date.getFullYear()}`;

      const key = `${fullYear}:${monthName}:${day}:${transaction.type}:${date}`;
      if (summary[key]) {
        summary[key] += Number(transaction.amount);
      } else {
        summary[key] = Number(transaction.amount);
      }
    });

    return Object.keys(summary).map((key) => {
      const [year, month, day, type, date] = key.split(":");
      return {
        date,
        year,
        month,
        day,
        type,
        totalAmount: summary[key],
      };
    });
  };

  const summary = getTransactionsSummary(transactions);

  const getLast7DaysData = (type: string) => {
    const date = new Date();
    const today = date.toLocaleDateString("en-SE");
    const last7Days = new Date(date.setDate(date.getDate() - 7));
    const last7DaysData = summary.filter(
      (item) =>
        new Date(item.date) >= last7Days &&
        new Date(item.date) <= new Date(today)
    );

    const days = Array.from(new Set(last7DaysData.map((item) => item.day)));
    const data = days.map((day) => {
      const dayData = last7DaysData.filter(
        (item) => item.day === day && item.type === type
      );
      return dayData.reduce((acc, curr) => acc + curr.totalAmount, 0);
    });

    return { days: days, data: data };
  };

  const months = Array.from(
    new Set(summary.map((item) => `${item.month} ${item.year}`))
  );

  const monthlyExpenseData = months.map((month) => {
    const expense = summary.filter(
      (item) =>
        `${item.month} ${item.year}` === month && item.type === "Expense"
    );
    return expense.reduce((acc, curr) => acc + curr.totalAmount, 0);
  });

  const monthlyIncomeData = months.map((month) => {
    const income = summary.filter(
      (item) => `${item.month} ${item.year}` === month && item.type === "Income"
    );
    return income.reduce((acc, curr) => acc + curr.totalAmount, 0);
  });

  const years = Array.from(new Set(summary.map((item) => item.year)));

  const yearlyExpenseData = years.map((year) => {
    const expense = summary.filter(
      (item) => item.year === year && item.type === "Expense"
    );
    return expense.reduce((acc, curr) => acc + curr.totalAmount, 0);
  });

  const yearlyIncomeData = years.map((year) => {
    const income = summary.find(
      (item) => item.year === year && item.type === "Income"
    );
    return income ? income.totalAmount : 0;
  });

  const getTodaySummary = (type: string) => {
    const date = new Date();
    const today = date.toLocaleDateString("en-SE");
    const todaySummary = summary.filter(
      (item) => item.day === today && item.type === type
    );

    return todaySummary.reduce((acc, curr) => acc + curr.totalAmount, 0);
  };

  const getPreviousDaySummary = (type: string) => {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    const previousDay = date.toLocaleString();

    const previousDaySummary = summary.filter(
      (item) => item.month === previousDay && item.type === type
    );

    return previousDaySummary.reduce((acc, curr) => acc + curr.totalAmount, 0);
  };

  const getThisWeekSummary = (type: string) => {
    const date = new Date();
    const today = date.toLocaleDateString("en-SE");
    const week = date.getDay();
    const weekStart = new Date(date.setDate(date.getDate() - week));
    const weekEnd = new Date(date.setDate(date.getDate() + 6));
    console.log("weekStart", weekStart);
    console.log("weekEnd", weekEnd);

    const thisWeekSummary = summary.filter((item) => {
      const itemDate = new Date(item.date);
      return itemDate >= weekStart && itemDate <= weekEnd && item.type === type;
    });

    return (
      thisWeekSummary.reduce((acc, curr) => acc + curr.totalAmount, 0) || 0
    );
  };

  const getPreviousWeekSummary = (type: string) => {
    const date = new Date();
    const today = date.toLocaleDateString("en-SE");
    const week = date.getDay();
    const weekStart = new Date(date.setDate(date.getDate() - week));
    const weekEnd = new Date(date.setDate(date.getDate() + 6));
    const previousWeekStart = new Date(date.setDate(date.getDate() - 7));
    const previousWeekEnd = new Date(date.setDate(date.getDate() - 1));

    const previousWeekSummary = summary.filter(
      (item) =>
        new Date(`${item.day} ${item.month} ${item.year}`) >=
          previousWeekStart &&
        new Date(`${item.day} ${item.month} ${item.year}`) <= previousWeekEnd &&
        item.type === type
    )[0];

    return previousWeekSummary?.totalAmount || 0;
  };

  const getCurrentMonthSummary = (type: string) => {
    const date = new Date();
    const month = date.toLocaleString("en-SE", { month: "long" });
    const year = `${date.getFullYear()}`;

    const currentMonthSummary = summary.filter(
      (item) => item.month === month && item.year === year && item.type === type
    );

    return currentMonthSummary.reduce((acc, curr) => acc + curr.totalAmount, 0);
  };

  const getPreviousMonthSummary = (type: string) => {
    const date = new Date();
    date.setMonth(date.getMonth() - 1);
    const month = date.toLocaleString("en-SE", { month: "long" });
    const year = `${date.getFullYear()}`;

    const previousMonthSummary = summary.filter(
      (item) => item.month === month && item.year === year && item.type === type
    );

    return previousMonthSummary.reduce(
      (acc, curr) => acc + curr.totalAmount,
      0
    );
  };

  const getThisYearSummary = (type: string) => {
    const date = new Date();
    const year = `${date.getFullYear()}`;
    const thisYearSummary = summary.filter(
      (item) => item.year === year && item.type === type
    );
    return (
      thisYearSummary.reduce((acc, curr) => acc + curr.totalAmount, 0) || 0
    );
  };

  const getPreviousYearSummary = (type: string) => {
    const date = new Date();
    const year = `${date.getFullYear() - 1}`;
    const previousYearSummary = summary.filter(
      (item) => item.year === year && item.type === type
    );

    return (
      previousYearSummary.reduce((acc, curr) => acc + curr.totalAmount, 0) || 0
    );
  };

  const getSummary = (index: number) => {
    switch (index) {
      case 0:
        return {
          expense: getTodaySummary("Expense"),
          income: getTodaySummary("Income"),
          previousExpense: getPreviousDaySummary("Expense"),
          previousIncome: getPreviousDaySummary("Income"),
        };
      case 1:
        return {
          expense: getThisWeekSummary("Expense"),
          income: getThisWeekSummary("Income"),
          previousExpense: getPreviousWeekSummary("Expense"),
          previousIncome: getPreviousWeekSummary("Income"),
        };
      case 2:
        return {
          expense: getCurrentMonthSummary("Expense"),
          income: getCurrentMonthSummary("Income"),
          previousExpense: getPreviousMonthSummary("Expense"),
          previousIncome: getPreviousMonthSummary("Income"),
        };
      case 3:
        return {
          expense: getThisYearSummary("Expense"),
          income: getThisYearSummary("Income"),
          previousExpense: getPreviousYearSummary("Expense"),
          previousIncome: getPreviousYearSummary("Income"),
        };
    }
  };

  const getPercentage = (current: number, previous: number) => {
    let percentage = (current - previous) / previous;
    return previous > 0 ? (percentage * 100).toFixed() + "%" : "+100%";
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
          Weekly
        </li>
        <li
          className={`dashboard-filter__item ${
            currentTabIndex === 2 ? `active` : ``
          }`}
          value={2}
          onClick={() => setCurrentTabIndex(2)}
        >
          Monthly
        </li>
        <li
          className={`dashboard-filter__item ${
            currentTabIndex === 3 ? `active` : ``
          }`}
          value={3}
          onClick={() => setCurrentTabIndex(3)}
        >
          Yearly
        </li>
      </ul>

      <div className="dashboard-summary">
        <div className="dashboard-summary__item">
          <p className="total-amount">
            SEK {getSummary(currentTabIndex)?.expense || 0}
          </p>
          <div className="dashboard-summary__item__details">
            <p className="summary-text">Expense in this periode</p>
            <Button
              title={getPercentage(
                getSummary(currentTabIndex)?.expense || 0,
                getSummary(currentTabIndex)?.previousExpense || 0
              )}
              className="tag-button expense"
            />
          </div>
        </div>
        <div className="dashboard-summary__item">
          <p className="total-amount">
            SEK {getSummary(currentTabIndex)?.income || 0}
          </p>
          <div className="dashboard-summary__item__details">
            <p className="summary-text">Income in this periode</p>
            <Button
              title={getPercentage(
                getSummary(currentTabIndex)?.income || 0,
                getSummary(currentTabIndex)?.previousIncome || 0
              )}
              className="tag-button income"
            />
          </div>
        </div>
      </div>

      <BarChart
        label="Daily"
        period={getLast7DaysData("Income").days}
        expenseData={getLast7DaysData("Expense").data}
        incomeData={getLast7DaysData("Income").data}
      />

      <BarChart
        label="Monthly"
        period={months}
        expenseData={monthlyExpenseData}
        incomeData={monthlyIncomeData}
      />

      <BarChart
        label="Yearly"
        period={years}
        expenseData={yearlyExpenseData}
        incomeData={yearlyIncomeData}
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

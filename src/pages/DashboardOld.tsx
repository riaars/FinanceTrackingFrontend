import React, { useState } from "react";

import { useSelector } from "react-redux";
import { State } from "../redux";
import { TransactionType } from "./Transactions";
import BarChart from "../components/BarChart";
import Button from "../components/Button";
import { getPercentage } from "../utils/helpers";
import Content from "../layout/Content";

import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
export interface MonthlySummary {
  date: string;
  day: string;
  month: string;
  year: string;
  type: string;
  totalAmount: number;
}

function Dashboard() {
  const { transactions } = useSelector((state: State) => state.transaction);

  const [currentTabIndex, setCurrentTabIndex] = useState(0);

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

  const summary = getTransactionsSummary(transactions as TransactionType[]);

  const getThisWeekData = (type: string) => {
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

    const totalAmount = data.reduce((acc, curr) => acc + curr, 0);

    return { days: days, data: data, totalAmount: totalAmount };
  };

  const getLastWeekData = (type: string) => {
    const today = new Date();

    const previousWeekStart = new Date(today);
    previousWeekStart.setDate(today.getDate() - 7);

    const previousWeekEnd = new Date(today);
    previousWeekEnd.setDate(today.getDate() - 1);

    const previousWeekData = summary.filter(
      (item) =>
        new Date(item.date) >= previousWeekStart &&
        new Date(item.date) <= previousWeekEnd
    );

    const days = Array.from(new Set(previousWeekData.map((item) => item.day)));
    const data = days.map((day) => {
      const dayData = previousWeekData.filter(
        (item) => item.day === day && item.type === type
      );
      return dayData.reduce((acc, curr) => acc + curr.totalAmount, 0);
    });

    const totalAmount = data.reduce((acc, curr) => acc + curr, 0);

    return { days: days, data: data, totalAmount: totalAmount };
  };

  const getMonthlyData = (type: string) => {
    const months = Array.from(
      new Set(summary.map((item) => `${item.month} ${item.year}`))
    );

    const data = months.map((month) => {
      const monthlyData = summary.filter(
        (item) => `${item.month} ${item.year}` === month && item.type === type
      );
      return monthlyData.reduce((acc, curr) => acc + curr.totalAmount, 0);
    });

    const totalAmount = data.reduce((acc, curr) => acc + curr, 0);

    return { months: months, data: data, totalAmount: totalAmount };
  };

  const getYearlyData = (type: string) => {
    const years = Array.from(new Set(summary.map((item) => item.year)));

    const data = years.map((year) => {
      const yearlyData = summary.filter(
        (item) => item.year === year && item.type === type
      );
      return yearlyData.reduce((acc, curr) => acc + curr.totalAmount, 0);
    });

    const totalAmount = data.reduce((acc, curr) => acc + curr, 0);

    return { years, data, totalAmount };
  };

  const getDaysSummary = (type: string, daysAgo: number = 0) => {
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);

    const formattedDate = date.toLocaleDateString("en-SE");

    const filteredSummary = summary.filter(
      (item) => item.day === formattedDate && item.type === type
    );

    return filteredSummary.reduce((acc, curr) => acc + curr.totalAmount, 0);
  };

  const getMonthSummary = (type: string, monthsAgo: number = 0) => {
    const date = new Date();
    date.setMonth(date.getMonth() - monthsAgo);
    const month = date.toLocaleString("en-SE", { month: "long" });
    const year = `${date.getFullYear()}`;

    const currentMonthSummary = summary.filter(
      (item) => item.month === month && item.year === year && item.type === type
    );

    return currentMonthSummary.reduce((acc, curr) => acc + curr.totalAmount, 0);
  };

  const getYearSummary = (type: string, yearsAgo: number = 0) => {
    const date = new Date();
    const year = `${date.getFullYear() - yearsAgo}`;

    const thisYearSummary = summary.filter(
      (item) => item.year === year && item.type === type
    );
    return (
      thisYearSummary.reduce((acc, curr) => acc + curr.totalAmount, 0) || 0
    );
  };

  const getSummary = (index: number) => {
    switch (index) {
      case 0:
        return {
          expense: getDaysSummary("Expense"),
          income: getDaysSummary("Income"),
          previousExpense: getDaysSummary("Expense", 1),
          previousIncome: getDaysSummary("Income", 1),
        };
      case 1:
        return {
          expense: getThisWeekData("Expense").totalAmount,
          income: getThisWeekData("Income").totalAmount,
          previousExpense: getLastWeekData("Expense").totalAmount,
          previousIncome: getLastWeekData("Income").totalAmount,
        };
      case 2:
        return {
          expense: getMonthSummary("Expense"),
          income: getMonthSummary("Income"),
          previousExpense: getMonthSummary("Expense", 1),
          previousIncome: getMonthSummary("Income", 1),
        };
      case 3:
        return {
          expense: getYearSummary("Expense"),
          income: getYearSummary("Income"),
          previousExpense: getYearSummary("Expense", 1),
          previousIncome: getYearSummary("Income", 1),
        };
    }
  };

  // useEffect(() => {
  //   if (token) {
  //     getAllTransactions();
  //   } else {
  //     navigate(PATH.LOGIN);
  //   }
  // }, [token, loginResponse]);

  const COLORS = ["#3459d4", "#FF8042", "#00C49F", "#FFBB28", "#8884d8"];

  const spendingData = [
    { date: "Apr 01", amount: 120 },
    { date: "Apr 02", amount: 75 },
    { date: "Apr 03", amount: 98 },
    { date: "Apr 04", amount: 130 },
    { date: "Apr 05", amount: 80 },
  ];

  const categoryData = [
    { name: "Groceries", value: 300 },
    { name: "Transport", value: 150 },
    { name: "Dining", value: 200 },
    { name: "Entertainment", value: 100 },
  ];
  return (
    <Content title="Dashboard">
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
              className="tag-button small expense"
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
              className="tag-button small income"
            />
          </div>
        </div>
      </div>

      <ul>
        <li
          className={`dashboard__chart ${
            currentTabIndex === 0 ? "active" : ""
          }`}
        ></li>
        <li
          className={`dashboard__chart ${
            currentTabIndex === 1 ? "active" : ""
          }`}
        >
          <BarChart
            label="Daily"
            period={getThisWeekData("Income").days}
            expenseData={getThisWeekData("Expense").data}
            incomeData={getThisWeekData("Income").data}
          />
        </li>
        <li
          className={`dashboard__chart ${
            currentTabIndex === 2 ? "active" : ""
          }`}
        >
          <BarChart
            label="Monthly"
            period={getMonthlyData("Income").months}
            expenseData={getMonthlyData("Expense").data}
            incomeData={getMonthlyData("Income").data}
          />
        </li>
        <li
          className={`dashboard__chart ${
            currentTabIndex === 3 ? "active" : ""
          }`}
        >
          <BarChart
            label="Yearly"
            period={getYearlyData("Income").years}
            expenseData={getYearlyData("Expense").data}
            incomeData={getYearlyData("Income").data}
          />
        </li>
      </ul>
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Spending Over Time */}
        <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">Spending Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={spendingData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#3459d4"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Spending by Category */}
        <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">Spending by Category</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Content>
  );
}

export default Dashboard;

import React, { useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import { State, transactionCreators } from "../redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { TransactionType } from "./Transactions";

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

  useEffect(() => {
    if (token) {
      getAllTransactions(token);
    }
  }, [token]);

  return (
    <div>
      <h1>Dashboard</h1>
      <div className="dashboard">
        <div>
          <p>Expenses Chart</p>
          <PieChart chartData={getChartData(expenses)} />
        </div>
        <div>
          <p>Income Chart</p>
          <PieChart chartData={getChartData(income)} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

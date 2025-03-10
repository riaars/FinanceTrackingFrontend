import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ label, period, expenseData, incomeData }: any) => {
  const data = {
    labels: period,
    datasets: [
      {
        label: `${label} Expenses`,
        data: expenseData,
        backgroundColor: "#eccfcf",
        borderColor: "#ee5656",
        borderWidth: 1,
      },
      {
        label: `${label} Income`,
        data: incomeData,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={data} options={options} className="barchart" />;
};

export default BarChart;

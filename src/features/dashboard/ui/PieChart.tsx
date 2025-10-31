import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

// const expenses = transactions.filter(
//   (transaction: any) => transaction?.type?.toLowerCase() !== "income"
// );

// const income = transactions.filter(
//   (transaction: any) => transaction?.type?.toLowerCase() === "income"
// );

// const getChartData = (data: TransactionType[]) => {
//   const expenseMap = new Map();
//   for (const { category, amount } of data) {
//     expenseMap.set(category, (expenseMap.get(category) || 0) + amount);
//   }
//   const groupedData = Object.fromEntries(expenseMap);
//   const labelData = Object.keys(groupedData);
//   const amountData = Object.values(groupedData);

//   return {
//     labelData,
//     amountData,
//   };
// };

// const getMonthlyData = (type: string) => {
//   const expenseMap = new Map();

//   let expenses = transactions.filter(
//     (transaction: TransactionType) =>
//       transaction?.type?.toLowerCase() === type
//   );

//   for (const { date, amount } of expenses) {
//     expenseMap.set(date, (expenseMap.get(date) || 0) + amount);
//   }
//   let totalExpense = expenses
//     .map((expense: TransactionType) => expense.amount)
//     .reduce((curr: number, sum: number) => curr + sum, 0);

//   return totalExpense;
// };

interface PieChartProps {
  chartData: {
    labelData: string[];
    amountData: number[];
  };
}
const PieChart = ({ chartData }: PieChartProps) => {
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

export default PieChart;

import React from "react";
import {
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  Bar,
} from "recharts";

const IncomeExpenseChart = ({ data }: any) => {
  return (
    <div className="custom-card">
      <h2 className="text-lg font-semibold mb-4">Income vs Expense</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Income" fill="#00C49F" />
          <Bar dataKey="Expense" fill="#FF6B6B" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IncomeExpenseChart;

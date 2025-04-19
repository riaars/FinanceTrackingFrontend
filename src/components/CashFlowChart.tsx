import React from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
const CashFlowChart = ({ data }: any) => {
  return (
    <div className="custom-card">
      <h2 className="text-lg font-semibold mb-4">Cash Flow</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="Income"
            stroke="#00C49F"
            name="Income"
          />
          <Line
            type="monotone"
            dataKey="Expense"
            stroke="#FF6B6B"
            name="Expense"
          />
          <Line type="monotone" dataKey="net" stroke="#3459d4" name="Balance" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CashFlowChart;

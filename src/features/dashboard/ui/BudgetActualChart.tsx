import React from "react";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const BudgetActualChart = ({ data }: any) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data} layout="vertical" margin={{ left: 100 }}>
        <XAxis
          type="number"
          tick={{ fontSize: 12, fill: "#555" }}
          stroke="#ccc"
        />
        <YAxis
          type="category"
          dataKey="category"
          tick={{ fontSize: 12, fill: "#555" }}
          stroke="#ccc"
        />
        <Tooltip />
        <Legend />
        <Bar dataKey="budget" fill="#E5E7EB" name="Budget" />
        <Bar dataKey="spent" fill="#3B82F6" name="Spent" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BudgetActualChart;

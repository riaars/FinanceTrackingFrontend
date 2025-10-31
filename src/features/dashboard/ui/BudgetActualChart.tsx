import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const BudgetActualChart = ({ data }: any) => {
  return (
    <div className="custom-card">
      <h2>Budget vs Actual Spending</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis type="category" dataKey="category" />
          <Tooltip />
          <Legend />
          <Bar dataKey="budget" fill="#8884d8" name="Budget" />
          <Bar dataKey="actual" fill="#FF8042" name="Actual" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BudgetActualChart;

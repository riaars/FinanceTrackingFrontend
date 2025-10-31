import React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = ["#3459d4", "#FF8042", "#00C49F", "#FFBB28", "#8884d8"];

const CategoryCart = ({ data }: any) => {
  return (
    <div className="custom-card">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Spending by Category</h2>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
            dataKey="value"
          >
            {data.map((_, index: number) => (
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
  );
};

export default CategoryCart;

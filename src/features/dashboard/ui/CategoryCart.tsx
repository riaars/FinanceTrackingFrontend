import React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import {
  filterTransactionsByView,
  groupTransactionByKey,
} from "../utils/transactionUtils";
import FilterAction from "./FilterAction";
import { Transaction } from "@/features/transaction/api/type";

const COLORS = ["#3459d4", "#FF8042", "#00C49F", "#FFBB28", "#8884d8"];

const CategoryCart = ({ transactions }: { transactions: Transaction[] }) => {
  const [view, setView] = React.useState("month");
  const categoryDataObj = groupTransactionByKey(
    filterTransactionsByView(transactions, view).filter(
      (t: Transaction) => t.type === "Expense"
    ),
    "category"
  );

  const data = Object.entries(categoryDataObj).map(([name, value]) => ({
    name,
    value,
  }));

  const total = data.reduce((sum: number, d: any) => sum + d.value, 0);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0];
      return (
        <div
          style={{
            background: "#fff",
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "8px 12px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: "13px",
              fontWeight: 600,
              color: "#333",
            }}
          >
            {item.name}
          </p>
          <p
            style={{
              margin: 0,
              fontSize: "12px",
              color: "#555",
            }}
          >
            {item.value.toLocaleString()} kr
          </p>
        </div>
      );
    }
    return null;
  };
  return (
    <>
      <FilterAction view={view} setView={setView} />
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={100}
            cornerRadius={50}
            dataKey="value"
            isAnimationActive={true}
            paddingAngle={5}
          >
            {data.map((_, index: number) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            style={{
              fontSize: "18px",
              fontWeight: 700,
              fill: "#333",
            }}
          >
            {total.toLocaleString()}kr
          </text>
          <text
            x="50%"
            y="60%"
            textAnchor="middle"
            dominantBaseline="middle"
            style={{
              fontSize: "12px",
              fontWeight: 300,
              fill: "#333",
            }}
          >
            This {view} expenses
          </text>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </>
  );
};

export default CategoryCart;

import React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import {
  filterTransactionsByView,
  getColorByCategory,
  groupTransactionByKey,
} from "../utils/transactionUtils";
import FilterAction from "./FilterAction";
import { Transaction } from "@/features/transaction/api/type";

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

  export const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0];
      return (
        <div className="custom-tooltip__container">
          <p className="custom-tooltip__key">{item.name}</p>
          <p className="custom-tooltip__value">
            {item.value.toLocaleString()} kr
          </p>
        </div>
      );
    }
    return null;
  };
  return (
    <>
      <div className="chart__title">Expense Overview</div>
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
            {data.map((item: any, index: number) => (
              <Cell
                key={`cell-${index}`}
                fill={getColorByCategory(item.name)}
                stroke="none"
                strokeWidth={0}
              />
            ))}
          </Pie>

          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="tooltip__main-text"
          >
            {total.toLocaleString()}kr
          </text>
          <text
            x="50%"
            y="60%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="tooltip__caption-text"
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

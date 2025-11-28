import React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import {
  filterTransactionsByPeriod,
  getColorByCategory,
  groupTransactionsByCategory,
} from "../utils/transactionUtils";
import FilterAction from "./FilterAction";
import { Transaction } from "@/features/transaction/api/type";

type CategoryChartProps = {
  data: Transaction[];
};

type CategoryPieChartTooltipProps = {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
  }>;
};

const CategoryCart = ({ data }: CategoryChartProps) => {
  const [view, setView] = React.useState("month");

  const expenses = filterTransactionsByPeriod(data, view).filter(
    (t: Transaction) => t.type === "Expense"
  );

  const categoryTotalsObj = groupTransactionsByCategory(expenses, "category");

  const categoryTotals = Object.keys(categoryTotalsObj).map((name) => ({
    name,
    value: (categoryTotalsObj as Record<string, number>)[name],
  }));

  const totalExpenses = categoryTotals.reduce((sum, d) => sum + d.value, 0);

  const CategoryPieChartTooltip = ({
    active,
    payload,
  }: CategoryPieChartTooltipProps) => {
    if (!active || !payload?.length) return null;
    const item = payload[0];
    return (
      <div className="custom-tooltip__container">
        <p className="custom-tooltip__key">{item.name}</p>
        <p className="custom-tooltip__value">
          {item.value.toLocaleString()} kr
        </p>
      </div>
    );
  };

  return (
    <>
      <div className="chart__title">Expense Overview</div>
      <FilterAction view={view} setView={setView} />
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={categoryTotals}
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={100}
            cornerRadius={50}
            dataKey="value"
            isAnimationActive={true}
            paddingAngle={5}
          >
            {categoryTotals.map((item: any, index: number) => (
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
            {totalExpenses.toLocaleString()}kr
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
          <Tooltip content={<CategoryPieChartTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </>
  );
};

export default CategoryCart;

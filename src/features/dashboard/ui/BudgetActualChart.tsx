import { adjustColorByPercentage } from "@/utils/helpers";
import React from "react";
import {
  Bar,
  BarChart,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type BudgetActualChartProps = {
  data: BudgetActualDataProps[];
};

type BudgetActualDataProps = {
  category: string;
  budget: number;
  spent: number;
};

type BarChartTooltipProps = {
  active?: boolean;
  label?: string;
  payload?: Array<{
    name: string;
    value: number;
  }>;
};

const BudgetActualChart = ({ data }: BudgetActualChartProps) => {
  const BarChartTooltip = ({
    active,
    label,
    payload,
  }: BarChartTooltipProps) => {
    if (!active || !payload?.length) return null;

    return (
      <div className="custom-tooltip__container">
        <p className="custom-tooltip__key">{label}</p>
        {payload.map((item, i) => (
          <p key={i} className="custom-tooltip__value">
            <span className="custom-tooltip__key">{item.name}</span>:{" "}
            <span className="custom-tooltip__value">{item.value} kr</span>
          </p>
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="chart__title">Budget Insights</div>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} layout="vertical" margin={{ left: 30 }}>
          <XAxis className="chart-xaxis" type="number" />
          <YAxis className="chart-yaxis" type="category" dataKey="category" />
          <Tooltip content={<BarChartTooltip />} />
          <Legend verticalAlign="top" height={30} className="chart-legend" />
          <Bar dataKey="budget" name="Budget" className="bar-budget" />
          <Bar dataKey="spent" name="Spent" className="bar-spent">
            {data.map((entry, index) => {
              const percentage =
                entry.budget > 0 ? (entry.spent / entry.budget) * 100 : 0;
              return (
                <Cell
                  className="bar-cell"
                  key={`cell-${index}`}
                  fill={adjustColorByPercentage(percentage)}
                />
              );
            })}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default BudgetActualChart;

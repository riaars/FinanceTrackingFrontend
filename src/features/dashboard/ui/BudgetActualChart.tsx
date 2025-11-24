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

const BudgetActualChart = ({ data }: any) => {
  const CustomTooltip = ({ active, label, payload }: any) => {
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

  const adjustColorByPercentage = (percentage: number) => {
    const roundPercentage = Math.round(percentage);
    if (roundPercentage > 70 && roundPercentage < 90) {
      return "orange";
    } else if (roundPercentage > 90) {
      return "#ee5656";
    } else return "#3459d4";
  };
  return (
    <>
      <div className="chart__title">Budget Insights</div>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} layout="vertical" margin={{ left: 30 }}>
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
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="top"
            height={30}
            wrapperStyle={{
              fontSize: "13px",
              color: "#333",
              fontWeight: 600,
            }}
          />
          <Bar
            dataKey="budget"
            name="Budget"
            fill="#333"
            className="bar-budget"
          />
          <Bar dataKey="spent" name="Spent" fill="#3459d4">
            {data.map((entry, index) => {
              const percentage =
                entry.budget > 0 ? (entry.spent / entry.budget) * 100 : 0;
              return (
                <Cell
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

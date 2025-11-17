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
          <Bar dataKey="budget" fill="#E5E7EB" name="Budget" />
          <Bar dataKey="spent" fill="#3B82F6" name="Spent" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default BudgetActualChart;

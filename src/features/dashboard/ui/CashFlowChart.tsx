import dayjs from "dayjs";
import React, { useState } from "react";
import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  filterTransactionsByView,
  formatCurrencyShort,
  groupIncomeVsExpense,
} from "../utils/transactionUtils";
import FilterAction from "./FilterAction";
const CashFlowChart = ({ transactions }: any) => {
  const [view, setView] = useState("month");

  const filteredData = filterTransactionsByView(transactions, view);

  const cashFlowData = groupIncomeVsExpense(filteredData).map((entry) => ({
    date: dayjs(entry.date).format("DD MMM YY"),
    Income: entry.Income,
    Expense: entry.Expense,
    net: entry.Income - entry.Expense,
  }));

  return (
    <div>
      <FilterAction view={view} setView={setView} />

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={cashFlowData}>
          <XAxis
            dataKey="date"
            tickFormatter={(d: string) => dayjs(d).format("DD MMM")}
            tick={{ fontSize: 12, fill: "#555" }}
            stroke="#ccc"
          />
          <YAxis
            tickFormatter={formatCurrencyShort}
            tick={{ fontSize: 12, fill: "#555" }}
            stroke="#ccc"
            width={40}
          />
          <Tooltip
            labelFormatter={(d: string) => dayjs(d).format("DD MMM YYYY")}
            labelStyle={{
              fontSize: "13px",
              fontWeight: 600,
              color: "#333",
              marginBottom: "4px",
            }}
            itemStyle={{
              fontSize: "12px",
            }}
          />
          <Legend
            verticalAlign="top"
            height={30}
            wrapperStyle={{
              fontSize: "13px",
              color: "#333",
              fontWeight: 600,
            }}
          />
          <Line
            type="monotone"
            dataKey="Income"
            stroke="#00C49F"
            strokeWidth={2}
            name="Income"
            dot={false}
          />
          <Line
            type="monotone"
            strokeWidth={2}
            dataKey="Expense"
            stroke="#FF6B6B"
            name="Expense"
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="net"
            stroke="#3459d4"
            strokeWidth={2}
            name="Balance"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CashFlowChart;

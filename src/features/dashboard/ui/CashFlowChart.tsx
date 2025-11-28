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
  filterTransactionsByPeriod,
  formatCurrencyShort,
  groupIncomeVsExpense,
} from "../utils/transactionUtils";
import FilterAction from "./FilterAction";
import { Transaction } from "@/features/transaction/api/type";

type LineChartTooltipProps = {
  active?: boolean;
  label?: string;
  payload?: Array<{
    name: string;
    value: number;
  }>;
};

type CashFlowChartProps = {
  data: Transaction[];
};

type IncomeExpenseItemProps = {
  date: string;
  Income: number;
  Expense: number;
};

const CashFlowChart = ({ data }: CashFlowChartProps) => {
  const [period, setPeriod] = React.useState("month");

  const filteredData = filterTransactionsByPeriod(data, period);

  const cashFlowData = groupIncomeVsExpense(filteredData).map(
    (entry: IncomeExpenseItemProps) => ({
      date: dayjs(entry.date).format("DD MMM YY"),
      Income: entry.Income,
      Expense: entry.Expense,
      net: entry.Income - entry.Expense,
    })
  );

  const LineChartTooltip = ({
    active,
    label,
    payload,
  }: LineChartTooltipProps) => {
    if (!active || !payload?.length) return null;

    return (
      <div className="custom-tooltip__container">
        <p className="custom-tooltip__key">
          {dayjs(label).format("DD MMM YYYY")}
        </p>
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
      <div className="chart__title">Financial Insights</div>
      <FilterAction period={period} setPeriod={setPeriod} />

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={cashFlowData}>
          <XAxis
            dataKey="date"
            tickFormatter={(d: string) => dayjs(d).format("DD MMM")}
            className="chart-xaxis"
          />
          <YAxis
            tickFormatter={formatCurrencyShort}
            className="chart-yaxis"
            width={40}
          />
          <Tooltip content={<LineChartTooltip />} />
          <Legend verticalAlign="top" height={30} className="chart-legend" />
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
    </>
  );
};

export default CashFlowChart;

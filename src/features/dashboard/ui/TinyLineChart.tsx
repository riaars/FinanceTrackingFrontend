import { Line, LineChart, ResponsiveContainer } from "recharts";

const TinyLineChart = ({ data, color }) => (
  <ResponsiveContainer width={60} height={30}>
    <LineChart data={data}>
      <Line
        type="monotone"
        dataKey="value"
        stroke={color}
        strokeWidth={2}
        dot={false}
      />
    </LineChart>
  </ResponsiveContainer>
);

export default TinyLineChart;

import { Line, LineChart, ResponsiveContainer } from "recharts";

type ChartData = {
  value: number;
};
type TinyLineChartProps = {
  data: ChartData[];
  color: string;
};

const TinyLineChart = ({ data, color }: TinyLineChartProps) => (
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

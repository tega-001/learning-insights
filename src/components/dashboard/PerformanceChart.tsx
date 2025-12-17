import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { useData } from "@/context/DataContext";
import { getMethodColor } from "@/lib/data";

export const PerformanceChart = () => {
  const { getMethodStats } = useData();
  const stats = getMethodStats();

  const data = [
    {
      method: "Offline",
      mean: stats.offline.mean,
      count: stats.offline.count,
    },
    {
      method: "Online",
      mean: stats.online.mean,
      count: stats.online.count,
    },
    {
      method: "Blended",
      mean: stats.blended.mean,
      count: stats.blended.count,
    },
  ];

  const colors = ["hsl(25 95% 53%)", "hsl(217 91% 60%)", "hsl(172 66% 50%)"];

  return (
    <div className="h-[350px] w-full animate-fade-in">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(214 32% 91%)" />
          <XAxis
            dataKey="method"
            tick={{ fill: "hsl(215 16% 47%)", fontSize: 12 }}
            tickLine={{ stroke: "hsl(214 32% 91%)" }}
          />
          <YAxis
            domain={[0, 100]}
            tick={{ fill: "hsl(215 16% 47%)", fontSize: 12 }}
            tickLine={{ stroke: "hsl(214 32% 91%)" }}
            label={{
              value: "Average Marks",
              angle: -90,
              position: "insideLeft",
              fill: "hsl(215 16% 47%)",
              fontSize: 12,
            }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(0 0% 100%)",
              border: "1px solid hsl(214 32% 91%)",
              borderRadius: "8px",
              boxShadow: "0 4px 6px -1px hsl(222 47% 11% / 0.1)",
            }}
            formatter={(value: number, name: string) => [
              `${value.toFixed(1)}%`,
              "Average",
            ]}
            labelFormatter={(label) => `${label} Learning`}
          />
          <Bar
            dataKey="mean"
            radius={[8, 8, 0, 0]}
            animationDuration={800}
            animationBegin={0}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

import { useData } from "@/context/DataContext";
import { Users, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

export const StatsGrid = () => {
  const { getMethodStats } = useData();
  const stats = getMethodStats();

  const methodStats = [
    {
      method: "Offline",
      mean: stats.offline.mean,
      count: stats.offline.count,
      color: "bg-offline",
      bgLight: "bg-offline/10",
      textColor: "text-offline",
    },
    {
      method: "Online",
      mean: stats.online.mean,
      count: stats.online.count,
      color: "bg-online",
      bgLight: "bg-online/10",
      textColor: "text-online",
    },
    {
      method: "Blended",
      mean: stats.blended.mean,
      count: stats.blended.count,
      color: "bg-blended",
      bgLight: "bg-blended/10",
      textColor: "text-blended",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {methodStats.map((stat, index) => (
        <div
          key={stat.method}
          className="animate-slide-up rounded-xl border border-border bg-card p-5 transition-shadow hover:shadow-md"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex items-center justify-between">
            <div className={cn("rounded-lg p-2", stat.bgLight)}>
              <div className={cn("h-3 w-3 rounded-full", stat.color)} />
            </div>
            <span className="text-xs font-medium text-muted-foreground">
              {stat.method}
            </span>
          </div>
          
          <div className="mt-4 space-y-2">
            <div className="flex items-end gap-2">
              <span className={cn("text-3xl font-bold", stat.textColor)}>
                {stat.mean.toFixed(1)}
              </span>
              <span className="mb-1 text-sm text-muted-foreground">avg</span>
            </div>
            
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Users className="h-3.5 w-3.5" />
              <span>{stat.count} students</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

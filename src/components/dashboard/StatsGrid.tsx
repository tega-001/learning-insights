import { useData } from "@/context/DataContext";
import { Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAnimatedCounter } from "@/hooks/useAnimatedCounter";

interface StatCardProps {
  method: string;
  mean: number;
  count: number;
  color: string;
  bgLight: string;
  textColor: string;
  delay: number;
}

const StatCard = ({ method, mean, count, color, bgLight, textColor, delay }: StatCardProps) => {
  const animatedMean = useAnimatedCounter(mean, { duration: 1000, decimals: 1 });
  const animatedCount = useAnimatedCounter(count, { duration: 800, decimals: 0 });

  return (
    <div
      className="animate-slide-up rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center justify-between">
        <div className={cn("rounded-lg p-2 transition-transform duration-300 hover:scale-110", bgLight)}>
          <div className={cn("h-3 w-3 rounded-full transition-all duration-500", color)} />
        </div>
        <span className="text-xs font-medium text-muted-foreground">
          {method}
        </span>
      </div>
      
      <div className="mt-4 space-y-2">
        <div className="flex items-end gap-2">
          <span className={cn("text-3xl font-bold tabular-nums transition-all duration-300", textColor)}>
            {animatedMean}
          </span>
          <span className="mb-1 text-sm text-muted-foreground">avg</span>
        </div>
        
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Users className="h-3.5 w-3.5" />
          <span className="tabular-nums">{animatedCount} students</span>
        </div>
      </div>
      
      {/* Progress bar visualization */}
      <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div 
          className={cn("h-full rounded-full transition-all duration-1000 ease-out", color)}
          style={{ width: `${Math.min(mean, 100)}%` }}
        />
      </div>
    </div>
  );
};

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
        <StatCard
          key={stat.method}
          {...stat}
          delay={index * 100}
        />
      ))}
    </div>
  );
};

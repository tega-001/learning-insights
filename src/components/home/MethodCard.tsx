import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MethodCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  variant: "offline" | "online" | "blended";
  delay?: number;
}

export const MethodCard = ({
  title,
  description,
  icon,
  variant,
  delay = 0,
}: MethodCardProps) => {
  const variantStyles = {
    offline: "border-offline/20 hover:border-offline/40 hover:shadow-[0_0_20px_hsl(25_95%_53%/0.1)]",
    online: "border-online/20 hover:border-online/40 hover:shadow-[0_0_20px_hsl(217_91%_60%/0.1)]",
    blended: "border-blended/20 hover:border-blended/40 hover:shadow-[0_0_20px_hsl(172_66%_50%/0.1)]",
  };

  const iconBgStyles = {
    offline: "bg-offline/10 text-offline",
    online: "bg-online/10 text-online",
    blended: "bg-blended/10 text-blended",
  };

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl border-2 bg-card p-6 transition-all duration-300",
        variantStyles[variant]
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div
        className={cn(
          "mb-4 flex h-12 w-12 items-center justify-center rounded-lg transition-transform group-hover:scale-110",
          iconBgStyles[variant]
        )}
      >
        {icon}
      </div>
      <h3 className="mb-2 text-lg font-semibold text-foreground">{title}</h3>
      <p className="text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
  );
};

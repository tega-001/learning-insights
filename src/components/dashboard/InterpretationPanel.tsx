import { useData } from "@/context/DataContext";
import { CheckCircle2, XCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

export const InterpretationPanel = () => {
  const { getMethodStats, selectedDomain } = useData();
  const stats = getMethodStats();

  const isSignificant = stats.pValue < 0.05;
  
  // Find the best performing method
  const methods = [
    { name: "Offline", mean: stats.offline.mean },
    { name: "Online", mean: stats.online.mean },
    { name: "Blended", mean: stats.blended.mean },
  ];
  
  const bestMethod = methods.reduce((best, current) =>
    current.mean > best.mean ? current : best
  );

  const totalStudents = stats.offline.count + stats.online.count + stats.blended.count;

  if (totalStudents === 0) {
    return (
      <div className="rounded-xl border border-border bg-card p-6 animate-fade-in">
        <div className="flex items-center gap-3 text-muted-foreground">
          <Info className="h-5 w-5" />
          <p>Add data to see analysis results.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Statistical Significance */}
      <div
        className={cn(
          "rounded-xl border-2 p-6 transition-colors",
          isSignificant
            ? "border-accent/30 bg-accent/5"
            : "border-muted bg-muted/30"
        )}
      >
        <div className="flex items-start gap-4">
          {isSignificant ? (
            <CheckCircle2 className="mt-0.5 h-6 w-6 text-accent shrink-0" />
          ) : (
            <XCircle className="mt-0.5 h-6 w-6 text-muted-foreground shrink-0" />
          )}
          <div className="space-y-2">
            <h3 className="font-semibold text-foreground">
              {isSignificant
                ? "Statistically Significant Difference"
                : "No Significant Difference"}
            </h3>
            <p className="text-sm text-muted-foreground">
              {isSignificant
                ? `ANOVA analysis indicates a statistically significant difference in student performance across teaching methods (p = ${stats.pValue.toFixed(3)} < 0.05).`
                : `ANOVA analysis shows no statistically significant difference across teaching methods (p = ${stats.pValue.toFixed(3)} ≥ 0.05).`}
            </p>
          </div>
        </div>
      </div>

      {/* Key Finding */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="mb-3 font-semibold text-foreground">Key Finding</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          <span className="font-medium text-foreground">{bestMethod.name} learning</span>{" "}
          shows the highest average performance ({bestMethod.mean.toFixed(1)}%)
          {selectedDomain && (
            <>
              {" "}in the <span className="font-medium text-foreground">{selectedDomain}</span> domain
            </>
          )}
          . This suggests that {bestMethod.name.toLowerCase()}{" "}
          {bestMethod.name === "Blended"
            ? "instruction, combining both in-person and digital elements, may offer the best learning outcomes for this subject area."
            : bestMethod.name === "Online"
            ? "instruction may provide flexibility and resources that enhance learning in this domain."
            : "instruction provides the structured, face-to-face interaction beneficial for this field."}
        </p>
      </div>

      {/* Sample Info */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Info className="h-3.5 w-3.5" />
        <span>
          Analysis based on {totalStudents} student records across {methods.filter(m => 
            (m.name === "Offline" && stats.offline.count > 0) ||
            (m.name === "Online" && stats.online.count > 0) ||
            (m.name === "Blended" && stats.blended.count > 0)
          ).length} teaching methods.
        </span>
      </div>
    </div>
  );
};

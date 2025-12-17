import { Layout } from "@/components/layout/Layout";
import { 
  AlertTriangle, 
  Database, 
  Users, 
  Lightbulb, 
  Building2,
  BarChart3,
  Sparkles
} from "lucide-react";

const LimitationsPage = () => {
  const limitations = [
    {
      icon: <Database className="h-5 w-5" />,
      title: "Data Quality Dependence",
      description:
        "Analysis accuracy is directly tied to the quality, completeness, and representativeness of the input data. Biased or incomplete datasets can lead to misleading conclusions.",
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: "External Factors Not Captured",
      description:
        "Student motivation, prior knowledge, socioeconomic background, and instructor experience significantly impact performance but are not modeled in this analysis.",
    },
    {
      icon: <AlertTriangle className="h-5 w-5" />,
      title: "Correlation vs. Causation",
      description:
        "Statistical differences do not imply causation. A higher average in one teaching method doesn't prove that method is inherently superior.",
    },
    {
      icon: <Building2 className="h-5 w-5" />,
      title: "Single Institution Limitation",
      description:
        "Results may not generalize across different institutions, regions, or cultural contexts. Educational effectiveness varies with local conditions.",
    },
  ];

  const futureScope = [
    {
      icon: <BarChart3 className="h-5 w-5" />,
      title: "Post-hoc Tests (Tukey HSD)",
      description:
        "Implement Tukey's Honestly Significant Difference test to identify which specific pairs of teaching methods differ significantly after ANOVA indicates overall significance.",
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: "Demographic Analysis",
      description:
        "Incorporate demographic variables (age, gender, prior education) to understand how different student populations respond to various teaching methods.",
    },
    {
      icon: <Building2 className="h-5 w-5" />,
      title: "Multi-Institution Datasets",
      description:
        "Expand analysis to include data from multiple institutions across different regions to improve generalizability and external validity.",
    },
    {
      icon: <Sparkles className="h-5 w-5" />,
      title: "Longitudinal Tracking",
      description:
        "Track student performance over time to understand long-term retention and skill development across different teaching methodologies.",
    },
  ];

  return (
    <Layout>
      <div className="mx-auto max-w-4xl">
        <div className="mb-10 text-center animate-fade-in">
          <h1 className="mb-3 text-3xl font-bold text-foreground md:text-4xl">
            Limitations & Future Scope
          </h1>
          <p className="text-muted-foreground">
            Understanding the boundaries and potential improvements of this analysis
          </p>
        </div>

        {/* Limitations Section */}
        <section className="mb-12">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-semibold text-foreground">
              Current Limitations
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {limitations.map((item, index) => (
              <div
                key={item.title}
                className="rounded-xl border border-border bg-card p-6 transition-shadow hover:shadow-md animate-slide-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                  {item.icon}
                </div>
                <h3 className="mb-2 font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Future Scope Section */}
        <section>
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <Lightbulb className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-semibold text-foreground">
              Future Enhancements
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {futureScope.map((item, index) => (
              <div
                key={item.title}
                className="rounded-xl border border-accent/20 bg-accent/5 p-6 transition-all hover:border-accent/40 hover:shadow-md animate-slide-up"
                style={{ animationDelay: `${(index + 4) * 50}ms` }}
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/20 text-accent">
                  {item.icon}
                </div>
                <h3 className="mb-2 font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Citation Note */}
        <div className="mt-12 rounded-xl border border-border bg-muted/30 p-6 text-center animate-fade-in">
          <p className="text-sm text-muted-foreground">
            This tool is designed for educational demonstration purposes.
            For rigorous academic research, consider using specialized statistical software
            and consulting with statisticians for proper experimental design.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default LimitationsPage;

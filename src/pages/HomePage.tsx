import { Layout } from "@/components/layout/Layout";
import { MethodCard } from "@/components/home/MethodCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  BarChart3, 
  ArrowRight, 
  Building2, 
  Globe, 
  Layers,
  BookOpen,
  TrendingUp
} from "lucide-react";

const HomePage = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-12 md:py-20">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,hsl(199_89%_48%/0.08),transparent_50%)]" />
        
        <div className="mx-auto max-w-3xl text-center animate-fade-in">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
            <BarChart3 className="h-4 w-4" />
            Educational Analytics Platform
          </div>
          
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Teaching Method{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Performance Analyzer
            </span>
          </h1>
          
          <p className="mb-8 text-lg text-muted-foreground md:text-xl">
            Analyze and compare student performance across different teaching methodologies 
            using data-driven statistical analysis. Make informed decisions about educational strategies.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="group">
              <Link to="/domain">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/limitations">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why ANOVA Section */}
      <section className="py-12">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl border border-border bg-card p-8 md:p-10 animate-slide-up">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <TrendingUp className="h-6 w-6" />
              </div>
              <div>
                <h2 className="mb-3 text-xl font-semibold text-foreground md:text-2xl">
                  Why Use ANOVA Analysis?
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Visual comparison of averages can be misleading. ANOVA (Analysis of Variance) 
                  provides a statistically rigorous method to determine if differences between 
                  teaching methods are <strong className="text-foreground">significant</strong> or just due to random variation. 
                  It considers sample sizes, data spread, and calculates a p-value to quantify 
                  confidence in the results.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Teaching Methods Section */}
      <section className="py-12">
        <div className="mb-10 text-center">
          <h2 className="mb-3 text-2xl font-bold text-foreground md:text-3xl">
            Teaching Methodologies
          </h2>
          <p className="text-muted-foreground">
            Compare three distinct approaches to education delivery
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <MethodCard
            title="Offline Learning"
            description="Traditional classroom-based instruction with face-to-face interaction, hands-on activities, and direct mentorship from instructors."
            icon={<Building2 className="h-6 w-6" />}
            variant="offline"
            delay={0}
          />
          <MethodCard
            title="Online Learning"
            description="Digital-first education through virtual platforms, video lectures, interactive content, and flexible self-paced learning modules."
            icon={<Globe className="h-6 w-6" />}
            variant="online"
            delay={100}
          />
          <MethodCard
            title="Blended Learning"
            description="Hybrid approach combining the best of both worlds—structured classroom sessions enhanced with digital resources and online collaboration."
            icon={<Layers className="h-6 w-6" />}
            variant="blended"
            delay={200}
          />
        </div>
      </section>

      {/* Data-Driven Education */}
      <section className="py-12">
        <div className="rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-accent/5 p-8 md:p-12">
          <div className="mx-auto max-w-2xl text-center">
            <BookOpen className="mx-auto mb-6 h-12 w-12 text-primary" />
            <h2 className="mb-4 text-2xl font-bold text-foreground md:text-3xl">
              Data-Driven Education
            </h2>
            <p className="mb-6 text-muted-foreground leading-relaxed">
              Educational institutions generate vast amounts of performance data. 
              By applying statistical analysis, educators can move beyond intuition 
              to make evidence-based decisions about curriculum design, teaching 
              strategies, and resource allocation.
            </p>
            <Button asChild variant="secondary">
              <Link to="/domain">
                Start Analysis
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;

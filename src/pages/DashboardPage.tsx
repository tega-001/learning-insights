import { useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { useData } from "@/context/DataContext";
import { PerformanceChart } from "@/components/dashboard/PerformanceChart";
import { StatsGrid } from "@/components/dashboard/StatsGrid";
import { InterpretationPanel } from "@/components/dashboard/InterpretationPanel";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Download, RefreshCw } from "lucide-react";

const DashboardPage = () => {
  const { selectedDomain, records, loadPreloadedData } = useData();
  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedDomain) {
      navigate("/domain");
    }
  }, [selectedDomain, navigate]);

  if (!selectedDomain) {
    return null;
  }

  const hasData = records.length > 0;

  return (
    <Layout>
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between animate-fade-in">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                {selectedDomain}
              </span>
              <span className="text-xs text-muted-foreground">
                {records.length} records
              </span>
            </div>
            <h1 className="text-3xl font-bold text-foreground md:text-4xl">
              Analysis Dashboard
            </h1>
          </div>

          <div className="flex gap-3">
            <Button asChild variant="outline" size="sm">
              <Link to="/input">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Edit Data
              </Link>
            </Button>
            {!hasData && (
              <Button onClick={loadPreloadedData} size="sm">
                <RefreshCw className="mr-2 h-4 w-4" />
                Load Sample Data
              </Button>
            )}
          </div>
        </div>

        {hasData ? (
          <div className="space-y-8">
            {/* Stats Grid */}
            <section>
              <h2 className="mb-4 text-lg font-semibold text-foreground">
                Performance Overview
              </h2>
              <StatsGrid />
            </section>

            {/* Chart Section */}
            <section className="rounded-xl border border-border bg-card p-6">
              <h2 className="mb-4 text-lg font-semibold text-foreground">
                Average Marks by Teaching Method
              </h2>
              <PerformanceChart />
            </section>

            {/* Interpretation */}
            <section>
              <h2 className="mb-4 text-lg font-semibold text-foreground">
                Statistical Analysis & Interpretation
              </h2>
              <InterpretationPanel />
            </section>
          </div>
        ) : (
          <div className="flex min-h-[400px] items-center justify-center rounded-xl border border-dashed border-border bg-muted/30">
            <div className="text-center">
              <p className="mb-4 text-muted-foreground">
                No data available for analysis
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button onClick={loadPreloadedData}>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Load Sample Dataset
                </Button>
                <Button asChild variant="outline">
                  <Link to="/input">Add Manual Data</Link>
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-8 flex justify-end">
          <Button asChild variant="outline">
            <Link to="/limitations">
              View Limitations & Future Scope
            </Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;

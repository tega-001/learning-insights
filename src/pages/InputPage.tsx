import { useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { useData } from "@/context/DataContext";
import { DataTable } from "@/components/input/DataTable";
import { StudentForm } from "@/components/input/StudentForm";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, useNavigate } from "react-router-dom";
import { Database, UserPlus, ArrowRight, RefreshCw, Trash2 } from "lucide-react";
import { toast } from "sonner";

const InputPage = () => {
  const {
    selectedDomain,
    records,
    loadPreloadedData,
    clearUserData,
    isPreloadedMode,
    setIsPreloadedMode,
  } = useData();
  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedDomain) {
      navigate("/domain");
    }
  }, [selectedDomain, navigate]);

  const handleLoadPreloaded = () => {
    loadPreloadedData();
    toast.success("Preloaded dataset loaded successfully");
  };

  const handleClearData = () => {
    clearUserData();
    toast.success("User data cleared");
  };

  if (!selectedDomain) {
    return null;
  }

  return (
    <Layout>
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 animate-fade-in">
          <div className="mb-2 flex items-center gap-2">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              {selectedDomain}
            </span>
          </div>
          <h1 className="mb-3 text-3xl font-bold text-foreground md:text-4xl">
            Data Input
          </h1>
          <p className="text-muted-foreground">
            Load preloaded data or manually enter student records
          </p>
        </div>

        <Tabs
          defaultValue={isPreloadedMode ? "preloaded" : "manual"}
          onValueChange={(v) => setIsPreloadedMode(v === "preloaded")}
          className="space-y-6"
        >
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="preloaded" className="gap-2">
              <Database className="h-4 w-4" />
              Preloaded Data
            </TabsTrigger>
            <TabsTrigger value="manual" className="gap-2">
              <UserPlus className="h-4 w-4" />
              Manual Input
            </TabsTrigger>
          </TabsList>

          <TabsContent value="preloaded" className="space-y-6 animate-fade-in">
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="mb-2 font-semibold text-foreground">
                Simulated Academic Dataset
              </h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Load a Kaggle-style simulated dataset with 30 student records 
                across all three teaching methods for the {selectedDomain} domain.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button onClick={handleLoadPreloaded} variant="default">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Load Dataset
                </Button>
                {records.length > 0 && (
                  <Button onClick={handleClearData} variant="outline">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Clear All
                  </Button>
                )}
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-lg font-semibold text-foreground">
                Dataset Preview
              </h3>
              <DataTable />
            </div>
          </TabsContent>

          <TabsContent value="manual" className="space-y-6 animate-fade-in">
            <div className="grid gap-6 lg:grid-cols-5">
              <div className="lg:col-span-2">
                <div className="rounded-xl border border-border bg-card p-6">
                  <h3 className="mb-4 text-lg font-semibold text-foreground">
                    Add Student Record
                  </h3>
                  <StudentForm />
                </div>
              </div>

              <div className="lg:col-span-3">
                <h3 className="mb-4 text-lg font-semibold text-foreground">
                  Current Records ({records.length})
                </h3>
                <DataTable />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-8 flex justify-end animate-fade-in">
          <Button
            asChild
            size="lg"
            disabled={records.length === 0}
            className="group"
          >
            <Link to="/dashboard">
              View Analysis Dashboard
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default InputPage;

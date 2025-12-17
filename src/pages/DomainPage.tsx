import { Layout } from "@/components/layout/Layout";
import { useData } from "@/context/DataContext";
import { domains, Domain } from "@/lib/data";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Building, 
  Palette, 
  Brush, 
  Shirt, 
  Code,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

const domainIcons: Record<Domain, React.ReactNode> = {
  "Architecture": <Building className="h-8 w-8" />,
  "Design / UI-UX": <Palette className="h-8 w-8" />,
  "Fine Arts": <Brush className="h-8 w-8" />,
  "Fashion": <Shirt className="h-8 w-8" />,
  "Computer Science": <Code className="h-8 w-8" />,
};

const domainDescriptions: Record<Domain, string> = {
  "Architecture": "Spatial design, building structures, and urban planning",
  "Design / UI-UX": "User interface, user experience, and digital product design",
  "Fine Arts": "Visual arts, painting, sculpture, and creative expression",
  "Fashion": "Apparel design, textiles, and fashion merchandising",
  "Computer Science": "Programming, algorithms, and software development",
};

const DomainPage = () => {
  const { selectedDomain, setSelectedDomain } = useData();
  const navigate = useNavigate();

  const handleDomainSelect = (domain: Domain) => {
    setSelectedDomain(domain);
  };

  const handleContinue = () => {
    if (selectedDomain) {
      navigate("/input");
    }
  };

  return (
    <Layout>
      <div className="mx-auto max-w-4xl">
        <div className="mb-10 text-center animate-fade-in">
          <h1 className="mb-3 text-3xl font-bold text-foreground md:text-4xl">
            Select Your Domain
          </h1>
          <p className="text-muted-foreground">
            Choose the academic discipline to analyze teaching method effectiveness
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {domains.map((domain, index) => (
            <button
              key={domain}
              onClick={() => handleDomainSelect(domain)}
              className={cn(
                "group relative overflow-hidden rounded-xl border-2 p-6 text-left transition-all duration-300 animate-slide-up",
                selectedDomain === domain
                  ? "border-primary bg-primary/5 shadow-glow"
                  : "border-border bg-card hover:border-primary/50 hover:shadow-md"
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {selectedDomain === domain && (
                <div className="absolute right-3 top-3">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                </div>
              )}
              
              <div
                className={cn(
                  "mb-4 flex h-14 w-14 items-center justify-center rounded-xl transition-colors",
                  selectedDomain === domain
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                )}
              >
                {domainIcons[domain]}
              </div>
              
              <h3 className="mb-2 font-semibold text-foreground">{domain}</h3>
              <p className="text-sm text-muted-foreground">
                {domainDescriptions[domain]}
              </p>
            </button>
          ))}
        </div>

        <div className="mt-10 flex justify-center animate-fade-in">
          <Button
            size="lg"
            onClick={handleContinue}
            disabled={!selectedDomain}
            className="group"
          >
            Continue to Data Input
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

        {selectedDomain && (
          <p className="mt-4 text-center text-sm text-muted-foreground animate-fade-in">
            Selected: <span className="font-medium text-foreground">{selectedDomain}</span>
          </p>
        )}
      </div>
    </Layout>
  );
};

export default DomainPage;

export type TeachingMethod = "Offline" | "Online" | "Blended";

export type Domain =
  | "Architecture"
  | "Design / UI-UX"
  | "Fine Arts"
  | "Fashion"
  | "Computer Science";

export interface StudentRecord {
  id: string;
  name: string;
  marks: number;
  method: TeachingMethod;
  domain: Domain;
}

export const domains: Domain[] = [
  "Architecture",
  "Design / UI-UX",
  "Fine Arts",
  "Fashion",
  "Computer Science",
];

export const teachingMethods: TeachingMethod[] = ["Offline", "Online", "Blended"];

// Simulated Kaggle-style dataset
export const generatePreloadedData = (domain: Domain): StudentRecord[] => {
  const names = [
    "Alice Johnson", "Bob Smith", "Carol White", "David Brown", "Emma Davis",
    "Frank Miller", "Grace Wilson", "Henry Taylor", "Ivy Anderson", "Jack Thomas",
    "Kate Jackson", "Leo Harris", "Mia Martin", "Noah Garcia", "Olivia Martinez",
    "Peter Robinson", "Quinn Clark", "Rachel Lewis", "Sam Walker", "Tina Hall",
    "Uma Allen", "Victor Young", "Wendy King", "Xavier Wright", "Yara Scott",
    "Zach Green", "Amy Baker", "Ben Adams", "Chloe Nelson", "Dan Carter"
  ];

  // Domain-specific performance patterns
  const domainPatterns: Record<Domain, { offline: number; online: number; blended: number }> = {
    "Architecture": { offline: 72, online: 65, blended: 78 },
    "Design / UI-UX": { offline: 68, online: 75, blended: 82 },
    "Fine Arts": { offline: 80, online: 62, blended: 74 },
    "Fashion": { offline: 74, online: 70, blended: 76 },
    "Computer Science": { offline: 70, online: 78, blended: 85 },
  };

  const pattern = domainPatterns[domain];
  const records: StudentRecord[] = [];

  names.forEach((name, index) => {
    const methodIndex = index % 3;
    const method = teachingMethods[methodIndex];
    const baseMark = method === "Offline" ? pattern.offline :
                     method === "Online" ? pattern.online : pattern.blended;
    
    // Add some variance
    const variance = Math.floor(Math.random() * 20) - 10;
    const marks = Math.min(100, Math.max(0, baseMark + variance));

    records.push({
      id: `pre-${index}`,
      name,
      marks,
      method,
      domain,
    });
  });

  return records;
};

// Statistical calculations
export const calculateMean = (values: number[]): number => {
  if (values.length === 0) return 0;
  return values.reduce((sum, val) => sum + val, 0) / values.length;
};

export const calculateStdDev = (values: number[]): number => {
  if (values.length <= 1) return 0;
  const mean = calculateMean(values);
  const squaredDiffs = values.map(val => Math.pow(val - mean, 2));
  return Math.sqrt(squaredDiffs.reduce((sum, val) => sum + val, 0) / (values.length - 1));
};

// Simulated ANOVA p-value calculation
export const simulateAnovaPValue = (
  offlineScores: number[],
  onlineScores: number[],
  blendedScores: number[]
): number => {
  // This is a simplified simulation for frontend demonstration
  const offlineMean = calculateMean(offlineScores);
  const onlineMean = calculateMean(onlineScores);
  const blendedMean = calculateMean(blendedScores);

  const grandMean = calculateMean([...offlineScores, ...onlineScores, ...blendedScores]);
  
  // Calculate between-group variance
  const betweenVariance = (
    offlineScores.length * Math.pow(offlineMean - grandMean, 2) +
    onlineScores.length * Math.pow(onlineMean - grandMean, 2) +
    blendedScores.length * Math.pow(blendedMean - grandMean, 2)
  ) / 2;

  // Calculate within-group variance
  const withinVariance = (
    offlineScores.reduce((sum, val) => sum + Math.pow(val - offlineMean, 2), 0) +
    onlineScores.reduce((sum, val) => sum + Math.pow(val - onlineMean, 2), 0) +
    blendedScores.reduce((sum, val) => sum + Math.pow(val - blendedMean, 2), 0)
  ) / (offlineScores.length + onlineScores.length + blendedScores.length - 3);

  // F-statistic approximation
  const fStat = betweenVariance / (withinVariance || 1);
  
  // Simplified p-value simulation based on F-statistic
  // Higher F = lower p-value
  if (fStat > 5) return 0.01;
  if (fStat > 3) return 0.03;
  if (fStat > 2) return 0.08;
  if (fStat > 1.5) return 0.15;
  return 0.25 + Math.random() * 0.3;
};

export const getMethodColor = (method: TeachingMethod): string => {
  switch (method) {
    case "Offline": return "hsl(25 95% 53%)";
    case "Online": return "hsl(217 91% 60%)";
    case "Blended": return "hsl(172 66% 50%)";
  }
};

export const getMethodBgClass = (method: TeachingMethod): string => {
  switch (method) {
    case "Offline": return "bg-offline";
    case "Online": return "bg-online";
    case "Blended": return "bg-blended";
  }
};

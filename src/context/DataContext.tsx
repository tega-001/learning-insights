import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import {
  StudentRecord,
  Domain,
  TeachingMethod,
  generatePreloadedData,
  calculateMean,
  simulateAnovaPValue,
} from "@/lib/data";

interface DataContextType {
  selectedDomain: Domain | null;
  setSelectedDomain: (domain: Domain) => void;
  records: StudentRecord[];
  addRecord: (record: Omit<StudentRecord, "id">) => void;
  loadPreloadedData: () => void;
  clearUserData: () => void;
  isPreloadedMode: boolean;
  setIsPreloadedMode: (mode: boolean) => void;
  getMethodStats: () => {
    offline: { mean: number; count: number; scores: number[] };
    online: { mean: number; count: number; scores: number[] };
    blended: { mean: number; count: number; scores: number[] };
    pValue: number;
  };
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedDomain, setSelectedDomain] = useState<Domain | null>(null);
  const [records, setRecords] = useState<StudentRecord[]>([]);
  const [isPreloadedMode, setIsPreloadedMode] = useState(true);

  const loadPreloadedData = useCallback(() => {
    if (selectedDomain) {
      const preloaded = generatePreloadedData(selectedDomain);
      setRecords(preloaded);
    }
  }, [selectedDomain]);

  const addRecord = useCallback((record: Omit<StudentRecord, "id">) => {
    const newRecord: StudentRecord = {
      ...record,
      id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    };
    setRecords((prev) => [...prev, newRecord]);
  }, []);

  const clearUserData = useCallback(() => {
    setRecords((prev) => prev.filter((r) => r.id.startsWith("pre-")));
  }, []);

  const getMethodStats = useCallback(() => {
    const offlineScores = records
      .filter((r) => r.method === "Offline")
      .map((r) => r.marks);
    const onlineScores = records
      .filter((r) => r.method === "Online")
      .map((r) => r.marks);
    const blendedScores = records
      .filter((r) => r.method === "Blended")
      .map((r) => r.marks);

    return {
      offline: {
        mean: calculateMean(offlineScores),
        count: offlineScores.length,
        scores: offlineScores,
      },
      online: {
        mean: calculateMean(onlineScores),
        count: onlineScores.length,
        scores: onlineScores,
      },
      blended: {
        mean: calculateMean(blendedScores),
        count: blendedScores.length,
        scores: blendedScores,
      },
      pValue: simulateAnovaPValue(offlineScores, onlineScores, blendedScores),
    };
  }, [records]);

  return (
    <DataContext.Provider
      value={{
        selectedDomain,
        setSelectedDomain,
        records,
        addRecord,
        loadPreloadedData,
        clearUserData,
        isPreloadedMode,
        setIsPreloadedMode,
        getMethodStats,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};

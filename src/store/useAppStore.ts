import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AppState {
  solvedCases: string[];
  markCaseSolved: (caseId: string) => void;
  isCaseSolved: (caseId: string) => boolean;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      solvedCases: [],
      markCaseSolved: (caseId) => set({ solvedCases: Array.from(new Set([...get().solvedCases, caseId])) }),
      isCaseSolved: (caseId) => get().solvedCases.includes(caseId),
    }),
    {
      name: "the-red-line-storage",
    }
  )
);

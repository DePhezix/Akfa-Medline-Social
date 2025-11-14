import type { StateCreator } from "zustand";
import { fetchVacancyStats } from "../ApiCalls/fetchVacancyStats.js";

interface VacancyStatsType {
  ru: string | undefined;
  en: string | undefined;
  count: number;
}

export interface VacancyStatsSliceType {
  vacancyStats: VacancyStatsType[];
  fetchAndSetVacancyStats: () => Promise<void>;
}

export const createVacancyStatsSlice: StateCreator<VacancyStatsSliceType> = (set) => ({
    vacancyStats: [],
    fetchAndSetVacancyStats: async () => {
        const fetchedVacancyStats = await fetchVacancyStats();
        return set(() => ({ vacancyStats: fetchedVacancyStats }));
    }
})
import type { StateCreator } from "zustand";
import { fetchVacancies } from "../ApiCalls/fetchVacancies.js";

interface VacancyType {
  title: string;
  id: number;
  salary: string;
  category: string;
  onWaitingList: number;
  body: string;
  requirements: string;
  conditions: string;
}

export interface VacanciesSliceType {
  vacancies: VacancyType[];
  fetchAndSetVacancies: () => Promise<void>;
}

export const createVacanciesSlice: StateCreator<VacanciesSliceType> = (
  set
) => ({
  vacancies: [],
  fetchAndSetVacancies: async () => {
    const fetchedVacancies = await fetchVacancies();
    return set((state) => ({ vacancies: fetchedVacancies }));
  },
});

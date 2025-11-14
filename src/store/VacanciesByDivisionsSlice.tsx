import type { StateCreator } from "zustand";
import { fetchVacanciesByDivision } from "../ApiCalls/fetchVacanciesByDivision.js";

interface VacanciesByDivisionsType {
  title: string;
  numberOfApplicants: number;
  jobID: number;
}

export interface VacanciesByDivisionsSliceType {
    vacanciesByDivision: VacanciesByDivisionsType[]
    fetchAndSetVacanciesByDivision: (division: number) => Promise<void>
}

export const createVacanciesByDivisionsSlice: StateCreator<VacanciesByDivisionsSliceType> = (set) => ({
    vacanciesByDivision: [],
    fetchAndSetVacanciesByDivision: async (division) => {
        const fetchedVacancies = await fetchVacanciesByDivision(division);
        return set(() => ({vacanciesByDivision: fetchedVacancies}));
    }
})
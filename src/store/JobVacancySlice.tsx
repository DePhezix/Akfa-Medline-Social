import type{ StateCreator } from "zustand";
import { fetchJobVacancy } from "../ApiCalls/fetchJobVacancy.js";

interface JobVacancyType {
  title: string;
  id: number;
  salary: string;
  category: string;
  onWaitingList: number;
  body: string;
  requirements: string;
  conditions: string;
}

export interface JobVacancySliceType {
  jobVacancy: JobVacancyType;
  fetchAndSetJobVacancy: (jobid: number) => Promise<void>;
}

export const createJobVacancySlice: StateCreator<JobVacancySliceType> = (
  set
) => ({
  jobVacancy: {
    title: "",
    id: 0,
    salary: "",
    category: "",
    onWaitingList: 0,
    body: "",
    requirements: "",
    conditions: "",
  },
  fetchAndSetJobVacancy: async (jobid: number) => {
    const fetchedVacancy = await fetchJobVacancy(jobid);
    return set(() => ({ jobVacancy: fetchedVacancy }));
  },
});

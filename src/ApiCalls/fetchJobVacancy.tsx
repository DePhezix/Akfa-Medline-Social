import axios from "axios";
import { useBoundStore } from "../store/Store.js";

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

export async function fetchJobVacancy(jobid: number): Promise<JobVacancyType> {
  const setIsLoading = useBoundStore.getState().setLoading;
  try {
    setIsLoading(true);
    const startTime = Date.now();

    const res = await axios.get<JobVacancyType>(
      `https://hr.centralasian.uz/api/social/vacancies/${jobid}`
    );

    const elapsed = Date.now() - startTime;
    const delay = Math.max(0, 200 - elapsed);
    await new Promise((resolve) => setTimeout(resolve, delay));

    return res.data;
  } catch (err) {
    console.error(err);
    return {
      title: "",
      id: jobid,
      salary: "",
      category: "",
      onWaitingList: 0,
      body: "",
      requirements: "",
      conditions: "",
    };
  } finally {
    setIsLoading(false);
  }
}

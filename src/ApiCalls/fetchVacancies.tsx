import axios from "axios";

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

export async function fetchVacancies(): Promise<VacancyType[]> {
  try {
    const res = await axios.get<VacancyType[]>(
      "https://hr.centralasian.uz/api/social/vacancies"
    );

    return res.data;
  } catch (err) {
    console.log(err);
    return [];
  }
}

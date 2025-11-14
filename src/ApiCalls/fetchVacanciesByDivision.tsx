import axios from 'axios'

interface vacanciesType {
  title: string;
  numberOfApplicants: number;
  jobID: number;
}

interface databaseJobsType {
  title: string;
  onWaitingList: number;
  id: number;
}

export async function fetchVacanciesByDivision(
  fieldKey: number
): Promise<vacanciesType[]> {
  try {
    const res = await axios.get<databaseJobsType[]>(
      `https://hr.centralasian.uz/api/social/vacancies?division=${fieldKey}`
    );

    const formattedJobs: vacanciesType[] = res.data.map((item) => ({
      title: item.title,
      numberOfApplicants: item.onWaitingList,
      jobID: item.id,
    }));

    return formattedJobs;
  } catch (err) {
    return []
  }
};

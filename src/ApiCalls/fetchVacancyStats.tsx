import axios from 'axios'

type waitingListType = {
  ru: string | undefined;
  en: string | undefined;
  count: number;
};

interface backendWaitlistDataType {
  name: string;
  response: number;
}

export async function fetchVacancyStats(): Promise<waitingListType[]> {
  try {
    const res = await axios.get<backendWaitlistDataType[]>(
      "https://hr.centralasian.uz/api/dashboard/social/v3/stats/by-schools"
    );

    const parsedList: waitingListType[] = res.data.map((item) => {
      const match = item.name.match(/^(.*?)\s*\((.*?)\)/);
      const russian = match ? match[1]?.trim() : item.name;
      const english = match ? match[2]?.trim() : item.name;
      return {
        ru: russian,
        en: english,
        count: item.response,
      };
    });

    return parsedList;
  } catch (err) {
    return [{
        ru: "",
        en: "",
        count: 0
    }]
  }
};
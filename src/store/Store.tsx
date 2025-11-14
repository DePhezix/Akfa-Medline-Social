import { create } from 'zustand'

import { createVacanciesSlice } from "./VacanciesSlice.js";
import type { VacanciesSliceType } from "./VacanciesSlice.js";

import { createJobVacancySlice } from "./JobVacancySlice.js";
import type { JobVacancySliceType } from "./JobVacancySlice.js";

import { createLoadingSlice } from "./LoadingSlice.js";
import type { LoadingSliceType } from "./LoadingSlice.js";

import { createPopUpSlice } from "./PopUpSlice.js";
import type { PopUpSliceType } from "./PopUpSlice.js";

import { createVacancyStatsSlice } from './VacancyStatsSlice.js';
import type { VacancyStatsSliceType } from './VacancyStatsSlice.js';

import { createVacanciesByDivisionsSlice } from './VacanciesByDivisionsSlice.js';
import type { VacanciesByDivisionsSliceType } from './VacanciesByDivisionsSlice.js';

export const useBoundStore = create<
  VacanciesSliceType &
    JobVacancySliceType &
    LoadingSliceType &
    PopUpSliceType &
    VacancyStatsSliceType & VacanciesByDivisionsSliceType
>()((...set) => ({
  ...createVacanciesSlice(...set),
  ...createJobVacancySlice(...set),
  ...createLoadingSlice(...set),
  ...createPopUpSlice(...set),
  ...createVacancyStatsSlice(...set),
  ...createVacanciesByDivisionsSlice(...set)
}));
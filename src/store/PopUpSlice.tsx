import type { StateCreator } from 'zustand'

export interface PopUpSliceType {
    popUp: boolean;
    setPopUp: (newState: boolean) => void;
}

export const createPopUpSlice: StateCreator<PopUpSliceType> = (set) => ({
    popUp: false,
    setPopUp: (newState) => set(() => ({popUp: newState}))
})
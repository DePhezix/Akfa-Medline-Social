import type { StateCreator } from 'zustand'

export interface LoadingSliceType {
    loading: boolean;
    setLoading: (newLoadingState: boolean) => void;
    amountLoading: number;
    addLoadingCount: () => void;
    decreaseLoadingCount: () => void;
} 

export const createLoadingSlice: StateCreator<LoadingSliceType> = (set) => ({
    loading: false,
    setLoading: (newLoadingState) => set((state) => ({loading: newLoadingState})),
    amountLoading: 0,
    addLoadingCount: () => set((state) => ({amountLoading: state.amountLoading + 1})),
    decreaseLoadingCount: () => set((state) => ({amountLoading: state.amountLoading - 1}))
})
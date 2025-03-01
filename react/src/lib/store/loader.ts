import { createStore } from "zustand/vanilla";

export interface LoaderStore {
	open: boolean;
	setLoader: (open: boolean) => void;
}

export const useLoaderStore = createStore<LoaderStore>((set) => ({
	open: false,
	setLoader: (open) => set({ open }),
}));

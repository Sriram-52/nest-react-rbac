import { create } from "zustand";
import { User } from "../api";

interface AuthStore {
	user: User | null;
	setUser: (user: User) => User;
}

export const useAuthStore = create<AuthStore>((set) => ({
	user: null,
	setUser: (user) => {
		set({ user });
		return user;
	},
}));

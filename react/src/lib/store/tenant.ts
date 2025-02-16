import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type TenantStore = {
	selectedTenantId: string | null;
	setSelectedTenantId: (tenantId: string | null) => void;
};

export const useTenantStore = create<TenantStore>()(
	persist(
		(set) => ({
			selectedTenantId: null,
			setSelectedTenantId: (tenantId) => set({ selectedTenantId: tenantId }),
		}),
		{
			name: "tenant",
			storage: createJSONStorage(() => localStorage),
		}
	)
);

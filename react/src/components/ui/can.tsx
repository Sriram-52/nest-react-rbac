import { createContext, useContext } from "react";
import { createContextualCan } from "@casl/react";
import { AppAbility, buildAbility } from "@/lib/casl/ability";

const initialAbility = buildAbility([]);

const AbilityContext = createContext<AppAbility>(initialAbility);

export const useAbility = () => {
	const context = useContext(AbilityContext);
	if (!context) {
		throw new Error("useAbility must be used within a AbilityProvider");
	}
	return context;
};

export const AbilityProvider = ({ children }: { children: React.ReactNode }) => {
	return <AbilityContext.Provider value={initialAbility}>{children}</AbilityContext.Provider>;
};

export const Can = createContextualCan(AbilityContext.Consumer);

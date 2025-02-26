import { useEffect } from "react";
import { useAuth } from "./providers/auth-provider";
import { useAuthStore } from "./store/auth";
import { usersControllerFindMe } from "./api";
import { useToast } from "@/hooks/use-toast";
import { useAbility } from "@/components/ui/can";
import { defineAbilityForUser } from "./casl/ability";

export function AuthInjecter() {
	const setUser = useAuthStore((state) => state.setUser);
	const { user, signOut, setIsLoading } = useAuth();
	const { toast } = useToast();
	const ability = useAbility();

	useEffect(() => {
		if (!user) {
			return;
		}
		const bootstrapAsync = async () => {
			setIsLoading(true);
			try {
				const me = await usersControllerFindMe();
				setUser(me);
				const rules = defineAbilityForUser(me);
				ability.update(rules);
				(window as any).ability = ability;
			} catch (error) {
				console.error(error);
				toast({
					description: "An error occurred while authenticating. Please contact the administrator.",
					variant: "destructive",
				});
				await new Promise((resolve) => setTimeout(resolve, 2000)); // wait for the alert to show
				return signOut();
			} finally {
				setIsLoading(false);
			}
		};

		bootstrapAsync();

		return () => setIsLoading(false);
	}, [user, setUser, signOut, toast, setIsLoading, ability]);

	return null;
}

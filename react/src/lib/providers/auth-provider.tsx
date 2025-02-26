import { FirebaseError } from "firebase/app";
import { AuthErrorCodes, User, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { firebaseApp } from "../environment/firebase-config";

interface AuthContext {
	user: User | null;
	isLoading: boolean;
	signIn: (email: string, password: string) => Promise<void>;
	signOut: () => Promise<void>;
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContext | undefined>(undefined);

export function useAuth() {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within a AuthProvider");
	}
	return context;
}

const auth = getAuth(firebaseApp);

export default function AuthProvider({ children }: Readonly<{ children: React.ReactNode }>) {
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	const onAuthStateChanged = useCallback((authUser: User | null) => {
		if (authUser) {
			setUser(authUser);
		}
		setIsLoading(false);
	}, []);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(onAuthStateChanged);
		return () => {
			unsubscribe();
		};
	}, [onAuthStateChanged]);

	const signIn = useCallback(async (email: string, password: string) => {
		try {
			await signInWithEmailAndPassword(auth, email, password);
		} catch (error) {
			if (error instanceof FirebaseError) {
				if (error.code === AuthErrorCodes.INVALID_LOGIN_CREDENTIALS) {
					throw new Error("Invalid email or password");
				}
				if (error.code === AuthErrorCodes.USER_DELETED) {
					throw new Error("No account found with this email");
				}
				if (error.code === AuthErrorCodes.USER_DISABLED) {
					throw new Error("This account has been disabled");
				}
				if (error.code === AuthErrorCodes.INVALID_PASSWORD) {
					throw new Error("Please check your password and try again");
				}
				if (error.code === AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER) {
					throw new Error("Too many attempts, please try again later");
				}
				if (error.code === AuthErrorCodes.INVALID_EMAIL) {
					throw new Error("Invalid email");
				}
				throw new Error(error.message);
			}
			throw new Error("An error occurred while signing in");
		}
	}, []);

	const signOut = useCallback(async () => {
		try {
			await auth.signOut();
			setUser(null);
		} catch (error) {
			console.error(error);
		}
	}, []);

	const value = useMemo(
		() => ({
			user,
			isLoading,
			signIn,
			signOut,
			setIsLoading,
		}),
		[user, isLoading, signIn, signOut, setIsLoading],
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

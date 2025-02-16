import { Navigate, Route, Routes } from "react-router-dom";
import router from "./router";
import { useEffect, useRef, useState } from "react";
import { useLoaderStore } from "./lib/store/loader";
import { LoadingOverlay } from "./components/ui/loading-overlay";
import { useAuth } from "./lib/providers/AuthProvider";
import LoadingSpinner from "./components/ui/loading-spinner";
import UnauthLayout from "./layout/unauth-layout";
import AuthLayout from "./layout/auth-layout";
import { Toaster } from "./components/ui/toaster";

function App() {
	const { user, isLoading } = useAuth();

	if (isLoading) {
		return (
			<LoadingSpinner className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
		);
	}

	if (!user) {
		return (
			<UnauthLayout>
				<Routes>
					{router.public.map(({ path, Component }) => (
						<Route key={path} path={path} element={<Component />} />
					))}
					<Route path="*" element={<Navigate to="/login" replace />} />
				</Routes>
			</UnauthLayout>
		);
	}

	return (
		<AuthLayout>
			<Routes>
				{router.private.map(({ path, Component }) => (
					<Route key={path} path={path} element={<Component />} />
				))}
				<Route path="/login" element={<Navigate to="/" replace />} />
			</Routes>
		</AuthLayout>
	);
}

export default function AppContainer() {
	const [backdropOpen, setBackdropOpen] = useState(false);

	const loaderRef = useRef(useLoaderStore.getState());

	useEffect(() => {
		const unsubscribeLoading = useLoaderStore.subscribe((state) => {
			loaderRef.current = state;
			setBackdropOpen(state.open);
		});

		return () => {
			unsubscribeLoading();
		};
	}, []);

	return (
		<>
			<App />
			<LoadingOverlay isLoading={backdropOpen} />
			<Toaster />
		</>
	);
}

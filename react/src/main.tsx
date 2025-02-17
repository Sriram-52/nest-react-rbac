import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { MutationCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "./lib/providers/auth-provider.tsx";
import { BrowserRouter } from "react-router-dom";
import "./lib/interceptor.ts";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/ui/error-boundary.tsx";

const queryClient = new QueryClient({
	mutationCache: new MutationCache({
		onSuccess() {
			console.log("Mutation success", "Invalidating queries");
			queryClient.invalidateQueries();
		},
	}),
	defaultOptions: {
		queries: {
			retry: false,
		},
	},
});

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ErrorBoundary FallbackComponent={ErrorFallback}>
			<QueryClientProvider client={queryClient}>
				<AuthProvider>
					<BrowserRouter>
						<App />
					</BrowserRouter>
				</AuthProvider>
			</QueryClientProvider>
		</ErrorBoundary>
	</StrictMode>,
);

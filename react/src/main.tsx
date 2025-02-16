import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { MutationCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "./lib/providers/AuthProvider.tsx";
import { BrowserRouter } from "react-router-dom";

const queryClient = new QueryClient({
	mutationCache: new MutationCache({
		onSuccess() {
			console.log("Mutation success", "Invalidating queries");
			queryClient.invalidateQueries();
		},
	}),
});

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</AuthProvider>
		</QueryClientProvider>
	</StrictMode>,
);

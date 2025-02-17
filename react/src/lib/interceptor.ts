import axios from "axios";
import { LoaderService } from "./services/loader.service";
import { toast } from "@/hooks/use-toast";
import { environment } from "./environment";
import { getAuth } from "firebase/auth";
import { firebaseApp } from "./environment/firebase-config";

class InterceptorService {
	private async authTokenGetter() {
		const auth = getAuth(firebaseApp);
		const user = auth.currentUser;
		if (user) {
			return user.getIdToken();
		}
		return null;
	}

	addRequestInterceptor(): this {
		axios.interceptors.request.use(
			async (config) => {
				if (["post", "put", "delete", "patch"].includes(config.method || "")) {
					LoaderService.showLoader();
				}
				const token = await this.authTokenGetter();
				if (token) {
					config.headers.Authorization = `Bearer ${token}`;
				}
				config.headers["x-tenant-id"] = environment.defaultTenantId;
				return config;
			},
			(error) => {
				return Promise.reject(error);
			},
		);
		return this;
	}

	addResponseInterceptor(): this {
		axios.interceptors.response.use(
			(response) => {
				if (["post", "put", "delete", "patch"].includes(response.config.method || "")) {
					if (response.data?.message) {
						toast({ description: response.data.message });
					}
				}
				LoaderService.hideLoader();
				return response;
			},
			(error) => {
				if (error.toString().includes("CanceledError")) {
					return Promise.reject(error);
				}
				console.error("[InterceptorService] error", error);
				// check the error status code
				const message = error.response?.data?.message;
				if (message) {
					toast({ description: message, variant: "destructive" });
				}
				LoaderService.hideLoader();
				return Promise.reject(error);
			},
		);
		return this;
	}
}

axios.defaults.baseURL = environment.baseUrl;
export const interceptor = new InterceptorService();
interceptor.addRequestInterceptor().addResponseInterceptor();

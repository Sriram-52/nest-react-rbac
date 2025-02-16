import axios from "axios";
import { LoaderService } from "./services/loader.service";
import { useTenantStore } from "./store/tenant";
import { toast } from "@/hooks/use-toast";
import { environment } from "./environment";

class InterceptorService {
	private authTokenGetter: () => Promise<string | null> = () => Promise.resolve(null);
	private _userId: string | null = null;

	setAuthTokenGetter(arg0: (() => Promise<string | null>) | undefined) {
		if (arg0) {
			this.authTokenGetter = arg0;
		}
	}

	setUserId(arg0: string | null) {
		this._userId = arg0;
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
				if (this._userId) {
					config.headers["x-user-id"] = this._userId;
				}
				if (useTenantStore.getState().selectedTenantId) {
					config.headers["x-tenant-id"] = useTenantStore.getState().selectedTenantId;
				}
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

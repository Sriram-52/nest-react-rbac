const env = import.meta.env;

export const environment = {
	production: Boolean(env.PROD),
	baseUrl: env.VITE_BASE_URL,
	defaultTenantId: env.VITE_DEFAULT_TENANT_ID,
};

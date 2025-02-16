const swaggerUrl = "http://localhost:8080/api/docs/swagger.json";

module.exports = {
	api: {
		output: {
			mode: "tags-split",
			client: "react-query",
			mock: false,
			workspace: "src/lib/api",
			target: "endpoints",
			schemas: "models",
			override: {
				mutator: {
					path: "../mutator/http.ts",
					name: "http",
				},
			},
		},
		input: {
			target: swaggerUrl,
		},
		hooks: {
			afterAllFilesWrite: "pnpm exec prettier --write",
		},
	},
	apiZod: {
		output: {
			mode: "tags-split",
			client: "zod",
			workspace: "src/lib/api",
			target: "endpoints",
			fileExtension: ".zod.ts",
		},
		input: {
			target: swaggerUrl,
		},
		hooks: {
			afterAllFilesWrite: "pnpm exec prettier --write",
		},
	},
};

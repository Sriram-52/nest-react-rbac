/**
 * Generated by orval v7.5.0 🍺
 * Do not edit manually.
 * Nest React RBAC API
 * OpenAPI spec version: 1.0
 */
import { z as zod } from "zod";

export const postsControllerCreateBody = zod.object({
	title: zod.string(),
	content: zod.string(),
	published: zod.boolean().optional(),
	authorId: zod.string(),
});

export const postsControllerFindAllResponseItem = zod.object({
	id: zod.string(),
	createdAt: zod.string().datetime(),
	updatedAt: zod.string().datetime(),
	createdBy: zod.string().nullable(),
	updatedBy: zod.string().nullable(),
	tenantId: zod.string(),
	title: zod.string(),
	content: zod.string(),
	published: zod.boolean(),
	author: zod
		.object({
			id: zod.string(),
			createdAt: zod.string().datetime(),
			updatedAt: zod.string().datetime(),
			createdBy: zod.string().nullable(),
			updatedBy: zod.string().nullable(),
			name: zod.string(),
			email: zod.string(),
			tenants: zod
				.array(
					zod.object({
						id: zod.string(),
						createdAt: zod.string().datetime(),
						updatedAt: zod.string().datetime(),
						createdBy: zod.string().nullable(),
						updatedBy: zod.string().nullable(),
						tenantId: zod.string(),
						user: zod.any().optional(),
						userId: zod.string(),
					}),
				)
				.optional(),
			roles: zod
				.array(
					zod.object({
						id: zod.string(),
						createdAt: zod.string().datetime(),
						updatedAt: zod.string().datetime(),
						createdBy: zod.string().nullable(),
						updatedBy: zod.string().nullable(),
						role: zod
							.object({
								id: zod.string(),
								createdAt: zod.string().datetime(),
								updatedAt: zod.string().datetime(),
								createdBy: zod.string().nullable(),
								updatedBy: zod.string().nullable(),
								tenantId: zod.string(),
								name: zod.string(),
								description: zod.string().nullable(),
								permissions: zod
									.array(
										zod.object({
											id: zod.string(),
											createdAt: zod.string().datetime(),
											updatedAt: zod.string().datetime(),
											createdBy: zod.string().nullable(),
											updatedBy: zod.string().nullable(),
											role: zod.any().optional(),
											roleId: zod.string(),
											permission: zod
												.object({
													id: zod.string(),
													createdAt: zod.string().datetime(),
													updatedAt: zod.string().datetime(),
													createdBy: zod.string().nullable(),
													updatedBy: zod.string().nullable(),
													action: zod.string(),
													subject: zod.string(),
													fields: zod.array(zod.string()),
													conditions: zod.object({}).nullable(),
													inverted: zod.boolean(),
													reason: zod.string().nullable(),
													roles: zod.array(zod.any()).optional(),
												})
												.optional(),
											permissionId: zod.string(),
										}),
									)
									.optional(),
								users: zod.array(zod.any()).optional(),
							})
							.optional(),
						roleId: zod.string(),
						user: zod.any().optional(),
						userId: zod.string(),
					}),
				)
				.optional(),
		})
		.optional(),
	authorId: zod.string(),
});
export const postsControllerFindAllResponse = zod.array(postsControllerFindAllResponseItem);

export const postsControllerFindOneParams = zod.object({
	id: zod.string(),
});

export const postsControllerFindOneResponse = zod.object({
	id: zod.string(),
	createdAt: zod.string().datetime(),
	updatedAt: zod.string().datetime(),
	createdBy: zod.string().nullable(),
	updatedBy: zod.string().nullable(),
	title: zod.string(),
	content: zod.string(),
	published: zod.boolean(),
	authorId: zod.string(),
});

export const postsControllerUpdateParams = zod.object({
	id: zod.string(),
});

export const postsControllerUpdateBody = zod.object({
	title: zod.string().optional(),
	content: zod.string().optional(),
	published: zod.boolean().optional(),
	authorId: zod.string().optional(),
});

export const postsControllerUpdateResponse = zod
	.object({
		message: zod.string(),
	})
	.and(
		zod.object({
			result: zod
				.object({
					id: zod.string(),
					createdAt: zod.string().datetime(),
					updatedAt: zod.string().datetime(),
					createdBy: zod.string().nullable(),
					updatedBy: zod.string().nullable(),
					title: zod.string(),
					content: zod.string(),
					published: zod.boolean(),
					authorId: zod.string(),
				})
				.optional(),
		}),
	);

export const postsControllerRemoveParams = zod.object({
	id: zod.string(),
});

export const postsControllerRemoveResponse = zod.object({
	message: zod.string(),
});

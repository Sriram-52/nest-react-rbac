/**
 * Generated by orval v7.5.0 🍺
 * Do not edit manually.
 * Nest React RBAC API
 * OpenAPI spec version: 1.0
 */
import { useMutation, useQuery } from "@tanstack/react-query";
import type {
	DataTag,
	DefinedInitialDataOptions,
	DefinedUseQueryResult,
	MutationFunction,
	QueryFunction,
	QueryKey,
	UndefinedInitialDataOptions,
	UseMutationOptions,
	UseMutationResult,
	UseQueryOptions,
	UseQueryResult,
} from "@tanstack/react-query";
import type {
	CreateUserDto,
	SuccessResponseDto,
	UpdateUserDto,
	User,
	UserDto,
	UsersControllerCreate201,
	UsersControllerUpdate200,
} from "../../models";
import { http } from "../../../mutator/http";

type SecondParameter<T extends (...args: any) => any> = Parameters<T>[1];

export const usersControllerCreate = (
	createUserDto: CreateUserDto,
	options?: SecondParameter<typeof http>,
	signal?: AbortSignal,
) => {
	return http<UsersControllerCreate201>(
		{
			url: `/api/users`,
			method: "POST",
			headers: { "Content-Type": "application/json" },
			data: createUserDto,
			signal,
		},
		options,
	);
};

export const getUsersControllerCreateMutationOptions = <
	TError = unknown,
	TContext = unknown,
>(options?: {
	mutation?: UseMutationOptions<
		Awaited<ReturnType<typeof usersControllerCreate>>,
		TError,
		{ data: CreateUserDto },
		TContext
	>;
	request?: SecondParameter<typeof http>;
}): UseMutationOptions<
	Awaited<ReturnType<typeof usersControllerCreate>>,
	TError,
	{ data: CreateUserDto },
	TContext
> => {
	const mutationKey = ["usersControllerCreate"];
	const { mutation: mutationOptions, request: requestOptions } = options
		? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey
			? options
			: { ...options, mutation: { ...options.mutation, mutationKey } }
		: { mutation: { mutationKey }, request: undefined };

	const mutationFn: MutationFunction<
		Awaited<ReturnType<typeof usersControllerCreate>>,
		{ data: CreateUserDto }
	> = (props) => {
		const { data } = props ?? {};

		return usersControllerCreate(data, requestOptions);
	};

	return { mutationFn, ...mutationOptions };
};

export type UsersControllerCreateMutationResult = NonNullable<
	Awaited<ReturnType<typeof usersControllerCreate>>
>;
export type UsersControllerCreateMutationBody = CreateUserDto;
export type UsersControllerCreateMutationError = unknown;

export const useUsersControllerCreate = <TError = unknown, TContext = unknown>(options?: {
	mutation?: UseMutationOptions<
		Awaited<ReturnType<typeof usersControllerCreate>>,
		TError,
		{ data: CreateUserDto },
		TContext
	>;
	request?: SecondParameter<typeof http>;
}): UseMutationResult<
	Awaited<ReturnType<typeof usersControllerCreate>>,
	TError,
	{ data: CreateUserDto },
	TContext
> => {
	const mutationOptions = getUsersControllerCreateMutationOptions(options);

	return useMutation(mutationOptions);
};
export const usersControllerFindAll = (
	options?: SecondParameter<typeof http>,
	signal?: AbortSignal,
) => {
	return http<UserDto[]>({ url: `/api/users`, method: "GET", signal }, options);
};

export const getUsersControllerFindAllQueryKey = () => {
	return [`/api/users`] as const;
};

export const getUsersControllerFindAllQueryOptions = <
	TData = Awaited<ReturnType<typeof usersControllerFindAll>>,
	TError = unknown,
>(options?: {
	query?: Partial<
		UseQueryOptions<Awaited<ReturnType<typeof usersControllerFindAll>>, TError, TData>
	>;
	request?: SecondParameter<typeof http>;
}) => {
	const { query: queryOptions, request: requestOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getUsersControllerFindAllQueryKey();

	const queryFn: QueryFunction<Awaited<ReturnType<typeof usersControllerFindAll>>> = ({ signal }) =>
		usersControllerFindAll(requestOptions, signal);

	return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
		Awaited<ReturnType<typeof usersControllerFindAll>>,
		TError,
		TData
	> & { queryKey: DataTag<QueryKey, TData, TError> };
};

export type UsersControllerFindAllQueryResult = NonNullable<
	Awaited<ReturnType<typeof usersControllerFindAll>>
>;
export type UsersControllerFindAllQueryError = unknown;

export function useUsersControllerFindAll<
	TData = Awaited<ReturnType<typeof usersControllerFindAll>>,
	TError = unknown,
>(options: {
	query: Partial<
		UseQueryOptions<Awaited<ReturnType<typeof usersControllerFindAll>>, TError, TData>
	> &
		Pick<
			DefinedInitialDataOptions<
				Awaited<ReturnType<typeof usersControllerFindAll>>,
				TError,
				Awaited<ReturnType<typeof usersControllerFindAll>>
			>,
			"initialData"
		>;
	request?: SecondParameter<typeof http>;
}): DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };
export function useUsersControllerFindAll<
	TData = Awaited<ReturnType<typeof usersControllerFindAll>>,
	TError = unknown,
>(options?: {
	query?: Partial<
		UseQueryOptions<Awaited<ReturnType<typeof usersControllerFindAll>>, TError, TData>
	> &
		Pick<
			UndefinedInitialDataOptions<
				Awaited<ReturnType<typeof usersControllerFindAll>>,
				TError,
				Awaited<ReturnType<typeof usersControllerFindAll>>
			>,
			"initialData"
		>;
	request?: SecondParameter<typeof http>;
}): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };
export function useUsersControllerFindAll<
	TData = Awaited<ReturnType<typeof usersControllerFindAll>>,
	TError = unknown,
>(options?: {
	query?: Partial<
		UseQueryOptions<Awaited<ReturnType<typeof usersControllerFindAll>>, TError, TData>
	>;
	request?: SecondParameter<typeof http>;
}): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

export function useUsersControllerFindAll<
	TData = Awaited<ReturnType<typeof usersControllerFindAll>>,
	TError = unknown,
>(options?: {
	query?: Partial<
		UseQueryOptions<Awaited<ReturnType<typeof usersControllerFindAll>>, TError, TData>
	>;
	request?: SecondParameter<typeof http>;
}): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {
	const queryOptions = getUsersControllerFindAllQueryOptions(options);

	const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
		queryKey: DataTag<QueryKey, TData, TError>;
	};

	query.queryKey = queryOptions.queryKey;

	return query;
}

export const usersControllerFindMe = (
	options?: SecondParameter<typeof http>,
	signal?: AbortSignal,
) => {
	return http<User>({ url: `/api/users/me`, method: "GET", signal }, options);
};

export const getUsersControllerFindMeQueryKey = () => {
	return [`/api/users/me`] as const;
};

export const getUsersControllerFindMeQueryOptions = <
	TData = Awaited<ReturnType<typeof usersControllerFindMe>>,
	TError = unknown,
>(options?: {
	query?: Partial<
		UseQueryOptions<Awaited<ReturnType<typeof usersControllerFindMe>>, TError, TData>
	>;
	request?: SecondParameter<typeof http>;
}) => {
	const { query: queryOptions, request: requestOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getUsersControllerFindMeQueryKey();

	const queryFn: QueryFunction<Awaited<ReturnType<typeof usersControllerFindMe>>> = ({ signal }) =>
		usersControllerFindMe(requestOptions, signal);

	return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
		Awaited<ReturnType<typeof usersControllerFindMe>>,
		TError,
		TData
	> & { queryKey: DataTag<QueryKey, TData, TError> };
};

export type UsersControllerFindMeQueryResult = NonNullable<
	Awaited<ReturnType<typeof usersControllerFindMe>>
>;
export type UsersControllerFindMeQueryError = unknown;

export function useUsersControllerFindMe<
	TData = Awaited<ReturnType<typeof usersControllerFindMe>>,
	TError = unknown,
>(options: {
	query: Partial<
		UseQueryOptions<Awaited<ReturnType<typeof usersControllerFindMe>>, TError, TData>
	> &
		Pick<
			DefinedInitialDataOptions<
				Awaited<ReturnType<typeof usersControllerFindMe>>,
				TError,
				Awaited<ReturnType<typeof usersControllerFindMe>>
			>,
			"initialData"
		>;
	request?: SecondParameter<typeof http>;
}): DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };
export function useUsersControllerFindMe<
	TData = Awaited<ReturnType<typeof usersControllerFindMe>>,
	TError = unknown,
>(options?: {
	query?: Partial<
		UseQueryOptions<Awaited<ReturnType<typeof usersControllerFindMe>>, TError, TData>
	> &
		Pick<
			UndefinedInitialDataOptions<
				Awaited<ReturnType<typeof usersControllerFindMe>>,
				TError,
				Awaited<ReturnType<typeof usersControllerFindMe>>
			>,
			"initialData"
		>;
	request?: SecondParameter<typeof http>;
}): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };
export function useUsersControllerFindMe<
	TData = Awaited<ReturnType<typeof usersControllerFindMe>>,
	TError = unknown,
>(options?: {
	query?: Partial<
		UseQueryOptions<Awaited<ReturnType<typeof usersControllerFindMe>>, TError, TData>
	>;
	request?: SecondParameter<typeof http>;
}): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

export function useUsersControllerFindMe<
	TData = Awaited<ReturnType<typeof usersControllerFindMe>>,
	TError = unknown,
>(options?: {
	query?: Partial<
		UseQueryOptions<Awaited<ReturnType<typeof usersControllerFindMe>>, TError, TData>
	>;
	request?: SecondParameter<typeof http>;
}): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {
	const queryOptions = getUsersControllerFindMeQueryOptions(options);

	const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
		queryKey: DataTag<QueryKey, TData, TError>;
	};

	query.queryKey = queryOptions.queryKey;

	return query;
}

export const usersControllerFindOne = (
	id: string,
	options?: SecondParameter<typeof http>,
	signal?: AbortSignal,
) => {
	return http<UserDto>({ url: `/api/users/${id}`, method: "GET", signal }, options);
};

export const getUsersControllerFindOneQueryKey = (id: string) => {
	return [`/api/users/${id}`] as const;
};

export const getUsersControllerFindOneQueryOptions = <
	TData = Awaited<ReturnType<typeof usersControllerFindOne>>,
	TError = unknown,
>(
	id: string,
	options?: {
		query?: Partial<
			UseQueryOptions<Awaited<ReturnType<typeof usersControllerFindOne>>, TError, TData>
		>;
		request?: SecondParameter<typeof http>;
	},
) => {
	const { query: queryOptions, request: requestOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getUsersControllerFindOneQueryKey(id);

	const queryFn: QueryFunction<Awaited<ReturnType<typeof usersControllerFindOne>>> = ({ signal }) =>
		usersControllerFindOne(id, requestOptions, signal);

	return { queryKey, queryFn, enabled: !!id, ...queryOptions } as UseQueryOptions<
		Awaited<ReturnType<typeof usersControllerFindOne>>,
		TError,
		TData
	> & { queryKey: DataTag<QueryKey, TData, TError> };
};

export type UsersControllerFindOneQueryResult = NonNullable<
	Awaited<ReturnType<typeof usersControllerFindOne>>
>;
export type UsersControllerFindOneQueryError = unknown;

export function useUsersControllerFindOne<
	TData = Awaited<ReturnType<typeof usersControllerFindOne>>,
	TError = unknown,
>(
	id: string,
	options: {
		query: Partial<
			UseQueryOptions<Awaited<ReturnType<typeof usersControllerFindOne>>, TError, TData>
		> &
			Pick<
				DefinedInitialDataOptions<
					Awaited<ReturnType<typeof usersControllerFindOne>>,
					TError,
					Awaited<ReturnType<typeof usersControllerFindOne>>
				>,
				"initialData"
			>;
		request?: SecondParameter<typeof http>;
	},
): DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };
export function useUsersControllerFindOne<
	TData = Awaited<ReturnType<typeof usersControllerFindOne>>,
	TError = unknown,
>(
	id: string,
	options?: {
		query?: Partial<
			UseQueryOptions<Awaited<ReturnType<typeof usersControllerFindOne>>, TError, TData>
		> &
			Pick<
				UndefinedInitialDataOptions<
					Awaited<ReturnType<typeof usersControllerFindOne>>,
					TError,
					Awaited<ReturnType<typeof usersControllerFindOne>>
				>,
				"initialData"
			>;
		request?: SecondParameter<typeof http>;
	},
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };
export function useUsersControllerFindOne<
	TData = Awaited<ReturnType<typeof usersControllerFindOne>>,
	TError = unknown,
>(
	id: string,
	options?: {
		query?: Partial<
			UseQueryOptions<Awaited<ReturnType<typeof usersControllerFindOne>>, TError, TData>
		>;
		request?: SecondParameter<typeof http>;
	},
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

export function useUsersControllerFindOne<
	TData = Awaited<ReturnType<typeof usersControllerFindOne>>,
	TError = unknown,
>(
	id: string,
	options?: {
		query?: Partial<
			UseQueryOptions<Awaited<ReturnType<typeof usersControllerFindOne>>, TError, TData>
		>;
		request?: SecondParameter<typeof http>;
	},
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {
	const queryOptions = getUsersControllerFindOneQueryOptions(id, options);

	const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
		queryKey: DataTag<QueryKey, TData, TError>;
	};

	query.queryKey = queryOptions.queryKey;

	return query;
}

export const usersControllerUpdate = (
	id: string,
	updateUserDto: UpdateUserDto,
	options?: SecondParameter<typeof http>,
) => {
	return http<UsersControllerUpdate200>(
		{
			url: `/api/users/${id}`,
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			data: updateUserDto,
		},
		options,
	);
};

export const getUsersControllerUpdateMutationOptions = <
	TError = unknown,
	TContext = unknown,
>(options?: {
	mutation?: UseMutationOptions<
		Awaited<ReturnType<typeof usersControllerUpdate>>,
		TError,
		{ id: string; data: UpdateUserDto },
		TContext
	>;
	request?: SecondParameter<typeof http>;
}): UseMutationOptions<
	Awaited<ReturnType<typeof usersControllerUpdate>>,
	TError,
	{ id: string; data: UpdateUserDto },
	TContext
> => {
	const mutationKey = ["usersControllerUpdate"];
	const { mutation: mutationOptions, request: requestOptions } = options
		? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey
			? options
			: { ...options, mutation: { ...options.mutation, mutationKey } }
		: { mutation: { mutationKey }, request: undefined };

	const mutationFn: MutationFunction<
		Awaited<ReturnType<typeof usersControllerUpdate>>,
		{ id: string; data: UpdateUserDto }
	> = (props) => {
		const { id, data } = props ?? {};

		return usersControllerUpdate(id, data, requestOptions);
	};

	return { mutationFn, ...mutationOptions };
};

export type UsersControllerUpdateMutationResult = NonNullable<
	Awaited<ReturnType<typeof usersControllerUpdate>>
>;
export type UsersControllerUpdateMutationBody = UpdateUserDto;
export type UsersControllerUpdateMutationError = unknown;

export const useUsersControllerUpdate = <TError = unknown, TContext = unknown>(options?: {
	mutation?: UseMutationOptions<
		Awaited<ReturnType<typeof usersControllerUpdate>>,
		TError,
		{ id: string; data: UpdateUserDto },
		TContext
	>;
	request?: SecondParameter<typeof http>;
}): UseMutationResult<
	Awaited<ReturnType<typeof usersControllerUpdate>>,
	TError,
	{ id: string; data: UpdateUserDto },
	TContext
> => {
	const mutationOptions = getUsersControllerUpdateMutationOptions(options);

	return useMutation(mutationOptions);
};
export const usersControllerRemove = (id: string, options?: SecondParameter<typeof http>) => {
	return http<SuccessResponseDto>({ url: `/api/users/${id}`, method: "DELETE" }, options);
};

export const getUsersControllerRemoveMutationOptions = <
	TError = unknown,
	TContext = unknown,
>(options?: {
	mutation?: UseMutationOptions<
		Awaited<ReturnType<typeof usersControllerRemove>>,
		TError,
		{ id: string },
		TContext
	>;
	request?: SecondParameter<typeof http>;
}): UseMutationOptions<
	Awaited<ReturnType<typeof usersControllerRemove>>,
	TError,
	{ id: string },
	TContext
> => {
	const mutationKey = ["usersControllerRemove"];
	const { mutation: mutationOptions, request: requestOptions } = options
		? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey
			? options
			: { ...options, mutation: { ...options.mutation, mutationKey } }
		: { mutation: { mutationKey }, request: undefined };

	const mutationFn: MutationFunction<
		Awaited<ReturnType<typeof usersControllerRemove>>,
		{ id: string }
	> = (props) => {
		const { id } = props ?? {};

		return usersControllerRemove(id, requestOptions);
	};

	return { mutationFn, ...mutationOptions };
};

export type UsersControllerRemoveMutationResult = NonNullable<
	Awaited<ReturnType<typeof usersControllerRemove>>
>;

export type UsersControllerRemoveMutationError = unknown;

export const useUsersControllerRemove = <TError = unknown, TContext = unknown>(options?: {
	mutation?: UseMutationOptions<
		Awaited<ReturnType<typeof usersControllerRemove>>,
		TError,
		{ id: string },
		TContext
	>;
	request?: SecondParameter<typeof http>;
}): UseMutationResult<
	Awaited<ReturnType<typeof usersControllerRemove>>,
	TError,
	{ id: string },
	TContext
> => {
	const mutationOptions = getUsersControllerRemoveMutationOptions(options);

	return useMutation(mutationOptions);
};

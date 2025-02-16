import axios, { AxiosRequestConfig } from "axios";

export const http = <T>(config: AxiosRequestConfig, options?: AxiosRequestConfig): Promise<T> => {
	const source = axios.CancelToken.source();
	const promise = axios({
		...config,
		...options,
		cancelToken: source.token,
	}).then(({ data }) => data);

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	promise.cancel = () => {
		source.cancel("Query was cancelled");
	};

	return promise;
};

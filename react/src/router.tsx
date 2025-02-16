import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import { lazy, LazyExoticComponent } from "react";

type Route = {
	path: string;
	Component: LazyExoticComponent<() => React.ReactNode>;
};

const publicRoutes: Route[] = [
	{ path: "/login", Component: lazy(() => import("./features/auth/login")) },
	{ path: "/signup", Component: lazy(() => import("./features/auth/signup")) },
];

const privateRoutes: Route[] = [
	{ path: "/", Component: lazy(() => import("./features/posts/posts-list")) },
];

export default {
	public: publicRoutes,
	private: privateRoutes,
};

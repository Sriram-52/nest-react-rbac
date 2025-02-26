import { lazy, LazyExoticComponent } from "react";
import { Action, Subject } from "./lib/casl/ability";

type Route = {
	path: string;
	Component: LazyExoticComponent<() => React.ReactNode>;
	ability?: { action: Action; subject: Subject };
};

const publicRoutes: Route[] = [
	{ path: "/login", Component: lazy(() => import("./features/auth/login")) },
	{ path: "/signup", Component: lazy(() => import("./features/auth/signup")) },
];

const privateRoutes: Route[] = [
	{
		path: "/",
		Component: lazy(() => import("./features/posts/posts-list")),
		ability: { action: "read", subject: "Post" },
	},
	{
		path: "/create-post",
		Component: lazy(() => import("./features/posts/create-post")),
		ability: { action: "create", subject: "Post" },
	},
	{
		path: "/edit-post/:id",
		Component: lazy(() => import("./features/posts/update-post")),
		ability: { action: "update", subject: "Post" },
	},
	{
		path: "/manage-roles",
		Component: lazy(() => import("./features/roles/manage-roles")),
		ability: { action: "manage", subject: "Role" },
	},
];

export default {
	public: publicRoutes,
	private: privateRoutes,
};

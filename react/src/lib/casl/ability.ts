import { AbilityBuilder, AbilityClass, PureAbility } from "@casl/ability";
import { User } from "../api";

export type Action = "create" | "read" | "update" | "delete" | "manage";
export type Subject = string | "all";

export type AppAbility = PureAbility<[Action, Subject]>;
export const AppAbility = PureAbility as AbilityClass<AppAbility>;

export const defineAbilityForUser = (user: User) => {
	const { can, cannot, rules } = new AbilityBuilder<AppAbility>(AppAbility);
	const permissions =
		user.roles?.flatMap(
			(role) =>
				role.role?.permissions?.map((permission) => ({
					action: permission.permission?.action as Action,
					subject: permission.permission?.subject as Subject,
					fields: permission.permission?.fields?.length ? permission.permission?.fields : undefined,
					inverted: permission.permission?.inverted,
					reason: permission.permission?.reason ?? undefined,
					conditions: undefined,
				})) || [],
		) || [];
	// sort permissions by inverted flag where inverted permissions are at the end
	permissions.sort((a, b) => (a.inverted === b.inverted ? 0 : a.inverted ? 1 : -1));
	permissions.forEach((permission) => {
		const rule = permission.inverted ? cannot : can;
		rule(permission.action, permission.subject, permission.fields, permission.conditions);
	});
	return rules;
};

export const buildAbility = (rules: ReturnType<typeof defineAbilityForUser>) =>
	new AppAbility(rules);

import { User } from '@/prisma';
import * as Mustache from 'mustache';
import { Injectable } from '@nestjs/common';
import { Action, AppAbility } from './casl-helpers';
import { createPrismaAbility } from '@casl/prisma';
import { JsonValue } from '@prisma/client/runtime/library';

@Injectable()
export class AbilityFactory {
  private detectVariables(template: string): string[] {
    // Create a regular expression to match any variable in the format {{variableName}}
    const regex = /{{\s*([a-zA-Z0-9_]+)\s*}}/g;
    const variables = new Set<string>(); // Use a Set to store unique variable names
    let match: RegExpExecArray | null;

    // Find all matches and add them to the Set
    while ((match = regex.exec(template)) !== null) {
      variables.add(match[1]); // match[1] contains the variable name
    }

    return Array.from(variables); // Convert Set to Array
  }

  private parseCondition(
    condition: JsonValue | undefined,
    requestMetadata: Record<string, any>,
    user: User,
  ): Record<string, any> | undefined {
    if (!condition) {
      return undefined;
    }
    const template = JSON.stringify(condition);
    const variables = this.detectVariables(template);

    // create a new object with keys as the variables and values as the requestMetadata values, defaulting to user ID
    // This will replace any empty strings in the condition with the user's ID
    const view = variables.reduce(
      (acc, key) => {
        acc[key] = requestMetadata[key] ?? user?.id;
        return acc;
      },
      {} as Record<string, any>,
    );

    const result = JSON.parse(Mustache.render(template, view));
    return result;
  }

  createForUser(user: User, requestMetadata: Record<string, any>) {
    return createPrismaAbility<AppAbility>(
      user.roles?.flatMap(
        (role) =>
          role.role?.permissions?.map((permission) => ({
            action: permission.permission?.action as Action,
            subject: permission.permission?.subject as any,
            inverted: permission.permission?.inverted,
            reason: permission.permission?.reason ?? undefined,
            conditions: this.parseCondition(
              permission.permission?.conditions,
              requestMetadata,
              user,
            ),
          })) || [],
      ) || [],
    );
  }
}

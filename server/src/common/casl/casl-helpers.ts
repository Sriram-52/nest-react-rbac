import { User, Post } from '@prisma/client';
import { PureAbility } from '@casl/ability';
import { PrismaQuery, Subjects } from '@casl/prisma';

export const actions = [
  'read',
  'manage',
  'create',
  'update',
  'delete',
] as const;

export type Action = (typeof actions)[number];
export type Subject =
  | 'all'
  | Subjects<{
      User: User;
      Post: Post;
    }>;

export type AppAbility = PureAbility<[Action, Subject], PrismaQuery>;

export const defaultFieldsBeforeAbilityCheck = {
  id: 'id',
  createdAt: new Date(),
  updatedAt: new Date(),
  createdBy: null,
  updatedBy: null,
  tenantId: 'tenantId',
};

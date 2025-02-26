import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { Action, Subject } from '../casl/casl-helpers';

export type RequiredPermission = [Action, Subject];

export const PERMISSION_CHECKER_KEY = 'permission_checker_params_key';
export const CheckPermissions = (
  ...params: RequiredPermission[]
): CustomDecorator<string> => SetMetadata(PERMISSION_CHECKER_KEY, params);

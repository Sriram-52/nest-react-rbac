import { Injectable } from '@nestjs/common';
import type { User } from '@prisma/client';
import { ForbiddenError, subject } from '@casl/ability';
import { ClsService } from 'nestjs-cls';
import { defaultFieldsBeforeAbilityCheck } from '@/common';

@Injectable()
export class UsersAbilityService {
  constructor(private readonly clsService: ClsService) {}

  canRead(user: User) {
    const ability = this.clsService.get('ability');
    ForbiddenError.from(ability).throwUnlessCan('read', subject('User', user));
  }

  canUpdate(user: User) {
    const ability = this.clsService.get('ability');
    const sub = {
      ...user,
      ...defaultFieldsBeforeAbilityCheck,
    } as User;
    ForbiddenError.from(ability).throwUnlessCan('update', subject('User', sub));
  }

  canDelete(user: User) {
    const ability = this.clsService.get('ability');
    ForbiddenError.from(ability).throwUnlessCan(
      'delete',
      subject('User', user),
    );
  }
}

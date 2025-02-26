import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {
  DATA_EXTRACTOR_KEY,
  Extractor,
  IS_PUBLIC_KEY,
  PERMISSION_CHECKER_KEY,
  RequiredPermission,
} from '../decorators';
import { AbilityFactory } from '../casl/casl-ability.factory';
import { ClsService } from 'nestjs-cls';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly abilityFactory: AbilityFactory,
    private readonly clsService: ClsService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    if (context.getType() === 'http') {
      const request = context.switchToHttp().getRequest();

      const requiredPermissions = this.reflector.get<RequiredPermission[]>(
        PERMISSION_CHECKER_KEY,
        context.getHandler(),
      );

      const dataExtractor = this.reflector.get<Extractor>(
        DATA_EXTRACTOR_KEY,
        context.getHandler(),
      );
      const metadata = dataExtractor ? dataExtractor(request) : {};

      const isPublic = this.reflector.get<boolean>(
        IS_PUBLIC_KEY,
        context.getHandler(),
      );

      if (isPublic) {
        return true;
      }

      if (!request.user) {
        throw new UnauthorizedException('No token provided');
      }
      const ability = this.abilityFactory.createForUser(request.user, metadata);
      this.clsService.set('ability', ability);
      request.userAbility = ability;
      const result = requiredPermissions.every((permission) =>
        ability.can(...permission),
      );
      if (!result) {
        throw new ForbiddenException(
          'You do not have permission to perform this action',
        );
      }
      return true;
    }
    return true;
  }
}

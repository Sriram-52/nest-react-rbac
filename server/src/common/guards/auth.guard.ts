import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from '../services';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (context.getType() === 'http') {
      const request = context.switchToHttp().getRequest();

      const isPublic = this.reflector.get<boolean>(
        'isPublic',
        context.getHandler(),
      );

      if (isPublic) {
        return true;
      }

      const token = request.headers.authorization?.split('Bearer ').pop();
      if (!token) {
        throw new UnauthorizedException('No token provided');
      }

      const user = await this.authService.validateToken(token);
      request.user = user;
      if (!user) {
        throw new UnauthorizedException('Invalid token');
      }
    }
    return true;
  }
}

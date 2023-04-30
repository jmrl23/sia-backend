import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import type { Observable } from 'rxjs';
import type { User } from '../types';

export class UserEnableGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user: User = request.user;
    if (!user) return true;
    if (!user.enabled) {
      throw new ForbiddenException(
        'Cannot process the request, account is currently disabled',
      );
    }
    return true;
  }
}

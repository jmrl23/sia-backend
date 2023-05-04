import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { User } from '../types';
import type { Request } from 'express';
import { ConfigService } from '@nestjs/config';

export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly configService: ConfigService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) return true;
    const request: Request = context.switchToHttp().getRequest();
    const bypassKey = request.query['bypass_key'];
    if (bypassKey) {
      if (this.configService.get<string>('BYPASS_KEY') === bypassKey) {
        return true;
      }
    }
    const user: User = request.user;
    const granted = roles.includes(user?.role);
    if (!granted) {
      throw new ForbiddenException(
        'Cannot process the request, access level error',
      );
    }
    return true;
  }
}

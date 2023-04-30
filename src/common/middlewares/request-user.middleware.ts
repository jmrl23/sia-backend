import { Injectable, type NestMiddleware, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { PrismaService } from '../services/prisma/prisma.service';
import type { User } from '../types';
import type { NextFunction, Request, Response } from 'express';
import type { Cache } from 'cache-manager';
import { JWTService } from '../services/jwt/jwt.service';

@Injectable()
export class RequestUserMiddleware implements NestMiddleware {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheService: Cache,
    @Inject(PrismaService) private readonly prismaService: PrismaService,
    @Inject(JWTService) private readonly jwtService: JWTService,
  ) {}

  async use(request: Request, _response: Response, next: NextFunction) {
    const auth = request.header('authorization');
    if (!auth) return next();
    const authenticate = auth.split(' ');
    const [scheme, token] = authenticate;
    if (authenticate.length !== 2 || scheme !== 'Bearer') return next();
    const id = this.jwtService.verify<{ id: string }>(token)?.id;
    const cachedUser = await this.cacheService.get(`user.${id}`);
    if (!cachedUser) {
      const user = await this.prismaService.user.findUnique({
        where: {
          id,
        },
        include: {
          UserInformation: true,
        },
      });
      if (!user) return next();
      delete user.password;
      request.user = user;
      await this.cacheService.set(`user.session.${id}`, request.user, 60);
      return next();
    }
    request.user = cachedUser as unknown as User;
    next();
  }
}

import { Injectable, NestMiddleware, ForbiddenException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Request, Response, NextFunction } from 'express';

@Injectable()
export class DocsMiddleware implements NestMiddleware {
  constructor(private configService: ConfigService) {}

  use(_request: Request, _response: Response, next: NextFunction) {
    const NODE_ENV = this.configService.get<string>('NODE_ENV');

    if (NODE_ENV === 'production')
      throw new ForbiddenException('Not available on production');
    next();
  }
}

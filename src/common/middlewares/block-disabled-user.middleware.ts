import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';
import type { Request, Response, NextFunction } from 'express';

@Injectable()
export class BlockDisabledUserMiddleware implements NestMiddleware {
  use(request: Request, _response: Response, next: NextFunction) {
    if (request.user && request.user.enabled) {
      throw new ForbiddenException(
        'Cannot process the request, account is currently disabled',
      );
    }

    next();
  }
}

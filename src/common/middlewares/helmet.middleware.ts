import { Injectable, NestMiddleware, Inject } from '@nestjs/common';
import helmet from 'helmet';
import type { NextFunction, Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class HelmetMiddleware implements NestMiddleware {
  constructor(
    @Inject(ConfigService) private readonly configService: ConfigService,
  ) {}

  use(request: Request, response: Response, next: NextFunction) {
    const trusted = [`'self`];

    helmet({
      crossOriginResourcePolicy: {
        policy: 'cross-origin',
      },
      contentSecurityPolicy: {
        directives: {
          defaultSrc: trusted,
          scriptSrc: [
            `'nonce-${this.configService.get<string>('NONCE')}'`,
          ].concat(trusted),
        },
      },
    })(request, response, next);
  }
}

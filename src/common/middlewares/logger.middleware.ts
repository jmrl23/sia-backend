import { Injectable, Inject, NestMiddleware, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Request, Response, NextFunction } from 'express';
import * as morgan from 'morgan';
import { Writable } from 'stream';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(LoggerMiddleware.name);

  constructor(
    @Inject(ConfigService) private readonly configService: ConfigService,
  ) {}

  use(request: Request, response: Response, next: NextFunction) {
    const writable = new Writable({
      defaultEncoding: 'utf-8',
      write: (chunk: Buffer) => {
        this.logger.log(chunk.toString().replace('\n', ''));
      },
    });

    switch (this.configService.get<string>('NODE_ENV')) {
      case 'production':
        return morgan('common', {
          stream: writable,
        })(request, response, next);
      case 'development':
        return morgan('dev', {
          stream: writable,
        })(request, response, next);
      default:
        writable.destroy();
        next();
    }
  }
}

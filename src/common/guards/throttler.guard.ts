import { HttpStatus, HttpException } from '@nestjs/common';
import { ThrottlerGuard as TG } from '@nestjs/throttler';

export class ThrottlerGuard extends TG {
  protected getTracker(req: Record<string, any>): string {
    return req.ips.length ? req.ips[0] : req.ip;
  }

  protected throwThrottlingException(): void {
    throw new HttpException(
      {
        statusCode: HttpStatus.TOO_MANY_REQUESTS,
        message: 'Cannot process the request, too many requests',
        error: 'Too Many Requests',
      },
      HttpStatus.TOO_MANY_REQUESTS,
    );
  }
}

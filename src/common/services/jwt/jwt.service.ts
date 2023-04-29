import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JWTService {
  constructor(
    @Inject(ConfigService) private readonly configService: ConfigService,
  ) {}

  sign(payload: string | Buffer | Record<string, unknown>) {
    return jwt.sign(payload, this.configService.get<string>('JWT_SECRET'));
  }

  verify<T>(token: string): T | null {
    try {
      const result = jwt.verify(
        token,
        this.configService.get<string>('JWT_SECRET'),
      );
      return result as T;
    } catch (error: unknown) {
      return null;
    }
  }
}

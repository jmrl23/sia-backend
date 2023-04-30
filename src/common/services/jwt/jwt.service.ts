import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  sign as jwtSign,
  verify as jwtVerify,
  JwtPayload,
  SignOptions,
} from 'jsonwebtoken';

@Injectable()
export class JWTService {
  constructor(private readonly configService: ConfigService) {}

  sign(payload: JwtPayload, options?: SignOptions) {
    return jwtSign(
      payload,
      this.configService.get<string>('JWT_SECRET'),
      options,
    );
  }

  verify<T>(token: string): T | null {
    try {
      const result = jwtVerify(
        token,
        this.configService.get<string>('JWT_SECRET'),
      );
      return result as T;
    } catch (error: unknown) {
      return null;
    }
  }
}

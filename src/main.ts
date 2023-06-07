import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import {
  type ValidationError,
  ForbiddenException,
  ValidationPipe,
  BadRequestException,
} from '@nestjs/common';
import { RolesGuard, UserEnableGuard } from './common/guards';
import * as detectPort from 'detect-port';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  const reflector = app.get(Reflector);

  app.enableCors({
    origin: (origin, done) => {
      const allowedOrigins = configService
        .get<string>('ALLOWED_ORIGINS')
        .split(',');
      if (!origin) return done(null, true);
      if (allowedOrigins.includes('*') && !allowedOrigins.includes(origin)) {
        allowedOrigins?.push(origin);
      }
      if (!allowedOrigins?.includes(origin)) {
        throw new ForbiddenException('Blocked by CORS');
      }
      done(null, true);
    },
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory: (errors: ValidationError[]) => {
        for (const error of errors) {
          for (const constraint in error.constraints) {
            const firstConstraint = error.constraints[constraint].split(' ');
            const field = firstConstraint[0]
              .replace(/([A-Z])/g, ' $1')
              .trim()
              .toLowerCase();
            firstConstraint[0] = field;
            const message = firstConstraint.join(' ');
            throw new BadRequestException(message);
          }
        }
      },
    }),
  );

  app.useGlobalGuards(
    new UserEnableGuard(),
    new RolesGuard(reflector, configService),
  );

  await app.listen(await detectPort(configService.get<number>('PORT') ?? 3000));
}
bootstrap();

import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ForbiddenException, ValidationPipe } from '@nestjs/common';
import { RolesGuard, UserEnableGuard } from './common/guards';

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
    }),
  );

  app.useGlobalGuards(
    new UserEnableGuard(),
    new RolesGuard(reflector, configService),
  );

  await app.listen(configService.get<number>('PORT') ?? 3001);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ForbiddenException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);

  app.enableCors({
    origin: (origin, done) => {
      const allowedOrigins = configService.get<string[]>('ALLOWED_ORIGIN');
      if (!origin) return done(null, true);
      if (allowedOrigins.includes('*') && !allowedOrigins.includes(origin)) {
        allowedOrigins.push(origin);
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

  await app.listen(configService.get<number>('PORT') ?? 3001);
}
bootstrap();

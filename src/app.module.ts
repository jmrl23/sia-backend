import env from './configurations/env';
import {
  type CacheStore,
  type MiddlewareConsumer,
  type NestModule,
  Module,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';
import { PrismaService } from './common/services/prisma/prisma.service';
import {
  RequestUserMiddleware,
  BlockDisabledUserMiddleware,
  HelmetMiddleware,
} from './common/middlewares';
import { DocsModule } from './docs/docs.module';
import { UserModule } from './user/user.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { JWTService } from './common/services/jwt/jwt.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [env],
      ignoreEnvFile: true,
      encoding: 'utf-8',
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        store: (await redisStore({
          url: configService.get<URL>('REDIS_URL').toString(),
        })) as unknown as CacheStore,
      }),
    }),
    ThrottlerModule.forRoot({
      ttl: 60 * 5,
      limit: 50,
    }),
    DocsModule,
    UserModule,
  ],
  providers: [PrismaService, JWTService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        HelmetMiddleware,
        RequestUserMiddleware,
        BlockDisabledUserMiddleware,
      )
      .forRoutes({
        path: '*',
        method: RequestMethod.ALL,
      });
  }
}
